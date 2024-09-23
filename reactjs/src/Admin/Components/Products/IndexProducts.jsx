//rafce 
import React, { useState, useRef, useEffect } from 'react';
import ProductTable from './ProductTable';
import axios from 'axios'; 
import '../../../Styles/Admin/Style.css';
import CreateProduct from './CreateProduct';
import { useNavigate } from "react-router-dom";
 
 
const IndexProducts = () => {

  const navigate = useNavigate(); 
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/product/getProducts'); 
        setProductsData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  const addProduct = () => {
    navigate(`CreateProduct`); 
  };
   
  const editProduct = (product) => {
    navigate(`UpdateProduct/${product._id}`);
  };

  const deleteProduct = async (product) => {
    try {
        await axios.delete(`http://localhost:5000/product/deleteproducts/${product._id}`); 
        console.log('Product deleted successfully:', product._id);
        IndexProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

 
  const viewProduct = (product) => {
    // Logic for viewing product  
    navigate(`ViewProduct/${product._id}`);
    console.log('View product:', product);
  }; 

  return ( 
    <div className="container-fluid px-1 py-5 mx-auto">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-9 col-lg-9 col-md-10 col-11 text-center">
            <div className="card">
              <h4>Products</h4>
              <div className='text-start'>
                <input type='button' value='Add Product' onClick={addProduct} />
              </div>
              {/* <ProductTable product={productData} /> */}
              <ProductTable 
                product={productsData}  
                onEdit={editProduct} 
                onDelete={deleteProduct}   
                onView={viewProduct}  
              />
            </div>
          </div>
        </div> 
    </div>
  );
};

export default IndexProducts;
 




