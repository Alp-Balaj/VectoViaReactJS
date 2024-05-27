import {React, useState, useEffect} from 'react';
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
import PickUpLocation from './Components/DashboardComponents/PickUpLocation.jsx';
import { jwtDecode } from 'jwt-decode';


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token'));

  const checkTokenExpiry = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      console.log(currentTime);
      if (decodedToken.exp < currentTime) {
        logout();
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem("userInfo");
    window.location.reload();
    setToken(null);
  };


  useEffect(() => {
    const timer = setInterval(checkTokenExpiry, 1000); 
    return () => clearInterval(timer);
  }, []);

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
          <Route path='/dashboard/pick-up-location' element={<PrivateRoute><PickUpLocation/></PrivateRoute>} />
        </Routes>
    </Router>
  )
}

export default App