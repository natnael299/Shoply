import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs';
import DeliveryOptions from './DeliveryOptions'
import axios from 'axios';
function OrderSummary({ cart, fetchCart }) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    //fetch the deliveryOptions from the backend
    const fetchDeliveryOptions = async () => {
      const res = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
      setOptions(res.data)
    };
    fetchDeliveryOptions();
  }, []);

  //calculates the delivery date
  function filterDeliveryId(selectedId, options) {
    if (options.length > 0) {
      const selectedOption = options.find(option => option.id == selectedId);
      return dayjs(selectedOption.estimatedDeliveryTimeMs).format("dddd, MMMM D");
    } {
      return ("Calculating time ...")
    }
  };

  //removes an item form the cart
  async function deleteItem(id) {
    await axios.delete(`/api/cart-items/${id}`);
    await fetchCart();
  }

  return (
    <div className="order-summary">
      {
        cart && cart.map((item) => {
          const productId = item.productId;
          return (
            <div className="cart-item-container" key={item.productId}>
              <div className="delivery-date">
                Delivery date: {filterDeliveryId(item.deliveryOptionId, options)}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image"
                  src={item.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">
                    {item.product.name}
                  </div>
                  <div className="product-price">
                    {`$${(item.product.priceCents / 100).toFixed(2)}`}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity: <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary" value="lll" onClick={() => deleteItem(productId)}>
                      Delete
                    </span>
                  </div>
                </div>

                <div className="delivery-options">
                  <div className="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <DeliveryOptions options={options} itemId={item.productId} deliveryId={item.deliveryOptionId} fetchCart={fetchCart} />
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default OrderSummary
