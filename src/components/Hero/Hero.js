import React from 'react'
import { Swiper, SwiperSlide} from 'swiper/react'

// Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"

import { Pagination, Autoplay } from "swiper/modules"

import HeroSlide from './HeroSlide'
import "./Hero.css"

import phero1 from '../../assets/images/phero1.png'
import phero2 from '../../assets/images/phero2.png'
import phero3 from '../../assets/images/phero3.png'
import phero1_mobile from '../../assets/images/phero1-mobile.png'
import phero2_mobile from '../../assets/images/phero2-mobile.png'
import phero3_mobile from '../../assets/images/phero3-mobile.png'

const Hero = () => {
  return (
    <Swiper
    modules={[Pagination, Autoplay]}
    className='hero-swiper'
    slidesPerView={1}
    loop={true}
    // autoplay={{ delay: 3500,
    //    disableOnInteraction: false,
    //  }}
      speed={1500}
    // pagination={{ clickable: true }}
    >
      <SwiperSlide>
        <HeroSlide desktopImage={phero1} mobileImage={phero1_mobile} />
      </SwiperSlide>

      <SwiperSlide>
        <HeroSlide desktopImage={phero2} mobileImage={phero2_mobile} />
      </SwiperSlide>

      <SwiperSlide>
        <HeroSlide desktopImage={phero3} mobileImage={phero3_mobile} />
      </SwiperSlide>
    </Swiper>
  )
}

export default Hero