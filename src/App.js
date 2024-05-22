import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Rent from './Pages/Rent';
import Taxi from './Pages/Taxi';
import Dashboard from './Pages/Dashboard';
import ErrorPage from './Pages/ErrorPage';
import PrivateRoute from './Components/PrivateRoute';
import NotAdmin from './Pages/NotAdmin.jsx';


const App = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/taxi' element={<Taxi/>} />
          <Route path='/rent' element={<Rent/>} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
          <Route path='*' element={<ErrorPage/>} />
          <Route path='/notAdmin' element={<NotAdmin />} />
        </Routes>
    </Router>
  )
}

export default App