import React from 'react'
import Header from '../Components/Header'
import Hero from '../Components/RentComponents/Hero'
import Footer from '../Components/Footer'
import ListCompanies from '../Components/RentComponents/ListCompanies'


const Rent = () => {
    return (
      <div>
        <Header/>
       
        <Hero/>

            <h2 className='rac'>All Rent Companies</h2>
         <ListCompanies />
        <Footer/>
      </div>
    )
  }
  
  export default Rent