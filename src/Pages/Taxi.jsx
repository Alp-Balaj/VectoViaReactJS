import React from 'react'
import Header from '../Components/Header'
import Hero from '../Components/TaxiComponents/Hero'
import TaxiServices from '../Components/TaxiComponents/TaxiServices'
import CallTaxi from '../Components/TaxiComponents/CallTaxi'

const Taxi = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <TaxiServices/>
      <CallTaxi/>
    </div>
  )
}

export default Taxi