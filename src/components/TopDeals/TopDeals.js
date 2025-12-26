import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"

import { Pagination, Autoplay } from "swiper/modules"

import ProductCard from "../Product/ProductCard";
import "./TopDeals.css";

import product4 from "../../assets/images/product4.png";
import product5 from "../../assets/images/product5.png";
import product6 from "../../assets/images/product6.png";

const TopDeals = () => {
  return (
    <section className="top-deals">
      <h2>Top Deals</h2>

      <Swiper
      modules={[Pagination]}
      className="top-deals-swiper"
      slidesPerView={4}
      spaceBetween={20}
      loop={true}
      speed={800}
      pagination={{
        el: ".deals-pagination",
        clickable: true
      }}
      breakpoints={{
        0: {slidesPerView: 2},
        576: {slidesPerView: 2},
        992: {slidesPerView: 4},
      }}
      >
        {[product4, product5, product6, product4, product5, product6].map(
          (img, index) => (
            <SwiperSlide key={index}>
              <ProductCard image={img} title={`Deal ${index + 1}`} price="Rs. 15,000" />
            </SwiperSlide>
          )
        )}
        </Swiper>

        <div class="deals-pagination swiper-pagination"></div>
  
      <button class="view-all-btn">View All</button>
    </section>
  );
};

export default TopDeals;
