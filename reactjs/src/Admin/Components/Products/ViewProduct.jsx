import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Admin/Style.css';

const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/product/getProducts'; 
        axios.get(apiUrl)  
            .then(response => {
                const product = response.data.find(prod => prod._id === id);
                setProduct(product);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);
       console.log(product);
    return (
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-9 col-lg-9 col-md-10 col-11 text-center">
                    <div className="card">
                        <h2>View Product</h2>
                        <p>Product ID: {id}</p>

                        {product ? (
                            <div>
                              
                                <h2>{product.ProductName}</h2>
                                <p>Category: {product.Category}</p>
                                <p>Brand: {product.Brand}</p>
                                <p>Model: {product.Model}</p>
                                <p>Stock: {product.Stock}</p>
                                <p>Price: {product.Price}</p>
                                <p>Colour: {product.Colour}</p>
                                <p>Size: {product.Size}</p>
                                <p>Description: {product.Description}</p>
                                <div>
                                   {product.Images && product.Images.length > 0 ? (
                                      product.Images.map((image, index) => (
                                      <img key={index} src={image} alt={`Product ${index + 1}`} style={{ maxWidth: '100px', maxHeight: '100px', margin: '5px' }} />
                                      ))
                                     ) : (
                                     <p>No images available</p>
                                     )} 
                                </div>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}

                        <button onClick={() => navigate(-1)}>Go back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
 