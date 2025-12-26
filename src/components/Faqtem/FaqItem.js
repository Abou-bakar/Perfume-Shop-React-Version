import React from 'react'
import './FaqItem.css'

const FaqItem = ({ question, answer }) => {
  return (
    <div className="faq-item">
      <button className="question">
        {question}
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="answer">
        <p>{answer}</p>
      </div>
    </div>
  )
}

export default FaqItem