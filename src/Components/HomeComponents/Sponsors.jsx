import {React, useEffect} from "react";
import "../../Pages/Style/styles.css";
import instagram from "../../Assets/logos/Instagram.png";
import facebook from "../../Assets/logos/facebook.svg";
import linkedIn from "../../Assets/logos/linkedInName.png";
import twitter from "../../Assets/logos/twitterName.png";
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from "styled-components";

const H3 = styled.div`
  font-size: 1rem;
  font-weight: 400;
  font-style: italic;
  font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  margin-bottom: 4rem;
  --bs-text-opacity: 1;
  color: #6c757d !important;
`

const Sponsors = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div className="text-center">
        <h2 data-aos="fade-up"
          style={{
            fontSize: "2.5rem",
            marginTop: "50px",
            marginBottom: "1rem",
            textTransform: "uppercase",
          }}
        >
          Want to learn more?
        </h2>
        <H3 data-aos="fade-up">
          Visit us at our official social medias
        </H3>
      </div>
      <div className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div data-aos="fade-right" data-aos-duration="500" data-aos-easing="ease-in-sine" className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto grayedOut instagramFix"
                  src={instagram}
                  alt="..."
                />
              </a>
            </div>
            <div data-aos="fade-right" data-aos-duration="250" data-aos-easing="ease-in-sine" className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto grayedOut"
                  src={twitter}
                  alt="..."
                />
              </a>
            </div>
            <div data-aos="fade-left" data-aos-duration="250" data-aos-easing="ease-in-sine" className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto grayedOut"
                  src={facebook}
                  alt="..."
                />
              </a>
            </div>
            <div data-aos="fade-left" data-aos-duration="500" data-aos-easing="ease-in-sine" className="col-md-3 col-sm-6 my-3">
              <a href="#!">
                <img
                  className="img-fluid img-brand d-block mx-auto grayedOut"
                  src={linkedIn}
                  alt="..."
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
