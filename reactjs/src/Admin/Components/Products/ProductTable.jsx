//rafce 

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'; 


const ProductTable = ({ product, onEdit, onDelete, onView }) => {
  const [filteredProducts, setFilteredProducts] = useState(product);

  useEffect(() => {
    setFilteredProducts(product);
  }, [product]);

  // const handleFilter = (event) => {
  //   const filterProducts = product.filter((row) => {
  //    return row.ProductName.toLowerCase().includes(event.target.value.toLowerCase());
  //   });
  //   setFilteredProducts(filterProducts);
  // };  


  const handleFilter = (event) => {
    const targetValue = event.target.value;
    const filterProducts = product.filter((row) => {
      return row.ProductName.includes(targetValue);
    });
    setFilteredProducts(filterProducts);
  };
    

  const columns = [
    { 
      name: 'ProductName',
      selector: row => row.ProductName,
      sortable: true,
    },
    {
      name: 'Category',
      selector: row => row.Category,
      sortable: true,
    },
    {
      name: 'Brand',
      selector: row => row.Brand,
      sortable: true,
    },
    {
      name: "Images",
      cell: row => (
        <div>
          {row.Images.length > 0 ? (
            <img src={row.Images[0]} className="product-image" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
          ) : (
            <span>No images available</span>
          )}
        </div>
      ),
    }, 
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <button onClick={() => onView(row)}>View</button>
          <button onClick={() => onEdit(row)}>Edit</button>
          <button onClick={() => onDelete(row)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <div className="text-end">
        <input type="text" onChange={handleFilter} />
      </div>
      <DataTable
        columns={columns}
        data={filteredProducts}
        pagination
        fixedHeader
        highlightOnHover
      />
    </div>
  );
};

export default ProductTable;
 
 