import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Sitesettings from '../Pages/AdminPages/Sitesettings';
import Products from '../Pages/AdminPages/Products';
import Customers from '../Pages/AdminPages/Customers';
import Orders from '../Pages/AdminPages/Orders';
import Sidebar from '../Admin/Components/Sidebar/Sidebar';
import Dashboard from '../Pages/AdminPages/Dashboard';
import Head from '../Admin/Components/Head/Head';
import Footer from '../Admin/Components/Footer/Footer';
import ViewProduct from '../Admin/Components/Products/ViewProduct';
import CreateProduct from '../Admin/Components/Products/CreateProduct';
import UpdateProduct from '../Admin/Components/Products/UpdateProduct';
import CreateCategories from '../Admin/Components/Products/CreateCategories';
import CreateBrand from '../Admin/Components/Products/CreateBrand';
import CreateModel from '../Admin/Components/Products/CreateModel';
import CreateSize from '../Admin/Components/Products/CreateSize';
import RegistrationForm from '../Admin/Components/auth/RegistrationForm';
import LoginForm from '../Admin/Components/auth/LoginForm';
import WelcomePage from '../Admin/Components/auth/WelcomePage';
import ProtectedRoute from './ProtectedRoute';

const AdminRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken')); 
  const navigate = useNavigate();

  const handleSetToken = (token) => {
    localStorage.setItem('jwtToken', token);
    setToken(token);     
  };
  
  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setToken(null);
    navigate('/admin/login');
  };
  
  return (
    <>
      <Routes>
        {!token ? (
          <>
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm setToken={handleSetToken} />} />
            <Route path="*" element={<Navigate to="/admin/login" />} />
          </>
        ) : (
          <>
                
            <Route path="/" element={<ProtectedRoute element={Dashboard} token={token} />} />
            <Route path="/sitesettings" element={<ProtectedRoute element={Sitesettings} token={token} />} />
            <Route path="/customers" element={<ProtectedRoute element={Customers} token={token} />} />
            <Route path="/products" element={<ProtectedRoute element={Products} token={token} />} />
            <Route path="/products/ViewProduct/:id" element={<ProtectedRoute element={ViewProduct} token={token} />} />
            <Route path="/products/CreateProduct" element={<ProtectedRoute element={CreateProduct} token={token} />} />
            <Route path="/products/UpdateProduct/:id" element={<ProtectedRoute element={UpdateProduct} token={token} />} />
            <Route path="/products/CreateCategories" element={<ProtectedRoute element={CreateCategories} token={token} />} />
            <Route path="/products/CreateBrand" element={<ProtectedRoute element={CreateBrand} token={token} />} />
            <Route path="/products/CreateModel" element={<ProtectedRoute element={CreateModel} token={token} />} />
            <Route path="/products/CreateSize" element={<ProtectedRoute element={CreateSize} token={token} />} />
            <Route path="/orders" element={<ProtectedRoute element={Orders} token={token} />} />
            <Route path="/welcome" element={<ProtectedRoute element={WelcomePage} token={token} />} />
            <Route path="*" element={<Navigate to="/admin" />} /> 
          </>
        )}
      </Routes>

      {token && (
        <>
          <Head />
          <div className="wrapper d-flex flex-column min-vh-100">
            <Sidebar />
            <button onClick={handleLogout} className="logout-button">Logout</button>  
            {token}
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default AdminRoutes;
 
 
 
  





// export default AdminRoutes;
 

// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Sitesettings from "../Pages/AdminPages/Sitesettings";
// import Products from "../Pages/AdminPages/Products";
// import Customers from "../Pages/AdminPages/Customers";
// import Orders from "../Pages/AdminPages/Orders";
// import Signup from "../Pages/AdminPages/Signup";
// import Sidebar from "../Admin/Components/Sidebar/Sidebar";
// import Dashboard from "../Pages/AdminPages/Dashboard";
// import Head from "../Admin/Components/Head/Head";
// import Footer from "../Admin/Components/Footer/Footer";
// import ViewProduct from "../Admin/Components/Products/ViewProduct";
// import { useParams } from "react-router-dom"; 
// import CreateProduct from "../Admin/Components/Products/CreateProduct";
// import UpdateProduct from "../Admin/Components/Products/UpdateProduct";
// import CreateCategories from "../Admin/Components/Products/CreateCategories";
// import CreateBrand from "../Admin/Components/Products/CreateBrand";
// import CreateModel from "../Admin/Components/Products/CreateModel";
// import CreateSize from "../Admin/Components/Products/CreateSize";
// const AdminRoutes = () => { 
//   const { id } = useParams();
//   return (
//   <div> 
//   <Sidebar/>  
//   <div className="wrapper d-flex flex-column min-vh-100">
//     <Head/>
//    <Routes>  
//      <Route path="/" element={<Dashboard/>}></Route>
//      <Route path="/Sitesettings" element={<Sitesettings/>}></Route>
//      <Route path="/Customers" element={<Customers/>}></Route>
//      <Route path="/Products" element={<Products/>}></Route> 
//        <Route path="/Products/ViewProduct/:id" element={<ViewProduct />} /> 
//        <Route path="/Products/CreateProduct" element={<CreateProduct />} /> 
//        <Route path="/Products/UpdateProduct/:id" element={<UpdateProduct />} />
//        <Route path="/Products/CreateCategories" element={<CreateCategories/>} /> 
//        <Route path="/Products/CreateBrand" element={<CreateBrand/>} /> 
//        <Route path="/Products/CreateModel" element={<CreateModel/>} /> 
//        <Route path="/Products/CreateSize" element={ <CreateSize/>} /> 
//      <Route path="/Orders" element={<Orders/>}></Route>
//      <Route path="/Signup" element={<Signup/>}></Route>
//    </Routes> 
//   <Footer/> 
//   </div> 
//  </div> 
//   );
// };
// export default AdminRoutes;
