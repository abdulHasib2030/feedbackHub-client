import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import banner1 from '../assets/4.jpg'
import banner2 from '../assets/5.jpg'
import banner3 from '../assets/6.jpg'
import { Link } from 'react-router-dom';

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className='mt-5 relative'>
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
       
        <SwiperSlide >
          <div className='absolute top-[30%] md:top-[20%] lg:left-[8%]  space-y-4'>
            <h1 className='text-xl text-black font-bold w-4/5 mx-auto'>Check out the most talked-about services! Dive into detailed reviews and see what’s making an impact.</h1>

            <button>

              <a className=" px-6 py-3  mb-2 leading-loose  text-center text-black font-semibold bg-gradient-to-r  from-[#CEA9A4] to-[#DDAB78] uppercase  hover:opacity-70 hover:rounded-2xl hover:transform hover:duration-200 " href="#most-service">Explore Now</a>
            </button>

          </div>
          <img className='' src={banner2} alt="" /></SwiperSlide>
        <SwiperSlide >
        <div className='absolute top-[30%] md:top-[20%] lg:left-[8%]  space-y-4'>
            <h1 className='text-xl text-black font-bold w-4/5 mx-auto'>Explore a world of services. Share your experiences and help others make informed decisions through genuine reviews.</h1>

            <button>

              <Link to={'/'} className=" px-6 py-3  mb-2 leading-loose  text-center text-black font-semibold bg-gradient-to-r  from-[#D2B43E] to-[#FBD4B8] uppercase  hover:opacity-70 hover:rounded-2xl hover:transform hover:duration-200 " >Explore Now</Link>
            </button>

          </div>
          <img className='' src={banner3} alt="" /></SwiperSlide>
 <SwiperSlide >
          <div className='absolute top-[30%] md:top-[20%] lg:left-[8%]  space-y-4'>
            <h1 className='text-xl text-black font-bold'>Stay updated with the latest user experiences. Discover recently added reviews and explore trending insights.</h1>

            <button>

              <a className=" px-6 py-3  mb-2 leading-loose  text-center text-black font-semibold bg-gradient-to-r  from-[#5FE1E7] to-[#D3F46D] uppercase  hover:opacity-70 hover:rounded-2xl hover:transform hover:duration-200 " href="#recent-review">Explore Now</a>
            </button>

          </div>
          <img className="" src={banner1} alt="" />

        </SwiperSlide>
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