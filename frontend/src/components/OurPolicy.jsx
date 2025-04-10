import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='text-yellow-500  font-semibold'>Authentic Quality </p>
        <p className=' text-gray-400'>Every product is handcrafted with care, preserving <br></br>the rich tradition of Mithila art.</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='text-yellow-500 font-semibold'>Empowering Artisans</p>
        <p className=' text-gray-400'>Your purchase directly supports local artists and<br></br> keeps cultural heritage alive.</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className='text-yellow-500 font-semibold'>Best customer support</p>
        <p className=' text-gray-400'>we provide 24/7 customer support</p>
      </div>

    </div>
  )
}

export default OurPolicy
