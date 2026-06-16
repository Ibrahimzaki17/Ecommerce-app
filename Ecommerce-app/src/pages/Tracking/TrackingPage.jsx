import Header from "../../components/Header";
import OrderTracking from "./OrderTracking";
import "./tracking.css";

function TrackingPage({cart}) {
  return (
    <>
      <title>Tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <OrderTracking />
      </div>
    </>
  );
}

export default TrackingPage;
