import React from 'react'

const LandscapeSlide = ( {image} ) => {
  return (
    <div className='swiper-slide'>
        <img src={image} alt="" />
    </div>
  )
}

export default LandscapeSlide