import React from "react";
import { useNavigate } from "react-router-dom"; 

const productCard = ({ product }) => {
    const navigate = useNavigate();  

    console.log(product);

    // Check if product and product.Images are defined and have length
    const randomImage = (product?.Images?.length > 0)
        ? product.Images[Math.floor(Math.random() * product.Images.length)]
        : product?.imageUrl; // Fallback to product.imageUrl if Images array is not available
    
    return (
        <div
          onClick={() => navigate(`ViewProduct/${product._id}`)} 
          className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-full h-full"
        >
          <div className="h-[15rem] w-full relative"> {/* Adjusted height */}
            {/* Image */}
            <img
              className="object-cover object-top w-full h-full"
              src={randomImage} // Use randomImage or fallback to product.imageUrl
              alt={product?.Brand}
              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }}
            />
            {/* Additional text and styles */}
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 w-full">
              <h4 className="text-lg font-medium">{product?.ProductName}</h4> 
              <p className="text-sm">{product?.Description}</p>
            </div>
          </div>
    
          {/* Brand details */}
          <div className="p-4 flex flex-col items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {product?.brand || product?.Brand}
            </h3>
            <p className="mt-2 text-sm text-gray-500">Price ₹: {product?.Price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the card click event
                navigate(`ViewProduct/${product._id}`);
              }}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              View Product
            </button>
          </div>
        </div>
    );
};

export default productCard;
 