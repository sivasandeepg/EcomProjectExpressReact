import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const CreateBrand = ({ onClose }) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [brandName, setBrandName] = useState('');
  const [categories, setCategories] = useState([]);
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

  const handleSelectChange = (selectedOption) => {
    setCategory(selectedOption);
  };

  const handleChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: brandName,
      category: category.value,
    };

    try {
      const response = await axios.post('http://localhost:5000/productdetails/addbrands', payload);
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
            <h5 className="text-center mb-4">Add Brand</h5>
            <div className="container-fluid px-1 py-5 mx-auto">
              {alerts.success && (
                <div className="alert alert-success" role="alert">
                  Brand added successfully!
                </div>
              )}
              {alerts.error && (
                <div className="alert alert-danger" role="alert">
                  Error adding Brand. Please try again later.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-between text-left">

                <SelectField 
                    label="Category" 
                    name="category" 
                    value={category} 
                    handleChange={handleSelectChange}  
                    options={categories} 
                    required 
                  />  
   

                  <InputField
                    label="Brand Name"
                    name="name"
                    value={brandName}
                    handleChange={handleChange}
                    placeholder="Enter brand name"
                    required
                  />

                </div>
                <div className="row justify-content-between text-left">
                  <SubmitButton label="Add Brand" />
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

const SelectField = ({ label, name, value, handleChange, options, isMulti = false }) => (
  <div className="form-group col-md-6 my-2">
    <label htmlFor={name} className="form-control-label">{label}</label>
    <Select
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      options={options}
      isMulti={isMulti}
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

export default CreateBrand;
 