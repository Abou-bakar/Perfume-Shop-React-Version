import React, { useState } from 'react'
import './AccordionItem.css'

const AccordionItem = ( { title, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='accordion-item'>
        <button className={`accordion-header ${isOpen ? 'active' : ''}`}
          onClick={()=> setIsOpen(prev => !prev)}
        >
            {title} <i className='fa-solid fa-chevron-down'></i>
        </button>

        <div className={`accordion-content ${isOpen ? 'active' : ''}`}>
            {children}
        </div>
    </div>
  )
}

export default AccordionItem