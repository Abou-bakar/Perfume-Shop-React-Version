import React, { useState } from 'react'
import './QuantitySelector.css'

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1)

  function handleQuantityIncrease() {
    if(quantity < 10) {
    setQuantity(quantity + 1)
  }
}

  function handleQuantityDecrease() {
    if(quantity > 1) {
    setQuantity(quantity - 1)
  }
}

  return (
    <>
          <div class="quantity-container">
            <button class="qty-btn qty-btn--minus" onClick={handleQuantityDecrease}  disabled={quantity <= 1}>&minus;</button>

            <input type="number" id="quantity" value={quantity} min="1" max="10" readOnly />

            <button class="qty-btn qty-btn--plus" id="increase" onClick={handleQuantityIncrease} disabled={quantity >= 10}>+</button>
          </div>
      </>
  )
}

export default QuantitySelector