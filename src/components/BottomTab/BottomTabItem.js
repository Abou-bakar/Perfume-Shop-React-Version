import React from 'react'
import { NavLink } from 'react-router-dom';
import "./BottomTab.css"

const BottomTabItem = ( { to, icon, label, onClick, badge, animate }) => {

  if (onClick) {
    return (
      <div className='tab-item' onClick={onClick}>
        <i className={`${icon} ${animate ? "cart-bump" : ""}`}></i>
        <span>{label}</span>

        {/* Badge (cart count) */}
        {badge > 0 && <span className='tab-badge'>{badge}</span>}
      </div>
    )
  }

  return (
    <NavLink to={to} className={({ isActive }) =>
    isActive ? "tab-item-active" : "tab-item"
    }>
        <i className={icon}></i>
        <span>{label}</span>
    </NavLink>
  )
}

export default BottomTabItem