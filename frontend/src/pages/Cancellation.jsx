import React from 'react'
import { useNavigate } from 'react-router-dom'

const Cancellation = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <button 
            onClick={() => navigate('/')}
            className='mb-4 text-gray-600 hover:text-gray-800 transition-colors'
          >
            ← Back to Home
          </button>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Cancellation Policy
          </h1>
          <div className='h-1 w-20 bg-black mx-auto'></div>
        </div>

        {/* Content */}
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='prose max-w-none'>
            <h2 className='text-2xl font-semibold mb-4'>1. Order Cancellation</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              You can cancel your order within 24 hours of placing it. 
              After 24 hours, orders enter the processing stage and cannot be cancelled.
              To cancel an order, please contact us at sdmithilaart@gmail.com or call 8674913700.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>2. Refund Policy</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              <strong>Full Refunds:</strong> Available for orders cancelled within 24 hours of purchase.
              <br /><br />
              <strong>Partial Refunds:</strong> May be available in certain circumstances such as:
              <br />• Damaged products received
              <br />• Incorrect product delivered
              <br />• Manufacturing defects
            </p>

            <h2 className='text-2xl font-semibold mb-4'>3. Returns and Exchanges</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              <strong>Returns:</strong> We accept returns within 7 days of delivery if the product is:
              <br />• Damaged during shipping
              <br />• Incorrectly delivered
              <br />• Has manufacturing defects
              <br /><br />
              <strong>Exchanges:</strong> We offer exchanges for different sizes or colors of the same product, 
              subject to availability.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>4. Non-Returnable Items</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              The following items cannot be returned or exchanged:
              <br />• Customized or personalized products
              <br />• Items marked as final sale
              <br />• Products damaged due to customer misuse
              <br />• Products returned after 7 days of delivery
            </p>

            <h2 className='text-2xl font-semibold mb-4'>5. Return Process</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              To initiate a return or exchange:
              <br />1. Contact our customer service team
              <br />2. Provide your order number and reason for return
              <br />3. We will provide instructions for returning the item
              <br />4. Once we receive the returned item, we will process your refund or exchange
            </p>

            <h2 className='text-2xl font-semibold mb-4'>6. Refund Processing Time</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              Refunds are typically processed within 7-10 business days after we receive 
              the returned item. The refund will be credited to your original payment method.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>7. Shipping Costs</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              <strong>Return Shipping:</strong> Customers are responsible for return shipping costs 
              unless the return is due to our error (wrong item, damaged product, etc.).
              <br /><br />
              <strong>Exchange Shipping:</strong> We will cover shipping costs for exchanges 
              when the original item was defective or incorrectly shipped.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>8. Damaged Items</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              If you receive a damaged item, please:
              <br />• Contact us within 48 hours of delivery
              <br />• Provide photos of the damage
              <br />• Keep the original packaging
              <br />We will arrange for a replacement or full refund, including return shipping.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>9. Order Modifications</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              Order modifications (size, color, quantity changes) are only possible 
              within 24 hours of placing the order. After this period, the order 
              enters processing and cannot be modified.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>10. Contact Information</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              For any questions about our Cancellation Policy or to initiate a return:
              <br />Email: sdmithilaart@gmail.com
              <br />Phone: 8674913700
              <br />Hours: Monday to Saturday, 10:00 AM - 6:00 PM IST
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center mt-12'>
          <button 
            onClick={() => navigate('/')}
            className='bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors'
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cancellation
