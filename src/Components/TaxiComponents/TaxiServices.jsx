import React from "react";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import HouseIcon from "@mui/icons-material/House";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WalletIcon from '@mui/icons-material/Wallet';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const TaxiServ = styled.div`
  background-color: #ebe8e8;
  padding-top: 150px;
  padding-bottom: 150px;
`;

const Box = styled.div`
  background-color: #fff;
  transition: background-color 0.3s ease;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background-color: #ffc800;

    .MiniBox {
      background-color: #ffc800;
    }
    .icon {
      .iconImg {
        background-color: #f3d771 !important;
        box-shadow: 0 4px 8px rgb(255, 255, 255) !important;
      }
    }
    .text {
      h1 {
        color: #fff;
      }
    }
  }
  .MiniBox {
    width: 80%;
    height: 70%;
    background-color: white;
    transition: background-color 0.3s ease;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .icon {
      width: 100%;
      height: 50%;
      .iconImg {
        height: 100%;
        width: 33%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #d9aa00;
        transition: background-color 0.6s ease;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
    .text {
      height: 100%;
      display: flex;
      align-items: end;
      width: 100%;
      height: 50%;
    }
  }
`;

const TaxiServices = () => {
  return (
    <TaxiServ>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box>
              <div className="MiniBox">
                <div className="icon">
                  <div className="iconImg">
                    <HouseIcon style={{ color: "white", fontSize: "50px" }} />
                  </div>
                </div>
                <div className="text">
                  <h1>Home Pickup</h1>
                </div>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <div className="MiniBox">
                <div className="icon">
                  <div className="iconImg">
                    <FlightTakeoffIcon style={{ color: "white", fontSize: "50px" }} />
                  </div>
                </div>
                <div className="text">
                  <h1>Airport Pickup</h1>
                </div>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <div className="MiniBox">
                <div className="icon">
                  <div className="iconImg">
                    <ApartmentIcon style={{ color: "white", fontSize: "50px" }} />
                  </div>
                </div>
                <div className="text">
                  <h1>Company Contract</h1>
                </div>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <div className="MiniBox">
                <div className="icon">
                  <div className="iconImg">
                    <WalletIcon style={{ color: "white", fontSize: "50px" }} />
                  </div>
                </div>
                <div className="text">
                  <h1>Conveniant prices</h1>
                </div>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <div className="MiniBox">
                <div className="icon">
                  <div className="iconImg">
                    <LocalTaxiIcon style={{ color: "white", fontSize: "50px" }} />
                  </div>
                </div>
                <div className="text">
                  <h1>Best Drivers</h1>
                </div>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <div className="MiniBox">
                <div className="icon">
                  <div className="iconImg">
                    <AutoAwesomeIcon style={{ color: "white", fontSize: "50px" }} />
                  </div>
                </div>
                <div className="text">
                  <h1>Fancy choices</h1>
                </div>
              </div>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </TaxiServ>
  );
};

export default TaxiServices;
