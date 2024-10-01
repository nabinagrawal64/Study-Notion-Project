import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className=" text-xl md:text-3xl font-semibold mx-auto py-5 pb-20 text-center text-richblack-200">
        We are passionate about revolutionizing the way we learn. Our <br />    
        innovative platform <HighlightText text={"Combines Technology"} />,{" "}

        <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent 
                         bg-clip-text font-bold">
            {" "}
            expertise
        </span>

        , and community to  create an
        
        <span className="bg-gradient-to-b from-[#e69900] to-[#F9D423] text-transparent 
                         bg-clip-text font-bold">
            {" "}
            Unparalleled Educational Experience.
        </span> 
    </div>
  )
}

export default Quote