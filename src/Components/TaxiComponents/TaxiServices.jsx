import {React, useEffect} from "react";
import '../../Pages/Style/styles.css';
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import HouseIcon from "@mui/icons-material/House";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WalletIcon from '@mui/icons-material/Wallet';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AOS from 'aos';
import 'aos/dist/aos.css';
  
const TaxiServ = styled.div`
  background-color: #ebe8e8;
  padding-top: 150px;
  padding-bottom: 150px;
`;

const Box = styled.div`
  background-color: #fff;
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
        transition: background-color 0.3s ease;
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

const H3 = styled.div`
  font-size: 1rem;
  font-weight: 400;
  font-style: italic;
  font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  margin-bottom: 4rem;
  --bs-text-opacity: 1;
  color: #6c757d !important;
`

const TaxiServices = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <TaxiServ>
      <div className="container">
        <div className="text-center">
          <h2 data-aos="zoom-out" className="section-heading text-uppercase">Taxi Services</h2>
          <H3 data-aos="zoom-out">
            If you need a taxi you have come to the right place.
          </H3>
        </div>
      </div>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box data-aos="zoom-out-right">
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
            <Box data-aos="zoom-out-down">
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
            <Box data-aos="zoom-out-left">
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
            <Box data-aos="fade-up-right">
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
            <Box data-aos="fade-up">
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
            <Box data-aos="fade-up-left">
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
