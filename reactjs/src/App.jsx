import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRoutes from "./Routers/CustomerRoutes";
import AdminRoutes from "./Routers/AdminRoutes";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from "./Routers/ProtectedRoute";

const App = () => (
  
    <div className="">
      <Routes>
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </div>
 
);

export default App;

 