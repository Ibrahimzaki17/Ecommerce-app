import { formatMoney } from "../../utils/formatMoney";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";

function CardItemDetails({ loadCart, cartItem, deliveryOptions }) {
  const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  const updateQuantiy = async () => {
    
    if (isUpdateQuantity) {
    await axios.put(`/api/cart-items/${cartItem.productId}`,{
        quantity: Number(quantity),
    });
    await loadCart();

      setIsUpdateQuantity(false);
    } else {
      setIsUpdateQuantity(true);
    }
  };
  const updateQuantityinInput = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="cart-item-details-grid">
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdateQuantity ? (
              <input
                   type="text" 
                   className="input-quantity" 
                   value={quantity}
                   onChange={updateQuantityinInput}
                   />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-NavLink NavLink-primary"
            onClick={updateQuantiy}
          >
            Update
          </span>
          <span
            className="delete-quantity-NavLink NavLink-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>

      <div className="delivery-options">
        <div className="delivery-options-title">Choose a delivery option:</div>
        {deliveryOptions.map((deliveryOption) => {
          let priceString = "FREE Shipping";
          if (deliveryOption.priceCents > 0) {
            priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
          }

          const updateDelievryOption = async () => {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              deliveryOptionId: deliveryOption.id,
            });

            await loadCart();
          };

          return (
            <div
              key={deliveryOption.id}
              className="delivery-option"
              onClick={updateDelievryOption}
            >
              <input
                type="radio"
                checked={deliveryOption.id === cartItem.deliveryOptionId}
                onChange={() => {}}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`}
              />
              <div>
                <div className="delivery-option-date">
                  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM D",
                  )}
                </div>
                <div className="delivery-option-price">{priceString}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CardItemDetails;
