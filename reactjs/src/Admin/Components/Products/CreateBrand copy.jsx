 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const CreateBrand = ({ onClose }) => {
  const navigate = useNavigate();

  const [brandData, setBrandData] = useState({
    name: '',
    category: '',
  });
 
  const [categories, setCategories] = useState([]);
  const [alerts, setAlerts] = useState({ success: false, error: false });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandData((prevData) => ({ ...prevData, [name]: value }));
  };
  
    
  const handleSelectChange = (selectedOptions, action) => {
    setBrandData((prevData) => ({
      ...prevData,
       [action.name]: selectedOptions,
    }));
  };
    
  
   console.log(brandData) 

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/productdetails/addbrands', brandData);
      console.log('Data sent successfully:', response.data);
      setAlerts({ success: true, error: false });
      setBrandData({ name: '', category: '' }); // Reset form
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
                  <InputField
                    label="Brand Name"
                    name="name"
                    value={brandData.name}
                    handleChange={handleChange}
                    placeholder="Enter brand name"
                    required
                  />
                  <SelectField 
                    label="Category" 
                    name="category" 
                    value={brandData.category} 
                    handleChange={handleSelectChange}  
                    options={categories} 
                    optionKey="_id" 
                    optionValue="name" 
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
 
 


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Select from 'react-select';

// const CreateBrand = ({ onClose }) => {
//   const navigate = useNavigate();

//   const [brandData, setBrandData] = useState({
//     name: '',
//     category: '',
//   });

//   const [categories, setCategories] = useState([]);
//   const [alerts, setAlerts] = useState({ success: false, error: false });

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/productdetails/getcategories');
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBrandData((prevData) => ({ ...prevData, [name]: value }));
//   };
  
    
//   const handleSelectChange = (selectedOptions, action) => {
//     setBrandData((prevData) => ({
//       ...prevData,
//        [action.name]: selectedOptions,
//     }));
//   };
    
  
//    console.log(brandData) 

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/productdetails/addbrands', brandData);
//       console.log('Data sent successfully:', response.data);
//       setAlerts({ success: true, error: false });
//       setBrandData({ name: '', category: '' }); // Reset form
//     } catch (error) {
//       console.error('Error sending data:', error);
//       setAlerts({ success: false, error: true });
//     }
//   };

//   return (
//     <div className="container-fluid px-1 py-5 mx-auto">
//       <div className="row d-flex justify-content-center">
//         <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
//           <div className="card">
//             <h5 className="text-center mb-4">Add Brand</h5>
//             <div className="container-fluid px-1 py-5 mx-auto">
//               {alerts.success && (
//                 <div className="alert alert-success" role="alert">
//                   Brand added successfully!
//                 </div>
//               )}
//               {alerts.error && (
//                 <div className="alert alert-danger" role="alert">
//                   Error adding Brand. Please try again later.
//                 </div>
//               )}
//               <form onSubmit={handleSubmit}>
//                 <div className="row justify-content-between text-left">
//                   <InputField
//                     label="Brand Name"
//                     name="name"
//                     value={brandData.name}
//                     handleChange={handleChange}
//                     placeholder="Enter brand name"
//                     required
//                   />
//                   <SelectField 
//                     label="Category" 
//                     name="category" 
//                     value={brandData.category} 
//                     handleChange={handleSelectChange}  
//                     options={categories} 
//                     optionKey="_id" 
//                     optionValue="name" 
//                     required 
//                   /> 
//                 </div>
//                 <div className="row justify-content-between text-left">
//                   <SubmitButton label="Add Brand" />
//                   <CancelButton label="Cancel" onClick={onClose} />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InputField = ({ label, name, value, handleChange, ...rest }) => (
//   <div className="form-group col-md-6 my-2">
//     <label htmlFor={name} className="form-control-label">{label}</label>
//     <input
//       type="text"
//       className="form-control"
//       id={name}
//       name={name}
//       value={value}
//       onChange={handleChange}
//       {...rest}
//     />
//   </div>
// );

// const SelectField = ({ label, name, value, handleChange, options, optionKey = 'value', optionValue = 'label', isMulti = false }) => (
//   <div className="form-group col-md-6 my-2">
//     <label htmlFor={name} className="form-control-label">{label}</label>
//     <Select
//       id={name}
//       name={name}
//       value={options.find(option => option[optionKey] === value)}
//       onChange={handleChange}
//       options={options.map(option => ({ value: option[optionKey], label: option[optionValue] }))} 
//       isMulti={isMulti}
//     />
//   </div>
// );  
  
// const SubmitButton = ({ label }) => (
//   <div className="form-group col-md-6 my-2">
//     <button type="submit" className="btn btn-primary">{label}</button>
//   </div>
// );

// const CancelButton = ({ label, onClick }) => (
//   <div className="form-group col-md-6 my-2">
//     <button type="button" className="btn btn-secondary" onClick={onClick}>{label}</button>
//   </div>
// );

// export default CreateBrand;
 