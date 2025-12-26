import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"

import { Pagination, Autoplay } from "swiper/modules"

import LandscapeSlide from './LandscapeSlide'
import "./Landscape.css"

import banner  from '../../assets/images/bnr.jpg'
import banner2  from '../../assets/images/bnr2.jpg'
import banner3  from '../../assets/images/bnr3.jpg'

const Landscape = () => {
  return (
    <section className='landscape'>
    <Swiper
    modules={[Pagination, Autoplay]}
    className='landscape-swiper'
    slidesPerView={1}
    loop={true}
    // autoplay={{ delay: 3500,
    //   disableOnInteraction: false,
    // }}
    speed={1500}
    >
      <SwiperSlide><LandscapeSlide image={banner}/></SwiperSlide>
      <SwiperSlide><LandscapeSlide image={banner2}/></SwiperSlide>
      <SwiperSlide><LandscapeSlide image={banner3}/></SwiperSlide>
            </Swiper>
            </section>
  )
}

export default Landscape