import React from 'react';
import '../../Pages/Style/styles.css'
import facebookLogo from '../../Assets/logos/facebookLogo.png'
import twitterLogo from '../../Assets/logos/twitterLogo.png'
import linkedInLogo from '../../Assets/logos/linkedinLogo.png'

const MyFooter = () => {
  return (
    <footer className="footer py-4">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-4 text-lg-start">Copyright &copy; VectVia 2024</div>
                <div className="col-lg-4 my-3 my-lg-0">
                    <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><img style={{height:'25px'}} src={twitterLogo}></img></a>
                    <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><img style={{height:'25px'}} src={facebookLogo}></img></a>
                    <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><img style={{height:'25px'}} src={linkedInLogo}></img></a>
                </div>
                <div className="col-lg-4 text-lg-end">
                    <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                    <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default MyFooter