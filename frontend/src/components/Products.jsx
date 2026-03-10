import React, { useState } from 'react'
import axios from 'axios'
function Products({ product, fetchCart }) {
  const [quantity, setQuantity] = useState(1);
  //adds product to cart
  async function addProduct(e, quantity) {
    try {
      await axios.post("/api/cart-items", {
        "productId": e.target.value,
        "quantity": Number(quantity)
      });
      await fetchCart();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="product-container" data-testId="product_container">
      <div className="product-image-container">
        <img className="product-image"
          data-testId={product.id}
          src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img className="product-rating-stars"
          data-testId="stars"
          src={`images/ratings/rating-${(product.rating.stars) * 10}.png`} />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        ${((product.priceCents) / 100).toFixed(2)}
      </div>

      <div className="product-quantity-container">
        <select onChange={(e) => { setQuantity(e.target.value) }}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option value={num} key={num}>{num}</option>
            ))
          }
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" >
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button className="add-to-cart-button button-primary"
        value={product.id}
        data-testId="add_to_cart"
        onClick={(e) => addProduct(e, quantity)}>
        Add to Cart
      </button>
    </div>
  )
}
export default Products