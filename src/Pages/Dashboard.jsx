import React from 'react';
import TopNav from '../Components/DashboardComponents/TopNav';
import styled from 'styled-components';
import UserTable from '../Components/DashboardComponents/Users/UserTable';
import RoleTable from '../Components/DashboardComponents/Users/RoleTable';
import KompaniaTaxiTable from '../Components/DashboardComponents/KompaniaTaxi/KompaniaTaxiTable';
import QytetiTable from '../Components/DashboardComponents/KompaniaTaxi/QytetiTable';
import { useState } from 'react';
import logo from '../Assets/logos/SiteLogo.jpg';
import MarkaTable from '../Components/DashboardComponents/Cars/MarkaTable';
import CarsTable from '../Components/DashboardComponents/Cars/CarsTable';
 import KompaniaRent from '../Components/DashboardComponents/KompaniaRent';
 import PickUpLocation from '../Components/DashboardComponents/PickUpLocation';

const Dash = styled.div`
    display: flex;
    height: 100vh;
`;


const Side = styled.div`
    overflow-y: auto;
    width: 20%;
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
                cursor: pointer;
                &:hover {
                    background-color: #ffc107;
                    color: #fff;
                }
            }
        }
    }
`;

const Under = styled.div`
    background-color: #F0F0F0;
    padding: 10px 0;
    a{
        margin: 0px 20px;
    }
`

const Window = styled.div`
    border-top: 3px solid #ffc107;
    border-left: 3px solid #ffc107;
    height: calc(100% - 90px);
`;


const Dashboard = () => {
  const [activeTable, setActiveTable] = useState(null);
  const [showUserButtons, setShowUserButtons] = useState(false); 
  const [showLocationButton, setShowLocationButton] = useState(false); 
  const [showKompaniaTaxiButtons, setShowKompaniaTaxiButtons] = useState(false); 
  const [showCarButtons, setShowCarButtons] = useState(false); 



  const toggleTable = (table) => {
    if (activeTable === table) {
      setActiveTable(null);
    } else {
      setActiveTable(table); 
    }
  };

  const handleUserLinkClick = () => {
    setShowUserButtons(!showUserButtons); 
  };

  const handleLocationLinkClick = () => {
    setShowLocationButton(!showLocationButton); 
  };

  const handleKompaniaTaxiLinkClick = () => {
    setShowKompaniaTaxiButtons(!showKompaniaTaxiButtons); 
  };



  const handleCarsLinkClick = () => {
    setShowCarButtons(!showCarButtons); 
  };

  return (
    <Dash>
        <Side>
            <img src={logo} alt="Site Logo" />
            <ul>
                <li>
                    <a onClick={handleUserLinkClick}>Users</a>
                    {showUserButtons && (
                      <Under>
                        <ul>
                            <li><a className='underNeath' onClick={() => toggleTable('user')}>
                              {activeTable === 'user' ? 'Hide User Table' : 'Show User Table'}
                            </a></li>
                            <li><a className='underNeath' onClick={() => toggleTable('role')}>
                              {activeTable === 'role' ? 'Hide Role Table' : 'Show Role Table'}
                            </a></li>
                        </ul>
                      </Under>
                    )}
                </li>
                
                <li>
                    <a onClick={handleKompaniaTaxiLinkClick}>Kompania Taxi</a>
                    {showKompaniaTaxiButtons && (
                      <Under>
                        <ul>
                            <li><a className='underNeath' onClick={() => toggleTable('kompTaxi')}>
                              {activeTable === 'kompTaxi' ? 'Hide Kompania Taxi Table' : 'Show Kompania Taxi Table'}
                            </a></li>
                            <li><a className='underNeath' onClick={() => toggleTable('qyteti')}>
                              {activeTable === 'qyteti' ? 'Hide Qyteti Table' : 'Show Qyteti Table'}
                            </a></li>
                        </ul>
                      </Under>
                    )}
                </li>
                { <li>
                    <a onClick={handleLocationLinkClick}>Kompania Rent</a>
                    {showLocationButton && (
                      <Under>
                        <ul>
                            <li><a className='underNeath' onClick={() => toggleTable('location')}>
                              {activeTable === 'location' ? 'Hide PickUp Location Table' : 'Show PickUp Location Table'}
                            </a></li>
                            <li><a className='underNeath' onClick={() => toggleTable('kompaniaRent')}>
                              {activeTable === 'kompaniaRent' ? 'Hide RentCompanies Table' : 'Show RentCompanies Table'}
                            </a></li>
                        </ul>
                      </Under>
                    )}
                </li> }
                <li>
                    <a onClick={handleCarsLinkClick}>Cars</a>
                    {showCarButtons && (
                      <Under>
                        <ul>
                        <li><a className='underNeath' onClick={() => toggleTable('cars')}>
                              {activeTable === 'cars' ? 'Hide Cars Table' : 'Show Cars Table'}
                            </a></li>
                            <li><a className='underNeath' onClick={() => toggleTable('marka')}>
                              {activeTable === 'marka' ? 'Hide Marka Table' : 'Show Marka Table'}
                            </a></li>
                        </ul>
                      </Under>
                    )}
                </li>
            </ul>
        </Side>
        <div>
            <TopNav/>
            <Window>
                {activeTable === 'role' && <RoleTable />}
                {activeTable === 'user' && <UserTable />}
                 {activeTable === 'location' && <PickUpLocation />}
                {activeTable === 'kompaniaRent' && <KompaniaRent />} 
                {activeTable === 'kompTaxi' && <KompaniaTaxiTable />}
                {activeTable === 'qyteti' && <QytetiTable />}
                {activeTable === 'cars' && <CarsTable />}
                {activeTable === 'marka' && <MarkaTable />}
            </Window>
        </div>
    </Dash>
  );
}

export default Dashboard;