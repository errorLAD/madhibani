import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity, navigate, token, setCartItems } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [invalidItems, setInvalidItems] = useState([]);

  const proceedToCheckout = () => {
    console.log('Token check:', token); // Debug log
    
    if (!token || token === '') {
      setShowLoginModal(true);
      return;
    }
    
    // If logged in, proceed to checkout
    navigate('/place-order');
  }

  const redirectToLogin = () => {
    setShowLoginModal(false);
    // Save the current path so we can redirect back after login
    localStorage.setItem('redirectPath', '/cart');
    navigate('/login');
  }

  const clearInvalidItems = () => {
    const validCart = {};
    for (const items in cartItems) {
      const productData = products.find((product) => product._id === items);
      if (productData) {
        validCart[items] = cartItems[items];
      }
    }
    setCartItems(validCart);
    setInvalidItems([]);
    toast.success('Invalid items removed from cart');
  }

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      const hiddenItems = [];
      
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const productData = products.find((product) => product._id === items);
            
            if (productData) {
              tempData.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item]
              });
            } else {
              // Product not found, add to hidden items for debugging
              hiddenItems.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item]
              });
            }
          }
        }
      }
      
      // Set invalid items for display
      setInvalidItems(hiddenItems);
      
      // Log hidden items for debugging
      if (hiddenItems.length > 0) {
        console.log('Hidden cart items (products not found):', hiddenItems);
      }
      
      setCartData(tempData);
    }
  }, [cartItems, products])

  // Show loading state if products are not loaded yet
  if (products.length === 0) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='text-gray-500'>Loading cart...</div>
      </div>
    );
  }

  return (
    <>
    <div className='border-t pt-14'>

      <div className=' text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Warning for invalid items */}
      {invalidItems.length > 0 && (
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h4 className='text-yellow-800 font-medium'>⚠️ Invalid Items Detected</h4>
              <p className='text-yellow-600 text-sm mt-1'>
                {invalidItems.length} item(s) in your cart are no longer available. 
                Total hidden items: {invalidItems.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
            </div>
            <button 
              onClick={clearInvalidItems}
              className='bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm transition-colors'
            >
              Clear Invalid Items
            </button>
          </div>
        </div>
      )}

      <div>
        {
          cartData.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-500 text-lg'>Your cart is empty</div>
              <div className='text-gray-400 text-sm mt-2'>Add some items to your cart to see them here</div>
              <button 
                onClick={() => navigate('/collection')}
                className='mt-4 bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors'
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              // Skip if product data is not found
              if (!productData) {
                return null;
              }

              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                  <div className=' flex items-start gap-6'>
                    <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                    <div>
                      <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
                  <img onClick={() => updateQuantity(item._id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
                </div>
              )
            })
          )
        }
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className=' w-full text-end'>
            <button onClick={proceedToCheckout} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>

    {/* Custom Login Modal */}
    {showLoginModal && (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-lg p-8 max-w-md w-full mx-4 transform transition-all'>
          <div className='text-center'>
            <div className='mb-4'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg className='w-8 h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'></path>
                </svg>
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-2'>Login Required</h3>
              <p className='text-gray-600 mb-6'>Please login or sign up first to proceed to checkout</p>
            </div>
            
            <div className='flex gap-3 justify-center'>
              <button 
                onClick={() => setShowLoginModal(false)}
                className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button 
                onClick={redirectToLogin}
                className='px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors'
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default Cart
