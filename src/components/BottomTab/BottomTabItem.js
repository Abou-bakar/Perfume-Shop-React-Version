import React from 'react'
import { NavLink } from 'react-router-dom';
import "./BottomTab.css"

const BottomTabItem = ( { to, icon, label }) => {
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