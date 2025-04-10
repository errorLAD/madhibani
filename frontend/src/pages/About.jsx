import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ANJU'} text2={'MISHRA'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[500px]' src="https://iili.io/3aDf3Xf.md.png" alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-yellow-700'>
          Anju Mishra is a celebrated Mithila painting artist, deeply rooted in the traditional art form she learned from her grandmother. With a diploma in Mithila painting, she has exhibited her work across India and internationally, sharing the vibrant spirit of Mithila with the world.
          Her dedication has earned her many prestigious awards, including:
         <span class="text-red-900"> <br>
         
         </br><h1>AWARD</h1><br/>

State Award – Bihar Government
<br/>
International Bestiez Award – Jaipur
<br/>
Bihar Shree Ratna Award – Patna
<br/>
Prerak Award – New Delhi
<br/>
Mithila Lok Kala Samman – Patna
</span>
Anju is also a passionate mentor and changemaker. She has trained over 500+ girls in rural areas, not only teaching them art but also helping them become self-reliant women entrepreneurs. Through her guidance, many have started their own small businesses, carrying forward the tradition and earning livelihoods with pride.

A proud mother of two, Anju continues to spread the beauty of Mithila painting while uplifting communities — one brushstroke at a time.
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
