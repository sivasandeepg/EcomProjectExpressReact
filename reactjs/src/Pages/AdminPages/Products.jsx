//rafce 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Styles/Admin/Style.css';
// import CreateProduct from '../../Admin/Components/Products/CreateProduct';
import IndexProducts from '../../Admin/Components/Products/IndexProducts';
  
  
   
      
const Products = () => { 
    const [productsData, setproductsData] = useState([]); 
 
useEffect(() => {
    const apiUrl = 'http://localhost:5000/product/getProducts'; 
    axios.get(apiUrl)
      .then(response => {
        setproductsData(response.data); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
      
  return (
   <>   
   <IndexProducts productData={productsData}/>
   {/* <CreateProduct/> */}

   </>
  )
}
 
export default Products 