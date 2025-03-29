import React from 'react';
import PLogo1 from '../images/PLogo1.jpeg';
import like from '../images/like.png';
import cart from '../images/cart.png';
import flag from '../images/flag.png';
import extra from '../images/extra.jpg';
import CheckLogin from '../pages/CheckLogin';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Usercontext from '../pages/Usercontext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const [loggedin, setLoggedin] = useState(CheckLogin());
  const userdata = useContext(Usercontext);

  return (
    <div className='Header'>

      <div className='primary-navbar'>
        <img src={PLogo1} height='80px' width='150px' alt='Logo' />
        <div >
          <Link to="/address" className="btn ">
          <p>Delivering to Bargarh 768111</p>
          <h5>Update Location</h5>
          </Link>
        </div>

        <div className='search-section'>
          <input type='text' placeholder='Search' />
        </div>

        <div className='imgtext'>
          <img src={flag} height='20px' alt='Flag' />
          <span>EN</span>
        </div>

        <div className='dropdown'>
          <button className='btn  dropdown-toggle' type='button' data-bs-toggle='dropdown'>
            {userdata ? `Hello, ${userdata.first_name}` : 'Hello, Sign in'} <br />
            <strong>Accounts & Lists</strong>
          </button>
          <ul className='dropdown-menu'>
            {userdata ? (
              <>
                <li><Link className='dropdown-item' to='/accounts'>Your Account</Link></li>
                <li><Link className='dropdown-item' to='/cart'>Your Cart</Link></li>
                <li><button className='dropdown-item' onClick={() => {
                  localStorage.removeItem('user_id');
                  window.location.reload();
                }}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link className='dropdown-item' to='/login'>Login</Link></li>
                <li><Link className='dropdown-item' to='/signup'>Signup</Link></li>
              </>
            )}
          </ul>
        </div>

        <div>
          <Link to='/orders' className='btn'>
            <p>Returns</p>
            <h6>& Orders</h6>
          </Link>
        </div>

        <div>
          <Link to='/wishlist' className='btn '>
            <img src={like} height='30px' alt='Cart' />
          </Link>
        </div>

        <div>
          <Link to='/cart' className='btn '>
            <img src={cart} height='50px' alt='Cart' />
          </Link>
        </div>

      </div>

      {/*<div className='secondary-navbar'>
        <div><p>All</p></div>
        <div><p>MX Player</p></div>
        <div><p>Sell</p></div>
        <div><p>Best Sellers</p></div>
        <div><p>Today's Deals</p></div>
        <div><p>Mobiles</p></div>
        <div><p>Prime</p></div>
        <div><p>Customer Services</p></div>
        <div><p>New Releases</p></div>

        <img src={extra} height='40px' alt='Extra' />
      </div>*/}

    </div>
  );
}

export default Header;
