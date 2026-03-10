import React from 'react'
import { Link } from 'react-router-dom';
function CheckoutHeader({ cart }) {
  let cartLength = 0;
  if (cart) {
    cart.forEach((item) => cartLength += item.quantity); //calculate total cart leangth
  }
  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/">
            <img className="logo" src="/images/shoply-logo.png" />
            <img className="mobile-logo" src="/images/shoply-logo-mobile.png" />
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (<Link className="return-to-home-link"
            to="/home">{cartLength} items</Link>)
        </div>

        <div className="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>
    </div>
  )
}

export default CheckoutHeader
