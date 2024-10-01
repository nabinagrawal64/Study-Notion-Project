import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
// import formattedDate from "../../../../utils/dateFormatter"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../Common/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { formatDate } from "../../../../services/formatDate"
import { FaCheck } from 'react-icons/fa';
import { HiClock } from 'react-icons/hi';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const CourseTable = ({courses, setCourses}) => {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async(courseId) => {
        setLoading(true);
        console.log(courses._id)
        await deleteCourse({courseId: courseId},token);
        const result = await fetchInstructorCourses(token);
        console.log("result => ", result)
        if(result){
            setCourses(result);
        } 
        setConfirmationModal(null);
        setLoading(false);
    }

    console.log("Courses", courses);
    
    return (
        <div className='text-white '>
            <Table className="rounded-xl border border-richblack-800 ">

                {/* head */}
                <Thead className='flex flex-row'>
                    <Tr className="flex lg:gap-x-[400px] sm:gap-x-[295px] rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                            Course
                        </Th>
                       <Th className='flex lg:ml-[180px] mx-auto gap-x-8'>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                                Duration
                            </Th>
                            <Th className="text-left text-sm font-medium uppercase text-richblack-100">        
                                Price
                            </Th>
                            <Th className="text-left ml-4 text-sm font-medium uppercase text-richblack-100">
                                Actions
                            </Th>
                       </Th>
                    </Tr>
                </Thead>

                {/* body */}
                <Tbody  >
                    {
                        courses.length === 0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                    No Courses Found
                                </Td>
                            </Tr>
                        ) : (
                            courses?.map((course) => {
                                return (
                                    <Tr key={course._id} className='flex gap-x-5 border-b items-center border-richblack-800 px-6 p-8'>
                                        {/* image + title */}
                                        <Td className="flex flex-1 gap-x-4">
                                            <img src={course?.thumbnail} alt={course?.courseName}
                                            className="h-[150px] w-[220px] rounded-lg object-cover "/>

                                            <div className="flex flex-col justify-between">
                                                {/* course name */}
                                                <p className="text-lg font-semibold text-richblack-5">
                                                    {course?.courseName}
                                                </p>

                                                {/* description */}
                                                <p className="text-xs text-richblack-300">
                                                    {course.courseDescription.split(" ").length 
                                                >
                                                    TRUNCATE_LENGTH
                                                    ? course.courseDescription
                                                        .split(" ")
                                                        .slice(0, TRUNCATE_LENGTH)
                                                        .join(" ") + "..."
                                                    : course.courseDescription}
                                                </p>

                                                {/* created */}
                                                <p className="text-[12px] text-white">
                                                    Created: {formatDate(course.createdAt)}
                                                </p>

                                                {/* status */}
                                                {course.status === COURSE_STATUS.DRAFT ? (
                                                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                                        <HiClock size={14} />
                                                        Drafted
                                                    </p>
                                                    ) : (
                                                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                        <FaCheck size={8} />
                                                        </div>
                                                        Published
                                                    </p>
                                                )}
                                            </div>
                                        </Td>   
                                            
                                        {/* duration */}
                                        <Td className="text-sm font-semibold px-4 text-richblack-100">    
                                            2h 30min
                                        </Td>

                                        {/* price */}
                                        <Td className="text-sm px-4 font-semibold text-richblack-100">
                                            ${course?.price}
                                        </Td>

                                        {/* edit button */}
                                        <Td className="text-sm pl-3 font-semibold text-richblack-100">
                                        <button
                                            disabled={loading}
                                            onClick={() => { navigate(`/dashboard/edit-course/${course._id}`)}}
                                            title="Edit"
                                            className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                        >
                                            <FiEdit2 size={20} />
                                        </button>
                                        </Td>

                                        {/* delete button */}
                                        <Td
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course",
                                                    text2: "All the data related this courtse will be deleted",
                                                    btn1Text: !loading ? "Delete" : "Loading...  ",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading ? () => handleCourseDelete(course._id) : () => {},
                                                    btn2Handler: !loading ? () => setConfirmationModal(null) : () => {}
                                                })
                                            }}
                                            title='delete'
                                            className="pr-8 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </Td>
                                    </Tr>
                                )
                            })
                        )
                    }
                </Tbody>
            </Table>
            {
                confirmationModal &&  <ConfirmationModal modalData={confirmationModal} />
            }
        </div>
    )
}

export default CourseTable