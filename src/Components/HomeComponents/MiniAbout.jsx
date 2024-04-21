import { Grid } from '@mui/material'
import styled from 'styled-components';
import React from 'react';
import headphones from '../../Assets/logos/headphones.png';
import laptop from '../../Assets/logos/laptop.png';
import leaves from '../../Assets/logos/leaves.png';
import easy from '../../Assets/logos/easy-to-use.png';
import free from '../../Assets/logos/free.png';
import shield from '../../Assets/logos/shield.png';


const Item = styled.div`
    height:100px;
    border: 3px solid #000;
    border-radius: 15px;
    display: flex;
    align-items: center;
    img{
        width: 25%;
        height: 80%;
        border-left: 2px solid #000;
    }
`;


const TextPart = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 75%;
    padding: 10px 15px;
    text-align: start;
    h6{
        padding-top: 10px;
        color: #FFC800;
        text-transform: uppercase;
    }
`;

const MiniAbout = () => {
  return (
    <div>
        <section className="page-section" id="miniAbout">
            <div className="container">
                <div className="text-center">
                    <h1 className="section-heading text-uppercase">Why choose us</h1>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Item>
                            <TextPart>
                                <h6>24/7 service</h6>
                                <p>Lorem ipsum dolor sit amet consectetur</p>
                            </TextPart>
                            <img src={headphones} alt="fuck" />
                        </Item>
                      </Grid>
                      <Grid item xs={12} md={4}>
                      <Item>
                            <TextPart>
                                <h6>Easy to use</h6>
                                <p>Lorem ipsum dolor sit amet consectetur</p>
                            </TextPart>
                            <img src={easy} alt="fuck" />
                        </Item>
                      </Grid>
                      <Grid item xs={12} md={4}>
                      <Item>
                            <TextPart>
                                <h6>Online access</h6>
                                <p>Lorem ipsum dolor sit amet consectetur</p>
                            </TextPart>
                            <img src={laptop} alt="fuck" />
                        </Item>
                      </Grid>
                      <Grid item xs={12} md={4}>
                      <Item>
                            <TextPart>
                                <h6>Eco Friendly</h6>
                                <p>Lorem ipsum dolor sit amet consectetur</p>
                            </TextPart>
                            <img src={leaves} alt="fuck" />
                        </Item>
                      </Grid>
                      <Grid item xs={12} md={4}>
                      <Item>
                            <TextPart>
                                <h6>It's Free</h6>
                                <p>Lorem ipsum dolor sit amet consectetur</p>
                            </TextPart>
                            <img src={free} alt="fuck" />
                        </Item>
                      </Grid>
                      <Grid item xs={12} md={4}>
                      <Item>
                            <TextPart>
                                <h6>We value safety</h6>
                                <p>Lorem ipsum dolor sit amet consectetur</p>
                            </TextPart>
                            <img src={shield} alt="fuck" />
                        </Item>
                      </Grid>
                    </Grid>
                </div>
            </div>
        </section>
    </div>
  )
}

export default MiniAbout