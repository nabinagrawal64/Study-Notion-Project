import React from 'react'
import CTAButton from "../HomePage/CTAButton";

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "The learning process uses the namely online and offline.",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
  ];

function LearningGrid() {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-10 bg-richblack-900'>
        {
            LearningGridArray.map((card, index) => {
                return (
                    <div key={index} 
                        className={`${index === 0 && "lg:col-span-2 bg-richblack-900"}
                        ${
                            card.order % 2 === 1 ? "bg-richblack-700" : 
                            "bg-richblack-800 " 
                        }
                        ${ card.order === 3 && "lg:col-start-2"} items-center justify-center h-[270px]
                        `} 
                    >
                        {
                            card.order < 0 
                            ? ( //for heading
                                <div className=' translate-x-5 py-2'>
                                    <div className=' lg:text-3xl text-2xl text-richblack-5 font-bold'>
                                        {card.heading} <br />
                                        <div className='bg-gradient-to-r from-[#3875df] via-[#15c8e4]
                                         to-[#08c5eb] text-transparent bg-clip-text font-bold'>
                                            {card.highlightText}
                                        </div>
                                    </div>
                                    <p className='lg:max-w-[450px] my-2 leading-6 text-richblack-200 text-sm'>{card.description}</p>
                                    <div className='w-[20%] mt-8'>
                                        <CTAButton active={true} linkto={card.BtnLink} >
                                            {card.BtnText}
                                        </CTAButton>
                                    </div>
                                </div>
                            )
                            : ( //other box
                                <div className='px-12 py-8 '>
                                    <h1 className='font-bold pr-14'>{card.heading}</h1> <br />
                                    <p className='text-sm text-richblack-100'>{card.description}</p>
                                </div>
                            )
                        }

                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid