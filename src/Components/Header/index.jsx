import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Drawer from '../Drawer/Drawer';
import {React, useState, useEffect } from 'react';
import "../../Pages/Style/styles.css";
import { Container } from '@mui/material';

const Head = styled.div`
    position: fixed;
    height: 75px;
    width: 100%;
    background-color: #00000083;
    transition: background-color 0.6s ease-in;
    &.scrolled {
        background-color: transparent;
    }

`;

const HeaderComps = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: transparent;
    height: 75px;
    transition: background-color 0.6s ease-in-out;
    font-size: 20px;
    &.scrolled{
        margin-top: 10px;
        background-color: #00000083;
        height: 60px;
        border-radius: 15px;
        font-size: 15px;

    }
    ul{
        display: flex;
        list-style: none;
        margin: 0px;
        margin-right: 25px;
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
                font-weight: 500;
            }
            button:hover{
                background-color: #d9aa00;
            }
        }
    }  
`;



const Header = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <Head className={scrolled ? 'scrolled' : ''}>
        {scrolled?(
        <Container>
            <HeaderComps className={scrolled ? 'scrolled' : ''}>
                <Drawer/>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/taxi">Order Taxi</Link></li>
                    <li><Link to="/rent">Rent Car</Link></li>
                    <li><button>LOG-IN</button></li>
                </ul>
            </HeaderComps>
        </Container>) : (
            <HeaderComps className={scrolled ? 'scrolled' : ''}>
            <Drawer/>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/taxi">Order Taxi</Link></li>
                <li><Link to="/rent">Rent Car</Link></li>
                <li><button>LOG-IN</button></li>
            </ul>
        </HeaderComps>
        )}
    </Head> 
  );
};

export default Header;
