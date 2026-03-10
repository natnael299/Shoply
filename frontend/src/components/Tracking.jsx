import React, { useEffect, useState } from 'react'
import axios from "axios"
import Header from './Header'
import "./styles/tracking.css"
import "./styles/header.css"
import { useParams, Link } from "react-router-dom"
import dayjs from 'dayjs'
function Tracking({ cart_length, products }) {
  const { orderId, productId } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const productInfo = async () => {
      const response = await axios.get("/api/orders/" + orderId);
      const res = await response.data;
      setProduct(res.products);
    }
    productInfo();
  }, [orderId]);

  let item = ""; // find the product
  let itemInfo = ""; // products extra info
  if (product) {
    item = product.find((item) => item.productId == productId);
    itemInfo = products.find((item) => item.id == productId);
  };

  return (
    <div>
      <Header cart_length={cart_length} />
      {product && (
        <div className="tracking-page">
          <div className="order-tracking">
            <Link to="/orders" className="back-to-orders-link link-primary">
              View all orders
            </Link>

            <div className="delivery-date">
              Arriving on {dayjs(item.estimatedDeliveryTimeMs).format("dddd, MMMM DD")}
            </div>

            <div className="product-info">
              {itemInfo?.name}
            </div>

            <div className="product-info">
              Quantity: {item.quantity}
            </div>

            <img className="product-image" src={`/${itemInfo?.image}`} />

            <div className="progress-labels-container">
              <div className="progress-label">
                Preparing
              </div>
              <div className="progress-label current-status">
                Shipped
              </div>
              <div className="progress-label">
                Delivered
              </div>
            </div>

            <div className="progress-bar-container">
              <div className="progress-bar"></div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Tracking
