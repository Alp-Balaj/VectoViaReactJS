import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  let isAuthenticated = false;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      
      // Check if the token is expired
      if (decodedToken.role === "Admin") {
        isAuthenticated = true; // Token is valid and not expired
      }
    } catch (error) {
      isAuthenticated = false; // Token is invalid or expired
    }
  }

  return isAuthenticated ? children : <Navigate to="/notAdmin" />;
}

export default PrivateRoute;