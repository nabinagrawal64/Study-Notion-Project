import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import {Autoplay, FreeMode, Pagination, Naviagation} from "swiper/modules";
import CourseCard from './CourseCard';

const CourseSlider = ({Course}) => {
    return (
        <div>
            {
                console.log("Course",Course)
            }
            {
                Course?.length ? (
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={3}
                        loop={true}
                        modules={{pagination: true, autoplay: true,navigation: true}}
                        className='mySwiper'
                        autoplay={{
                            delay: 100,
                            disableOnInteraction: false,
                        }}
                    >
                        {
                            Course?.map((crs, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <CourseCard crs={crs} Height={`h-[280px]`} Width={`w-[300px]`} />
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                ) : (<p>No Course Found</p>)
            }
        </div>
    )
}

export default CourseSlider