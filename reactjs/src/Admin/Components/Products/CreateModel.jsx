import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
 
const CreateModel = ({ onClose }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [modelName, setModelName] = useState('');
  const [alerts, setAlerts] = useState({ success: false, error: false });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productdetails/getcategories');
        setCategories(response.data.map(cat => ({ value: cat._id, label: cat.name })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

      
   
  useEffect(() => {
    if (selectedCategory) {
      const fetchBrands = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/productdetails/getbrands/${selectedCategory.value}`); 
          setBrands(response.data.map(brand => ({ value: brand._id, label: brand.name })));
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      };
      fetchBrands();
    } else {
      setBrands([]);
      setSelectedBrand(null);
    }
  }, [selectedCategory]);

  const handleSelectCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleSelectBrandChange = (selectedOption) => {
    setSelectedBrand(selectedOption);
  };

  const handleModelNameChange = (event) => {
    setModelName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      
 
    const formData = {
      brand: selectedBrand.value,
      name: modelName,
    };
 
     
    try {
      const response = await axios.post('http://localhost:5000/productdetails/addmodels', formData);
      console.log('Data sent successfully:', response.data);
      setAlerts({ success: true, error: false });
    } catch (error) {
      console.error('Error sending data:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setAlerts({ success: false, error: true });
    }
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div className="card">
            <h5 className="text-center mb-4">Add Model</h5>
            <div className="container-fluid px-1 py-5 mx-auto">
              {alerts.success && (
                <div className="alert alert-success" role="alert">
                  Model added successfully!
                </div>
              )}
              {alerts.error && (
                <div className="alert alert-danger" role="alert">
                  Error adding model. Please try again later.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-between text-left">
                  <SelectField 
                    label="Category" 
                    name="category" 
                    value={selectedCategory} 
                    handleChange={handleSelectCategoryChange}  
                    options={categories} 
                    required 
                  />
                  <SelectField 
                    label="Brand" 
                    name="brand" 
                    value={selectedBrand} 
                    handleChange={handleSelectBrandChange}  
                    options={brands} 
                    required 
                    isDisabled={!selectedCategory} 
                  />
                  <InputField
                    label="Model Name"
                    name="model"
                    value={modelName}
                    handleChange={handleModelNameChange}
                    placeholder="Enter model name"
                    required
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <SubmitButton label="Add Model" />
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
    <input
      type="text"
      className="form-control"
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      {...rest}
    />
  </div>
);

const SelectField = ({ label, name, value, handleChange, options, isMulti = false, isDisabled = false }) => (
  <div className="form-group col-md-6 my-2">
    <label htmlFor={name} className="form-control-label">{label}</label>
    <Select
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      options={options}
      isMulti={isMulti}
      isDisabled={isDisabled}
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

 
export default CreateModel