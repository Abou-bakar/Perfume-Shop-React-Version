import React from 'react'
import './Loader.css'

const Loader = ({fullScreen = false}) => {
  return (
     <div className={`loader-wrapper ${fullScreen ? 'fullscreen' : ''}`}>
      <div className="spinner"></div>
    </div>
  )
}

export default Loader