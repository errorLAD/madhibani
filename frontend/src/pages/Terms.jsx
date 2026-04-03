import React from 'react'
import { useNavigate } from 'react-router-dom'

const Terms = () => {
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
            Terms & Conditions
          </h1>
          <div className='h-1 w-20 bg-black mx-auto'></div>
        </div>

        {/* Content */}
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='prose max-w-none'>
            <h2 className='text-2xl font-semibold mb-4'>1. Acceptance of Terms</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              By accessing and using Mithila Art, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>2. Privacy Policy</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              Your use of Mithila Art is also governed by our Privacy Policy. Please review our Privacy Policy, 
              which also governs the site and informs users of our data collection practices.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>3. Products and Services</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              All products displayed on Mithila Art are handcrafted traditional artworks. 
              Each piece is unique and may vary slightly from the images shown. 
              We strive to provide accurate descriptions and images of our products.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>4. Pricing and Payment</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              All prices are listed in Indian Rupees (₹) and are inclusive of all applicable taxes. 
              Payment must be made in full before the products are shipped. 
              We accept various payment methods as indicated on our website.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>5. Shipping and Delivery</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              We ship products throughout India and internationally. 
              Shipping costs and delivery times vary based on location. 
              We are not responsible for delays caused by shipping carriers.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>6. Returns and Cancellations</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              Please refer to our Cancellation Policy for detailed information about returns, 
              exchanges, and order cancellations.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>7. Intellectual Property</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              All content included on this site, such as text, graphics, logos, images, 
              and digital downloads, is the property of Mithila Art or its content suppliers 
              and is protected by international copyright laws.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>8. Limitation of Liability</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              In no event shall Mithila Art, its directors, employees, partners, agents, 
              suppliers, or affiliates be liable for any indirect, incidental, special, 
              or consequential damages arising out of or in connection with your use of this service.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>9. Changes to Terms</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              We reserve the right to modify these terms at any time. 
              Changes will be effective immediately upon posting on our website.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>10. Contact Information</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              If you have any questions about these Terms & Conditions, please contact us at:
              <br />Email: sdmithilaart@gmail.com
              <br />Phone: 8674913700
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

export default Terms
