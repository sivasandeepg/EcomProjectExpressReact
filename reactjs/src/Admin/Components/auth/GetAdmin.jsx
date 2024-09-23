import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetAdmin = ({ token, render }) => { 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/user', {
          headers: { 'x-auth-token': token }
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user data', err);
      }
    };

    fetchUser();
  }, [token]);

  if (!user) return <p>Loading...</p>;

  return render({ user });
};

export default GetAdmin;
