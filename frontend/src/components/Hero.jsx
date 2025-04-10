import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-red-200'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141] text-green-800'></p>
                    <p className=' font-medium text-sm text-yellow-600 md:text-base'>HANDCRAFTED BY</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-red-800'>Anju Mishra</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm text-yellow-600 md:text-base'> STATE AWARD ARTIST</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
      </div>
      {/* Hero Right Side */}
      <img className='w-full sm:w-1/2' src="https://iili.io/3aP4ETN.md.png" alt="" />
    </div>
  )
}

export default Hero
