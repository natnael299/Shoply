import React from 'react'
import dayjs from "dayjs"
import { configirePrice } from '../utils/utils.js'
import axios from 'axios'
function DeliveryOptions({ options, itemId, deliveryId, fetchCart }) {

  //updates the delivery option
  async function ChangeDeliveyOption(id) {
    await axios.put(`/api/cart-items/${itemId}`,
      {
        "deliveryOptionId": id
      });
    await fetchCart();
  };

  return (
    <>
      {options && options.map((option) => (
        <div className="delivery-option" key={option.id} onClick={() => { ChangeDeliveyOption(option.id); }} >
          <input type="radio"
            className="delivery-option-input"
            name={`delivery-option-${itemId}`}
            checked={deliveryId == option.id}
            onChange={() => { }} />
          <div>
            <div className="delivery-option-date">
              {dayjs(option.estimatedDeliveryTimeMs).format('ddd, MMM D')}
            </div>
            <div className="delivery-option-price">
              {configirePrice(option, option.priceCents)} - Shipping
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default DeliveryOptions
