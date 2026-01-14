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
    // 🔒 Lock background scroll WITHOUT layout shift
    useEffect(() => {
      if(isOpen) {
        // Get scrollbar width before hiding it
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        // Lock scroll
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      
      // Compensate for scrollbar width to prevent shift
      document.body.style.paddingRight = `${scrollbarWidth}px`
      
      } else {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }

      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      }
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