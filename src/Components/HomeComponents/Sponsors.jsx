import React from 'react'
import "../../Pages/Style/styles.css";
import instagram from "../../Assets/logos/Instagram.png";
import facebook from "../../Assets/logos/facebook.svg";
import linkedIn from "../../Assets/logos/linkedInName.png";
import twitter from "../../Assets/logos/twitterName.png";

const Sponsors = () => {
  return (
    <div>
        <div className="text-center">
            <h2 style={{
                fontSize: "2.5rem",
                marginTop: "50px",
                marginBottom: "1rem",
                textTransform: "uppercase"
            }}>Want to learn more?</h2>
            <h4 style={{
                fontSize: "1rem",
                fontWeight: 400,
                fontStyle: "italic",
                marginBottom: "4rem"
            }}>Visit us at our official social medias</h4>
        </div>
        <div className="py-5">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto grayedOut instagramFix" src={instagram} alt="..."/></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto grayedOut" src={twitter} alt="..."/></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto grayedOut" src={facebook} alt="..."/></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto grayedOut" src={linkedIn} alt="..."/></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sponsors