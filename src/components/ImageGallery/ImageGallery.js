import React from 'react'
import Images from './Images'
import "./ImageGallery.css"

import mont  from '../../assets/images/mont.png'
import homme  from '../../assets/images/homme.png'
import nar  from '../../assets/images/nar.jpg'
import nrd  from '../../assets/images/nrd.png'
import noire  from '../../assets/images/noire.png'
import SWYI  from '../../assets/images/SWYI.jpg'

const ImageGallery = () => {
  return (
    <section className="image-grid">
        <Images image={mont}/>

        <Images image={homme}/>

        <Images image={nar}/>

        <Images image={nrd}/>

        <Images image={noire}/>

        <Images image={SWYI}/>

        </section>
  )
}

export default ImageGallery