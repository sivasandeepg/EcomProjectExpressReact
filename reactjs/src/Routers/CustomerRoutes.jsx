import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from '../Customer/Components/Navbar/Navbar';
import Homepage from "../Pages/Homepage";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import ViewProduct from '../Customer/Components/Products/ViewProduct';
import Product from '../Customer/Components/Products/Product';
import Cart from '../Pages/Cart';
import Test from '../Pages/Test';
import Checkout from '../Pages/Checkout';
import Success from '../Pages/Success';
import Cancel from '../Pages/Cancel';
import Orders from '../Pages/Orders';
import Login from '../Pages/Login';


 

const CustomerRoutes = () => {
    const location = useLocation();
    const showNavigation = location.pathname !== "/notfound";
     
    return (
        <div>
            {showNavigation && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login />} />   
                <Route path="/register" element={<Homepage />} />
                <Route path="/" element={<Homepage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Product />} />
                <Route path="Products/ViewProduct/:id" element={<ViewProduct />} />
                <Route path="/Cart" element={<Cart />} /> 
                <Route path="/Checkout" element={<Checkout />} />  
                <Route path="/Success" element={<Success />} />    
                <Route path="/Cancel" element={<Cancel />} />   
                <Route path="/Orders" element={<Orders />} />    
                <Route path="/Test" element={<Test />} /> 
            </Routes>
        </div>
    );
}

export default CustomerRoutes;
 