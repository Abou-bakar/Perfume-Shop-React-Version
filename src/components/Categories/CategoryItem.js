import React from 'react'

function CategoryItem ( {image, title} ) {
  return (
    <div className="cat-image">
        <img src={image} alt="" />
        <h4>{title}</h4>
    </div>
  )
}

export default CategoryItem