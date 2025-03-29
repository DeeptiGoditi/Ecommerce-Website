import axios from 'axios'
import { useParams } from 'react-router'
import React,{useContext, useEffect,useState} from 'react'
import UserContext from './Usercontext'
import { Link } from 'react-router'

const Accounts = () => {
      
    const userdata=useContext(UserContext)
    const accountOptions = [
      { title: "Your Orders", description: "Track, return, or buy things again", icon: "📦" },
      { title: "Login & Security", description: "Edit login, name, and mobile number", icon: "🔒" },
      { title: "Prime", description: "View benefits and payment settings", icon: "📦" },
      { title: "Your Addresses", description: "Edit addresses for orders and gifts", icon: "📍" },
      { title: "Your Business Account", description: "Sign up for GST invoice savings", icon: "🏢" },
      { title: "Payment Options", description: "Edit or add payment methods", icon: "💳" },
      { title: "Amazon Pay Balance", description: "Add money to your balance", icon: "💰" },
      { title: "Contact Us", description: "Customer service via phone or chat", icon: "📞" },
    ];
    const Logout=()=>{
      localStorage.setItem("user_id",null)
      window.location.replace("/")
    }
  
  return (
    <div>
      <>
      <Link to={'/Products/' }>
      <button className="btn btn-info">Products</button>
      </Link>
      {userdata?<><h2>Hello {userdata.first_name}</h2></>:<></>}
      
      </>
      
      <div className=" col-12 p-2">
      <div className="max-w-4xl  bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Your Account</h1>
        <div className="grid grid-cols-3 gap-2 d-flex flex-wrap p-4  ">
          {accountOptions.map((option, index) => (
            <div className='col-3 p-2 w-22  shadow border hover:bg-pink-200'>
            <div key={index} className="p-4  rounded-lg  bg-gray-50 hover:bg-blue-200 transition d-flex ">
              <div style={{ fontSize: "40px" }}>{option.icon}</div>
              <div>
              <h4 className="font-semibold">{option.title}</h4>
              <p className="text-sm text-black">{option.description}</p>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
      <div ><button className="btn bg-danger p-3 "onClick={()=>Logout()}>Logout</button></div>
    </div>
    </div>
    
  )
}

export default Accounts

/*import React, { useEffect, useState } from 'react';
//import axios from 'axios';

//const Accounts = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await axios.get(`https://amazon.indianhackerslab.com/insert-cart.php?user_id=${userId}`);
        const data = Array.isArray(response.data) ? response.data : [];
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const handleQuantityChange = (id, value) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + value) } : item
      )
    );
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`https://amazon.indianhackerslab.com/remove-cart-item.php?user_id=${localStorage.getItem('user_id')}&product_id=${id}`);
      setCartItems(cartItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const discount = calculateTotal() * 0.1;
  const deliveryCharge = calculateTotal() > 5000 ? 0 : 100;
  const finalAmount = calculateTotal() - discount + deliveryCharge;

  return (
    <div>
      <h2>Your Cart</h2>
      {loading ? (
        <p>Loading cart items...</p>
      ) : cartItems.length > 0 ? (
        <div className='d-flex flex-wrap container'>
          {cartItems.map((product) => (
            <div className='col-3 p-3 border '>
              <div className='innerbox p-3 shadow border'>
                <img src={product.images} className='w-100'></img>
                <h6>{product.name}</h6>           
                  <div className="d-flex justify-content-between">
                    <Link to={'/ProductDetails/' + product.product_id}>
                      <button className="btn btn-info">View Details</button>
                    </Link>
                      <button className='btn btn-danger' onClick={() => Removecart(product)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5>Your cart has no items</h5>
      )}

      <Link to={'/products/'}>
        <button className="btn btn-info">Go Back</button>
      </Link>

      

export default Accounts;*/
