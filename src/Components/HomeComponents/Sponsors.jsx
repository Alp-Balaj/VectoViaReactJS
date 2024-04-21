import React from 'react'
import "../../Pages/Style/styles.css";
import microsoft from "../../Assets/logos/microsoft.svg";
import facebook from "../../Assets/logos/facebook.svg";
import ibm from "../../Assets/logos/ibm.svg";
import google from "../../Assets/logos/google.svg";

const Sponsors = () => {
  return (
    <div>
        <div className="py-5">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-3 col-sm-6 my-3">
                    <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src={microsoft} alt="..." aria-label="Microsoft Logo" /></a>
                </div>
                <div className="col-md-3 col-sm-6 my-3">
                    <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src={google} alt="..." aria-label="Google Logo" /></a>
                </div>
                <div className="col-md-3 col-sm-6 my-3">
                    <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src={facebook} alt="..." aria-label="Facebook Logo" /></a>
                </div>
                <div className="col-md-3 col-sm-6 my-3">
                    <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src={ibm} alt="..." aria-label="IBM Logo" /></a>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Sponsors