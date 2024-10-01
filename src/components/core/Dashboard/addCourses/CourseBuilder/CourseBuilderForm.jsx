import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../Common/IconBtn';
import { TbCirclePlus } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import {  setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice"
import { MdNavigateNext } from 'react-icons/md';
import NestedView from './NestedView';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';

const CourseBuilderForm = () => {

    const {register,handleSubmit,setValue,formState:{errors}} = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    function cancelEdit(){
        setEditSectionName(null);
        setValue("SectionName", "");
    }

    function goBack(){
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    function goToNext(){
        if(course.courseContent.length === 0){
            toast.error("Plase add atleast one section");
            return;
        }
        // if(course.courseContent.some((section) => section.subSection.length === 0)){
        //     toast.error("Plase add atleast one lecture in each section");
        //     return;
        // }

        //if everything is good
        dispatch(setStep(3));
    }

    async function onSubmit(data){
        try {
            setLoading(true);
            let result;
            
            // we are editing the section name
            if(editSectionName){
                result = await updateSection({
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                },token)
            }
            // we are creating section
            else{
                result = await createSection({
                    sectionName: data.sectionName,
                    courseId: course._id,
                },token)
            }
            
            // value update
            if(result){
                dispatch(setCourse(result));
                setEditSectionName(null);
                setValue("SectionName", "");
            }
        } 
        catch (error) {
            console.error(error);
            toast.error('An error occurred');
        }
        finally {
            setLoading(false);
        }
        
    }

    const handleChangedSectionName = (sectionId, sectionName) => {
        console.log('Before update:', editSectionName, sectionId, sectionName);
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
        console.log('After update:', editSectionName, sectionName);
    };

    return (
        <div className=' bg-richblack-800 border-richblack-700 rounded-md'>
            <div className="flex gap-x-4 flex-col py-5 px-10 text-richblack-50">
                <p className='text-2xl '>Course Builder</p>
                {/* section */}
                <form  onSubmit={handleSubmit(onSubmit)}>
                    {/* section input */}
                    <div className='py-3'>
                        <label className="leading-9 px-1"  htmlFor='sectionName' >
                            Section Name <sup className="text-pink-200">*</sup>
                        </label>
                        <input
                            name="sectionName"
                            id='sectionName'
                            placeholder="Add a section to build your course"
                            className="form-style"
                            {...register("sectionName", {required:true})}
                        />

                        {/* error */}
                        <div >
                        {
                            errors.sectionName && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                    Section name is Required
                                </span>
                            )
                        }
                        </div>
                    </div>

                    {/* create section */}
                    <div className="flex gap-x-2 items-center">
                        <IconBtn
                            type="Submit"
                            disabled={loading}
                            text={editSectionName ? "Edit Section Name"  : "Create Section"}
                            customClasses={"text-yellow-50 "}
                            outline={true}
                        >
                        <TbCirclePlus size={22}/> 
                        </IconBtn>
                        {editSectionName && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="text-sm text-richblack-300 underline"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>

                </form>

                {
                    course.courseContent.length > 0 && (
                    <NestedView handleChangedSectionName={handleChangedSectionName} />
                )}

                
                {/* button */}
                <div className='flex items-end justify-end pb-5 pr-10'>
                    <button
                        disabled={loading}
                        onClick={goBack}
                        className='flex items-center gap-x-2 bg-richblack-300'
                    >
                        Back
                    </button>
                    
                    <IconBtn text={"Next"} onclick={goToNext}>
                        <MdNavigateNext />
                    </IconBtn>
                </div>
            </div>
        </div>
    )
}

export default CourseBuilderForm