import React from 'react'

import './MainImage.css'

const MainImage = ( {image}) => {
  return (
    <div className="main-image">
        <img src={image} alt="Main Product" />
    </div>
  )
}

export default MainImage