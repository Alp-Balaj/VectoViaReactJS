import {React, useEffect} from "react";
import "../../Pages/Style/styles.css";
import twitterLogo from "../../Assets/logos/twitterLogo.png";
import facebookLogo from "../../Assets/logos/facebookLogo.png";
import linkedInLogo from "../../Assets/logos/linkedinLogo.png";
import styled from "styled-components";
import face from "../../Assets/Images/photo.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const OurTeam = () => {

  useEffect(() => {
    AOS.init();
  }, [])


  return (
    <div>
      <section className="page-section bg-light" id="team">
        <div className="container">
          <div className="text-center">
            <h2 data-aos="fade-up" className="section-heading text-uppercase">Our Amazing Team</h2>
            <h3 data-aos="fade-up" className="section-subheading text-muted">
              Lorem ipsum dolor sit amet consectetur.
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <TeamMember>
              <img data-aos="flip-right" className="mx-auto rounded-circle" src={face} alt="..." />
              <h4 data-aos="fade-up" data-aos-duration="2000">Alp Balaj</h4>
              <p data-aos="fade-up" data-aos-duration="2000" className="text-muted">Lead Software Engineer</p>
              <div data-aos="fade-up" data-aos-duration="2000">
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Twitter"
                >
                  <img style={{ height: "25px" }} src={twitterLogo}></img>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Facebook"
                >
                  <img style={{ height: "25px" }} src={facebookLogo}></img>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="LinkedIn"
                >
                  <img style={{ height: "25px" }} src={linkedInLogo}></img>
                </a>
              </div>
            </TeamMember>
          </div>
          <div className="col-lg-3">
            <TeamMember>
              <img data-aos="flip-right" data-aos-duration="1000" className="mx-auto rounded-circle" src={face} alt="..." />
              <h4 data-aos="fade-up" data-aos-duration="2000">Altin Millaku</h4>
              <p data-aos="fade-up" data-aos-duration="2000" className="text-muted">Lead Software Engineer</p>
              <div data-aos="fade-up" data-aos-duration="2000">
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Twitter"
                >
                  <img style={{ height: "25px" }} src={twitterLogo}></img>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Facebook"
                >
                  <img style={{ height: "25px" }} src={facebookLogo}></img>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="LinkedIn"
                >
                  <img style={{ height: "25px" }} src={linkedInLogo}></img>
                </a>
              </div>
            </TeamMember>
          </div>
          <div className="col-lg-3">
            <TeamMember>
              <img data-aos="flip-right" data-aos-duration="1500" className="mx-auto rounded-circle" src={face} alt="..." />
              <h4 data-aos="fade-up" data-aos-duration="2000">Edrin Krasniqi</h4>
              <p data-aos="fade-up" data-aos-duration="2000" className="text-muted">Lead Software Engineer</p>
              <div data-aos="fade-up" data-aos-duration="2000">
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Twitter"
                >
                  <img style={{ height: "25px" }} src={twitterLogo}></img>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Facebook"
                >
                  <img style={{ height: "25px" }} src={facebookLogo}></img>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="LinkedIn"
                >
                  <img style={{ height: "25px" }} src={linkedInLogo}></img>
                </a>
              </div>
            </TeamMember>
          </div>
          <div className="col-lg-3">
            <TeamMember>
              <img data-aos="flip-right" data-aos-duration="2000" className="mx-auto rounded-circle" src={face} alt="..." />
              <h4 data-aos="fade-up" data-aos-duration="2000">Lorik Aliu</h4>
              <p data-aos="fade-up" data-aos-duration="2000" className="text-muted">Lead Software Engineer</p>
              <div data-aos="fade-up" data-aos-duration="2000">
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Twitter"
                >
                  <img style={{ height: "25px" }} src={twitterLogo}></img>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="Facebook"
                >
                  <img style={{ height: "25px" }} src={facebookLogo}></img>
                </a>
                <a
                  className="btn btn-dark btn-social mx-2"
                  href="#!"
                  aria-label="LinkedIn"
                >
                  <img style={{ height: "25px" }} src={linkedInLogo}></img>
                </a>
              </div>
            </TeamMember>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
