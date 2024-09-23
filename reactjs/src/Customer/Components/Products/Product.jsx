import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import HomeProductCard from '../Home/HomeProductCard';
import './product.css'; 

const Product = () => { 
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10); // Adjust this value based on how many products you want per page
    
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get('http://localhost:5000/product/getProducts');
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchProducts();
    }, []); // Empty dependency array ensures this runs once on mount

    // Get current products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return ( 
      <> 
        <div>Product List</div>
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <HomeProductCard key={product._id} product={product}/> 
          ))}
        </div>
        <Pagination 
          productsPerPage={productsPerPage} 
          totalProducts={products.length} 
          paginate={paginate}
        />
      </>
    );
}

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="my-4">
            <ul className="flex justify-center">
                {pageNumbers.map(number => (
                    <li key={number} className="mx-1">
                        <button 
                          onClick={() => paginate(number)} 
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Product;
 