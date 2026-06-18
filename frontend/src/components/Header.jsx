import "./header.css";
import { NavLink } from "react-router";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";

function Header({ cart , loadCart}) {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [search, setSearch] = useState(searchText || '');
  const navigate = useNavigate();

  const updatesearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProduct = () => {
    navigate(`/?search=${search}`);
  };

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-NavLink">
          <img className="logo" src="images/logo-white.png" />
          <img className="mobile-logo" src="images/mobile-logo-white.png" />
        </NavLink>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={search}
          onChange={updatesearchInput}
        />

        <button className="search-button" onClick={searchProduct}>
          <img className="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <NavLink className="orders-NavLink header-NavLink" to="/orders">
          <span className="orders-text">Orders</span>
        </NavLink>

        <NavLink className="cart-NavLink header-NavLink" to="/checkout">
          <img className="cart-icon" src="images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
