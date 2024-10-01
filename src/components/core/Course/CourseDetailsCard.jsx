import React from 'react'
import { BsFillCaretRightFill } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegShareSquare } from "react-icons/fa";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import {ACCOUNT_TYPE} from '../../../utils/constants';
import { addToCart } from '../../../slices/cartSlice';

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,
 
    } = course;

    const handleAddtoCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are not allowed to add this course to cart as you are an instructor");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1: "you are not Logged in",
            text2: "Please Login to Add to Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard");
    }


    return (
        <div className={`flex flex-col gap-3 rounded-md bg-richblack-700 p-3 text-richblack-5`}>
            {/* image */}
            <img
                src={ThumbnailImage}
                alt='ThumbnailImage'
                className='max-h-[250px] min-h-[150px] w-[350px] overflow-hidden rounded-2xl object-fill md:max-w-full'
            />

            {/* price */}
            <div className="space-x-3 pb-2 text-2xl font-semibold">
                Rs. {CurrentPrice}
            </div>

            {/* buttons */}
            <div className='flex flex-col gap-4'>
                <button className="yellowButton" 
                    onClick={
                        //if student has already buy this course 
                        user && course?.studentsEnrolled.includes(user._id) 
                        ? () => navigate("/dashboard/enrolled-courses ") 
                        : handleBuyCourse
                    }
                >
                    {
                        user && course?.studentsEnrolled.includes(user._id) ? "Go to Course" : "Buy Now "
                    }
                </button>

                {
                    //if student is not enrolled in this course 
                    (!course?.studentsEnrolled.includes(user._id)) && (
                        <button onClick={handleAddtoCart} className="blackButton">
                            Add to Cart
                        </button>
                    )
                }
            </div>

            {/* description */}
            <div>
                <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
                    30-Days Money-Back Guarantee
                </p>
                <p className={`my-2 text-xl font-semibold `}>
                    This Course Includes: 
                </p>
                <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                    {course?.instruction?.map((item, i) => {
                        return (
                        <p className={`flex gap-2`} key={i}>
                            <BsFillCaretRightFill />
                            <span>{item}</span>
                        </p>
                        )
                    })}
                </div>
            </div>

            {/* share */}
            <div className='mx-auto items-center gap-2 p-2 text-yellow-50'> 
                <button onClick={handleShare} className='flex gap-x-2'>
                    <FaRegShareSquare/><span>Share</span>
                </button>
            </div>
        </div>
    )
}

export default CourseDetailsCard