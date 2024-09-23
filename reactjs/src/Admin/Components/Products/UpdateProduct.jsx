import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import Select from 'react-select'; // Import react-select
import { SketchPicker } from 'react-color'; // Import SketchPicker from react-color
import '../../../Styles/Admin/Style.css';  
 
const UpdateProduct = ({onClose}) => {  
  const { id } = useParams(); // Assuming productId is passed as a route parameter
    const navigate = useNavigate();
   
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [colour, setColour] = useState(''); // Initialize color with white
    const [size, setSize] = useState([]);
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [isColorPickerVisible, setIsColorPickerVisible] = useState(false); // Track visibility of color picker
  
    const colorPickerRef = useRef(null);
    const colorInputRef = useRef(null);
    
    useEffect(() => {
        // Fetch the product details to update
        const fetchProductDetails = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/product/getsingleproducts/${id}`); 
            const product = response.data;

            setProductName(product.ProductName);
            setCategory(product.Category);
            setBrand(product.Brand);
            setModel(product.Model);
            setStock(product.Stock);
            setPrice(product.Price);
            setColour(product.Colour);
            setSize(product.Size ? product.Size.split(',').map(s => ({ value: s, label: s })) : []); // Check if Size exists before splitting
            setDescription(product.Description);
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        };
        fetchProductDetails();
      }, [id]); 
    
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('ProductName', productName);
      formData.append('Category', category);
      formData.append('Brand', brand);
      formData.append('Model', model);
      formData.append('Stock', stock);
      formData.append('Price', price);
      formData.append('Colour', colour); // Append selected color
      formData.append('Size', size.map(s => s.value).join(',')); // Append selected sizes as comma-separated string
      formData.append('Description', description);
      
      files.forEach((file) => {
        formData.append('file', file);
      });
  
      try {
        const response = await axios.put(`http://localhost:5000/product/updateproducts/${id}`, formData);
        console.log('Data sent successfully:', response.data);
        setSuccessAlert(true); 
      } catch (error) {
        console.error('Error sending data:', error);
        setErrorAlert(true); 
      }
    };
  
    const handleFileChange = (event) => {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    };
  
    const handleColorChange = (color) => {
      setColour(color.hex);
    };
    
    const handleClickOutside = (event) => {
      if (
        colorPickerRef.current && !colorPickerRef.current.contains(event.target) &&
        colorInputRef.current && !colorInputRef.current.contains(event.target)
      ) {
        setIsColorPickerVisible(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const categories = ['Mobile', 'TV', 'Clothes', 'Electronics', 'Appliances', 'Books', 'Furniture'];
  
    const brandsByCategory = {
      Mobile: ['Samsung', 'Apple', 'Xiaomi', 'OnePlus', 'Huawei'],
      TV: ['Samsung', 'LG', 'Sony', 'TCL', 'Panasonic'],
      Clothes: ['Nike', 'Adidas', 'Zara', 'H&M', 'Gap'],
      Electronics: ['Sony', 'Panasonic', 'Bose', 'Philips', 'JBL'],
      Appliances: ['Samsung', 'LG', 'Whirlpool', 'Bosch', 'Haier'],
      Books: ['Penguin Random House', 'HarperCollins', 'Simon & Schuster', 'Macmillan Publishers', 'Hachette Livre'],
      Furniture: ['IKEA', 'Ashley Furniture', 'Rooms To Go', 'Williams-Sonoma', 'La-Z-Boy'],
    };
  
    const modelsByBrand = {
      Samsung: ['Galaxy S20', 'Galaxy Note 20', 'QLED Q90R', 'Crystal UHD TU8000', 'WW10M86DQOA'],
      Apple: ['iPhone 12', 'iPhone 11', 'iPad Pro', 'MacBook Air', 'Apple Watch Series 6'],
      Xiaomi: ['Redmi Note 10 Pro', 'Mi 11', 'POCO X3 Pro', 'Mi TV 4A', 'Mi Air Purifier'],
      OnePlus: ['OnePlus 9 Pro', 'OnePlus 8T', 'OnePlus Nord', 'OnePlus TV Q1', 'Buds Z'],
      Huawei: ['Huawei P40 Pro', 'MateBook X Pro', 'Watch GT 2', 'FreeBuds Pro', 'MatePad Pro'],
      LG: ['LG G8 ThinQ', 'LG Velvet', 'LG NanoCell 85', 'OLED GX', 'LG Gram'],
      Sony: ['Xperia 1 II', 'Bravia A8H', 'WH-1000XM4', 'PlayStation 5', 'Cyber-shot RX100 VII'],
      TCL: ['TCL 6-Series', 'TCL 5-Series', 'TCL 4-Series', 'TCL 75S434', 'TCL Alto 9+'],
      Nike: ['T-Shirt', 'Jerseys', 'Sportswear', 'Shoes', 'Baselayers'],
    };
  
    // Sizes corresponding to each model
    const sizesByModel = {
      'Galaxy S20': ['Small', 'Medium', 'Large'],
      'Galaxy Note 20': ['Small', 'Medium', 'Large'],
      'QLED Q90R': ['32 inch', '40 inch', '55 inch'],
      'Crystal UHD TU8000': ['32 inch', '40 inch', '55 inch'],
      'WW10M86DQOA': ['5kg', '7kg', '10kg'],
      'iPhone 12': ['64GB', '128GB', '256GB'],
      // Add more model-specific sizes as needed
    };
  
    const sizeOptions = model && sizesByModel[model] ? sizesByModel[model].map(size => ({ value: size, label: size })) : [];

    return (
        <div className="container-fluid px-1 py-5 mx-auto">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-7 col-lg-8 col-md-8 col-10 text-center"> 
              <div className="card">
                <h5 className="text-center mb-4">Add Products</h5>
                <div className="container-fluid px-1 py-5 mx-auto">
                  {successAlert && (
                    <div className="alert alert-success" role="alert">
                      Product added successfully!
                    </div>
                  )}
                  {errorAlert && (
                    <div className="alert alert-danger" role="alert">
                      Error adding product. Please try again later.
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="row justify-content-between text-left">
                      <div className="form-group col-sm-6 flex-column d-flex">
                        <label className="form-control-label px-3">
                          Product name<span className="text-danger"> *</span>
                        </label>
                        <input
                          type="text"
                          id="productName"
                          name="productName"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="Enter product name"
                        />
                      </div>
                      <div className="form-group col-sm-6 flex-column d-flex">
                        <label className="form-control-label px-3">
                          Product Category<span className="text-danger">*</span>
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={category}
                          onChange={(e) => {
                            setCategory(e.target.value);
                            setBrand('');
                          }}
                          className="form-control"
                        >
                          <option value="">Select Category</option>
                          {categories.map((category, index) => (
                            <option key={index} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="row justify-content-between text-left">
                      <div className="form-group col-sm-6 flex-column d-flex">
                        <label className="form-control-label px-3">
                          Product Brand<span className="text-danger">*</span>
                        </label>
                        <select
                          id="brand"
                          name="brand"
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          className="form-control"
                          disabled={!category}
                        >
                          <option value="">Select Brand</option>
                          {brandsByCategory[category] &&
                            brandsByCategory[category].map((brand, index) => (
                              <option key={index} value={brand}>
                                {brand}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group col-sm-6 flex-column d-flex">
                        <label className="form-control-label px-3">
                          Product Model<span className="text-danger">*</span>
                        </label>
                        <select
                          id="model"
                          name="model"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          className="form-control"
                          disabled={!brand}
                        >
                          <option value="">Select Model</option>
                          {modelsByBrand[brand] &&
                            modelsByBrand[brand].map((model, index) => (
                              <option key={index} value={model}>
                                {model}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="row justify-content-between text-left">
                      <div className="form-group col-sm-6 flex-column d-flex">
                        <label className="form-control-label px-3">
                          Stock<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="stock"
                          name="stock"
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-sm-6 flex-column d-flex">
                        <label className="form-control-label px-3">
                          Price<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="price"
                          name="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-between text-left">
                      <div className="form-group col-sm-6 flex-column d-flex">
                        <label className="form-control-label px-3">
                          Colour<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="colour"
                          name="colour"
                          value={colour}
                          ref={colorInputRef}
                          onClick={() => setIsColorPickerVisible(true)}
                          onChange={(e) => setColour(e.target.value)}
                          placeholder="Selected color"
                          style={{ cursor: 'pointer' }}
                        />
                        {isColorPickerVisible && (
                          <div ref={colorPickerRef}>
                            <SketchPicker color={colour} onChangeComplete={handleColorChange} />
                          </div>
                        )}
                      </div>
                      <div className="form-group col-sm-6 flex-column d-flex">
                        <label className="form-control-label px-3">
                          Size<span className="text-danger">*</span>
                        </label>
                        <Select
                          id="size"
                          name="size"
                          value={size}
                          onChange={setSize}
                          options={sizeOptions}
                          isMulti
                          placeholder="Select sizes"
                          isDisabled={!model}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-between text-left">
                      <div className="form-group col-sm-12 flex-column d-flex">
                        <label className="form-control-label px-3">
                          Description<span className="text-danger">*</span>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter product description"
                        />
                      </div>
                    </div>
                    <div className="row justify-content-between text-left">
                      <div className="form-group col-sm-12 flex-column d-flex">
                        <label className="form-control-label px-3">Upload Files</label>
                        <input
                          type="file"
                          id="file"
                          name="file"
                          onChange={handleFileChange}
                          multiple
                        />
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="form-group col-sm-6">
                        <button type="submit" className="btn-block btn-primary">
                          Update Product
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <button className="btn btn-danger" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ); 
}

export default UpdateProduct;
 
