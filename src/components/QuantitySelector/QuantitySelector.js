import React, { useState } from 'react'
import './QuantitySelector.css'

const QuantitySelector = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 10
}) => {
  const handleIncrease = () => {
    if (quantity < max) {
      onIncrease()
    }
  };

  const handleDecrease = () => {
    if (quantity > min) {
      onDecrease()
    }
  };

  return (
    <div className='quantity-container'>
      <button
        className='qty-btn qty-btn--minus'
        onClick={handleDecrease}
        disabled={quantity <= min}
      >
         &minus;
      </button>

      <input 
        type='number'
        id='quantity'
        value={quantity}
        min={min}
        max={max}
        readOnly
      />

      <button
        className='qty-btn qty-btn--plus'
        onClick={handleIncrease}
        disabled={quantity >= max}
      >
         +
      </button>
    </div>
  )
}

export default QuantitySelector