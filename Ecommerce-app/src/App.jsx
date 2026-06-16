import HomePage from './pages/Home/HomePage.jsx';
import './App.css'
import { Routes, Route } from 'react-router';
import CheckOut from './pages/CheckOut/CheckOut.jsx';
import Orders from './pages/Orders/Orders.jsx';
import TrackingPage from './pages/Tracking/TrackingPage.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/cart-items?expand=product")
      .then((response) => {
        setCart(response.data)
    })
  }, []);

  return(
    <> 
    <Routes>
      <Route index element={<HomePage cart={cart} products={products} setProducts={setProducts} />} />
      <Route path='checkout' element={<CheckOut cart={cart} />} />
      <Route path='orders' element={<Orders cart={cart} products={products} />} />
      <Route path='tracking' element={<TrackingPage cart={cart} />} />
    </Routes>
    </>
  );
}

 export default App