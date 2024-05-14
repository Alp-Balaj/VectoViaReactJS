import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import siteLogo from '../../Assets/logos/SiteLogo.jpg';


const SideNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #000;
  ul{
    list-style: none;
    li{
      margin: 20px 0px;
      a{
        text-decoration: none;
        color: #fff;
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
  }
`;

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, backgroundColor: '#000', height:'100vh' }} role="presentation" onClick={toggleDrawer(false)}>
      <SideNav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/taxi">Order Taxi</Link></li>
          <li><Link to="/rent">Rent Car</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><button>Log-in</button></li>
        </ul>
      </SideNav>
      
    </Box>
  );

  return (
    <div>
      <Button style={{marginLeft:'0px', padding:'0px', width:'100%'}} onClick={toggleDrawer(true)}><img style={{height: '50px', borderRadius:'15px 0px 0px 15px'}} src={siteLogo} /></Button>
      <Drawer style={{backgroundColor: '#000000b9'}} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}