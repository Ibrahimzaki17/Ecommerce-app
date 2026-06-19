import axios from "axios";
import { formatMoney } from "../../utils/formatMoney";
import dayjs from "dayjs";
import { useState } from "react";
import CardItemDetails from './CardItemDetails.jsx'

function OrderSummary({deliveryOptions ,cart, loadCart}) {

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryDate = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );
          if (!selectedDeliveryDate) {
            return null;
          }

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryDate.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <CardItemDetails loadCart={loadCart} cartItem={cartItem} deliveryOptions={deliveryOptions}/>
            </div>
          );
        })}
    </div>
  );
}

export default OrderSummary;
