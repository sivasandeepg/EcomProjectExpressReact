import React from 'react';
import styles from '../../../Styles/Customer/AddAddress.module.css';

const AddAddress = ({ address, setAddress }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <h2>Add Delivery Address</h2>
      <input 
        type="text" 
        name="name" 
        value={address.name} 
        onChange={handleChange} 
        placeholder="Name"
        className={styles.input}
      />
      <input 
        type="email" 
        name="email" 
        value={address.email} 
        onChange={handleChange} 
        placeholder="Email"
        className={styles.input}
      />
      <input 
        type="text" 
        name="line1" 
        value={address.line1} 
        onChange={handleChange} 
        placeholder="Address Line 1"
        className={styles.input}
      />
      <input 
        type="text" 
        name="city" 
        value={address.city} 
        onChange={handleChange} 
        placeholder="City"
        className={styles.input}
      />
      <input 
        type="text" 
        name="state" 
        value={address.state} 
        onChange={handleChange} 
        placeholder="State"
        className={styles.input}
      />
      <input 
        type="text" 
        name="postal_code" 
        value={address.postal_code} 
        onChange={handleChange} 
        placeholder="Postal Code"
        className={styles.input}
      />
      <input 
        type="text" 
        name="country" 
        value={address.country} 
        onChange={handleChange} 
        placeholder="Country"
        className={styles.input}
      />
    </div>
  );
};

export default AddAddress;
 
 

// import React from 'react';
// import styles from '../../../Styles/Customer/AddAddress.module.css'; 


// const AddAddress = ({ address, setAddress }) => {

//   return (
//     <div className={styles.container}>
//       <h2>Add Delivery Address</h2>
//       <textarea 
//         value={address} 
//         onChange={(e) => setAddress(e.target.value)} 
//         placeholder="Enter your address here"
//         className={styles.textarea}
//       />
//     </div>
//   );
// }; 

// export default AddAddress;
 