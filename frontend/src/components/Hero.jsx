import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  const phoneNumber = "917004197301"; // Your number with country code
  const message = encodeURIComponent("Hello! I'm interested in your Madhubani paintings.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  return (
    <div className='flex flex-col sm:flex-row border border-red-200'>
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141] text-green-800'></p>
                    <p className=' font-medium text-sm text-yellow-600 md:text-base'>HANDPAINTED BY</p>
                </div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-red-800'>Anju Mishra</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm text-yellow-600 md:text-base'> STATE AWARD ARTIST</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
                              <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm text-yellow-600 md:text-base'> DIPLOMA IN MADHBANI PAINTING</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>

            </div>
      </div>
      {/* Hero Right Side   https://iili.io/3aP4ETN.md.png */}
      <img className='w-full sm:w-1/2' src="https://i.ibb.co/S7fFS6gw/cold-smooth-tasty-1.png" alt="" />
      <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',      // This keeps it visible while scrolling
        bottom: '20px',        // Distance from bottom
        left: '20px',          // Moves it to the left side
        backgroundColor: '#25D366',
        color: '#FFF',
        borderRadius: '50px',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 9999,          // High number to stay on top of other elements
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px'
      }}
    >
      {/* Simple SVG WhatsApp Icon if you don't want to import a library */}
      <svg 
        viewBox="0 0 24 24" 
        width="24" 
        height="24" 
        stroke="currentColor" 
        strokeWidth="2" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        style={{ marginRight: '8px' }}
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
      Chat with us
    </a>
    </div>
  )
}

export default Hero
