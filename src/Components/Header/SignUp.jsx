import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledSignUP = styled.div`
  form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 50px 50px;
    background-color: #f5f5f5;
    border-radius: 10px;
    label{
      margin-top: 10px;
      input{
        width:100%;
      }
    }
    button{
      border: none;
      border-radius: 10px;
      padding: 5px 20px;
      background-color: #ffc800;
      color: #fff;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      font-weight: 600;
      font-size: 15px;
      margin-top: 20px;
    }
    button:hover{
        background-color: #d9aa00;
    }
  }
`;

const SignUp = ({ goToLogin }) => {
  const [done, setDone] = useState('');
  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    username: "",
    email: "",
    password: "",
    status: "active"
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5108/api/User/register";
    try {
      const response = await axios.post(url, formData);
      if (response.data.message) {
        setDone(response.data.message);
        setTimeout(goToLogin, 3000);
      }
    } catch (error) {
      console.error(error);
      setDone("Registration failed. Please try again.");
    }
    window.location.href = '/';
  };

  return (
    <StyledSignUP>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
      <label>
          First Name:
          <input type="text" name="emri" value={formData.emri} onChange={handleChange} />
      </label>
      <label>
          Last Name:
          <input type="text" name="mbiemri" value={formData.mbiemri} onChange={handleChange} />
      </label>
      <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
        {done && <p>{done}</p>}
        <button type="submit">Register</button>
      </form>
    </StyledSignUP>
  );
};

export default SignUp;
