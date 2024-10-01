import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails,fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import { COURSE_STATUS } from "../../../../../utils/constants"

import ChipInput from "./ChipInput";
import Upload from "../Upload";
import RequirementsField from './Requirement';
import IconBtn from "../../../../Common/IconBtn"
import { setCourse, setStep } from "../../../../../slices/courseSlice"
import toast from 'react-hot-toast';
import { MdNavigateNext } from 'react-icons/md';

const CourseInformationForm = () => {

    const {register,handleSubmit,setValue,getValues,formState:{errors}} = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state)   => state.auth)
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse){
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseBenefits", course.whatYouWillLearned);
            setValue("courseTags", course.tag);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instruction);
            setValue("courseImage", course.thumbnail);
        }
        getCategories();
    // eslint-disable-next-line
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues();
        console.log(currentValues);

        if(     currentValues.courseTitle !== course.courseName ||
                currentValues.courseShortDesc !== course.courseDescription ||
                currentValues.coursePrice !== course.price ||
                currentValues.courseBenefits !== course.whatYouWillLearned ||
                currentValues.courseTags.toString() !== course.tag.toString() ||
                currentValues.courseCategory._id !== course.category._id ||
                currentValues.courseImage !== course.thumbnail ||
                currentValues.courseRequirements.toString() !== course.instruction.toString()
            )
            return true;
        
        else return false;
    }

    // handles next button click
    const onSubmit = async(data) => {

        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();
            
                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName ){
                    formData.append("courseName", data.courseTitle);
                }
                if(currentValues.courseShortDesc !== course.courseDescription ){
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if(currentValues.coursePrice !== course.price ){
                    formData.append("price", data.coursePrice);
                }
                if(currentValues.courseImage !== course.thumbnail ){
                    formData.append("thumbnail", data.courseImage);
                }
                if(currentValues.courseBenefits !== course.whatYouWillLearned ){
                    formData.append("whatYouWillLearned", data.courseBenefits);
                }
                if(currentValues.courseRequirements.toString() !== course.instruction.toString() ){
                    formData.append("instruction", JSON.stringify(data.courseRequirements));
                }
                if(currentValues.courseCategory._id !== course.category._id ){
                    formData.append("category", data.courseCategory);
                }
                if(currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No changes made to the form");
            }
            return;
        }

        // create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("thumbnailImage", data.courseImage);
        formData.append("whatYouWillLearned", data.courseBenefits);
        formData.append("instruction", JSON.stringify(data.courseRequirements));
        formData.append("category", data.courseCategory);
        formData.append("tag", data.courseTags);
        formData.append("status", COURSE_STATUS.DRAFT);
        // console.log("Formdata", formData);

        setLoading(true);
        const result = await addCourseDetails(formData, token);
        console.log("Result",result)
        if(result){
            console.log(setStep(2))
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        else {
            console.log("result is not found ");
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className=' bg-richblack-800 border-richblack-700 rounded-md'>
            <div className="flex gap-x-4 py-5 px-10 text-richblack-50">

                <div className='w-full'>

                    {/* course title */}
                    <div className='py-3'>
                        <label className="leading-9 px-1"  htmlFor='courseTitle' >
                            Course Title <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                            name="courseTitle"
                            id='courseTitle'
                            placeholder="Enter First Name"
                            className="form-style"
                            {...register("courseTitle", {required:true})}
                        />

                        {/* error */}
                        <div >
                        {
                            errors.courseTitle && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Course Title is Required
                                </span>
                            )
                        }
                        </div>

                    </div>

                    {/* Course Short Description */}
                    <div className='pb-3'>
                        <label className="leading-9 px-1"  htmlFor='courseShortDesc' >
                            Course Short Description <sup className="text-pink-200">*</sup>
                        </label>

                        <textarea 
                            name="courseShortDesc" 
                            id="courseShortDesc" 
                            cols="30"
                            rows="3"
                            placeholder="Enter Discription"
                            className="form-style"
                            {...register("courseShortDesc", {required: true})}
                        />

                        {/* error */}
                        <div >
                        {
                            errors.courseShortDesc && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Please Enter Your Message
                                </span>
                            )
                        }
                        </div>
                    </div>

                     {/* price */}
                    <div className='pb-3'>
                        <label className="leading-9 px-1"  htmlFor='coursePrice' >
                           Price <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                            name="coursePrice"
                            id='coursePrice'
                            placeholder="Enter Price"
                            
                            className="w-full px-10 py-[10px] border-b shadow-lg border-richblack-100 rounded-md bg-richblack-700 text-richblack-5"
                            {...register( "coursePrice", {
                                required: true,
                                pattern: {
                                    value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                  },
                                }
                            )}
                            
                        />
                        {/* <HiOutlineCurrencyRupee className="absolute left-10 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" /> */}

                        {/* error */}
                        <div >
                        {
                            errors.coursePrice && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Course price is Required
                                </span>
                            )
                        }
                        </div>

                    </div>

                    {/* category */}
                    <div className='pb-3'>
                        <label className="leading-9 px-1"  htmlFor='courseCategory' >
                            Course Category <sup className="text-pink-200">*</sup>
                        </label>
                        <select
                            name="courseCategory"
                            id='courseCategory'
                            className="form-style"
                            {...register( "courseCategory",{required: true,})}
                            defaultValue=""
                        >
                        <option value="" disabled>
                            Choose a Category
                        </option>
                        {!loading &&
                            courseCategories?.map((category, indx) => (
                                <option key={indx} value={category?._id}>
                                    {category?.name}
                                </option>
                            ))}
                        </select>

                        {/* error */}
                        <div >
                        {
                            errors.coursePrice && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Course price is Required
                                </span>
                            )
                        }
                        </div>

                    </div>

                    {/* tags */}
                    <ChipInput  
                        label="Tags"
                        name="courseTags"
                        placeholder="Enter Tags and press Enter"
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                    />

                    {/* course Thumbnail */}
                    <Upload
                        name="courseImage"
                        label="Course Thumbnail"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        editData={editCourse ? course?.thumbnail : null}
                    />

                    {/* Benefits */}
                    <div className='py-3'>
                        <label className="leading-9 px-1"  htmlFor='courseBenefits' >
                            Benefits of the Course <sup className="text-pink-200">*</sup>
                        </label>

                        <textarea 
                            name="courseBenefits" 
                            id="courseBenefits" 
                            cols="30"
                            rows="3"
                            placeholder="Enter Benefits of the Course"
                            className="form-style"
                            {...register("courseBenefits", {required: true})}
                        />

                        {/* error */}
                        <div >
                        {
                            errors.courseBenefits && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Please Enter Some Benefits
                                </span>
                            )
                        }
                        </div>
                    </div>

                    {/* requirement */}
                    <RequirementsField
                        name="courseRequirements"
                        label="Requirements/Instructions"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        getValues={getValues}
                    />

                </div>

            </div>

            {/* button */}
            <div className='flex items-end justify-end gap-5 pb-5 pr-10'>
                {
                    editCourse && (
                        <button
                            disabled={loading}
                            onClick={() => dispatch(setStep(2))}
                            className='px-3 py-2 border-b font-extrabold text-sm rounded-md bg-richblack-400 text-richblack-700'
                        >
                            Continue WithOut Saving
                        </button>
                    )
                }
                
                <IconBtn 
                    disabled={loading}
                    text={!editCourse ? "Next" : "Save Changes"}
                >
                    <MdNavigateNext />
                </IconBtn>

            </div>
        </form>
    )
}

export default CourseInformationForm