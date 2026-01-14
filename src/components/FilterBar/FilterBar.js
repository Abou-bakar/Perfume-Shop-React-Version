import React from 'react'
import './FilterBar.css'

const FilterBar = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="filter-bar">
          <label htmlFor="category">Filter by:</label>
          <select name="category" id="category" value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
            <option value="">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
  )
}

export default FilterBar