import React, { useContext, useState, useEffect } from 'react';
import UserContext from './Usercontext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CheckLogin from './CheckLogin';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const userdata = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loggedin, setLoggedin] = useState(CheckLogin());
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCartData = async () => {
    if (!userdata?.user_id) {
      console.error("User data is missing or null");
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("user_id", userdata.user_id);

    try {
      const response = await axios.post('https://amazon.indianhackerslab.com/get-carts.php', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 'success') {
        setCartItems(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [userdata]);

  const navigate = useNavigate();
  const handlePlaceOrder = () => {
    navigate('/address');
  };

  // Function to remove cart item
  const Removecart = async (product) => {
    if (loggedin) {
      const data = new FormData();
      data.append("user_id", userdata.user_id);
      data.append("cart_id", product.cart_id);

      try {
        const response = await axios.post("https://amazon.indianhackerslab.com/delete-cart.php", data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.status === 'success') {
          fetchCartData();
          setToastMessage(`${product.name} removed from cart!`);
          setShowToast(true);

          // Auto hide the toast after 3 seconds
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      console.error("User not logged in");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return acc + price * quantity;
    }, 0);
  };
  

  const deliveryCharge = calculateTotal() > 5000 ? 0 : 100;
  const finalAmount = calculateTotal() + deliveryCharge;

  
  

  return (
    <div>
      <h2>Your Cart</h2>
      {loading ? (
        <p>Loading cart items...</p>
      ) : cartItems.length > 0 ? (
        <div className='d-flex flex-wrap container'>
          {cartItems.map((product) => (
            <div className='col-3 p-3 border ' key={product.cart_id}>
              <div className='innerbox p-3 shadow border'>
                <img src={product.images} className='w-100' alt={product.name}></img>
                <h6>{product.name}</h6>           
                <div className="d-flex justify-content-between">
                  <Link to={'/ProductDetails/' + product.product_id}>
                    <button className="custom-view-btn">View Details</button>
                  </Link>
                  <button className='custom-remove-btn' onClick={() => Removecart(product)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5>Your cart has no items</h5>
      )}

      {/* Place Order Section */}
      {cartItems.length > 0 && (
        <div className="bg-white p-4 rounded shadow my-4">
          <h2>Price Details</h2>
          <p>Item Total: ₹{calculateTotal()}</p>
          <p>Delivery Charge: ₹{deliveryCharge}</p>
          <hr />
          <p className="fw-bold">Total: ₹{finalAmount.toFixed(2)}</p>
          <Link to={'/address/'}>
        <button className="btn btn-success">place order</button>
      </Link>
        </div>
      )}

      <Link to={'/products/'}>
        <button className="btn btn-info">Go Back</button>
      </Link>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification my-toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default Cart;
