import React from 'react'
import "./FloatingButton.css"

const FloatingButton = () => {
  return (
    <div className="floating_btn">
      <a target="_blank" href="https://web.whatsapp.com/">
        <p className="text_icon">Talk to us?</p>
        <div className="contact_icon">
          <i className="fa-brands fa-whatsapp my-float"></i>
        </div>
      </a>
    </div>
  )
}

export default FloatingButton