import React from 'react'

const AccordionItem = ( { title, content }) => {
  return (
    <div className='accordion-item'>
        <button className='accordion-header'>
            {title} <i className='fa-solid fa-chevron-down'></i>
        </button>

        <div className="accordion-content">
            {content}
        </div>
    </div>
  )
}

export default AccordionItem