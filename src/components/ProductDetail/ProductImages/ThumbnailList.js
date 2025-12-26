import React from 'react'

import './ThumbnailList.css'

const ThumbnailList = ( {thumbnails} ) => {
  return (
    <div className="thumbnail-container">
      {thumbnails.map((thumbnail, index) => (
        <img key={index} src={thumbnail}  className="thumb" alt={`Thumbnail ${index}`} />
      ))}
    </div>
  )
}

export default ThumbnailList