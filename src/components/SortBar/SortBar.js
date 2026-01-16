import React from 'react'
import './SortBar.css'

const SortBar = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-bar">
          <label htmlFor="sort-select">Sort by:</label>
          <select id="sort-select" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>

            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="best-selling">Best Selling</option>
          </select>
        </div>
  )
}

export default SortBar