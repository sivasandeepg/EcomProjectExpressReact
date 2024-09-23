import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const apiUrl = 'http://localhost:5000/product/getProducts';
        axios.get(apiUrl)
            .then(response => {
                const foundProduct = response.data.find(prod => prod._id === id);
                setProduct(foundProduct);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                navigate('/notfound');
            });
    }, [id, navigate]);

    
    // const handleAddToCart = () => {
    //     console.log('Added to cart:', { product, quantity });
    //     alert(`${product.ProductName} added to cart with quantity ${quantity}`);
    // }; 

    const handleAddToCart = () => {
        axios.post('http://localhost:5000/cart/add', {
            productId: product._id,
            quantity: quantity
        })
        .then(response => {
            console.log(response.data);
            alert(`${product.ProductName} added to cart with quantity ${quantity}`);
        })
        .catch(error => {
            console.error('Error adding to cart:', error);
            alert('Error adding to cart: ' + error.response.data.message);
        });
    };
    


    const increaseQuantity = () => {
        if (quantity < product.Stock) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">{product.ProductName}</h1>
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <img
                        className="object-cover object-top w-full h-full mb-4"
                        src={product.Images[0] || product.imageUrl}
                        alt={product.Brand}
                        style={{ maxHeight: "300px", maxWidth: "300px", objectFit: "cover" }}
                    />
                    <h2 className="text-xl font-medium">{product.Brand}</h2>
                    <p className="mt-2 text-sm text-gray-500">{product.Description}</p>
                    <p className="mt-2 text-lg font-bold text-gray-900">Price ₹: {product.Price}</p>
                    <p className="mt-2 text-lg font-bold text-gray-900">Stock: {product.Stock}</p>

                    {product.Stock > 0 ? (
                        <>
                            <div className="flex items-center mt-4">
                                <button onClick={decreaseQuantity} className="px-3 py-1 bg-red-500 text-white rounded">-</button>
                                <span className="mx-2 text-lg">{quantity}</span>
                                <button 
                                    onClick={increaseQuantity} 
                                    className={`px-3 py-1 bg-green-500 text-white rounded ${quantity >= product.Stock && 'opacity-50 cursor-not-allowed'}`}
                                    disabled={quantity >= product.Stock}
                                >
                                    +
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                            >
                                Add to Cart
                            </button>
                        </>
                    ) : (
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded cursor-not-allowed"
                            disabled
                        >
                            Out of Stock
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
  