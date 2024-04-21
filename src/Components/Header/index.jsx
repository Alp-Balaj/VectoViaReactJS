// import React from 'react';
import { Container } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Drawer from '../Drawer/Drawer';
import React, { useEffect } from 'react';
import { useWindowScroll } from 'react-use';
import { Navbar, Nav } from 'react-bootstrap';
import "../../Pages/Style/styles.css";







const Header = () => {

    const navbarShrink = () => {
        const navbarCollapsible = document.getElementById('mainNav');
        if (!navbarCollapsible) return;
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar when page is scrolled
    useWindowScroll(navbarShrink);

    useEffect(() => {
        // Activate Bootstrap scrollspy on the main nav element
        // No need for Bootstrap JavaScript API, as React Bootstrap handles this internally
    }, []);

    const Head = styled.div`
    display: flex;
    border-radius: 25px;
    align-items: center;
    width: 100%;
    background-color: #00000083;
      li{
        margin-left: 20px;
        a{
            text-decoration: none;
        }
        button{
            border: none;
            border-radius: 10px;
            padding: 0px 10px;
            background-color: #ffc800;
            color: #fff;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            font-weight: 5  00;
        }
        button:hover{
            background-color: #d9aa00;

        }
      }  
    `;

  return (
    <Container >
        <Navbar expand="lg" variant="dark" fixed="top" id="mainNav">
            <Head>
                <Drawer/>
                <Navbar.Collapse id="navbarResponsive">
                    <Nav className="ml-auto">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/taxi">Order Taxi</Link></li>
                        <li><Link to="/rent">Rent Car</Link></li>
                        <li><button>LOG-IN</button></li>
                    </Nav>
                </Navbar.Collapse>
            </Head>                
        </Navbar>
    </Container>
  );
};

export default Header;