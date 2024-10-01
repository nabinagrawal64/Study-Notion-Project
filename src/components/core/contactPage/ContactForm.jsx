import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:px-20 lg:p-12
                     flex gap-3 flex-col">
      <h1 className="text-3xl leading-10 ">
        <p className="font-bold bg-gradient-to-b from-[#271fff] via-[#1092d8]
                     to-[#11c4ca] text-transparent bg-clip-text">Got a Idea? We&apos;ve got the skills.</p>
        <p className="font-bold bg-gradient-to-b from-[#271fff] via-[#1092d8]
                     to-[#11c4ca] text-transparent bg-clip-text">Let&apos;s team up</p> 
      </h1>
      <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="mt-7">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactForm;