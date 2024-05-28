import React from 'react';
import "../../Pages/Style/styles.css";
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div>
        <header className="masthead">
          <div className="heroFix container">
              <div className="masthead-subheading">Welcome To VectoVia!</div>
              <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
              <div className='littleFix'>
              <Link className="btn btn-primary btn-xl text-uppercase" to='/taxi'>Call A Taxi</Link>
              <Link className="btn btn-primary btn-xl text-uppercase" to='/rent'>Rent A Car</Link>
              </div>
          </div>
        </header>
    </div>
  )
}

export default Hero;
