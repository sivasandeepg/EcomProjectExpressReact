import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateProduct from './CreateProduct';

const Data = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productdetails/getcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <CreateProduct getCategories={categories} />
    </div>
  );
};

export default Data;
 