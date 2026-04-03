import React, { useState, useEffect } from 'react'
import {assets} from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

const Edit = ({token}) => {

  const { productId } = useParams();
  const navigate = useNavigate();

  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("saree");
  const [subCategory, setSubCategory] = useState("Woman");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(backendUrl + `/api/product/single/${productId}`)
      if (response.data.success) {
        const product = response.data.product;
        setName(product.name || "");
        setDescription(product.description || "");
        setPrice(product.price || "");
        setCategory(product.category || "saree");
        setSubCategory(product.subCategory || "Woman");
        setBestseller(product.bestseller || false);
        setSizes(product.sizes || []);
        
        // Set existing images (we'll keep the URLs)
        if (product.image && product.image.length > 0) {
          setImage1(product.image[0] || null);
          setImage2(product.image[1] || null);
          setImage3(product.image[2] || null);
          setImage4(product.image[3] || null);
        }
      } else {
        toast.error(response.data.message);
        navigate('/list');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      navigate('/list');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData()

      formData.append("id", productId);
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      // Only append new images if they're files (not URLs) and not null
      if (image1 && typeof image1 !== 'string' && image1 !== null) formData.append("image1", image1)
      if (image2 && typeof image2 !== 'string' && image2 !== null) formData.append("image2", image2)
      if (image3 && typeof image3 !== 'string' && image3 !== null) formData.append("image3", image3)
      if (image4 && typeof image4 !== 'string' && image4 !== null) formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/update", formData, {headers: {token}})

      if (response.data.success) {
        toast.success(response.data.message)
        navigate('/list');
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  if (loading) {
    return <div className='flex justify-center items-center min-h-screen'>Loading...</div>
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2'>Upload Images (Click to change)</p>

          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={!image1 ? assets.upload_area : (typeof image1 === 'string' ? image1 : URL.createObjectURL(image1))} alt="" />
              <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
            </label>
            <label htmlFor="image2">
              <img className='w-20' src={!image2 ? assets.upload_area : (typeof image2 === 'string' ? image2 : URL.createObjectURL(image2))} alt="" />
              <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3 ? assets.upload_area : (typeof image3 === 'string' ? image3 : URL.createObjectURL(image3))} alt="" />
              <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
            </label>
            <label htmlFor="image4">
              <img className='w-20' src={!image4 ? assets.upload_area : (typeof image4 === 'string' ? image4 : URL.createObjectURL(image4))} alt="" />
              <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
            </label>
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required/>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required/>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

            <div>
              <p className='mb-2'>Product category</p>
              <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
                    
                <option value="Saree">Saree</option>
                <option value="Purses">Purses</option>
                 <option value="Kurta">Kurta</option>
                 <option value="Kurtiset">Kurti set</option>
                 <option value="Shortkurti">Short kurti </option>
                  <option value="Duptta">Duptta</option>
                    <option value="Bedsheet">Bedsheet</option>
                  <option value="WallHanging">Wall Hanging</option>
                  <option value="Chusioncover">Chusion Cover</option>
                 <option value="Ketli">Ketli</option>
                 <option value="Other">Other</option>           
              </select>
            </div>

            <div>
              <p className='mb-2'>Sub category</p>
              <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
                  <option value="Men">Men</option>
                  <option value="Woman">Woman</option>
                  <option value="kids">kids</option>
                  <option value="Homedecor">HomeDecor</option>
                  <option value="Other">other</option>
              </select>
            </div>

            <div>
              <p className='mb-2'>Product Price</p>
              <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
            </div>

        </div>

        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-3'>
            <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev,"S"])}>
              <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>S</p>
            </div>
            
            <div onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev,"M"])}>
              <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>M</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev,"L"])}>
              <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>L</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev,"XL"])}>
              <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XL</p>
            </div>

            <div onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL") : [...prev,"XXL"])}>
              <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200" } px-3 py-1 cursor-pointer`}>XXL</p>
            </div>
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <div className='flex gap-4'>
          <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>UPDATE</button>
          <button type="button" onClick={() => navigate('/list')} className='w-28 py-3 mt-4 bg-gray-500 text-white'>CANCEL</button>
        </div>

    </form>
  )
}

export default Edit
