import React from 'react';
import TopNav from '../Components/DashboardComponents/TopNav';
import styled from 'styled-components';
import UserTable from '../Components/DashboardComponents/UserTable';
import RoleTable from '../Components/DashboardComponents/RoleTable';
import PickUpLocation from '../Components/DashboardComponents/PickUpLocation';
import { useState } from 'react';
import logo from '../Assets/logos/SiteLogo.jpg';


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
  const [activeTable, setActiveTable] = useState(null); // 'user', 'role', or null
  const [showUserButtons, setShowUserButtons] = useState(false); // State to control visibility of user buttons
  const [showLocationButton, setShowLocationButton] = useState(false); // State to control visibility of location button



  const toggleTable = (table) => {
    if (activeTable === table) {
      setActiveTable(null); // If the same button is clicked, hide the table
    } else {
      setActiveTable(table); // Otherwise, show the selected table
    }
  };

  const handleUserLinkClick = () => {
    setShowUserButtons(!showUserButtons); // Toggle visibility of user buttons
  };

  const handleLocationLinkClick = () => {
    setShowLocationButton(!showLocationButton); // Toggle visibility of location button
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
                
                <li><a onClick="/dashboard/kompania-taxi">Kompania Taxi</a></li>
                <li>
                    <a onClick={handleLocationLinkClick}>Kompania Rent</a>
                    {showLocationButton && (
                      <Under>
                        <ul>
                            <li><a onClick={() => toggleTable('location')}>
                              {activeTable === 'location' ? 'Hide PickUp Location Table' : 'Show PickUp Location Table'}
                            </a></li>
                        </ul>
                      </Under>
                    )}
                </li>
                <li><a onClick="/dashboard/cars">Cars</a></li>
            </ul>
        </Side>
        <div>
            <TopNav/>
            <Window>
                {activeTable === 'role' && <RoleTable />}
                {activeTable === 'user' && <UserTable />}
                {activeTable === 'location' && <PickUpLocation />}
            </Window>
        </div>
    </Dash>
  );
}

export default Dashboard;