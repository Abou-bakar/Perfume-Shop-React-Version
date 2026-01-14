import React from 'react'
import './SortBar.css'

const SortBar = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-bar">
          <label htmlFor="sort">Sort by:</label>
          <select name="sort" id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="sale">Default</option>
            <option value="">Sale</option>
            <option value="men">Price: Low to High</option>
            <option value="women">Price: High to Low</option>
            <option value="best-selling">Best Selling</option>
          </select>
        </div>
  )
}

export default SortBar