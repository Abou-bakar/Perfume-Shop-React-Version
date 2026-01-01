import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from '../Product/ProductCard'

// Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"

import "./ProductCarousel.css"

import { Pagination, Autoplay } from "swiper/modules"

const ProductCarousel = ({
    heading,
    products,
    paginationClass,
    showViewAll = false,
}) => {
    return (
        <section className='product-carousel'>
            <h2>{heading}</h2>

            <Swiper 
            modules ={[Pagination]}
            slidesPerView={4}
            spaceBetween = {20}
            loop={true}
            speed={800}
            pagination = {{
                el: `.${paginationClass}`,
                clickable: true,
            }}
            breakpoints={{
                 0: { slidesPerView: 2 },
          576: { slidesPerView: 2 },
          992: { slidesPerView: 4 },
            }}
            >

            {products.map((product, index) => (
                <SwiperSlide key={index}>
                    <ProductCard 
                    image={product.image}
                    title={product.title}
                    price={product.price}
                    />
                </SwiperSlide>
            ))}
            </Swiper>

            <div className={`${paginationClass} swiper-pagination}`}></div>

            {showViewAll && <button className='view-all-btn'>View All</button>}
        </section>
    )
}



export default ProductCarousel