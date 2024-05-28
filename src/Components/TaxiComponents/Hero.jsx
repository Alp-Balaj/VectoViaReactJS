import React from 'react';
import "../../Pages/Style/styles.css";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div>
        <header className="mastheadTaxi">
          <div className="heroFix container">
              <div className="mastheadTaxi-subheading">Want to order a Taxi?</div>
              <div className="mastheadTaxi-heading text-uppercase">You've come to the right place</div>
              <Link className="btn btn-primary btn-xl text-uppercase" to='/rent'>Rent A Car</Link>
          </div>
        </header>
    </div>
  )
}

export default Hero;
