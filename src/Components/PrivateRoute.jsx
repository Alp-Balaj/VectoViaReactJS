import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if the token exists in local storage
  const token = localStorage.getItem('token');
  const isAuthenticated = token ? true : false; // Update this logic as needed, possibly adding token validation

  return isAuthenticated ? children : <Navigate to="/notAdmin" />;
}

export default PrivateRoute;