import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src='https://iili.io/3aDrd9n.md.jpg' alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
        <Title  text2={'MADHIBANIHAAT.COM'} />
          <p className='  text-gray-600'>
          MadhubaniHaat.com is an exclusive online marketplace dedicated to promoting the rich heritage of Mithila (Madhubani) paintings. Rooted in the cultural heart of Bihar, this traditional art form is known for its intricate patterns, natural colors, and storytelling through symbolism.

Our mission is to preserve this age-old craft by connecting skilled rural artisans with art lovers around the world. Each artwork on our platform is 100% handcrafted using eco-friendly materials and traditional techniques passed down through generations.

We work closely with local artists—many of whom are women—empowering them with fair trade opportunities and recognition for their incredible talent. At MadhubaniHaat.com, we ensure every piece is authentic, original, and made with passion.

Whether you're decorating your home, gifting something unique, or simply celebrating Indian folk art, you’ll find timeless pieces that carry meaning and cultural depth. With quality assurance, easy exchange policies, and global shipping, we offer a seamless shopping experience.

When you buy from us, you’re not just owning a piece of art—you’re supporting a tradition, a community, and a story.

Experience the beauty of Mithila art with MadhubaniHaat.com — where heritage meets creativity.
          </p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact
