import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height:'100vh'}}>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
}

export default ErrorPage;