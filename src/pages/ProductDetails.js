/*import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { product_id } = useParams();
  const [details, setDetails] = useState(null);

  const fetchData = async () => {
    const data = new FormData();
    data.append("product_id", product_id);

    try {
      const response = await axios.post("https://amazon.indianhackerslab.com/get-product-details.php", data, {
        headers: { 'content-type': 'multipart/form-data' }
      });

      if (response.data?.product_data) {
        setDetails(response.data.product_data);
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [product_id]);

  return (
    <div>
      {details ? (
        <div className='d-flex flex-wrap p-4 container'>
          <div className='col-5'>
            <img className='w-100' src={details.images} alt={details.name} />
          </div>
          <div className='col-7'>
            <h2>{details.name}</h2>
            <Rating 
              name="half-rating" 
              readOnly 
              value={parseFloat(details.rating) || 0} 
              precision={0.5} 
            />
            <h6>Rs. {details.price}</h6>
            <p>MRP: <del>{details.cutoff_price}</del></p>
            <h6>({details.discount}% off)</h6>
            <Link to='/BuyProduct/'>
              <button className="btn btn-info">Buy Product</button>
            </Link>
          </div>
        </div>
      ) : (
        <h5 className="text-center mt-5">Product details not available</h5>
      )}
    </div>
  );
};

export default ProductDetails;
*/

import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';

const ProductDetails = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  const FetchData = async () => {
    const data = new FormData();
    data.append('product_id', product_id);

    try {
      const response = await axios.post('https://amazon.indianhackerslab.com/get-product-details.php', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data) {
        setDetails(response.data.product_data);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    FetchData();
  }, [product_id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '100vh',
                   backgroundColor: '#f8f9fa', 
                   padding: '20px' 
                }}>
    <div style={{ background: 'white', 
                    borderRadius: '12px',
                    padding: '50px', 
                    boxShadow: '0 4px 15px hsl(276, 85.10%, 44.70%)', 
                    maxWidth: '900px', 
                    width: '100%', 
                    textAlign: 'center' ,
                    transition: "box-shadow 0.3s ease-in-out",
                    cursor: "pointer",
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0px 0px 20px hsl(282, 75.90%, 45.50%) "}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.46)"}
            >
        <img src={details.images} alt={details.name} style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', borderRadius: '8px', marginBottom: '20px' }} />
        <h3 style={{ color: '#333', marginBottom: '15px' }}>{details.name}</h3>

        <h4>Price: ₹{details.price} <del style={{ color: 'grey' }}>₹{details.cutoff_price}</del> ({details.discount}% off)</h4>
        <Rating name="half-rating" readOnly defaultValue={details.rating} precision={0.5} />
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', marginBottom: '15px' }}>{details.description}</p>

        <button 
          onClick={() => navigate(`/BuyProduct/${product_id}`)} 
          style={{ background: '#28a745', color: 'white', padding: '14px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem', marginRight: '10px' }}
        >
          Buy 
        </button>

        <button 
          onClick={() => navigate(-1)} 
          style={{ background: '#007bff', color: 'white', padding: '14px 24px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
