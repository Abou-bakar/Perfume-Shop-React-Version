import React from 'react'
import './SortBar.css'

const SortBar = () => {
  return (
    <div class="sort-bar">
          <label for="sort">Sort by:</label>
          <select name="sort" id="sort">
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