import React, { useEffect, useState } from 'react';
import RatingStars from "../../Common/RatingStars";
import { Link } from 'react-router-dom';
import GetAvgRating from "../../../utils/avgRating";

const CourseCard = ({crs, Height, Width}) => {

    // console.log("courses => ", crs?.instructor?.firstName)

    const [avgReviewCount, setAvgReviewCount] = useState(0);
    console.log("ratingAndReviews",crs, crs.ratingAndReviews);

    useEffect(() => {
        const count = GetAvgRating(crs.ratingAndReviews);
        console.log("Count ", count);
        setAvgReviewCount(count);
    },[crs])

    console.log("avgReviewCount => ", avgReviewCount);

    useEffect(() => {
        console.log("thumbnail ",crs?.thumbnail)   
    },[crs])

    return (
        <div className='text-pink-300'>
            <Link to={`/courses/${crs._id}`}>
                <div>
                    {/* course image */}
                    <div className="rounded-lg">
                        <img src={crs?.thumbnail} alt='Course Ka thumbnail' 
                            className={`${Height} ${Width}  rounded-xl object-cover`}
                        />
                    </div>

                    <div className="flex flex-col gap-2 px-1 py-3">
                        {/* course title */}
                        <p className="text-xl text-richblack-5">{crs?.courseName}</p>
                        {/* instrctor name */}
                        <p className="text-sm text-richblack-50">{crs?.instructor?.firstName} {crs?.instructor?.lastName}</p>
                        {/* stars */}
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-5">{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            {/* <span className="text-richblack-400"> {crs?.ratingAndReview?.length} Ratings</span> */}
                        </div>
                        {/* price */}
                        <p className="text-xl text-richblack-5">{crs.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard