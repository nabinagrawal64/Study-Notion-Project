import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiFillCaretDown, AiOutlinePlus } from "react-icons/ai";
import ConfirmationModal from "../../../../Common/ConfirmationModal";
import { setCourse } from "../../../../../slices/courseSlice"
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";

const NestedView = ({ handleChangedSectionName }) => {
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    // console.log("course content ->",course?.courseContent);

    const handleDeleleSection = async(sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token
        })
        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    };

    const handleDeleleSubSection = async(subSectionId,sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
            token
        })
        if(result){
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null);
    };

    return (
        <div>
            <div className="rounded-lg bg-richblack-700 p-6 px-8" id="nestedViewContainer">
                {course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        {/* section */}
                        <summary
                            className="flex cursor-pointer items-center justify-between 
                                border-b-2 border-b-richblack-600 py-2"
                        >
                            {/* section name */}
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-richblack-50" />
                                <p className="text-richblack-50 font-semibold">
                                    {section.sectionName}
                                </p>
                            </div>

                            {/* edit wala content */}
                            <div className="flex items-center gap-x-3">
                                {/* edit icon */}
                                <button
                                    onClick={() =>
                                        handleChangedSectionName(
                                            section._id,
                                            section.sectionName
                                        )
                                    }
                                >
                                    <MdEdit className="text-xl text-richblack-300" />
                                </button>

                                {/* delete icon */}
                                <button
                                    onClick={() =>
                                        setConfirmationModal({
                                            text1: "Delete this Section?",
                                            text2: "All the lectures in this section will be deleted",
                                            btn1Text: "Delete",
                                            btn2Text: "Cancel",
                                            btn1Handler: () =>
                                                handleDeleleSection(
                                                    section._id
                                                ),
                                            btn2Handler: () =>
                                                setConfirmationModal(null),
                                        })
                                    }
                                >
                                    <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                </button>

                                {/* dropDown */}
                                <span className="font-medium text-richblack-300">|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-300`}/>
                            </div>
                        </summary>

                        {/* sub section */}
                        <div>
                            {section.subSection.map((data) => (
                                <div
                                    key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className="flex cursor-pointer items-center justify-between 
                                               gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                >
                                    {/* subSection name */}
                                    <div className="flex items-center gap-x-3 py-2">
                                        <RxDropdownMenu className="text-2xl text-richblack-50" />
                                        <p className="text-richblack-50 font-semibold">
                                            {data.title}
                                        </p>
                                    </div>
                                    {/* edit wala content */}
                                    <div className="flex items-center gap-x-3"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {/* edit icon */}
                                        <button
                                            onClick={() =>
                                                setEditSubSection({
                                                    ...data,
                                                    sectionId: section._id,
                                                })
                                            }
                                        >
                                            <MdEdit className="text-xl text-richblack-300" />
                                        </button>

                                        {/* delete icon */}
                                        <button
                                            onClick={() =>
                                                setConfirmationModal({
                                                    text1: "Delete this Sub Section?",
                                                    text2: "selected lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () =>
                                                        handleDeleleSubSection(
                                                            data._id,
                                                            section._id
                                                        ),
                                                    btn2Handler: () =>
                                                        setConfirmationModal(
                                                            null
                                                        ),
                                                })
                                            }
                                        >
                                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Add lectures */}
                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className="mt-3 flex items-center gap-x-1 text-yellow-50"
                            >
                                <AiOutlinePlus />
                                <p>Add Lecture</p>
                            </button>
                        </div>
                    </details>
                ))}
            </div>

            {/* modal section */}
            <div>
                {/* modal display */}
                {
                    // add sub section
                    addSubSection ? (
                        <SubSectionModal
                            modalData={addSubSection}
                            setModalData={setAddSubSection}
                            add={true}
                        />
                    ) : 
                    // view sub section
                    viewSubSection ? (
                        <SubSectionModal
                            modalData={viewSubSection}
                            setModalData={setViewSubSection}
                            view={true}
                        />
                    ) :
                    // edit sub section
                    editSubSection ? (
                        <SubSectionModal
                            modalData={editSubSection}
                            setModalData={setEditSubSection}
                            edit={true}
                        />
                    ) : (<div></div>)
                }

                {/* Confirmation Modal */}
                {
                    confirmationModal
                    ? (
                        <ConfirmationModal modalData={confirmationModal}/>
                    )
                    : (<div></div>)
                }
            </div>
        </div>
    );
};

export default NestedView;
