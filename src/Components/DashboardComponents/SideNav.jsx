import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../Assets/logos/SiteLogo.jpg';

const Side = styled.div`
    width: 20%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa;
    color: #343a40;
    img {
        width: 80%; 
        margin: 20px auto; 
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 20px 0;
        li {
            margin: 20px 0;
            a {
                text-decoration: none;
                color: #343a40;
                padding: 10px 20px;
                display: block;
                border-radius: 5px;
                transition: background-color 0.3s;
                &:hover {
                    background-color: #ffc107;
                    color: #fff;
                }
            }
        }
    }
`;

const SideNav = () => {
    return (
        <Side>
            <img src={logo} alt="Site Logo" />
            <ul>
                <li><Link to="/dashboard/users">Users</Link></li>
                <li><Link to="/dashboard/kompania-taxi">Kompania Taxi</Link></li>
                <li><Link to="/dashboard/kompania-rent">Kompania Rent</Link></li>
                <li><Link to="/dashboard/cars">Cars</Link></li>
                <li><Link to="/dashboard/pick-up-location">PickUpLocation</Link></li>
            </ul>
        </Side>
    );
};

export default SideNav;
