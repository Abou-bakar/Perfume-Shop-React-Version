import React from 'react'
import './LowStockItem.css'

const LowStockItem = ( {image, name, stock} ) => {
  return (
    <>
    <div className="low-stock-item">
            <img src={image} alt="" />
            <div className="low-stock-info">
                <h4>{name}</h4>

                {stock !== undefined && (
          <p>Stock: {stock}</p>
        )}
            </div>
        </div>
    </>
  )
}

export default LowStockItem