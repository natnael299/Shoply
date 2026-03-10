import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { formatPrice } from '../utils/utils';
import { useNavigate } from 'react-router';
function PaymentGrid(cart, fetchCart) {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/payment-summary")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
  }, []);

  //make an order
  async function orderProducts() {
    await axios.post("/api/orders", cart);
    await fetchCart();
    navigate("/orders");
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">
        Payment Summary
      </div>
      {data && (
        <>
          <div className="payment-summary-row">
            <div>Items ({data.totalItems}):</div>
            <div className="payment-summary-money">${formatPrice(data.productCostCents)}</div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">${formatPrice(data.shippingCostCents)}</div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div className="payment-summary-money">${formatPrice(data.totalCostBeforeTaxCents)}</div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">${formatPrice(data.taxCents)}</div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">${formatPrice(data.totalCostCents)}</div>
          </div>

          <button className="place-order-button button-primary" onClick={orderProducts}>
            Place your order
          </button>
        </>
      )}
    </div>
  )
}

export default PaymentGrid
