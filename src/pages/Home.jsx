import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/image/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import "../App.css"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimelineSection from '../components/core/HomePage/TimelineSection'; 
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from "../components/Common/Footor";
import ExploreMore from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/Common/ReviewSlider';

const Home = () => {
  return (
    <div className='relative mx-auto flex flex-col items-center text-white justify-between'>
        {/* section 1 */} 
        <div>
            {/* Become a Instructor Button */}
            <Link to="/signup">

                <div className='group mt-10 p-1 mx-auto rounded-full bg-richblack-800 font-bold
                transition-all duration-200 hover:scale-90 w-fit text-richblack-200'> {/*for rounding */ }
                    <div className='text-[15px] flex flex-row items-center gap-1 rounded-full px-6 py-1
                    transition-all duration-200 group-hover:bg-richblack-900'>  {/*for content */ }
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                    
                </div>

            </Link>
        </div>
        
        {/* Heading */}
        <div className='mt-5 font-bold max-w-maxContent text-3xl text-center'>
            Empower Your Future with 
            <HighlightText text={" Coding Skill"}/>
        </div>

        {/* Sub Heading */}
        <div className=' mt-3 text-center max-w-[780px] text-sm font-bold text-richblack-300'>
            <p>
                With our online coding courses. You can learn at your own pace. from anywhere in the world, and get access to a wealth of resourses, including hans-on project, quizes and personalised feedback fromk instructor. 
            </p>
        </div>

        {/* Button */}
        <div className='flex flex-row gap-7 mt-5'>
            <CTAButton active={true} linkto={'/signup'}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={'/login'}>
                Book a Demo
            </CTAButton>
        </div>

        {/* Video */}
        <div className='shadow-[10px_-5px_50px_-5px] shadow-blue-200 my-10 mx-3 w-[1000px] '>
            <video muted loop autoPlay  className="shadow-[20px_20px_rgba(255,255,255)]">
                <source src={Banner} type='video/mp4'/>
            </video>
        </div>

        {/* Code section 1*/}
        <div>
            <CodeBlocks 
            position={"lg:flex-row"} 
            heading={
                <div className='mt-5 font-bold text-3xl'>
                    Unlock Your
                    <HighlightText text={` Coding potential `}/>
                    with our online courses
                </div>
            }
            subheading={
                "our courses are designed and taughed by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you "
            }
            ctabtn1={
                {
                    btnText: "Try with Yourself",
                    linkto: "/signup",
                    active: true
                }
            }
            ctabtn2={
                {
                    btnText: "Learn More",
                    linkto: "/login",
                    active: false
                }
            }
            codeblock={`<<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`} 
            codeColor={'text-yellow-25'}
            bgGradient={<div className="codeblock1 absolute"></div>}
            >
                
            </CodeBlocks>                                                                                    
        </div>

        {/* Code section 2 */}

        <div>
            <CodeBlocks 
            position={"lg:flex-row-reverse"} 
            heading={
                <div className='mt-5 font-bold text-3xl'>
                    Unlock Your
                    <HighlightText text={` Coding potential `}/>
                    with our online courses
                </div>
            }
            subheading={
                "our courses are designed and taughed by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you "
            }
            ctabtn1={
                {
                    btnText: "Try with Yourself",
                    linkto: "/signup",
                    active: true
                }
            }
            ctabtn2={
                {
                    btnText: "Learn More",
                    linkto: "/login",
                    active: false
                }
            }
            codeblock= {`<<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`} 
            codeColor={'text-yellow-25'}

            >
                
            </CodeBlocks>                                                                                    
        </div>
        
        {/* ExploreMore */}
        <div>
            <ExploreMore />
        </div>

        {/* section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 w-[100vw]'>
            {/* Buttons */}
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-center mx-auto gap-5'>
                <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-5 mx-auto text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex gap-2 items-center'>
                                Explore Full catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div className='flex gap-2 items-center'>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>  


                </div>
            </div>

            {/* heading and subheading and button */}
            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5'>
                <div className='flex flex-row gap-5 mb-10 mt-[50px] justify-center'>
                    {/* Heading */}                           
                    <div className='font-semibold text-3xl w-[38%]'>
                        Get the Skils you need for a
                        <HighlightText text={" Job that is in Demand."}/>
                    </div>
                    {/* Sub heading  + button */}
                    <div className='flex flex-col gap-10 w-[40%] items-start'>
                        <div className='text-[16px] text-richblack-900'>
                            The morden StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professionals skills 
                        </div>
                        <CTAButton active={true} linkto={'/signup'}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>

                <TimelineSection/>
                <LearningLanguageSection/>
            
            </div>


        </div>

        {/* section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between
                        gap-8 first-letter bg-richblack-900 text-white '>

            <InstructorSection />

            <h2 className="text-center text-3xl font-semibold mt-5" > Review from Other Learners </h2>
            {/* review section */}
            <ReviewSlider />
        </div>



        {/* Footer */}
        <Footer/> 

    </div>
  )
}

export default Home