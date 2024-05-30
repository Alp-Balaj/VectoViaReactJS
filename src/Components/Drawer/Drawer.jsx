import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import siteLogo from '../../Assets/logos/SiteLogo.jpg';
import { Modal, Box, Button } from '@mui/material';
import { AppStateProvider } from '../Context/AppStateProvider';
import Login from '../Header/Login';
import SignUp from '../Header/SignUp';
import { useState } from 'react';



const switcher = {
  cursor: 'pointer',
  color: '#ffc800',
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,  
};


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
            padding: 5px 15px;
            background-color: #ffc800;
            color: black;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            font-size: 15px;
            font-weight: 700;
        }
        button:hover{
            background-color: #d9aa00;

        }
    }
  }
`;

export default function TemporaryDrawer() {
  const [openModal, setOpenModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const toggleLogin = () => {
    setShowLogin(true);
  };
  
  const toggleSignUp = () => {
      setShowLogin(false);
  };

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };


  const DrawerList = (
    <Box sx={{ width: 250, backgroundColor: '#000', height:'100vh' }} role="presentation" onClick={toggleDrawer(false)}>
      <h1 style={{color: '#FFC800', textAlign: 'center'}}>VectoVia</h1>
      <SideNav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/taxi">Order Taxi</Link></li>
          <li><Link to="/rent">Rent Car</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          {localStorage.getItem("token") ? (
              <li><Button onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("userInfo");
                  window.location.reload();
              }}>LOG-OUT</Button></li>
          ) : (
              <li><Button onClick={handleOpen}>LOG-IN</Button></li>
          )}
        </ul>
      </SideNav>
      
    </Box>
  );

  return (
    <div>
      <Button style={{color: '#FFC800', marginLeft:'0px'}} onClick={toggleDrawer(true)}><img style={{height: '50px', borderRadius:'15px 0px 0px 15px'}} src={siteLogo} alt='idk' /></Button>
      <Drawer style={{backgroundColor: '#000000b9'}} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
          <AppStateProvider>
              {showLogin ? (
                  <>
                      <Login />
                      <p>Don't have an account? <a style={switcher} onClick={toggleSignUp}>Register</a></p>
                  </>
              ) : (
                  <>
                      <SignUp />
                      <p>Already have an account? <a style={switcher} onClick={toggleLogin}>Login</a></p>
                  </>
              )}
          </AppStateProvider>
          </Box>
      </Modal>
    </div>
  );
}