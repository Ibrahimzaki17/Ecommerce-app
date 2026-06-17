import { NavLink } from "react-router";
import Header from "../../components/Header";
import "./orders.css";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import OrdersGrid from "./OrdersGrid";

function Orders({ cart, products }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    };

    fetchOrdersData();
  },[]);

  /*
  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);
  */

  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} products={products} />
      </div>
    </>
  );
}

export default Orders;
