import React from 'react'
import Header from './Header'
import Products from './Products'
import "./styles/header.css"

function Home({ products, fetchCart, cart_length }) {

  return (
    <>
      <Header cart_length={cart_length} />
      <div className="home-page">
        <div className="products-grid">
          {products && products.map((product) =>
            (<Products product={product} fetchCart={fetchCart} key={product.id} />)
          )}
        </div>
      </div>
    </>
  )
}

export default Home
