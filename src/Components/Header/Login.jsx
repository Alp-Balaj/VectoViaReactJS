import React, { useContext, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AppContext } from '../Context/AppStateProvider';
import styled from 'styled-components';

const StyledLogin = styled.div`
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


const Login = () => {
  const { dispatch } = useContext(AppContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = "https://localhost:7081/api/User/login";

    try {
      const response = await axios.post(url, formData);
      
      if (response.data.token) {
        const token = response.data.token;
        
        // Store token in localStorage
        localStorage.setItem("token", token);
        
        // Decode JWT to get user info
        const userInfo = jwtDecode(token); // Decode JWT token
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        localStorage.setItem("refreshToken", JSON.stringify(userInfo.exp));
        
        // Dispatch login action
        dispatch({
          type: "LOGIN",
          payload: {
            token: token,
            userInfo: userInfo,
            refreshToken: userInfo.exp,
          }
        });
        window.location.href = '/';
        
      } else {
        setError(response.data.error || 'Login failed. Please try again.');
        setTimeout(() => setError(''), 5000);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during login. Please try again.');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <StyledLogin>
      <h1>Log-in</h1>
      <form onSubmit={handleSubmit}>
        <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={closeModal} type="submit">Login</button>
      </form>
      
    </StyledLogin>
  );
};

export default Login;
