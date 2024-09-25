import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/google/current_user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
        setLoading(false);
      });
  }, []);

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google/login';
  };

  const handleLogout = () => {
    axios.get('http://localhost:5000/google/logout', { withCredentials: true })
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Login with Google</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName}</h2>
          <img src={user.photo} alt="User profile" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default GoogleLogin;
 