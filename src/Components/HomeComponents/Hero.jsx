import React from 'react';
import "../../Pages/Style/styles.css";

const Hero = () => {
  return (
    <div>
        <header className="masthead">
        <div className="heroFix container">
            <div className="masthead-subheading">Welcome To VectoVia!</div>
            <div className="masthead-heading text-uppercase">It's Nice To Meet You</div>
            <div className='littleFix'>
            <a className="btn btn-primary btn-xl text-uppercase" href="#services">Call A Taxi</a>
            <a className="btn btn-primary btn-xl text-uppercase" href="#services">Rent A Car</a>
            </div>
        </div>
    </header>
    </div>
  )
}

export default Hero