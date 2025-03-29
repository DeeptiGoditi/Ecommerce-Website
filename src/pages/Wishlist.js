import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const [hovered, setHovered] = useState(null);

  return (
    <div className="container">
      <h2>My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>No products in your wishlist.</p>
      ) : (
        <div className="d-flex flex-wrap">
          {wishlist.map((prod, index) => (
            <div
              key={prod.product_id}
              className="col-3 p-3 border"
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{
                transition: 'box-shadow 0.3s ease-in-out',
                boxShadow: hovered === index
                  ? '0px 0px 20px #7327d7'
                  : '0 4px 15px hsla(313, 81.80%, 2.20%, 0.10)',
                cursor: 'pointer'
              }}
            >
              <img src={prod.images} className="w-100" alt={prod.name} />
              <h6>{prod.name}</h6>
              <p>Rs.{prod.price}</p>
              <Link to={`/ProductDetails/${prod.product_id}`}>
                <button className="btn btn-info">View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
      <Link to="/products">
        <button className="btn btn-secondary mt-3">Back to Products</button>
      </Link>
    </div>
  );
};

export default Wishlist;
