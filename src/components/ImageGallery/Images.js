import React from 'react'

const Images = ( {image} ) => {
  return (
    <div className='grid-item'>
        <img src={image} alt="" />
    </div>
  )
}

export default Images