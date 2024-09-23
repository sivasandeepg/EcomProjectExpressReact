import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCategories = ({ onClose }) => {
  const navigate = useNavigate();

  const [categoryData, setCategoryData] = useState({
    name: '',
  });

  const [alerts, setAlerts] = useState({ success: false, error: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/productdetails/addcategories', categoryData);
      console.log('Data sent successfully:', response.data);
      setAlerts({ success: true, error: false });
    } catch (error) {
      console.error('Error sending data:', error);
      setAlerts({ success: false, error: true });
    }
  };

  return (
    <div className="container-fluid px-1 py-5 mx-auto">
      <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
          <div className="card">
            <h5 className="text-center mb-4">Add Category</h5>
            <div className="container-fluid px-1 py-5 mx-auto">
              {alerts.success && (
                <div className="alert alert-success" role="alert">
                  Category added successfully!
                </div>
              )}
              {alerts.error && (
                <div className="alert alert-danger" role="alert">
                  Error adding category. Please try again later.
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-between text-left">
                  <InputField
                    label="Category Name"
                    name="name"
                    value={categoryData.name}
                    handleChange={handleChange}
                    placeholder="Enter category name"
                    required
                  />
                </div>
                <div className="row justify-content-between text-left">
                  <SubmitButton label="Add Category" />
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

export default CreateCategories;
 