import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Top = styled.div`
    width: 80vw;
    height: 90px;
    background-color: #F8F9FA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    h3 {
        color: #ffc107;
    }
    a {
        text-decoration: none;
        color: #ffc107;
        padding: 10px 20px;
        border-radius: 5px;
        transition: background-color 0.3s;
        &:hover {
            background-color: #ffc107;
            color: #495057;
        }
    }
`;

const TopNav = () => {
    return (
        <Top>
            <h3>Take Command!</h3>
            <Link to="/">Home</Link>
        </Top>
    );
};

export default TopNav;
