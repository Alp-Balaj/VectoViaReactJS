import React, { useEffect } from 'react';
import "../../Pages/Style/styles.css";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div className="mastheadCar2">
      <header>
        <div className="heroFix container d-flex flex-column justify-content-center align-items-center text-center">
          <div data-aos="fade-up" className="mastheadCar2-subheading mb-4">Looking for a car?</div>
          <h1 data-aos="fade-up" className="mastheadCar2-heading text-uppercase mb-4">Explore our premium car rental services</h1>
          <Link data-aos="fade-up" data-aos-duration="1000" className="btn btn-outline-light btn-lg text-uppercase" to='/taxi'>Order A Taxi!</Link>
        </div>
      </header>
    </div>
  )
}

export default Hero;
