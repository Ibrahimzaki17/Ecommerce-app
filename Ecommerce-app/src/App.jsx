import HomePage from './pages/HomePage.jsx';
import './App.css'
import { Routes, Route } from 'react-router';
import CheckOut from './pages/CheckOut.jsx';
import Orders from './pages/Orders.jsx';
import TrackingPage from './pages/TrackingPage.jsx';

//test

function App() {

  return(
    <> 
    <Routes>
      <Route index element={<HomePage />} />
      <Route path='checkout' element={<CheckOut />} />
      <Route path='orders' element={<Orders />} />
      <Route path='tracking' element={<TrackingPage />} />
    </Routes>
    </>
  );
}

 export default App