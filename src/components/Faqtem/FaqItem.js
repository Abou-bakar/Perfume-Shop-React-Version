import React, { useState } from 'react'
import './FaqItem.css'

const FaqItem = ({ question, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false)
  return (
    <div className="faq-item">
      <button className={`question ${accordionOpen ? "active" : ""}`} onClick={()=> setAccordionOpen(prev => !prev)}>
        {question}
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className={`answer ${accordionOpen ? "active" : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  )
}

export default FaqItem