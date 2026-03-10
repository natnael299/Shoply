import React from 'react'
import { Link } from "react-router-dom"
function Header({ cart_length }) {
  const len = cart_length();
  return (

    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
            src="/images/shoply-logo.png" />
          <img className="mobile-logo"
            src="/images/shoply-logo-mobile.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" />

        <button className="search-button">
          <img className="search-icon" src="/images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <a className="orders-link header-link" href="/orders">
          <span className="orders-text">Orders</span>
        </a>

        <a className="cart-link header-link" href="/checkout">
          <img className="cart-icon" src="/images/icons/cart-icon.png" />
          <div className="cart-quantity">{len}</div>
          <div className="cart-text">Cart</div>
        </a>
      </div>
    </div>
  )
}

export default Header
