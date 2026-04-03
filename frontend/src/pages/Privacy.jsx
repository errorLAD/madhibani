import React from 'react'
import { useNavigate } from 'react-router-dom'

const Privacy = () => {
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
            Privacy Policy
          </h1>
          <div className='h-1 w-20 bg-black mx-auto'></div>
        </div>

        {/* Content */}
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='prose max-w-none'>
            <h2 className='text-2xl font-semibold mb-4'>1. Information We Collect</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              We collect information you provide directly to us, such as when you create an account, 
              make a purchase, or contact us. This may include your name, email address, 
              phone number, and payment information.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>2. How We Use Your Information</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              We use the information we collect to:
              <br />• Process and fulfill your orders
              <br />• Provide customer service and support
              <br />• Communicate with you about your orders
              <br />• Improve our website and products
              <br />• Send promotional emails (with your consent)
            </p>

            <h2 className='text-2xl font-semibold mb-4'>3. Information Sharing</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this Privacy Policy. 
              We may share your information with:
              <br />• Payment processors to process payments
              <br />• Shipping companies to deliver your orders
              <br />• Legal authorities when required by law
            </p>

            <h2 className='text-2xl font-semibold mb-4'>4. Data Security</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              We implement appropriate security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. 
              However, no method of transmission over the internet is 100% secure.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>5. Cookies and Tracking</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              We use cookies and similar tracking technologies to track activity on our website 
              and hold certain information. Cookies are files with small amount of data which may 
              include an anonymous unique identifier.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>6. Third-Party Services</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              Our website may contain links to third-party websites. We are not responsible for 
              the privacy practices of these third-party sites. We encourage you to review 
              the privacy policies of any third-party sites you visit.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>7. Children's Privacy</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              Our website is not intended for children under 13 years of age. 
              We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>8. Your Rights</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              You have the right to:
              <br />• Access your personal information
              <br />• Correct inaccurate information
              <br />• Delete your account and personal information
              <br />• Opt-out of marketing communications
            </p>

            <h2 className='text-2xl font-semibold mb-4'>9. Changes to This Policy</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              We may update our Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the 
              "Last Updated" date.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>10. Contact Information</h2>
            <p className='mb-6 text-gray-700 leading-relaxed'>
              If you have any questions about this Privacy Policy, please contact us at:
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

export default Privacy
