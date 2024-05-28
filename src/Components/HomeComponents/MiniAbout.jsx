import { Grid } from "@mui/material";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import headphones from "../../Assets/logos/headphones.png";
import laptop from "../../Assets/logos/laptop.png";
import leaves from "../../Assets/logos/leaves.png";
import easy from "../../Assets/logos/easy-to-use.png";
import free from "../../Assets/logos/free.png";
import shield from "../../Assets/logos/shield.png";
import Container from "@mui/material/Container";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  height: 275px;
  width: 95%;
  padding: 25px 10px;
  border: 1px solid #000;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 16px rgba(0, 0, 0, 0.3);
  }
  min-height: 300px;
  max-height: 600px;
  justify-content: space-around;
  img {
    margin-top: 20px;
    width: 40%;
    height: 40%;
  }
`;

const TextPart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  padding: 0px 15px;
  text-align: center;

  h6 {
    font-size: 30px;
    color: #ffc800;
    text-transform: uppercase;
  }
`;

const Button = styled.button`
  background-color: #ffc800;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e6b700;
  }
`;

const MiniAbout = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    AOS.init();
  }, [])

  return (
 
    <div>
      <section className="page-section" id="miniAbout">
        <div className="container">
          <div className="text-center">
            <h1 data-aos="zoom-out" className="section-heading text-uppercase">Why choose us</h1>
            <h3 data-aos="zoom-out" className="section-subheading text-muted">
              Lorem ipsum dolor sit amet consectetur.
            </h3>
            <Container maxWidth="md">
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Card data-aos="zoom-out-right">
                    <Item>
                      <img src={headphones} alt="fuck" />
                      <TextPart>
                        <h6>24/7 service</h6>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                      </TextPart>
                    </Item>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card data-aos="zoom-out-down">
                    <Item>
                      <img src={easy} alt="Easy to use" />
                      <TextPart>
                        <h6>Easy to use</h6>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                      </TextPart>
                    </Item>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card data-aos="zoom-out-left">
                    <Item>
                      <img src={laptop} alt="fuck" />
                      <TextPart>
                        <h6>Online access</h6>
                        <p>Lorem ipsum dolor sit amet consectetur</p>
                      </TextPart>
                    </Item>
                  </Card>
                </Grid>
                {/* <Grid item xs={12} md={1}></Grid> */}
                {showMore ? (
                  <>
                    <Grid item xs={12} md={4}>
                      <Card data-aos="zoom-out-right">
                        <Item>
                          <img src={leaves} alt="fuck" />
                          <TextPart>
                            <h6>Eco Friendly</h6>
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                          </TextPart>
                        </Item>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card data-aos="zoom-out-up">
                        <Item>
                          <img src={free} alt="fuck" />
                          <TextPart>
                            <h6>It's Free</h6>
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                          </TextPart>
                        </Item>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card data-aos="zoom-out-left">
                        <Item>
                          <img src={shield} alt="fuck" />
                          <TextPart>
                            <h6>We value safety</h6>
                            <p>Lorem ipsum dolor sit amet consectetur</p>
                          </TextPart>
                        </Item>
                      </Card>
                    </Grid>
                  </>
                ) : null}
                <Grid item xs={12}>
                  <Button onClick={handleShowMore}>
                    {showMore ? "Show Less" : "Show More"}
                  </Button>
                </Grid>

                {/* <Grid item xs={12} md={1}></Grid> */}
              </Grid>
            </Container>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MiniAbout;
