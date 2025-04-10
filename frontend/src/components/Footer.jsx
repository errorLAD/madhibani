import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src="https://iili.io/3aQaLQI.md.png" className='mb-8 w-40' alt="" />
            <p className='w-full md:w-2/3 text-red-900'>
            We are an online marketplace dedicated to showcasing the timeless beauty of Mithila paintings. Each artwork is handcrafted by skilled artisans, reflecting Bihar’s rich cultural heritage. Our mission is to promote traditional art, support local artists, and bring authentic Mithila masterpieces to art lovers worldwide.
            </p>
        </div>

        <div>
            <p className='text-center text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-red-900'>
                
                <li> <NavLink to='/contact' className='flex flex-col items-center gap-1 text-yellow-800'>
                 About us</NavLink></li>
                 <li> <NavLink to='/contact' className='flex flex-col items-center gap-1 text-yellow-800'>
                 Privacy policy</NavLink></li>
               
            </ul>
        </div>

        <div>
            <p className='text-xl  font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-red-900'>
                <li>8674913700</li>
                <li>sdmithilaart@gmail.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
