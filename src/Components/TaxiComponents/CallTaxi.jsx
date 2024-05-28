import {React, useEffect} from "react";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Calls = styled.div`
  background-color: #fff;
  padding-top: 150px;
  padding-bottom: 150px;
`;

const Card = styled.div`
  background-color: #ebe8e8;
  width: 100%;
  height: 450px;
  border-radius: 10px;
  .Image{
    width: 50%;
    height:100%;
  }
  .Text{
    width: 50%;
    height:100%;
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


const CallTaxi = () => {
    useEffect(() => {
        AOS.init();
      }, [])
  return (
    <Calls>
      <div className="container">
        <div className="text-center">
          <h2 data-aos="zoom-out" className="section-heading text-uppercase">
            Call a Taxi!
          </h2>
          <H3 data-aos="zoom-out">
            You wont be dissapointed.
          </H3>
        </div>
      </div>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Card>
                <div className="Image">
                    <img src="" alt="" />
                </div>
                <div className="Text">

                </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Calls>
  );
};

export default CallTaxi;
