import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
    return (
        <div className='mt-10'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
        >
        <SwiperSlide ><img className="" src="https://i.ibb.co.com/hDRDs2f/Shaitaan-2024-film-theatrical-poster.jpg" alt="" /></SwiperSlide>
        <SwiperSlide ><img className='' src="https://i.ibb.co.com/hDRDs2f/Shaitaan-2024-film-theatrical-poster.jpg" alt="" /></SwiperSlide>
        <SwiperSlide ><img className='' src="https://i.ibb.co.com/hDRDs2f/Shaitaan-2024-film-theatrical-poster.jpg" alt="" /></SwiperSlide>
     
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
        </div>
    );
};

export default Banner;