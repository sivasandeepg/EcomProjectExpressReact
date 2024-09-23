import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { SketchPicker } from 'react-color';
import '../../../Styles/Admin/Style.css';

const CreateProduct = ({ onClose, getCategories }) => {
  const navigate = useNavigate();

  // State variables
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [brand, setBrand] = useState('');
  const [brandsByCategory, setBrandsByCategory] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [model, setModel] = useState('');
  const [modelsByBrand, setModelsByBrand] = useState([]);
  const [modelId, setModelId] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [colour, setColour] = useState('#fff');
  const [size, setSize] = useState([]);
  const [sizesByModel, setSizesByModel] = useState([]);
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [couponType, setCouponType] = useState('nocoupon');
  const [couponCode, setCouponCode] = useState('');
  const [checkboxValues, setCheckboxValues] = useState([]);
 
  const colorPickerRef = useRef(null);
  const colorInputRef = useRef(null);

  // Fetch categories when the component mounts
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

  // Fetch brands when categoryId changes
  useEffect(() => {
    if (!categoryId) return;
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/productdetails/getbrands/${categoryId}`);
        setBrandsByCategory(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, [categoryId]);

  // Fetch models when brandId changes
  useEffect(() => {
    if (!brandId) return;
    const fetchModels = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/productdetails/getmodels/${brandId}`);
        setModelsByBrand(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };
    fetchModels();
  }, [brandId]);

  // Fetch sizes when modelId changes
  useEffect(() => {
    if (!modelId) return;
    const fetchSizes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/productdetails/getsizes/${modelId}`);
        setSizesByModel(response.data);
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    };
    fetchSizes();
  }, [modelId]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const checkboxValuesString = checkboxValues.join(',');

    console.log(checkboxValuesString)

    const formData = new FormData();
    formData.append('ProductName', productName);
    formData.append('Category', category);
    formData.append('Brand', brand);
    formData.append('Model', model);
    formData.append('Stock', stock);
    formData.append('Price', price);
    formData.append('Colour', colour);
    formData.append('Size', size.map(s => s.value).join(','));
    formData.append('Description', description);
    formData.append('CouponType', couponType);
    formData.append('CouponCode', couponCode);
    formData.append('CheckboxValues', checkboxValuesString);
    files.forEach((file) => formData.append('file', file));

    try {
      const response = await axios.post('http://localhost:5000/product/addproduct', formData);
      console.log('Data sent successfully:', response.data);
      setSuccessAlert(true);
    } catch (error) {
      console.error('Error sending data:', error);
      setErrorAlert(true);
    }
  };

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  // Handle color change
  const handleColorChange = (color) => {
    setColour(color.hex);
  };

  // Handle click outside color picker
  const handleClickOutside = (event) => {
    if (colorPickerRef.current && !colorPickerRef.current.contains(event.target) &&
        colorInputRef.current && !colorInputRef.current.contains(event.target)) {
      setIsColorPickerVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (value) => {
    setCheckboxValues((prevValues) =>
      prevValues.includes(value)
        ? prevValues.filter((v) => v !== value)
        : [...prevValues, value]
    );
  };

   

  const sizeOptions = sizesByModel.map(size => ({ value: size._id, label: size.name }));


  const radiobuttons = ['percentage', 'flat', 'upto percentage', 'upto flat', 'nocoupon']

  const checkboxes = ['New Arrival', 'Trending', 'On Sale']
  

  

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
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
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        const selectedCategoryId = selectedOption.getAttribute('data-category-id');
                        setCategory(e.target.value);
                        setCategoryId(selectedCategoryId);
                      }}
                      className="form-control"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category._id} data-category-id={category._id} value={category.name}>
                          {category.name}
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
                      onChange={(e) => {
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        const selectedBrandId = selectedOption.getAttribute('data-brand-id');
                        setBrand(e.target.value);
                        setBrandId(selectedBrandId);
                      }}
                      className="form-control"
                    >
                      <option value="">Select Brand</option>
                      {brandsByCategory.map((brand) => (
                        <option key={brand._id} data-brand-id={brand._id} value={brand.name}>
                          {brand.name}
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
                      onChange={(e) => {
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        const selectedModelId = selectedOption.getAttribute('data-model-id');
                        setModel(e.target.value);
                        setModelId(selectedModelId);
                      }}
                      className="form-control"
                    >
                      <option value="">Select Model</option>
                      {modelsByBrand.map((model) => (
                        <option key={model._id} data-model-id={model._id} value={model.name}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Product Size<span className="text-danger">*</span>
                    </label>
                    <Select
                      id="size"
                      name="size"
                      value={size}
                      onChange={setSize}
                      options={sizeOptions}
                      isMulti
                    />
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Product Stock<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="Enter product stock"
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Product Price<span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="Enter product price"
                    />
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Product Color<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      ref={colorInputRef}
                      value={colour}
                      onClick={() => setIsColorPickerVisible(!isColorPickerVisible)}
                      onChange={(e) => setColour(e.target.value)}
                      placeholder="Select color"
                    />
                    {isColorPickerVisible && (
                      <div ref={colorPickerRef}>
                        <SketchPicker color={colour} onChange={handleColorChange} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-12 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Product Description<span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter product description"
                      className="form-control"
                      rows="4"
                    ></textarea>
                  </div>
                </div> 

                <div className="row justify-content-between text-left"> 
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Coupon Type
                    </label>
                    <div className="d-flex">
                      <div className="form-check">
                        {radiobuttons.map((coupons, index) => ( 
                          <div key={index}>
                            <input
                              type="radio"
                              id={coupons}
                              name="coupon"
                              value={coupons}
                              checked={couponType === coupons}
                              onChange={(e) => setCouponType(e.target.value)}
                            />
                            <label htmlFor={coupons}>{coupons}</label>
                            <br/>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div> 
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Coupon Code
                    </label>
                    <input
                      type="text"
                      id="couponCode"
                      name="couponCode"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      disabled={couponType === 'nocoupon'}
                    />
                  </div>
                </div>
                <hr/>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-4 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Special Tags
                    </label>
                    {checkboxes.map((checkboxvalues, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          id={checkboxvalues}
                          name="checkboxvalues"
                          value={checkboxvalues}
                          checked={checkboxValues.includes(checkboxvalues)}
                          onChange={(e) => handleCheckboxChange(e.target.value)}
                        /> 
                        <label htmlFor={checkboxvalues}>{checkboxvalues}</label>
                        <br/>
                      </div>
                    ))}
                  </div>
                </div>
                <hr/>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-12 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Product Images
                    </label>
                    <input
                      type="file"
                      id="files"
                      name="files"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="form-group col-sm-12">
                    <button type="submit" className="btn btn-primary">
                      Add Product
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onClose}>
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
 