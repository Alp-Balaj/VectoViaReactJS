import { React, useEffect } from "react";
import "../../Pages/Style/styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

const OurServices = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <h2 data-aos="zoom-out" className="section-heading text-uppercase">
              Services
            </h2>
            <h3 data-aos="zoom-out" className="section-subheading text-muted">
              Our services that we offer!
            </h3>
          </div>
          <div className="row text-center easyfix">
            <div
              data-aos="fade-up"
              data-aos-duration="750"
              className="col-md-4"
            >
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Taxi</h4>
              <p className="text-muted">
                Taking a taxi has never been easier with our reliable and
                efficient service. Whether you need a quick ride across town or
                a comfortable trip to the airport, our professional drivers are
                ready to get you to your destination safely and on time.
              </p>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="750"
              className="col-md-4"
            >
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Rent</h4>
              <p className="text-muted">
                Renting a taxi is a convenient and flexible option for all your
                transportation needs. Whether you're planning a day trip, need a
                vehicle for business purposes, or require transportation for a
                special event, our taxi rental service offers a wide range of
                vehicles to suit your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurServices;
