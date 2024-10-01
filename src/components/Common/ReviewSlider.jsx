import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import { FaStar } from "react-icons/fa";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async () => {
            const {data} = await apiConnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API);
            console.log("Logging Response in rating", data); 
            if (data?.success) {
                setReviews(data?.data);
            }
            console.log("printing reviews ", reviews);
        }
        fetchAllReviews();
        //eslint-disable-next-line
    }, []);

    // console.log(reviews)

    return (
        <div className="text-white">
            <div className="my-[50px] h-[184px] w-full lg:max-w-maxContent">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={24}
                    loop={true}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="w-full duration-500 transition-all"
                >
                    {reviews.map((review, i) => {
                        return (
                            <SwiperSlide key={i}>
                                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">

                                    {/* image + course Name */}
                                    <div className="flex items-center gap-4">

                                        {/* image */}
                                        <img
                                            src={
                                                review?.user?.image
                                                    ? review?.user?.image
                                                    : `https://api.dicebear.com/5.x/initials/svg?seed=
                                                    ${review?.user?.firstName} ${review?.user?.lastName}`
                                            }
                                            alt=""
                                            className="h-9 w-9 rounded-full object-cover"
                                        />

                                        {/* course Name */}
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                                            <h2 className="text-[12px] font-medium text-richblack-500">
                                                {review?.course?.courseName}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* review */}
                                    <p className="font-medium text-richblack-25">
                                        {review?.review.split(" ").length >
                                        truncateWords
                                            ? `${review?.review
                                                  .split(" ")
                                                  .slice(0, truncateWords)
                                                  .join(" ")} ...`
                                            : `${review?.review}`}
                                    </p>

                                    {/* rating */}
                                    <div className="flex items-center gap-2 ">
                                        <h3 className="font-semibold text-yellow-100">
                                            {review.rating.toFixed(1)}
                                        </h3>
                                        <ReactStars
                                            count={5}
                                            value={review.rating}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar />}
                                            fullIcon={<FaStar />}
                                        />
                                    </div>
                                    
                                </div>
                            </SwiperSlide>
                        );
                    })}
                    {/* <SwiperSlide>Slide 1</SwiperSlide> */}
                </Swiper>
            </div>
        </div>
    );
}

export default ReviewSlider;
