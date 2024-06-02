import React from 'react';   
import Hero from '../Components/HomeComponents/Hero'
import OurServices from '../Components/HomeComponents/OurServices';
import MiniAbout from '../Components/HomeComponents/MiniAbout';
import OurTeam from '../Components/HomeComponents/OurTeam';
import MyFooter from '../Components/Footer/index';
import Sponsors from '../Components/HomeComponents/Sponsors';
import Contact from '../Components/HomeComponents/Contact';
import Header from '../Components/Header';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [Home]);
    return (
  <div>
    <Header/>
    <Hero/>
    <OurServices/>
    <MiniAbout/>
    <OurTeam/>
    <Sponsors/>
    <Contact/>
    <MyFooter/>
  </div>
  )
}

export default Home;