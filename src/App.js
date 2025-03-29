import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Productss from "./pages/Productss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Routes,BrowserRouter,Route} from "react-router";
import ProductDetails from "./pages/ProductDetails";
import Accounts from "./pages/Accounts";
import UserContext from "./pages/Usercontext";
import Cart from "./pages/Cart";
import BuyProduct from "./pages/BuyProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import Wishlist from "./pages/Wishlist";
import AddressPage from "./pages/AddressPage";

function App() {
      const[userdata,setUserdata]=useState(null)
      const user_id=localStorage.getItem("user_id")
      

      const FetchData = async () => {
        try {
          const data = new FormData();
          data.append("user_id", user_id);
          const response = await axios.post('https://amazon.indianhackerslab.com/get-account.php', data, { 
            headers: { 'Content-Type': 'multipart/form-data' }
          });
      
          if (response.data.status === 'success') {
            setUserdata(response.data.data[0]);
          } else {
            console.error("Failed to fetch user data:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
      
      
  useEffect(()=>{FetchData()},[user_id])
  return (
    <div className="App">
      <UserContext.Provider value={userdata}>
      <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/products" element={<Productss></Productss>}></Route>
        <Route path="/productDetails/:product_id" element={<ProductDetails></ProductDetails>}></Route>
        <Route path="/accounts" element={<Accounts></Accounts>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/BuyProduct" element={<BuyProduct></BuyProduct>}></Route>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/Address" element={<AddressPage></AddressPage>}></Route>
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;