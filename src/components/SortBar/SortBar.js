import React from 'react'
import './SortBar.css'

const SortBar = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-bar">
      <label htmlFor="sort-select" className="sort-label">Sort by:</label>
      <div className="select-wrapper">
        <select 
          id="sort-select" 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="default">Default</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="sale">Sale</option>
          <option value="best-selling">Best Selling</option>
        </select>
        <span className="select-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  )
}

export default SortBar