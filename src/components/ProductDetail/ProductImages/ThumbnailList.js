import React from 'react'

import './ThumbnailList.css'

const ThumbnailList = ( {thumbnails, selectedImage, onSelectImage} ) => {
  return (
    <div className="thumbnail-container">
      {thumbnails.map((thumbnail, index) => (
        <img key={index} src={thumbnail}  className={`thumb ${selectedImage === thumbnail ? 'active' : ''}`} alt={`Thumbnail ${index}`} onClick={()=> onSelectImage(thumbnail)}/>
      ))}
    </div>
  )
}

export default ThumbnailList