import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../../Styles/Admin/LoginForm.css';

const LoginForm = ({ setToken }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      }); 
      const status = res.data.loginStatus; // Adjusted to match your backend response 
      const jwtToken = res.data.jwtToken;
      
      if (status === 'success') {
    
        localStorage.setItem('jwtToken', jwtToken);    
        setToken(jwtToken); 
        setMessage('Login successful!');
        navigate('/admin/dashboard'); // Redirect to dashboard after successful login
      } else {
        setMessage('Login failed. Invalid credentials.');
      }
    } catch (err) {
      setMessage('Login failed. Please try again.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/admin/registration');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <button className="create-account-button" onClick={handleCreateAccount}>
          <span>Create </span><span>Account</span>
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoginForm;
 