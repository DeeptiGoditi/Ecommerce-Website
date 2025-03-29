import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import CheckLogin from './CheckLogin';
import { Toast, Modal } from 'react-bootstrap';
import Usercontext from './Usercontext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import 'D:/react/react-project/src/index.css'; // Import the CSS here

const Productss = () => {
    const [products, changeProducts] = useState(null);
    const [loading, changeLoading] = useState(true);
    const [toast, setToast] = useState(false);
    const [modal, setModal] = useState(false);
    const userdata = useContext(Usercontext);
    const [wishlist, setWishlist] = useState([]);


    const FetchData = async () => {
        try {
            const data = new FormData();
            const response = await axios.post("https://amazon.indianhackerslab.com/get-products.php", data, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (response) {
                console.log(response.data);
                changeProducts(response.data.products);
                changeLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        FetchData();
    }, []);

    const toggleWishlist = (prod) => {
        let currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      
        if (currentWishlist.some((item) => item.product_id === prod.product_id)) {
          currentWishlist = currentWishlist.filter((item) => item.product_id !== prod.product_id);
          console.log("Removed from Wishlist");
        } else {
          currentWishlist.push(prod);
          console.log("Added to Wishlist");
        }
      
        localStorage.setItem('wishlist', JSON.stringify(currentWishlist));
        setWishlist(currentWishlist.map((item) => item.product_id)); // Ensure UI updates
      };
      
      

      
    const Addcart = async (prod) => {
        if (CheckLogin()) {
            const user_id = localStorage.getItem("user_id");

            if (!user_id || user_id === 'null' || user_id.trim() === '') {
                console.log("User is not logged in.");
                setModal(true);
                return;
            }

            const data = new FormData();
            data.append("user_id", user_id);
            data.append("product_id", prod.product_id);

            try {
                const response = await axios.post(
                    "https://amazon.indianhackerslab.com/insert-cart.php",
                    data,
                    { headers: { 'Content-Type': 'multipart/form-data' } }
                );

                console.log("Response from server:", response.data);

                if (response?.data?.success === "success") {
                    console.log("Product added to cart successfully!");
                    setToast(true);
                } else {
                    console.error("Server Error:", response?.data?.message);
                }
            } catch (error) {
                console.error("Error adding product to cart:", error.message);
            }
        } else {
            setModal(true);
        }
    };

    return (
        <>
            {/* Toast Notification */}
            <Toast className='bg-warning text-dark position-fixed top-0 end-0 m-3' onClose={() => setToast(false)} show={toast} delay={3000} autohide>
                <Toast.Header className='bg-warning'>
                    <strong className="me-auto">Added to Cart</strong>
                </Toast.Header>
                <Toast.Body>Your item was successfully added to the cart!</Toast.Body>
            </Toast>

            {/* Login Modal */}
            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>You need to login to proceed!</Modal.Body>
            </Modal>

            

            {/* Products Section */}
            <div className='d-flex flex-wrap container'>
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className='col-3 p-3 shadow border'>
                            <Skeleton variant="rectangular" width={300} height={300} />
                        </div>
                    ))
                ) : (
                    products ? products.map((prod) => (
                        <div key={prod.product_id} className='col-3 p-3 border'>
                            <div className='innerbox p-3 shadow border'>
                            <FavoriteIcon onClick={() => toggleWishlist(prod)} className='cursor-pointer'
                                style={{ color: wishlist.includes(prod.product_id) ? 'red' : 'gray' }}   />
                                <img src={prod.images} className='w-100' alt={prod.name} />
                                <h6>{prod.name}</h6>
                                <Rating name="half-rating" readOnly defaultValue={prod.rating} precision={0.5} />
                                <h6>Rs. {prod.price}</h6>
                                <p>MRP: <del>{prod.cutoff_price}</del> ({prod.discount}% off)</p>
                                <div className="d-flex justify-content-between">
                                <Link to={`/ProductDetails/${prod.product_id}`}>
  <button className="custom-view-btn">View Details</button>
</Link>
<button onClick={() => Addcart(prod)} className="custom-add-btn">Add to Cart</button>

                                </div>
                            </div>
                        </div>
                    )) : <p>No products available</p>
                )}
            </div>

            {/* Go to Cart Button */}
            <div className='mt-3'>
                <Link to='/cart'>
                    <button className="btn btn-primary">Go to Cart</button>
                </Link>
                <Link to="/wishlist">
                    <button className="custom-wish-btn">Go to Wishlist</button>
                </Link>
            </div>
            
            

        </>
    );
};

export default Productss;
