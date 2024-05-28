import {React, useEffect, useState} from "react";
import { Container, Grid } from "@mui/material";
import styled from "styled-components";
import AOS from 'aos';
import 'aos/dist/aos.css';
import blueTaxi from '../../Assets/Images/blueTaxi.jpg';
import axios from "axios";

const Calls = styled.div`
  background-color: #fff;
  padding-top: 150px;
  padding-bottom: 150px;
`;

const Card = styled.div`
  background-color: #ebe8e849;
  width: 100%;
  height: 450px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  .innerCard{
    background-color: #fff;
    width: 95%;
    height: 85%;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    box-shadow: 0px 0px 20px 6px #00000054;
    .Text{
      padding: 25px 25px 25px 0px;
      width: 50%;
      height:100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title{
        height: 15%;
        h1 {
          font-size: 2.5em;
          margin: 0;
        }
      }
      .textBody{
        height: 80%;
        
        .textPlacement{

          height: 60%;
          display: flex;

          .sinatra{
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 35%;
            ul{
              list-style: none;
            }
          }

          .sinatraAnswers{
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 65%;
            ul{
              list-style: none;
            }
          }

        }
        .buttonPlacement{
          height: 40%;
          display: flex;
          justify-content: end;
          align-items: end;
        }
      }
    }
    .Image{
      border-radius: 10px;
      width: 45%;
      height:100%;
      img{
        border-radius: 10px;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  width: 110px;
  height: 30px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 5px 10px;
  color: #fff;
  transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  font-weight: 600;
  font-size: 20px;
  &:hover{
    box-shadow: 0px 0px 20px 6px #00000054;
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

  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
      AOS.init();
      const fetchData = async () => {
        try {
          const response = await axios.get("https://localhost:7081/api/KompaniaTaxis/get-kompaniteTaxi");
          const companiesWithQyteti = await Promise.all(response.data.map(async company => {
            const qytetiResponse = await axios.get(`https://localhost:7081/api/Qyteti/get-qyteti-id/${company.qytetiId}`);
            return { ...company, qytetiName: qytetiResponse.data.name };
          }));
          setCompanies(companiesWithQyteti); 
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message || 'Error fetching data');
        }
      };
  
      fetchData();
    }, []);
      
    
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
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            {companies.map(company => (
              <Card key={company.companyID}  data-aos={(company.companyID%2) === 0 ? "fade-left" : "fade-right"} data-aos-duration="1500">
                <div className="innerCard">
                  <div className="Image" style={{boxShadow: `0px 0px 20px 20px ${company.secondaryColour}`}}>
                      <img src={company.image} alt="" />
                  </div>
                  <div className="Text">
                      <div className="title">
                        <h1 style={{color: `${company.primaryColour}`}}>{company.kompania}</h1>
                      </div>
                      <div className="textBody">
                        <div className="textPlacement">
                          <div className="sinatra">
                            <h4>Contact us at:</h4>
                            <h4>Our insurance:</h4>
                            <h4>Find us in:</h4>
                          </div>
                          <div className="sinatraAnswers"> 
                            <h4 style={{fontWeight:'300'}}>{company.contactInfo}</h4>
                            <h4 style={{fontWeight:'300'}}> {company.sigurimi}</h4 >
                            <h4 style={{fontWeight:'300'}}> {company.qytetiName}</h4>
                          </div>
                        </div>
                        <div className="buttonPlacement">
                          <Button style={{backgroundColor:`${company.primaryColour}`}}>Call Now!</Button>
                        </div>
                      </div>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Calls>
  );
};

export default CallTaxi;
