import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { SketchPicker } from 'react-color';
import '../../../Styles/Admin/Style.css';
  
const CreateProduct = ({ onClose, getCategories }) => {
  const navigate = useNavigate();

  // State variables
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    categoryId: '',
    brand: '',
    brandId: '',
    model: '',
    modelId: '',
    stock: '',
    price: '',
    colour: '#fff',
    size: [],
    description: '',
    files: [],
    couponType: 'nocoupon',
    couponCode: '',
    checkboxValues: [],
    status: ''
  });

  const [categories, setCategories] = useState([]);
  const [brandsByCategory, setBrandsByCategory] = useState([]);
  const [modelsByBrand, setModelsByBrand] = useState([]);
  const [sizesByModel, setSizesByModel] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);

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

  // Fetch statuses when the component mounts
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productdetails/getstatuses');
        setStatuses(response.data);
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };
    fetchStatuses();
  }, []);

  // Fetch brands when categoryId changes
  useEffect(() => {
    if (!formData.categoryId) return;
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/productdetails/getbrands/${formData.categoryId}`);
        setBrandsByCategory(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, [formData.categoryId]);

  // Fetch models when brandId changes
  useEffect(() => {
    if (!formData.brandId) return;
    const fetchModels = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/productdetails/getmodels/${formData.brandId}`);
        setModelsByBrand(response.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };
    fetchModels();
  }, [formData.brandId]);

  // Fetch sizes when modelId changes
  useEffect(() => {
    if (!formData.modelId) return;
    const fetchSizes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/productdetails/getsizes/${formData.modelId}`);
        setSizesByModel(response.data);
      } catch (error) {
        console.error('Error fetching sizes:', error);
      }
    };
    fetchSizes();
  }, [formData.modelId]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const checkboxValuesString = formData.checkboxValues.join(',');

    const submitData = new FormData();
    submitData.append('ProductName', formData.productName);
    submitData.append('Category', formData.category);
    submitData.append('Brand', formData.brand);
    submitData.append('Model', formData.model);
    submitData.append('Stock', formData.stock);
    submitData.append('Price', formData.price);
    submitData.append('Colour', formData.colour);
    submitData.append('Size', formData.size.map(s => s.value).join(','));
    submitData.append('Description', formData.description);
    submitData.append('Status', formData.status);
    submitData.append('CouponType', formData.couponType);
    submitData.append('CouponCode', formData.couponCode);
    submitData.append('CheckboxValues', checkboxValuesString);
    formData.files.forEach((file) => submitData.append('file', file));

    try {
      const response = await axios.post('http://localhost:5000/product/addproduct', submitData);
      console.log('Data sent successfully:', response.data);
      setSuccessAlert(true);
    } catch (error) {
      console.error('Error sending data:', error);
      setErrorAlert(true);
    }
  };

  // Handle input change dynamically
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle file change
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFormData((prevData) => ({
      ...prevData,
      files: selectedFiles,
    }));
  };

  // Handle color change
  const handleColorChange = (color) => {
    setFormData((prevData) => ({
      ...prevData,
      colour: color.hex,
    }));
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
    setFormData((prevData) => ({
      ...prevData,
      checkboxValues: prevData.checkboxValues.includes(value)
        ? prevData.checkboxValues.filter((v) => v !== value)
        : [...prevData.checkboxValues, value],
    }));
  };

  const sizeOptions = sizesByModel.map(size => ({ value: size._id, label: size.name }));

  const radiobuttons = ['percentage', 'flat', 'upto percentage', 'upto flat', 'nocoupon'];

  const checkboxes = ['New Arrival', 'Trending', 'On Sale'];

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
                      value={formData.productName}
                      onChange={handleChange}
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
                      value={formData.category}
                      onChange={(e) => {
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        const selectedCategoryId = selectedOption.getAttribute('data-category-id');
                        handleChange(e);
                        setFormData((prevData) => ({
                          ...prevData,
                          categoryId: selectedCategoryId,
                        }));
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
                      value={formData.brand}
                      onChange={(e) => {
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        const selectedBrandId = selectedOption.getAttribute('data-brand-id');
                        handleChange(e);
                        setFormData((prevData) => ({
                          ...prevData,
                          brandId: selectedBrandId,
                        }));
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
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Product Model<span className="text-danger">*</span>
                    </label>
                    <select
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={(e) => {
                        const selectedOption = e.target.options[e.target.selectedIndex];
                        const selectedModelId = selectedOption.getAttribute('data-model-id');
                        handleChange(e);
                        setFormData((prevData) => ({
                          ...prevData,
                          modelId: selectedModelId,
                        }));
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
                      Stock<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="Enter stock quantity"
                    />
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Price<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Colour<span className="text-danger">*</span>
                    </label>
                    <div className="d-flex">
                      <input
                        type="text"
                        id="colour"
                        name="colour"
                        value={formData.colour}
                        onChange={handleChange}
                        ref={colorInputRef}
                        onClick={() => setIsColorPickerVisible(!isColorPickerVisible)}
                        className="form-control"
                      />
                      {isColorPickerVisible && (
                        <div ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2 }}>
                          <SketchPicker
                            color={formData.colour}
                            onChange={handleColorChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Size<span className="text-danger">*</span>
                    </label>
                    <Select
                      isMulti
                      name="size"
                      options={sizeOptions}
                      value={formData.size}
                      onChange={(selectedOptions) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          size: selectedOptions,
                        }))
                      }
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-12 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Description<span className="text-danger"> *</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter product description"
                      className="form-control"
                    ></textarea>
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Status<span className="text-danger"> *</span>
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Select Status</option>
                      {statuses.map((status) => (
                        <option key={status._id} value={status.name}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Coupon Type<span className="text-danger"> *</span>
                    </label>
                    <div className="d-flex">
                      {radiobuttons.map((button) => (
                        <div key={button} className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="couponType"
                            id={button}
                            value={button}
                            checked={formData.couponType === button}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor={button}>
                            {button}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-group col-sm-6 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Coupon Code<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="text"
                      id="couponCode"
                      name="couponCode"
                      value={formData.couponCode}
                      onChange={handleChange}
                      placeholder="Enter coupon code"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-12 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Checkbox Values<span className="text-danger"> *</span>
                    </label>
                    <div className="d-flex">
                      {checkboxes.map((checkbox) => (
                        <div key={checkbox} className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={checkbox}
                            value={checkbox}
                            checked={formData.checkboxValues.includes(checkbox)}
                            onChange={() => handleCheckboxChange(checkbox)}
                          />
                          <label className="form-check-label" htmlFor={checkbox}>
                            {checkbox}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-12 flex-column d-flex">
                    <label className="form-control-label px-3">
                      Upload Images<span className="text-danger"> *</span>
                    </label>
                    <input
                      type="file"
                      id="files"
                      name="files"
                      multiple
                      onChange={handleFileChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row justify-content-between text-left">
                  <div className="form-group col-sm-12 flex-column d-flex">
                    <button type="submit" className="btn btn-primary">
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
  