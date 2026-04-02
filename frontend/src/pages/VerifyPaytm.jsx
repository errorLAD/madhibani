import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'

const VerifyPaytm = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams] = useSearchParams()
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token || !orderId) return

            const response = await axios.post(
                backendUrl + '/api/order/verifyPaytm',
                { orderId },
                { headers: { token } }
            )

            if (response.data.success) {
                toast.success('🎉 Payment Successful! Order placed.')
                setCartItems({})
                navigate('/orders')
            } else {
                toast.error(response.data.message || 'Payment failed')
                navigate('/cart')
            }
        } catch (error) {
            console.error(error)
            toast.error('Payment verification error')
            navigate('/cart')
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div className='min-h-[60vh] flex items-center justify-center'>
            <div className='text-center'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4'></div>
                <p className='text-xl font-semibold text-gray-700'>Verifying your payment...</p>
                <p className='text-gray-500 mt-2'>Please wait, do not close this page.</p>
            </div>
        </div>
    )
}

export default VerifyPaytm
