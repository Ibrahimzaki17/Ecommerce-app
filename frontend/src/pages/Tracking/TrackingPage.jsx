import Header from "../../components/Header";
import "./tracking.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router";
import dayjs from "dayjs";

function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingPageData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );

      setOrder(response.data);
    };

    fetchTrackingPageData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId == productId;
  });

  const totlaDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  //let timePassedMs = totlaDeliveryTimeMs * 0.5
  let deliveryPercent = (timePassedMs / totlaDeliveryTimeMs) * 100;
  if(deliveryPercent > 100){
    deliveryPercent = Math.min(deliveryPercent, 100)
  }
  
  const isPreparing = (deliveryPercent < 33);
  const isShipped = (deliveryPercent >= 33 && deliveryPercent < 100);

  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <NavLink
            className="back-to-orders-NavLink NavLink-primary"
            to="/orders"
          >
            View all orders
          </NavLink>

          <div className="delivery-date">{dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}</div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>Preparing</div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>Shipped</div>
            <div className={`progress-label ${!(isShipped && isPreparing) && 'current-status'}`}>Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;