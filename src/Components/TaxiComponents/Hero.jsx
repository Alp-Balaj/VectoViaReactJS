import React from 'react';
import "../../Pages/Style/styles.css";

const Hero = () => {
  return (
    <div>
        <header className="mastheadTaxi">
          <div className="heroFix container">
              <div className="mastheadTaxi-subheading">Want to order a Taxi?</div>
              <div className="mastheadTaxi-heading text-uppercase">You've come to the right place</div>
              <a className="btn btn-primary btn-xl text-uppercase" href="#services">Rent A Car</a>
          </div>
        </header>
    </div>
  )
}

export default Hero;
