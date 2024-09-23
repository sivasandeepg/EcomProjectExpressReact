import React from 'react';
import GetAdmin from './GetAdmin';

const WelcomePage = ({ token }) => { 
  
  return (
    <GetAdmin token={token} render={({ user }) => (
      <div>
        <h2>Welcome, {user?.username}!</h2>
        <p>Email: {user?.email}</p>
      </div>
    )}/>
  );
};

export default WelcomePage;
