import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { SketchPicker } from 'react-color';
import '../../../Styles/Admin/Style.css';

const CreateProductCopy = ({ onClose }) => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    productName: '',
    category: '',
    brand: '',
    model: '',
    stock: '',
    price: '',
    colour: '#fff',
    size: [],
    description: '',
    coupon: 'nocoupon',
    couponValue: '',
    isNewArrival: false,
    isOnSale: false,
    isBestSeller: false,
  });

  const [files, setFiles] = useState([]);
  const [alerts, setAlerts] = useState({ success: false, error: false });
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const colorPickerRef = useRef(null);
  const colorInputRef = useRef(null);

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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchBrands = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:5000/productdetails/getbrands/${categoryId}`);
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const selectedCategory = selectedOption.getAttribute('data-category-name');
    const selectedCategoryId = selectedOption.value;
    setProductData((prevData) => ({
      ...prevData,
      category: selectedCategory,
      brand: '',
      model: '',
      size: [],
    }));
    if (selectedCategoryId) {
      await fetchBrands(selectedCategoryId);
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSelectChange = (selectedOptions, action) => {
    setProductData((prevData) => ({
      ...prevData,
      [action.name]: selectedOptions,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedCheckboxValues = [];
    if (productData.isNewArrival) selectedCheckboxValues.push('New Arrival');
    if (productData.isOnSale) selectedCheckboxValues.push('On Sale');
    if (productData.isBestSeller) selectedCheckboxValues.push('Best Seller');
    const checkboxValuesString = selectedCheckboxValues.join(',');

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key !== 'size') {
        formData.append(key, productData[key]);
      }
    });
    formData.append('Size', productData.size.map((s) => s.value).join(','));
    formData.append('CheckboxValues', checkboxValuesString);

    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/product/addproduct', formData);
      console.log('Data sent successfully:', response.data);
      setAlerts({ success: true, error: false });
    } catch (error) {
      console.error('Error sending data:', error);
      setAlerts({ success: false, error: true });
    }
  };

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleColorChange = (color) => {
    setProductData((prevData) => ({ ...prevData, colour: color.hex }));
  };

  const handleClickOutside = (event) => {
    if (
      colorPickerRef.current && !colorPickerRef.current.contains(event.target) &&
      colorInputRef.current && !colorInputRef.current.contains(event.target)
    ) {
      setIsColorPickerVisible(false);
    }
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

  const sizesByModel = {
    'Galaxy S20': ['Small', 'Medium', 'Large'],
    'Galaxy Note 20': ['Small', 'Medium', 'Large'],
    'QLED Q90R': ['32 inch', '40 inch', '55 inch'],
    'Crystal UHD TU8000': ['32 inch', '40 inch', '55 inch'],
    'WW10M86DQOA': ['5kg', '7kg', '10kg'],
    'iPhone 12': ['64GB', '128GB', '256GB'],
  };

  const sizeOptions = productData.model && sizesByModel[productData.model] 
    ? sizesByModel[productData.model].map((size) => ({ value: size, label: size })) 
    : [];

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div className="card">
            <h5 className="text-center mb-4">Add Products</h5>
            <div className="container-fluid px-1 py-5 mx-auto">
              {alerts.success && (
                <div className="alert alert-success" role="alert">
                  Product added successfully!
                </div>
              )}
              {alerts.error && (
                <div className="alert alert-danger" role="alert">
                  Error adding product. Please try again later.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-between text-left">
                  <InputField 
                    label="Product Name" 
                    name="productName" 
                    value={productData.productName} 
                    handleChange={handleChange} 
                    placeholder="Enter product name" 
                    required 
                  />
                  <SelectField 
                    label="Category" 
                    name="category" 
                    value={productData.category} 
                    handleChange={handleCategoryChange} 
                    options={categories} 
                    optionKey="_id" 
                    optionValue="name" 
                    required 
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <SelectField 
                    label="Brand" 
                    name="brand" 
                    value={productData.brand} 
                    handleChange={handleChange} 
                    options={brands} 
                    optionKey="_id" 
                    optionValue="name" 
                    required 
                  />
                  <SelectField 
                    label="Model" 
                    name="model" 
                    value={productData.model} 
                    handleChange={handleChange} 
                    options={brand && modelsByBrand[brand]} 
                    required 
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <InputField 
                    label="Stock" 
                    name="stock" 
                    value={productData.stock} 
                    handleChange={handleChange} 
                    placeholder="Enter stock quantity" 
                    type="number" 
                    required 
                  />
                  <InputField 
                    label="Price" 
                    name="price" 
                    value={productData.price} 
                    handleChange={handleChange} 
                    placeholder="Enter price" 
                    type="number" 
                    step="0.01" 
                    required 
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <ColorPickerField 
                    label="Color" 
                    name="colour" 
                    value={productData.colour} 
                    handleChange={handleColorChange} 
                    isVisible={isColorPickerVisible} 
                    setVisible={setIsColorPickerVisible} 
                    colorPickerRef={colorPickerRef} 
                    colorInputRef={colorInputRef} 
                  />
                  <SelectField 
                    label="Size" 
                    name="size" 
                    value={productData.size} 
                    handleChange={handleSelectChange} 
                    options={sizeOptions} 
                    isMulti 
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <TextareaField 
                    label="Description" 
                    name="description" 
                    value={productData.description} 
                    handleChange={handleChange} 
                    placeholder="Enter product description" 
                    required 
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <SelectField 
                    label="Coupon" 
                    name="coupon" 
                    value={productData.coupon} 
                    handleChange={handleChange} 
                    options={[{ value: 'nocoupon', label: 'No Coupon' }, { value: '10percent', label: '10% Off' }, { value: '20percent', label: '20% Off' }]} 
                    optionKey="value" 
                    optionValue="label" 
                  />
                  {productData.coupon !== 'nocoupon' && (
                    <InputField 
                      label="Coupon Value" 
                      name="couponValue" 
                      value={productData.couponValue} 
                      handleChange={handleChange} 
                      placeholder="Enter coupon value" 
                      required 
                    />
                  )}
                </div>
                <div className="row justify-content-between text-left">
                  <CheckboxField 
                    label="New Arrival" 
                    name="isNewArrival" 
                    checked={productData.isNewArrival} 
                    handleChange={handleCheckboxChange} 
                  />
                  <CheckboxField 
                    label="On Sale" 
                    name="isOnSale" 
                    checked={productData.isOnSale} 
                    handleChange={handleCheckboxChange} 
                  />
                  <CheckboxField 
                    label="Best Seller" 
                    name="isBestSeller" 
                    checked={productData.isBestSeller} 
                    handleChange={handleCheckboxChange} 
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <FileInputField 
                    label="Product Images" 
                    name="productImages" 
                    handleChange={handleFileChange} 
                    multiple 
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <SubmitButton label="Add Product" />
                  <CancelButton label="Cancel" onClick={onClose} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, handleChange, ...rest }) => (
  <div className="form-group col-md-6 my-2">
    <label htmlFor={name} className="form-control-label">{label}</label>
    <input type="text" className="form-control" id={name} name={name} value={value} onChange={handleChange} {...rest} />
  </div>
);

const SelectField = ({ label, name, value, handleChange, options, optionKey = 'value', optionValue = 'label', isMulti = false }) => (
  <div className="form-group col-md-6 my-2">
    <label htmlFor={name} className="form-control-label">{label}</label>
    <Select
      id={name}
      name={name}
      value={options.find(option => option[optionKey] === value)}
      onChange={handleChange}
      options={options.map(option => ({ value: option[optionKey], label: option[optionValue] }))}
      isMulti={isMulti}
    />
  </div>
);

const ColorPickerField = ({ label, name, value, handleChange, isVisible, setVisible, colorPickerRef, colorInputRef }) => (
  <div className="form-group col-md-6 my-2">
    <label htmlFor={name} className="form-control-label">{label}</label>
    <input
      type="text"
      className="form-control"
      id={name}
      name={name}
      value={value}
      onClick={() => setVisible(!isVisible)}
      readOnly
      ref={colorInputRef}
    />
    {isVisible && (
      <div ref={colorPickerRef}>
        <SketchPicker color={value} onChangeComplete={handleChange} />
      </div>
    )}
  </div>
);

const TextareaField = ({ label, name, value, handleChange, ...rest }) => (
  <div className="form-group col-md-12 my-2">
    <label htmlFor={name} className="form-control-label">{label}</label>
    <textarea className="form-control" id={name} name={name} value={value} onChange={handleChange} {...rest}></textarea>
  </div>
);

const CheckboxField = ({ label, name, checked, handleChange }) => (
  <div className="form-check col-md-4 my-2">
    <input
      type="checkbox"
      className="form-check-input"
      id={name}
      name={name}
      checked={checked}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor={name}>{label}</label>
  </div>
);

const FileInputField = ({ label, name, handleChange, multiple }) => (
  <div className="form-group col-md-12 my-2">
    <label htmlFor={name} className="form-control-label">{label}</label>
    <input
      type="file"
      className="form-control"
      id={name}
      name={name}
      onChange={handleChange}
      multiple={multiple}
    />
  </div>
);

const SubmitButton = ({ label }) => (
  <div className="form-group col-md-6 my-2">
    <button type="submit" className="btn btn-primary">{label}</button>
  </div>
);

const CancelButton = ({ label, onClick }) => (
  <div className="form-group col-md-6 my-2">
    <button type="button" className="btn btn-secondary" onClick={onClick}>{label}</button>
  </div>
);
 
export default CreateProductCopy;
  