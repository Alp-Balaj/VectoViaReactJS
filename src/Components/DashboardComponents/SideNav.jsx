import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../../Assets/logos/SiteLogo.jpg'

const Side = styled.div`
    width: 20%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: black;
    img{
        height:auto;
        width: 100%; 
        border-bottom: 1px solid yellow;
    }
    ul{
        list-style: none;
        li{
            margin: 20px 0px;
            padding: 7px 0px;
            a{
                text-decoration: none;
            }
        }
    }
`;

const SideNav = () => {
  return (
    <Side>
        <img src={logo} alt="" />
        <ul>
            <li><Link>Users</Link></li>
            <li><Link>Kompania Taxi</Link></li>
            <li><Link>Kompania Rent</Link></li>
            <li><Link>Cars</Link></li>
        </ul>
    </Side>
  )
}

export default SideNav