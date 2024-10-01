import React from 'react'

import Logo1 from "../../../assets/timeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/timeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/timeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/timeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/image/TimelineImage.png";

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Describion: "Fully commied to the sucess company",
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Describion: "Student be always be our top priority",
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Describion: "The ability to switch an important skills",
    },
    {
        Logo: Logo4,
        Heading: "Leadership",
        Describion: "Fully commied to the sucess company",
    },
]

const TimelineSection = () => {
  return (
    <div>
        <div className="flex flex-row gap-15 items-center">
            {/* Left box */}
            <div className="w-[45%] flex flex-col gap-5">
                {
                    timeline.map((element,index) => {
                        return (
                            <div className='flex flex-row gap-6' key={index}>
                                {/* image */}
                                <div className='w-12 h-12 bg-white flex items-center'>
                                    <img src={element.Logo} alt='' />
                                </div>

                                {/* heading + sub Heading*/}
                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                    <p className='text-base'>{element.Describion}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {/* Right Box */}
            <div className='relative shadow-blue-200'>
                {/* image */}
                <img src={timelineImage} alt='TimelineImage' className='shadow-white object-cover h-fit' />

                {/* green box */}
                <div className='absolue w-[55%] bg-caribbeangreen-700 flex flex-row text-white uppercase py-6
                                translate-y-[-50%] translate-x-[40%] ' >
                    <div className='flex flex-row items-center gap-4 border-r border-caribbeangreen-300 px-3'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                    </div>

                    <div className='flex items-center gap-4 px-5'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection