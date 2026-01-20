import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from '../Product/ProductCard'
import ProductCardSkeleton from "../ProductSkeleton/ProductCardSkeleton";
import { motion, AnimatePresence } from "framer-motion";

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
    loading = false,
    showViewAll = false,
}) => {
    const skeletonCount = 6;

    return (
        <section className='product-carousel'>
            <h2>{heading}</h2>

            <Swiper
                modules={[Pagination]}
                slidesPerView={4}
                spaceBetween={20}
                loop={!loading}
                speed={800}
                pagination={{
                    el: `.${paginationClass}`,
                    clickable: true,
                }}
                breakpoints={{
                    0: { slidesPerView: 2 },
                    576: { slidesPerView: 2 },
                    992: { slidesPerView: 4 },
                }}
            >

                <AnimatePresence mode="wait">
                    {loading ? (
                        [...Array(skeletonCount)].map((_, i) => (
                            <SwiperSlide key={`skeleton-${i}`}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCardSkeleton />
                                </motion.div>
                            </SwiperSlide>
                        ))
                    ) : (
                        products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <ProductCard {...product} />
                                </motion.div>
                            </SwiperSlide>
                        ))
                    )}
                </AnimatePresence>

            </Swiper>

            <div className={`${paginationClass} swiper-pagination`}></div>

            {showViewAll && <button className='view-all-btn'>View All</button>}
        </section>
    )
}



export default ProductCarousel