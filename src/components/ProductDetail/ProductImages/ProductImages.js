import React, { useState } from "react";
import MainImage from "./MainImage";
import ThumbnailList from "./ThumbnailList";

import "./ProductImages.css";

const ProductImages = () => {
  const thumbnails = [
    "https://shop.alharamainperfumes.com/media/catalog/product/cache/7836f2f2fc7ebf447684856e0d3cb600/a/h/ahp1010_b_1_1.jpg",
    "https://shop.alharamainperfumes.com/media/catalog/product/cache/490c4e3bbae272be3ce2b30a9945698e/a/h/ahp1010_b_2.jpg",
    "https://shop.alharamainperfumes.com/media/catalog/product/cache/490c4e3bbae272be3ce2b30a9945698e/a/h/ahp1010_laventure_gold_100ml-01.jpg",
    "https://shop.alharamainperfumes.com/media/catalog/product/cache/490c4e3bbae272be3ce2b30a9945698e/a/h/ahp1010_laventure_gold-pyramid.jpg",
  ];

  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);

  return (
    <div className="product-images">
      <MainImage image={selectedImage} />
      <ThumbnailList
        thumbnails={thumbnails}
        selectedImage={selectedImage}
        onSelectImage={setSelectedImage}
      />
    </div>
  );
};

export default ProductImages;
