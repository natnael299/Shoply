import React from 'react'
import CheckoutHeader from './checkout/CheckoutHeader'
import PaymentGrid from './checkout/PaymentGrid'
import "./styles/checkout.css"
import "./styles/checkout-header.css"
import OrderSummary from './checkout/OrderSummary'
function Checkout({ cart, fetchCart }) {
  return (
    <>
      {
        cart && (
          <>
            <CheckoutHeader cart={cart} />
            <div className="checkout-page">
              <div className="page-title">Review your order</div>
              <div className="checkout-grid">
                <OrderSummary cart={cart} fetchCart={fetchCart} />
                <PaymentGrid cart={cart} fetchCart={fetchCart} />
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Checkout
