import React from 'react'
import ContactUsForm from '../contactPage/ContactUsForm'

const ContactForm = () => {
  return (
    <div className='mx-auto  justify-center items-center flex flex-col gap-5'>
        <h1 className='font-bold text-3xl'>Get in Touch</h1>
        <p className='text-richblack-200 text-sm mb-7'> We’d love to here for you, Please fill out this form. </p>
        <div>
            <ContactUsForm/>
        </div>

    </div>
  )
}

export default ContactForm