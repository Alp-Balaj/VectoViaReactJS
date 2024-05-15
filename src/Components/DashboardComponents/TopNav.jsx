import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Top = styled.div`
    width:80vw;
    height: 90px;
    background-color: #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 3px solid yellow;
    h3{
        color: yellow;
    }
    a{
        text-decoration: none;

    }
`;


const TopNav = () => {
  return (
    <Top>
        <h3>Welcome Admin!</h3>
        <Link to="/">Home</Link>
    </Top>
  )
}

export default TopNav