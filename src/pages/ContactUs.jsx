import React from 'react'
import ContactForm from "../components/core/contactPage/ContactForm" 
import { IoIosChatboxes } from "react-icons/io";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdCall } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className='relative mx-auto gap-5 flex max-w-maxContent flex-row w-full items-center text-white justify-around'>
        {/* section 1 */}
        <section className='bg-richblack-800 w-[35%] mt-10 pr-20 rounded-xl -translate-y-32 max-w-maxContent 
        items-center justify-center'>
            {/* chat on us */}
            <div className='m-10 flex gap-3'>
                {/* logo */}
                <div className='text-2xl text-richblack-50 translate-y-1'>
                    <IoIosChatboxes/>
                </div>

                <div>
                    {/* heading */}
                    <div className='font-bold text-xl'>
                        <h1>Chat on us</h1>
                    </div>
                    {/* paragraph */}
                    <div className='text-sm text-richblack-100'>
                        <p>Our friendly team is here to help.</p>
                        {/* <p>nabinagrawal64@gmail.com</p> */}
                        <p>@mail address</p>
                    </div>
                </div>
            </div>

            {/* visit us */}
            <div className='m-10 flex gap-3'>
                {/* logo */}
                <div className='text-xl text-richblack-50 translate-y-1'> 
                    <FaGlobeAmericas/>
                </div>

                <div>
                    {/* heading */}
                    <div className='font-bold text-xl'>
                        <h1>Visit us</h1>
                    </div>
                    {/* paragraph */}
                    <div className='text-sm text-richblack-100'>
                        <p>Come and say hello at our office HQ.</p>
                        {/* <p>At Po. Paikaml</p>
                        <p>Dist. Bargarh</p>
                        <p>Odisha</p>
                        <p>PinCode - 768039 </p> */}
                        <p>Here is the location/ address</p>
                    </div>
                </div>
            </div>

            {/* call us */}
            <div className='m-10 flex gap-3'>
                {/* logo */}
                <div className='text-2xl text-richblack-50 translate-y-1'>
                    <MdCall/>
                </div>
                
                <div>
                    {/* heading */}
                    <div className='font-bold text-xl'>  
                        <h1>Call us</h1>
                    </div>
                    {/* paragraph */}
                    <div className='text-sm text-richblack-100'>
                        <p>Mon - Fri From 8am to 5pm</p>
                        <p>+123 456 7890</p>
                    </div>
                </div>
            </div>
        </section>

        {/* section 2 */}
        <section className='mt-20'>
        <ContactForm/>
        </section>
    </div>
  )
}

export default ContactUs