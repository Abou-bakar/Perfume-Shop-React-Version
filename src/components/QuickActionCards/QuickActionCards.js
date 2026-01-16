import React from 'react'
import './QuickActionCards.css'
import { useNavigate } from 'react-router-dom';

const QuickActionCards = ( {quickaction, variant, link } ) => {

  const navigate = useNavigate();

  const handleClick = () => {
    if (link) navigate(link);
  }
  return (

          <div className={`card  ${variant}`} onClick={handleClick}  style={{ cursor: link ? 'pointer' : 'default' }} >
            <h4>{quickaction}</h4>
          </div>
  )
}

export default QuickActionCards