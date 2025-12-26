import React from 'react'
import './FilterBar.css'

const FilterBar = () => {
  return (
    <div class="filter-bar">
          <label for="filter">Filter by:</label>
          <select name="category" id="category">
            <option value="">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
  )
}

export default FilterBar