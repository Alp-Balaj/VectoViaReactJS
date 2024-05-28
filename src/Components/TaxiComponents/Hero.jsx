import {React, useEffect} from 'react';
import "../../Pages/Style/styles.css";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  
  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <div>
        <header className="mastheadTaxi">
          <div className="heroFix container">
              <div data-aos="fade-up" className="mastheadTaxi-subheading">Want to order a Taxi?</div>
              <div data-aos="fade-up" className="mastheadTaxi-heading text-uppercase">You've come to the right place</div>
              <Link data-aos="fade-up" data-aos-duration="1000" className="btn btn-primary btn-xl text-uppercase" to='/rent'>Rent A Car</Link>
          </div>
        </header>
    </div>
  )
}

export default Hero;
