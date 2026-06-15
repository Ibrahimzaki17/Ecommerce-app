import HomePage from './pages/HomePage.jsx';
import './App.css'
import { Routes, Route } from 'react-router';
import CheckOut from './pages/CheckOut.jsx';
import Orders from './pages/Orders.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import { useState } from 'react';


function App() {

  const [cart, setCart] = useState([]);

  return(
    <> 
    <Routes>
      <Route index element={<HomePage cart={cart} setCart={setCart} />} />
      <Route path='checkout' element={<CheckOut />} />
      <Route path='orders' element={<Orders cart={cart} />} />
      <Route path='tracking' element={<TrackingPage cart={cart} />} />
    </Routes>
    </>
  );
}

 export default App