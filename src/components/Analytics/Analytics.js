import React from 'react'
import './Analytics.css'

const Analytics = ( {analytic, value, variant}) => {
  return (
            <div className={`box ${variant}`}>
              <h4>{analytic}</h4>
              <h1>{value}</h1>
            </div>
  )
}

export default Analytics