import React from "react";
import instructor from "../../../assets/image/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
    return (
        <div className="mt-12">
            <div className="flex flex-row gap-24 items-center">
                {/* image */}
                <div className="w-[50%] ">
                    <img src={instructor} alt="" className="shadow shadow-white"/>
                </div>

                {/* heading + sub heading + button*/}
                <div className="w-[50%] flex flex-col gap-5">
                    <div className="text-4xl font-semibold">
                        Become an
                        <HighlightText text={" Instructor"}/>
                    </div>

                    <p className="text-sm font-bold text-richblack-300 w-[78%]">
                        Instructor from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>

                    <div className="w-fit">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex gap-2 items-center '>
                                Start Laerning Today
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>

                </div>
            </div>
        </div>
    );  
};

export default InstructorSection;
