import React, { useState } from "react";
import MainImage from "./MainImage";
import ThumbnailList from "./ThumbnailList";

import "./ProductImages.css";

const ProductImages = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="product-images">
      <MainImage image={selectedImage} />
      {images.length > 1 && (
      <ThumbnailList
        thumbnails={images}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
      />
      )}
    </div>
  );
};

export default ProductImages;
