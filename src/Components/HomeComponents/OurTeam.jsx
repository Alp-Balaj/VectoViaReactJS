import React from 'react';
import "../../Pages/Style/styles.css";
import twitterLogo from '../../Assets/logos/twitterLogo.png';
import facebookLogo from '../../Assets/logos/facebookLogo.png';
import linkedInLogo from '../../Assets/logos/linkedinLogo.png';
import styled from 'styled-components';
import face from '../../Assets/Images/photo.jpg';

const TeamMember = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const OurTeam = () => {
  return (
    <div>
        <section className="page-section bg-light" id="team">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                 </div>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <TeamMember>
                        <img className="mx-auto rounded-circle" src={face} alt="..." />
                        <h4>Alp Balaj</h4>
                        <p className="text-muted">Lead Software Engineer</p>
                        <div>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><img style={{height:'25px'}} src={twitterLogo}></img></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><img style={{height:'25px'}} src={facebookLogo}></img></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><img style={{height:'25px'}} src={linkedInLogo}></img></a>
                        </div>
                    </TeamMember>
                </div>
                <div className="col-lg-3">
                    <TeamMember>
                        <img className="mx-auto rounded-circle" src={face} alt="..." />
                        <h4>Altin Millaku</h4>
                        <p className="text-muted">Lead Software Engineer</p>
                        <div>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><img style={{height:'25px'}} src={twitterLogo}></img></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><img style={{height:'25px'}} src={facebookLogo}></img></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><img style={{height:'25px'}} src={linkedInLogo}></img></a>
                        </div>
                    </TeamMember>
                </div>  
                <div className="col-lg-3">
                    <TeamMember>
                        <img className="mx-auto rounded-circle" src={face} alt="..." />
                        <h4>Edrin Krasniqi</h4>
                        <p className="text-muted">Lead Software Engineer</p>
                        <div>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><img style={{height:'25px'}} src={twitterLogo}></img></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><img style={{height:'25px'}} src={facebookLogo}></img></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><img style={{height:'25px'}} src={linkedInLogo}></img></a>
                        </div>
                    </TeamMember>
                </div>  
                <div className="col-lg-3">
                    <TeamMember>
                        <img className="mx-auto rounded-circle" src={face} alt="..." />
                        <h4>Lorik Aliu</h4>
                        <p className="text-muted">Lead Software Engineer</p>
                        <div>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><img style={{height:'25px'}} src={twitterLogo}></img></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><img style={{height:'25px'}} src={facebookLogo}></img></a>
                            <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><img style={{height:'25px'}} src={linkedInLogo}></img></a>
                        </div>
                    </TeamMember>
                </div>    
            </div>  
        </section>
    </div>
  )
}

export default OurTeam