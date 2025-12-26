import React from 'react'
import './QuickActionCards.css'

const QuickActionCards = ( {quickaction, variant} ) => {
  return (
          <div className={`card  ${variant}`}>
            <h4>{quickaction}</h4>
          </div>
  )
}

export default QuickActionCards