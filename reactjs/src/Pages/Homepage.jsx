//rafce 
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';  
 
import HomeCarousel from '../Customer/Components/Carousel/HomeCarousel';
import { homeCarouselData } from '../Customer/Components/Carousel/HomeCaroselData';
import HomeProductSection from '../Customer/Components/Home/HomeProductSection';
// import { mens_kurta } from '../Data/Men/men_kurta';

   
  
const Homepage = () => { 
 const [productsData, setproductsData] = useState([]);
 

//  useEffect(() => {
//   // Fetch data from the API endpoint
//   fetch('http://localhost:5000/product/getProducts')
//     .then(response => response.json())
//     .then(data => {
//       // Update state with fetched data
//       setproductsData(data);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }, []);
 

useEffect(() => {
  // Replace with your API endpoint
  const apiUrl = 'http://localhost:5000/product/getProducts';
  axios.get(apiUrl)
    .then(response => {
      setproductsData(response.data); // Set the fetched data to state
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []); // Empty dependency array ensures this runs once on mount
  
 
  return ( 
  
    <div className="">
    <HomeCarousel images={homeCarouselData} />

    <div className="space-y-10 py-20">
    <HomeProductSection data={productsData} section={"Men's Kurta"} /> 
      {/* <HomeProductSection data={mensShoesPage1} section={"Men's Shoes"} />
      <HomeProductSection data={sareePage1} section={"Saree"} />
      <HomeProductSection data={dressPage1} section={"Dress"} />
      <HomeProductSection data={gounsPage1} section={"Women's Gouns"} />
      <HomeProductSection data={kurtaPage1} section={"Women's Kurtas"} /> */}
    </div>

      
  </div>


  )
}

export default Homepage