import React from 'react'
import { createPortal } from 'react-dom';

const CartDrawer = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
    {/* Overlay */}
    <div
        className="cart-overlay"
        onClick={onClose}
      />
   {/* Drawer */}
      <div className={`cart-container ${isOpen ? "active": ""}`}>
        {children}
      </div>
    </>,
    document.body
  )
}

export default CartDrawer