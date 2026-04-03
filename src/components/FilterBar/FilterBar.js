import React from 'react'
import './FilterBar.css'

const FilterBar = ({ selectedCategory, onCategoryChange, disabled = false }) => {
  return (
    <div className="filter-bar">
      <label htmlFor="category-select" className="filter-label">Filter by:</label>
      <div className="select-wrapper">
        <select 
          id="category-select" 
          value={selectedCategory} 
          onChange={(e) => onCategoryChange(e.target.value)} 
          disabled={disabled}
          className="filter-select"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
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

export default FilterBar