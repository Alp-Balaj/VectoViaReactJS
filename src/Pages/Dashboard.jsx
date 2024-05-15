import React from 'react';
import SideNav from '../Components/DashboardComponents/SideNav';
import TopNav from '../Components/DashboardComponents/TopNav';
import styled from 'styled-components';
import UserTable from '../Components/DashboardComponents/UserTable';

const Dash = styled.div`
    display: flex;
`;

const Dashboard = () => {
  return (
    <Dash>
        <SideNav/>
        <div>
            <TopNav/>
            <UserTable />
        </div>
    </Dash>
  )
}

export default Dashboard