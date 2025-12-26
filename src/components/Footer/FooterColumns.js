import React from 'react'

const FooterColumns = ( {header, children }) => {
  return (
    <div className='footer-col'>
        <h4>{header}</h4>
        <ul class="links">
           {children}
          </ul>
    </div>
  )
}

export default FooterColumns