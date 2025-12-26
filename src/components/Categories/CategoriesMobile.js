import React from 'react'
import CategoryItem from './CategoryItem'
import "./CategoriesMobile.css"

const MobileCategories = () => {
  return (
    <>
       <h2 className='categories_text'>Categories</h2>
    <div className="categories-mobile">
      <CategoryItem
        image="https://lattafapakistan.com/cdn/shop/files/Asad-61571296.png?v=1753974626"
        title="Men"
      />
      <CategoryItem
        image="https://lattafapakistan.com/cdn/shop/files/Layaan-87724289.png?v=1762084826"
        title="Women"
      />
      <CategoryItem
        image="https://lattafapakistan.com/cdn/shop/files/Khamrah-61480310.png?v=1753975748"
        title="Unisex"
      />
      <CategoryItem
        image="https://lattafapakistan.com/cdn/shop/files/Stop-Wait-Go-for-Kids-64382767.png?v=1753977526"
        title="Kids"
      />
    </div>
    </>
  )
}

export default MobileCategories