import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const response = await axios.get(`https://amazon.indianhackerslab.com/get-user-address.php?user_id=${userId}`);
      if (response.data && response.data.status === 'success') {
        const validAddresses = response.data.data.filter(address => address.id === userId.toString() && address.fullname && address.pincode);
        if (validAddresses.length > 0) {
          setAddresses(validAddresses);
          setSelectedAddress(validAddresses[0]);
        } else {
          setAddresses([]);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleContinueToPayment = () => {
    if (selectedAddress) {
      navigate('/payment', { state: { address: selectedAddress } });
    } else {
      alert('Please select an address to continue.');
    }
  };

  return (
    <div className="address-container">
      <h1>Select an Address</h1>
      {addresses.length > 0 ? (
        <div className="address-list">
          {addresses.map((address, index) => (
            <div
              key={index}
              className={`address-item ${selectedAddress === address ? 'selected' : ''}`}
              onClick={() => setSelectedAddress(address)}
            >
              <p>{address.fullname}, {address.area}, {address.city}, {address.state}, {address.pincode}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No addresses found. Please add an address through your account settings.</p>
      )}

      <button className="continue-btn" onClick={handleContinueToPayment}>Continue to Payment</button>
    </div>
  );
};

export default AddressPage;
