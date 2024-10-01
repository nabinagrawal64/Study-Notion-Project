import React, { useEffect, useState } from 'react'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import {fetchCourseDetails} from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import ConfirmationModal from "../components/Common/ConfirmationModal"; 
import RatingStars from "../components/Common/RatingStars";
import {formatDate} from "../services/formatDate";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
// import Footer from "../components/Common/Footer"

const CourseDetails = () => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.profile);
    // const {paymentLoading} = useSelector((state) => state.course);
    const {courseId} = useParams();
    console.log( "courseId",courseId);
    console.log("user", user);

    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        async function getCourseFullDetails(){
            try {
                const response = await fetchCourseDetails(courseId);
                setCourseData(response);  
            } catch (error) {
                console.log("could not fetch course details")
            }
        }
        getCourseFullDetails();
    },[courseId])

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.CourseDetails?.ratingAndReviews);
        setAvgReviewCount(count);
    },[courseData])

    const [totalLectures, setTotalLectures] = useState(0);

    useEffect(() => {
        // setTotalLectures(courseData?.data?.CourseDetails.lectures.length);
        let lectures = 0;
        courseData?.data[0]?.courseContent?.forEach((sec) => {
            console.log("length = ",sec.subSection.length)
            lectures += sec.subSection.length || 0;
        })
        setTotalLectures(lectures);
    },[courseData])
    
    const [isActive, setIsActive] = useState(Array(0));

    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) => e !== id)
        )
    }
    
    if (loading || !courseData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
    }

    function handleBuyCourse(){
        if(token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return; 
        }
        else{ //jo byakti log in nahi hai aur buy karni ki koshish kar rah hai
            setConfirmationModal({
                text1: "you are not Logged in",
                text2: "Please log in to purchase this course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setConfirmationModal(null),
            })
        }
    }

    console.log("course Details", courseData?.data[0]);

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearned,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData?.data[0] ;

    
    // console.log("duration :",courseContent[0].subSection[1].timeDuration);
    return (
        <>
            <div className={`relative w-full bg-richblack-900`}>
                <div className="mx-auto box-content px-16 lg:w-[1200px] 2xl:relative ">

                    {/* top left */}
                    <div className="mx-auto bg-richblack-800 w-full grid justify-items-center lg:py-0 
                                    xl:max-w-maxContent lg:mx-0 lg:justify-items-start"
                    >
                        {/* for small screen */}
                        <div className="relative block max-h-[30rem] lg:hidden">
                            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                            <img
                                src={thumbnail}
                                alt="course thumbnail"
                                className="aspect-auto w-full"
                            />
                        </div>
                        
                        {/* sabse top left wala */}
                        <div className={`z-30 my-14 translate-x-5 text-richblack-5 flex flex-col justify-center gap-3 py-4 text-md`}>
                            {/* courseName */}
                            <p className="text-4xl font-bold text-richblack-5 sm:text-[38px]">
                                {courseName}
                            </p>

                            {/* description */}
                            <p className='flex flex-wrap text-richblack-100'>
                                {courseDescription}
                            </p>

                            {/* rating and reviews */}
                            <div className="text-sm flex flex-wrap items-center gap-2">
                                <span className="text-yellow-25">{avgReviewCount}</span>
                                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                                <span>{`(${ratingAndReviews.length} Reviews)`}</span>
                                <span>{`${studentsEnrolled.length} Student(s) Enrolled`}</span>
                            </div>

                            {/* created by */}
                            <div className='text-sm'>
                                <p>Created By {`${instructor.firstName} ${instructor.lastName}`}</p>
                            </div>

                            {/* created at */}
                            <div className="flex flex-wrap gap-5 text-md">
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <BiInfoCircle /> Created at {formatDate(createdAt)}
                                </p>
                                <p className="flex items-center gap-2">
                                    {" "}
                                    <HiOutlineGlobeAlt /> English
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* course card details(right side me jo hai) */}
                    <div className="right-[5rem] top-[40px] mx-auto hidden min-h-[600px] w-1/3 
                                    max-w-[350px] translate-y-24 pb-10 md:translate-y-0 lg:absolute lg:block"
                    >
                        <CourseDetailsCard 
                            course = {courseData?.data[0]}
                            setConfirmationModal = {setConfirmationModal}
                            handleBuyCourse = {handleBuyCourse}
                        />
                    </div>

                    {/* rest part (niche ka) */}
                    <div className="mx-auto box-content text-start text-richblack-5 lg:w-[1260px]">
                        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]"></div>

                        {/* What You Will Learned */}
                        <div className="my-8 border max-w-[810px] border-richblack-600 p-8">
                            <p className="text-3xl font-semibold">What you'll learn</p>
                            <div className="mt-5">
                                {whatYouWillLearned}
                            </div>
                        </div>

                        {/* Course Content */}
                        <div className="max-w-[800px]">
                            {/* heading */}
                            <div className="flex flex-col gap-3">
                                <p className="text-[28px] font-semibold">Course Content</p>
                            </div>

                            {/* sections and subSections */}
                            <div  className="flex flex-wrap justify-between gap-2">

                                {/* section + lecture + duration */}
                                <div className="flex gap-2">
                                    <span>
                                        {courseContent?.length} Sections(s)
                                    </span>
                                    <span>
                                        {totalLectures} Lecture(s) / totalLectures
                                    </span>
                                    <span>
                                        {/* {courseContent[0].subSection[1].timeDuration} Total length */}
                                    </span>
                                </div>

                                {/* collapse */}
                                <div className="text-yellow-25">
                                    <button
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse all Sections   
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course Details Accordion */}
                        <div className="py-4 max-w-[810px]">
                            {courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                course={course}
                                key={index}
                                isActive={isActive}
                                handleActive={handleActive}
                                />
                            ))}
                        </div>

                        {/* Author Details */}
                        <div className="mb-12 py-4">

                            {/* Author */}
                            <p className="text-[28px] font-semibold">Author</p>
                            
                            {/* instructor image and name */}
                            <div className="flex items-center gap-4 py-4">
                                <img
                                    src={ instructor.image
                                        ? instructor.image
                                        : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                    }
                                    alt="Author"
                                    className="h-14 w-14 rounded-full object-cover"
                                />
                                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                            </div>

                            {/* about */}   
                            <p className="text-richblack-50">
                                {instructor?.additionalDetails?.about}
                            </p>
                        </div>

                    </div>
                    
                </div>


                {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
            </div>
        </>
    )
}

export default CourseDetails