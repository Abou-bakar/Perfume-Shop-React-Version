import React from 'react'
import './FilterBar.css'

const FilterBar = ({ selectedCategory, onCategoryChange, disabled = false }) => {
  return (
    <div className="filter-bar">
          <label htmlFor="category-select">Filter by:</label>
          <select id="category-select" value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} disabled={disabled} >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
  )
}

export default FilterBar