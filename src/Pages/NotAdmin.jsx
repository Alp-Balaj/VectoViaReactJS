import React from 'react';
import { Link } from 'react-router-dom';


const notAdmin = () => {
  return (
    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height:'100vh'}}>
      <h1>You shouldnt be here</h1>
      <Link to="/">Go back to the home page</Link>
    </div>
  );
}

export default notAdmin;