import React, { useState } from 'react'
import HighlightText from './HighlightText'
import {HomepageExplore}  from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";

const tabsname = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsname[0]);
    const [courses, setCourses] = useState(HomepageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomepageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomepageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
    
    return (
        <div>
            <div className='m-10'>
                {/* Heading */}
                <div className='mt-5 font-bold text-3xl text-center'>
                    Unlock the 
                    <HighlightText text={" Power of Code"}/>
                </div>

                {/* Sub Heading */}
                <div className=' my-3 text-center text-sm font-bold text-richblack-300'>
                    <p>
                        Learn to build Anything You Can Imagine 
                    </p>
                </div>

                {/* tab component */}
                <div className='flex flex-row gap-1 rounded-full bg-richblack-800 
                                my-5 border border-richblack-200 px-2 py-1'>
                    {
                        tabsname.map((element,index) => {
                            return (
                                <div className =
                                                {
                                                    `text-sm flex flex-row items-center gap-2
                                                    ${currentTab === element ? 
                                                    "bg-richblack-900 text-richblack-5 font-medium" :
                                                    " text-richblack-200"} 
                                                    rounded-full transition-all duration-200 cursor-pointer 
                                                    hover:scale-95 hover:bg-richblack-900
                                                    hover:text-richblack-5 px-5 py-1`
                                                    }
                                                    key={index}
                                                    onClick={() => setMyCards(element)}
                                                >       
                                    {element}
                                </div>
                            )
                        })  
                    }
                </div>

                {/* card component */}
                <div className='mt-12 lg:h-[150px]'>
                    <div className='lg:absolute flex flex-row flex-wrap
                    w-full gap-10 lg:left-[50%] lg:translate-x-[-50%] justify-center
                    text-black'>
                        {
                            courses.map((element, index) => {
                                return (
                                    <CourseCard 
                                    key={index}
                                    cardData = {element}
                                    currentCard = {currentCard}
                                    setCurrentCard = {setCurrentCard}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
  )
}

export default ExploreMore