import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import bannerImage1 from '../../../assets/image/banner/banner_image1.jpg';
import bannerImage2 from '../../../assets/image/banner/banner_image2.jpg';
import bannerImage3 from '../../../assets/image/banner/banner_image3.jpg';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import '../../../index.css';

export default function Banner() {
  return (
    <Swiper
      draggable={false}
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
    >
      <SwiperSlide className="bg-[rgba(34,34,34,1)]" style={{ height: '450px' }}>
        <img src={bannerImage1} alt="banner image1" className="mx-auto h-[450px]" />
      </SwiperSlide>
      <SwiperSlide className="bg-[rgba(142,147,157,1)]" style={{ height: '450px' }}>
        <img src={bannerImage2} alt="banner image2" className="mx-auto h-[450px]" />
      </SwiperSlide>
      <SwiperSlide className="bg-[rgba(216,223,227,1)]" style={{ height: '450px' }}>
        <img src={bannerImage3} alt="banner image3" className="mx-auto h-[450px]" />
      </SwiperSlide>
      <div className="swiper-button-next mr-5 md:mr-10 text-gray-500"></div>
      <div className="swiper-button-prev ml-5 md:ml-10 text-gray-500"></div>
    </Swiper>
  );
}
