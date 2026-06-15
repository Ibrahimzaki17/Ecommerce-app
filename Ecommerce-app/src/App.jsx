import HomePage from './pages/HomePage.jsx';
import './App.css'
import { Routes, Route } from 'react-router';
import CheckOut from './pages/CheckOut.jsx';
import Orders from './pages/Orders.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product")
      .then((response) => {
        setCart(response.data)
    })
  }, []);

  return(
    <> 
    <Routes>
      <Route index element={<HomePage cart={cart} setCart={setCart} />} />
      <Route path='checkout' element={<CheckOut cart={cart} />} />
      <Route path='orders' element={<Orders cart={cart} />} />
      <Route path='tracking' element={<TrackingPage cart={cart} />} />
    </Routes>
    </>
  );
}

 export default App