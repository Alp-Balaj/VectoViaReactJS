import React from 'react';
import Header from './Components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Rent from './Pages/Rent';
import Taxi from './Pages/Taxi';


const App = () => {
  return (
    <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/taxi' element={<Taxi/>} />
          <Route path='/rent' element={<Rent/>} />
        </Routes>
    </Router>
  )
}

export default App