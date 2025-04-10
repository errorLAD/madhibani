import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-2xl'>
       
          <Title className="text-red-800"text1={'  LATEST'} text2={'MITHILA PAINTING COLLECTIONS  '} />
      
          <p className='w-3/4 m-auto text-xxs sm:text-sm md:text-base text-red-800'>
           <span class="max-sm:hidden"> Discover the charm of tradition with our newest collection of Mithila paintings</span>
          </p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection
