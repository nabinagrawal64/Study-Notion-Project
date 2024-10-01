import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { ImStarEmpty, ImStarFull} from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {

    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };

    return (
      <div className="flex flex-1 flex-col bg-richblack-900 rounded-lg p-2">
        {
            cart.map((course, index) => {
                return (
                    <div key={index}
                        className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                            index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"} 
                            ${index !== 0 && "mt-6"} `}
                    >
                        {/* left part of course */}
                        <div  className="flex flex-1 flex-col gap-4 xl:flex-row" >
                            {/* image */}
                            <img 
                                src={course?.thumbnail} 
                                alt='' 
                                className="h-[148px] w-[220px] rounded-lg object-cover" 
                            />
                            {/* courseName + category + rating and review*/}
                            <div className="flex flex-col space-y-1">
                                <p className="text-lg font-medium text-richblack-5">
                                    {course?.courseName}
                                </p>
                                <p className="text-sm text-richblack-300">
                                    {course?.category?.name}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-5">4.5</span>
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={24}
                                        activeColor="#ffd700"
                                        edit={false}
                                        emptyIcon={<ImStarFull/>}
                                        fullIcon={<ImStarEmpty />
                                        }
                                    />

                                    <span className="text-richblack-400">
                                        {course?.ratingAndReviews?.length}
                                    </span>

                                </div>
                            </div>
                        </div>
                        
                        {/* right part of course */}
                        <div className="flex flex-col items-end space-y-2">
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className="flex items-center gap-x-1 rounded-md border border-richblack-600 
                                bg-richblack-700 py-3 px-[12px] text-pink-200"
                            >
                                <RiDeleteBin6Line />
                                Remove
                            </button>

                            <p className="mb-6 text-3xl font-medium text-yellow-100">
                                ₹ {course?.price}
                            </p>
                        </div>                   
                    </div>
                )
            })
        }
      </div>
    ) 
}

export default RenderCartCourses