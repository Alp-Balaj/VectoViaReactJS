import {React, useEffect} from "react";
import "../../Pages/Style/styles.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurServices = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div>
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <h2 data-aos="zoom-out" className="section-heading text-uppercase">Services</h2>
            <h3 data-aos="zoom-out" className="section-subheading text-muted">
              Lorem ipsum dolor sit amet consectetur.
            </h3>
          </div>
          <div className="row text-center easyfix">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Taxi</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                maxime quam architecto quo inventore harum ex magni, dicta
                impedit.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Rent</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                maxime quam architecto quo inventore harum ex magni, dicta
                impedit.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
