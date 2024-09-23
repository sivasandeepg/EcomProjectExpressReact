// //rafce 
import React from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Generate a random index to select a random image from the array
  const randomIndex = Math.floor(Math.random() * product.Images.length);
  const randomImage = product.Images[randomIndex];

  return (
    <div
      onClick={() => navigate(`/Products/ViewProduct/${product._id}`)}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 relative"
    >
      <div className="h-[15rem] w-[10rem] relative"> {/* Adjusted height */}
        {/* Image */}
        <img
          className="object-cover object-top w-full h-full"
          src={randomImage || product.imageUrl} // Use randomImage or fallback to product.imageUrl
          alt={product?.Brand}
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }}
        />
        {/* Additional text and styles */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
          <h4 className="text-lg font-medium">{product?.ProductName}</h4> 
          <p className="text-sm">{product?.Description}</p>
        </div>
      </div>

      {/* Brand details */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">
          {product?.brand || product?.Brand}
        </h3>
        <p className="mt-2 text-sm text-gray-500">Price ₹:  {product?.Price}</p>
      </div>
    </div>
  );
};

export default HomeProductCard;
     