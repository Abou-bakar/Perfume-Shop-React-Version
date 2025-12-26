import React from 'react'
import BottomTabItem from './BottomTabItem'
import "./BottomTab.css"

const BottomTab = () => {
  return (
     <div className="bottom-tab">
        <BottomTabItem 
        to="/"
        icon="fa-solid fa-house"
        label="Home"
        />

        <BottomTabItem 
        to="/products"
        icon="fa-solid fa-store"
        label="Shop"
        />

        <BottomTabItem 
        to="/sale"
        icon="fa-solid fa-tags"
        label="Sale"
        />

        <BottomTabItem 
        to="/cart"
        icon="fa-solid fa-cart-shopping"
        label="Cart"
        />
     </div>
  )
}

export default BottomTab