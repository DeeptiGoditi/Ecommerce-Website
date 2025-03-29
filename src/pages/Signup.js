import axios from 'axios';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function Signup() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [displaymodal, setDisplaymodal] = useState(false);
  const [errormodal, setErrormodal] = useState(false);
  const [loading, setLoading] = useState(false);

  const SignupUser = async () => {
    if (!first_name || !last_name || !phonenumber || !email || !password) {
      setErrormodal(true);
      return;
    }
    setLoading(true);
    setDisplaymodal(false);
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("first_name", first_name);
    data.append("last_name", last_name);
    data.append("phone_number", phonenumber);

    try {
      const response = await axios.post('https://amazon.indianhackerslab.com/signup.php', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 'success') {
        setDisplaymodal(true);
      } else {
        setErrormodal(true);
      }
    } catch (error) {
      console.error("Signup Error:", error.message);
      setErrormodal(true);
    } finally {
      setLoading(false);
    }
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="signup-container">
      <Modal open={displaymodal} onClose={() => setDisplaymodal(false)}>
        <Box sx={style} className="success-modal">
          <h2>Success</h2>
          <p>Your account has been created</p>
          <button onClick={() => setDisplaymodal(false)} className='btn btn-success'>Close</button>
        </Box>
      </Modal>
      <Modal open={errormodal} onClose={() => setErrormodal(false)}>
        <Box sx={style} className="error-modal">
          <h2>Error</h2>
          <p>Your account has not been created</p>
          <button onClick={() => setErrormodal(false)} className='btn btn-danger'>Close</button>
        </Box>
      </Modal>

      <h2 className="text-center color-dark my-4">Sign Up</h2>

      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input type="text" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input type="text" className="form-control" value={last_name} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input type="number" className="form-control" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div className="d-flex justify-content-center">
        <button onClick={SignupUser} type="button" className="btn btn-dark" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  );
}

export default Signup;
