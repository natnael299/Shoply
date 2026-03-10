import React from 'react'
import dayjs from "dayjs"
import { Link } from 'react-router-dom'
import "../styles/orders.css"
function OrderedProducts({ products, id }) {
  return (
    <>
      {products && products.map((product) => (
        <>
          <div className="product-image-container">
            <img src={product.product.image} />
          </div>
          <div className="product-details">
            <div className="product-name">
              {product.product.name}
            </div>
            <div className="product-delivery-date">
              Arriving on: {dayjs(product.estimatedDeliveryTimeMs).format("MMMM DD")}
            </div>
            <div className="product-quantity">
              Quantity: {product.quantity}
            </div>
            <button className="buy-again-button button-primary">
              <img className="buy-again-icon" src="images/icons/buy-again.png" />
              <span className="buy-again-message">Add to Cart</span>
            </button>
          </div>
          <div className="product-actions">
            <Link to={`/tracking/${id}/${product.productId}`}>
              <button className="track-package-button button-secondary">
                Track package
              </button>
            </Link>
          </div>
        </>
      ))}
    </>
  )
}

export default OrderedProducts
