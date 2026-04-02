import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useShopContext } from '../context/ShopContext';

const RazorpayPayment = ({ orderData, formData }) => {
    const { backendUrl, token, setCartItems } = useShopContext();
    const navigate = useNavigate();

    const initiatePayment = async () => {
        console.log('Starting Razorpay payment process...');

        // Step 1: Create order in backend first
        try {
            console.log('Creating order in backend...');
            const orderResponse = await axios.post(
                backendUrl + '/api/order/place',
                {
                    ...orderData,
                    paymentMethod: "Razorpay",
                    payment: false
                },
                { headers: { token } }
            );

            if (!orderResponse.data.success) {
                toast.error('Failed to create order');
                return;
            }

            console.log('Order created successfully:', orderResponse.data);

            // Step 2: Create Razorpay payment
            const options = {
                key: 'rzp_test_L0Nkk0p2iXqL8o', // Working test key
                amount: orderData.amount * 100,
                currency: 'INR',
                name: 'Madhubani Rang',
                description: 'Order Payment',
                image: 'https://i.ibb.co/vvBJcytg/Whats-App-Image-2026-03-31-at-1-21-44-PM.jpg',
                order_id: `order_${Date.now()}`, // Generate simple order ID
                prefill: {
                    name: formData.firstName + ' ' + formData.lastName,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: '#8B0000'
                },
                handler: async function(response) {
                    console.log('Payment successful:', response);
                    
                    // Step 3: Update order with payment details
                    try {
                        const updateResponse = await axios.post(
                            backendUrl + '/api/order/update-payment',
                            {
                                orderId: orderResponse.data.orderId,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature
                            },
                            { headers: { token } }
                        );

                        if (updateResponse.data.success) {
                            toast.success('Payment Successful!');
                            setCartItems({});
                            navigate('/orders');
                        } else {
                            toast.error('Payment verification failed');
                        }
                    } catch (error) {
                        console.error('Payment update error:', error);
                        toast.error('Payment successful but verification failed');
                    }
                },
                modal: {
                    ondismiss: function() {
                        console.log('Payment modal dismissed');
                        toast.info('Payment cancelled');
                    },
                    escape: true,
                    backdropclose: false,
                    handleback: true
                },
                notes: {
                    address: formData.street + ', ' + formData.city,
                    merchant_order_id: orderResponse.data.orderId
                }
            };

            console.log('Opening Razorpay with options:', options);

            // Check if Razorpay is loaded
            if (typeof window.Razorpay === 'undefined') {
                toast.error('Razorpay SDK not loaded. Please refresh the page.');
                return;
            }

            const rzp = new window.Razorpay(options);

            // Add event listeners
            rzp.on('payment.failed', function(response) {
                console.error('Payment failed:', response.error);
                toast.error('Payment failed: ' + response.error.description);
            });

            rzp.on('payment.success', function(response) {
                console.log('Payment success event:', response);
            });

            rzp.open();

        } catch (error) {
            console.error('Order creation error:', error);
            toast.error('Failed to initiate payment');
        }
    };

    return (
        <button
            onClick={initiatePayment}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
            Pay with Razorpay
        </button>
    );
};

export default RazorpayPayment;
