import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/image/aboutus1.webp";
import BannerImage2 from "../assets/image/aboutus2.webp";
import BannerImage3 from "../assets/image/aboutus3.webp";
import FoundingStory from "../assets/image/FoundingStory.png";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponents from "../components/core/AboutPage/StatsComponents";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactForm from "../components/core/AboutPage/ContactForm";
import Footer from "../components/Common/Footor";
import ReviewSlider from "../components/Common/ReviewSlider";

const About = () => {
    return (
        <div className="relative mx-auto flex flex-col w-full items-center text-white justify-center">
            {/* section 1 */}
            <section className="bg-richblack-800 w-full">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between
                                 gap-10 text-center text-white">
                    {/* heading */}
                    <header className="mx-auto py-14 text-3xl font-semibold lg:w-[70%]">
                        Driving Innovation in Online Education for a <br />
                        <HighlightText text={" Brighter Future"} />
                        <p className="mx-auto mt-5 text-center text-sm leading-6 text-richblack-300 lg:w-[80%]">
                            Studynotion is at the forefront of driving
                            innovation in online education. We're passionate
                            about creating a brighter future by offering
                            cutting-edge courses, leveraging emerging
                            technologies, and nurturing a vibrant learning
                            community.
                        </p>
                    </header>

                    {/* image */}
                    <div className="sm:h-[70px] lg:h-[150px]"></div>
                    <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] 
                                    translate-y-[30%] grid-cols-3 gap-2 lg:gap-5">
                        <img src={BannerImage1} alt="" />
                        <img src={BannerImage2} alt="" />
                        <img src={BannerImage3} alt="" />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="border-b border-richblack-700">
                <div className="mx-auto flex w-[85%] max-w-maxContent flex-col justify-between
                 gap-10 text-richblack-500">
                    <div className="h-[100px] "></div>
                    <Quote />
                </div>
            </section>

            {/* section 3 */}
            <section>
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between 
                                gap-10 text-richblack-500">
                    {/* 1st image and text founding story*/}
                    <div className=" flex flex-row lg:flex-row justify-between items-center text-left ">

                        {/* text */}
                        <div className="flex mt-20 flex-col lg:w-[60%] gap-5" >
                            {/* hedaing */}
                            <h1 className=" bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] 
                                        bg-clip-text text-3xl font-semibold text-transparent lg:w-[70%] ">
                                 Founding Story
                            </h1>

                            {/* paragraph */}
                            <p className=" text-richblack-25">
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            
                            {/* paragraph */}
                            <p className="text-richblack-25">
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>

                        {/* image */}
                        <div className="w-full translate-x-60">
                            <img src={FoundingStory} alt=""  />
                        </div>

                    </div>

                    {/* 2nd dono text */}
                    <div className="gap-20 flex flex-row lg:flex-row justify-between items-center text-left ">

                        {/* text 1*/}
                        <div className="flex mt-20 flex-col lg:w-[60%] gap-5" >
                            {/* hedaing */}
                            <h1 className=" bg-gradient-to-br from-[#ae5d22] via-[#d18e31] to-[#fcaa37] 
                                        bg-clip-text text-3xl font-semibold text-transparent lg:w-[70%] ">
                                Our Vision
                            </h1>

                            {/* paragraph */}
                            <p className=" text-richblack-25">
                                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>
                        </div>

                        {/* text 2 */}
                        <div className="flex mt-20 flex-col lg:w-[60%] gap-5" >
                            {/* hedaing */}
                            <h1 className=" bg-gradient-to-br from-[#52e8e8] via-[#10a2f6] to-[#1dbbef] 
                                        bg-clip-text text-3xl font-semibold text-transparent lg:w-[70%] ">
                                 Our Mission
                            </h1>

                            {/* paragraph */}
                            <p className=" text-richblack-25">
                                our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                            

                        </div>
                        
                    </div>

                </div>
            </section>

            {/* section 4 */}
            <section className="bg-richblack-800 w-full lg:m-16">

                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between
                                gap-10 text-center text-white items-center">
                    <StatsComponents />
                </div>
            </section>

            {/* section 5 */}
            <section className=" w-full lg:m-2">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between
                                gap-10 text-white items-center">
                    <LearningGrid />                
                </div>
            </section>

            {/* section 6 */}
            <section className=" w-full lg:m-2">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between
                                gap-10 text-white items-center">
                    <ContactForm />                
                </div>
            </section>

            {/* section 6 */}
            <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between
                            gap-8 first-letter bg-richblack-900 text-white '>

                
                <h2 className="text-center text-3xl font-semibold mt-5" > Review from Other Learners </h2>
                {/* review section */}
                <ReviewSlider />
            </div>

            {/* footer */}
            <Footer/>

        </div>
    );
};

export default About;
