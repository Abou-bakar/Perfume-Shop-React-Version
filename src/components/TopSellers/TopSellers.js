import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Pagination, Autoplay } from "swiper/modules";

import ProductCard from "../Product/ProductCard";
import "./TopSellers.css";

import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";

const TopSellers = ({ heading }) => {
  const products = [
    {
      image: product1,
      title: "Mint",
      price: "Rs. 12,000",
    },

    {
      image: product2,
      title: "Pink Floral",
      price: "Rs. 10,000",
    },
    
    {
      image: product3,
      title: "Paradox",
      price: "Rs. 15,000",
    },
  ];

  const repeatedProducts = [...products, ...products];

  return (
    <section className="top-sellers">
      <h2>{heading}</h2>

      <Swiper
        modules={[Pagination]}
        className="top-sellers-swiper"
        slidesPerView={4}
        spaceBetween={20}
        loop={true}
        speed={800}
        pagination={{
          el: ".sellers-pagination",
          clickable: true,
        }}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 2 },
          992: { slidesPerView: 4 },
        }}
      >
        {repeatedProducts.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard
              image={product.image}
              title={product.title}
              price={product.price}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="sellers-pagination swiper-pagination"></div>
    </section>
  );
};

export default TopSellers;
