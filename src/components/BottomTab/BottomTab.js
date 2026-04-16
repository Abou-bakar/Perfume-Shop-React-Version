import React from 'react'
import BottomTabItem from './BottomTabItem'
import { useCart } from '../../context/CartContext'
import "./BottomTab.css"

const BottomTab = () => {
   const { openCart, getCartCount, cartBump } = useCart();

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
        icon="fa-solid fa-cart-shopping"
        label="Cart"
        onClick={openCart}
        badge={getCartCount()}
        animate={cartBump}
        />

     </div>
  )
}

export default BottomTab