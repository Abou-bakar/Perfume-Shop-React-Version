import React from 'react'

function HeroSlide ({ desktopImage, mobileImage }) {
  return (
    <div className='hero-slide'>
      <img src={desktopImage} alt="" className='hero-img desktop-img'/>
      <img src={mobileImage} alt="" className='hero-img mobile-img'/>
    </div>
  )
}

export default HeroSlide