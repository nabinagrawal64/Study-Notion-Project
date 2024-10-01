import React from "react";
import HighlightText from "./HighlightText";
import know_your_progres from "../../../assets/image/Know_your_progress.svg";
import compare_with_others from "../../../assets/image/Compare_with_others.png";
import plan_your_lessons from "../../../assets/image/Plan_your_lessons.png";
import CTAButton from "../HomePage/CTAButton";

const LearningLanguageSection = () => {
    return (
        <div className="mt-[90px] mb-12">
            <div className='flex flex-col gap-4 items-center'>
                {/* Heading */}                           
                <div className='font-semibold text-3xl text-center'>
                    Your Swiss knife for 
                    <HighlightText text={" Learning any Language"}/>
                </div>

                {/* Sub heading */}
                <div className='text-[16px] text-richblack-600 mx-auto text-center justify-center w-[70%] mb-2'>
                    Using spin making learning multiple language easy, with 20+ language realistic voice-over progress tracing, custom schedule and more.
                </div>

                {/* Images */}
                <div className="flex flex-row items-center justify-center mt-2">
                    <img src={know_your_progres} alt="know your progres" 
                         className="object-contain -mr-32 " />
                    <img src={compare_with_others} alt="compare with otherss" 
                         className="object-contain " />
                    <img src={plan_your_lessons} alt="plan your lessons" 
                         className="object-contain -ml-36 " />
                </div>
                
                {/* button */}
                <div className="w-fit mb-1">
                    <CTAButton active={true} linkto={"/signup"} >
                        Learn More
                    </CTAButton>
                </div>

            </div>
        </div>
    );
};

export default LearningLanguageSection;
