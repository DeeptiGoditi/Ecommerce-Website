/*import React, { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

//import Usercontext from "./Usercontext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [displayModal, setDisplayModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    //const userdata=useContext(Usercontext)

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

    const handleLogin = async () => {
        if (!email || !password) {
            setMessage("Error: Email and password were not sent!");
            setErrorModal(true);
            return;
        }
        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        const response = await axios.post("https://amazon.indianhackerslab.com/login-user.php", data, { headers: { "Content-Type": "multipart/form-data" } });
        if (response) {
            if (response.data.status === "success") {
                setMessage("Login successful!");
                setDisplayModal(true);
            } else {
                setMessage(response.data.msg || "Login failed. Please try again.");
                setErrorModal(true);
            }
            window.location.replace("/accounts")
        }
    };

    return (
        <div style={{ margin: "0 auto", maxWidth: "400px", padding: "1rem" }}>
            <h2>Login</h2>
            <div style={{ marginBottom: "1rem" }}>
                <label>Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
                </label>
            </div>
            <div style={{ marginBottom: "1rem" }}>
                <label>Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                </label>
            </div>
            <button onClick={handleLogin} 
            style={{
                    padding: "10px",
                    background: "#f0c14b",
                    border: "none",
                    borderRadius: "4px",
                }}>Login
            </button>
            {message && <p>{message}</p>}

            <Modal open={displayModal}>
                <Box sx={style}>
                    <h2>Success</h2>
                    <p>{message}</p>
                    <button onClick={() => setDisplayModal(false)} style={{ padding: "10px", background: "#0f0", border: "none", borderRadius: "4px" }}>Close</button>
                </Box>
            </Modal>
            <Modal open={errorModal}>
                <Box sx={style}>
                    <h2>Invalid credentials</h2>
                    <p>{message}</p>
                    <button onClick={() => setErrorModal(false)} style={{ padding: "10px", background: "#f00", color: "#fff", border: "none", borderRadius: "4px" }}>Close</button>
                </Box>
            </Modal>
        </div>
    );
};

export default Login;*/


import axios from 'axios'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React,{useEffect,useState} from 'react'
const Login = () => {
  const[email,setEmail]=useState(null)
  const[password,setPassword]=useState(null)
  const[errormodal,setErrormodal]=useState(false)
  const[displaymodal,setDisplaymodal]=useState(false)
  const[loading,setLoading]=useState(false)
  const LoginUser=async()=>
  {
        setLoading(true)
        const data=new FormData()
        data.append("email",email)
        data.append("password",password)
        const response=await axios.post('https://amazon.indianhackerslab.com/login-user.php',data,{headers:{'Content-Type':'multipart/form-data'}})
        if(response){
          console.log(response.data)
        if(response.data.status==='success')
        {
            console.log(response.data.data.user_id)
            localStorage.setItem("user_id",response.data.data.user_id)
            window.location.replace("/Accounts")
        }
      }
    }
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
    <div >
      <Modal open={displaymodal} onClose={()=>{setDisplaymodal(false)}}>
        <Box sx={style}>
        <h2>Login Sucessful</h2>
        <button onClick={()=>{setDisplaymodal(false)}} className='btn btn-danger'>close</button>
        </Box>
      </Modal>
      <Modal open={errormodal} onClose={()=>{setErrormodal(false)}}>
        <Box sx={style}>
          <h2>Something Went Wrong</h2>
          <button className='bg-danger'onClick={()=>{setErrormodal(false)}}>close</button>
        </Box>
      </Modal>
       <main class="form-signin  m-auto col-2">
        <div className="login-container ">
        <h1 class="h3 mb-3 fw-normal"><strong>Please Login</strong></h1>

        <div class="form-floating">
        <input onChange={(event)=>{setEmail(event.target.value)}}type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input onChange={(event)=>{setPassword(event.target.value)}}type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
            <label for="floatingPassword">Password</label>
                  </div>

            <div class="form-check text-start my-3">
            <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"></input>
            <label class="form-check-label" for="flexCheckDefault">
                Remember me</label>
        </div>
<button onClick={()=>{  LoginUser() }} class="btn btn-dark w-100 py-2" type="submit">Login in</button>
<p class="mt-5 mb-3 text-body-secondary">© 2017–2024</p>

        </div>
    
</main>
    </div>
  )
}

export default Login;