import "./checkout.css";
import { useState, useEffect } from "react";
import axios from "axios";
import CheckOutHeader from "./CheckOutHeader";
import OrderSummary from "./OrderSummary";
import PaymentSummary from "./PaymentSummary";

function CheckOut({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const fetchCheckOutData = async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);

    };

    fetchCheckOutData();
  }, []);

  useEffect(() => {
    const fetchCartData = async () => {
     const response = await axios.get('/api/payment-summary');
     setPaymentSummary(response.data)
    };
    fetchCartData();
  },[cart])

  return (
    <>
      <title>CheckOut</title>
      <CheckOutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />

         <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default CheckOut;


  /*
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    axios.get("/api/payment-summary").then((response) => {
      setPaymentSummary(response.data);
    });
  }, []);
  */