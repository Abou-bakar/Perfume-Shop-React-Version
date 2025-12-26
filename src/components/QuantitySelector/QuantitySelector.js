import React from 'react'
import './QuantitySelector.css'

const QuantitySelector = () => {
  return (
    <>
          <div class="quantity-container">
            <button class="qty-btn qty-btn--minus">&minus;</button>

            <input type="number" id="quantity" value="1" min="1" max="10" readOnly />

            <button class="qty-btn qty-btn--plus" id="increase">+</button>
          </div>
      </>
  )
}

export default QuantitySelector