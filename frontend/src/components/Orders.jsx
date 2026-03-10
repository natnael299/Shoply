import React, { useEffect, useState } from 'react'
import dayjs from "dayjs"
import Header from './Header'
import axios from 'axios'
import "./styles/orders.css"
import "./styles/header.css"
import OrderedProducts from './orders/OrderedProducts'

function Orders(cart_length) {
  const [orders, setOrders] = useState([]);
  //fetch the orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("/api/orders?expand=products")
      setOrders(res.data)
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <Header cart_length={cart_length} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">

          {orders && orders.map((order) => (
            <div className="order-container" key={order.id}>

              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{dayjs(order.orderTimeMs).format("MMMM DD")}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>${((order.totalCostCents) / 100).toFixed(2)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>

              <div className="order-details-grid">
                <OrderedProducts products={order.products} id={order.id} key={order.id} />
              </div>
            </div>
          ))}


        </div>
      </div>
    </div>
  )
}

export default Orders
