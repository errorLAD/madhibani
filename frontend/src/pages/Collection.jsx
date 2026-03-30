import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  
  // CHANGED: category is now a string, not an array
  const [category, setCategory] = useState(''); 
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent')

  // UPDATED: Logic to handle single selection
  const toggleCategory = (e) => {
    const val = e.target.value;
    // If user clicks the already selected category, unselect it. Otherwise, set new category.
    setCategory(prev => prev === val ? '' : val);
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    // UPDATED: Simple string comparison instead of .includes()
    if (category !== '') {
      productsCopy = productsCopy.filter(item => item.category === category);
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            
            {/* Added checked attribute to all inputs below */}
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'saree'} onChange={toggleCategory} checked={category === 'saree'}/> saree 
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Duptta'} onChange={toggleCategory} checked={category === 'Duptta'}/> Duptta 
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Purses'} onChange={toggleCategory} checked={category === 'Purses'}/> Purses 
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kurta'} onChange={toggleCategory} checked={category === 'Kurta'}/> Kurta
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kurtiset'} onChange={toggleCategory} checked={category === 'Kurtiset'}/> Kurti Set
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Shortkurti'} onChange={toggleCategory} checked={category === 'Shortkurti'}/> Short kurti 
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'WallHanging'} onChange={toggleCategory} checked={category === 'WallHanging'}/> Wall Hanging
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Chusioncover'} onChange={toggleCategory} checked={category === 'Chusioncover'}/> Chusion Cover
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Ketli'} onChange={toggleCategory} checked={category === 'Ketli'}/> ketli
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bedsheet'} onChange={toggleCategory} checked={category === 'Bedsheet'}/> Bedsheet
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Other'} onChange={toggleCategory} checked={category === 'Other'}/> Other
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Man'} onChange={toggleSubCategory} /> Man
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Woman'} onChange={toggleSubCategory} /> Woman
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kid'} onChange={toggleSubCategory} /> Kid
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Homedecor'} onChange={toggleSubCategory} /> Home Decor
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Other'} onChange={toggleSubCategory} /> other 
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Collection
