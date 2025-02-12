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
import bannarimg from '../assets/banner.gif'

const Banner = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className='mt-[50px] relative w-full'>
      {/* <Swiper
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
      </Swiper> */}
      <div>
      <img src={bannarimg} alt="" className='w-full '/> 
      <div className='absolute sm:top-0 left-0 right-0 flex top-2 items-center justify-center h-full flex-col  lg:space-y-16 md:space-y-5'>
      <h1 className='lg:text-4xl md:text-2xl text-lg   text-white font-semibold md:w-3/4 text-center  mx-auto'>Explore a world of services. Share your experiences and help others make informed decisions through genuine reviews.</h1>

<button>

  {/* <Link to={'/'} className="" >Explore Now</Link> */}

  <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50">
      <span className="absolute  inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a2aeff_0%,#3749be_50%,#a2aeff_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full dark:bg-[#070e41] bg-[#ffffff] px-8 py-1 text-sm font-medium dark:text-gray-50 text-black backdrop-blur-3xl">
      <Link to={'/services'}>Explore Now</Link>  
      </span>
    </button>
</button>
        </div> 
      </div>
    </div>
  );
};

export default Banner;