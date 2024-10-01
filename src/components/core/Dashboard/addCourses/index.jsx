import React from 'react'
import RederSteps from "./RederSteps"

const index = () => {
    return (
        <div className=''> 
            <div className='flex gap-10'>
                <div className='w-full'>
                    <h1 className="mb-14 text-3xl items-start text-richblack-5 bg-gradient-to-br 
                        font-bold from-[#1fff9a] via-[#10b3d8] to-[#11c4ca] text-transparent bg-clip-text"
                    >
                        Add Course
                    </h1>
                    <RederSteps />
                </div>
                
                {/* text box */}
                <div className="rounded-md border-[1px] lg:h-[380px] h-[780px] border-richblack-700 bg-richblack-800 p-6">
                    <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
                    <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
                        <li> Set the Course Price option or make it free.</li>
                        <li> Video section controls the course overview video.</li>
                        <li> Course Builder is where you create & organize a course.</li>
                        <li> Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li> Information from the Additional Data section shows up on the course single page.</li>
                        <li> Make Announcements to notify any important</li>
                        <li> Notes to all enrolled students at once.</li>
                    </ul>
                    
                </div>
            </div>

        </div>
  )
}

export default index 