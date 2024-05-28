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
        <header className="masthead">
          <div className="heroFix container">
              <div data-aos="fade-up" className="masthead-subheading">Welcome To VectoVia!</div>
              <div data-aos="fade-up" className="masthead-heading text-uppercase">It's Nice To Meet You</div>
              <div data-aos="fade-up" className='littleFix'>
              <Link data-aos="fade-right" data-aos-duration="750" data-aos-easing="ease-in-sine" className="btn btn-primary btn-xl text-uppercase" to='/taxi'>Call A Taxi</Link>
              <Link data-aos="fade-left" data-aos-duration="750" data-aos-easing="ease-in-sine" className="btn btn-primary btn-xl text-uppercase" to='/rent'>Rent A Car</Link>
              </div>
          </div>
        </header>
    </div>
  )
}

export default Hero;
