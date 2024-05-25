import React from 'react';
import SideNav from '../Components/DashboardComponents/SideNav';
import TopNav from '../Components/DashboardComponents/TopNav';
import styled from 'styled-components';
import UserTable from '../Components/DashboardComponents/UserTable';
import RoleTable from '../Components/DashboardComponents/RoleTable';
import { useState } from 'react';

const Dash = styled.div`
    display: flex;
`;

const Dashboard = () => {

  const [showRoleTable, setShowRoleTable] = useState(false);
  const [showUserTable, setShowUserTable] = useState(false);

  
  return (
    <Dash>
        <SideNav/>
        <div>
            <TopNav/>
            <button onClick={() => setShowRoleTable(!showRoleTable)}>
                {showRoleTable ? 'Hide Role Table' : 'Show Role Table'}
            </button>
            <button onClick={() => setShowUserTable(!showUserTable)}>
                {showUserTable ? 'Hide User Table' : 'Show User Table'}
            </button>
            {showRoleTable && <RoleTable />}
            {showUserTable && <UserTable />}
        </div>
    </Dash>
  )
}

export default Dashboard