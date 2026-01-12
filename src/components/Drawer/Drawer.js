import React from 'react'
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import "./Drawer.css"

const Drawer = ({
    isOpen,
    onClose,
    position = "right", // left | right
    width = "380px",
    children,
}) => {
    // 🔒 Lock background scroll
    useEffect(() => {
      document.body.style.overflow = isOpen ? "hidden" : "";
    
      return () => (document.body.style.overflow = "")
    }, [isOpen])
    
     return createPortal(
        <>
          {/* Overlay */}<div
        className={`drawer-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`drawer drawer-${position} ${isOpen ? "open" : ""}`}
        style={{ width }}
      >
        {children}
      </div>
        </>,
        document.body
     )
}

export default Drawer