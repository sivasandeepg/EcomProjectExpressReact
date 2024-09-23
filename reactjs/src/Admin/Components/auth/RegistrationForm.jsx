import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Admin/RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/register', formData);
      setMessage('Registration successful!');
    } catch (err) {
      setMessage('Registration failed. Please try again.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/admin/login');
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
        <a className="create-account-button" onClick={handleCreateAccount}>
          <span>GoTo </span><span>Login</span> 
        </a>
      </div>
    </div>
  );
};

export default RegistrationForm;
 