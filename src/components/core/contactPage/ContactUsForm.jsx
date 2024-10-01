import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {apiConnector} from "../../../services/apiConnector";
import { contactusEndpoint } from '../../../services/apis';
import CountryCode from "../../../data/countrycode.json";

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful},
    } = useForm();

    useEffect( () => {
        if(isSubmitSuccessful){
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: ""
            })
        }
    },[isSubmitSuccessful,reset]);

    const submitContactForm = async(data) => {
        console.log("Logging Data", data);
        try {
            setLoading(true);
            const response = await apiConnector("post", contactusEndpoint.CONTACT_US_API, data);
            console.log("Logging Response", response);
            setLoading(false);
        } 
        catch (error) {
            console.log("Error: ", error.message);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitContactForm)} >
            {/* name section */}
            <div className="flex gap-x-4 py-5 text-richblack-50">

                {/* first name */}
                <label htmlFor='firstName'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
                        First Name 
                    </p>
                    <input
                        type="text"
                        name="firstName"
                        id='firstName'
                        placeholder="Enter First Name"
                        className=" w-full px-2  py-[10px] border-b shadow-lg
                         border-richblack-100 rounded-md bg-richblack-800 text-richblack-5"
                        {...register("firstName", {required:true})}
                    />
                    <div className='w-[150px]'>
                    {
                        errors.firstName && (
                            <span className="-mt-1  text-[12px] text-yellow-100">
                                Please Enter Your Name
                            </span>
                        )
                    }
                    </div>
                </label>

                 {/* last name */}
                <label htmlFor='lastName'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
                        Last Name 
                    </p>
                    <input
                        type="text"
                        name="lastName"
                        id='lastName'
                        placeholder="Enter Last Name"
                        className=" w-full px-2  py-[10px] border-b shadow-lg 
                        border-richblack-100 rounded-md bg-richblack-800 text-richblack-5"
                        {...register("lastName")}
                    />
                </label>
 
            </div>

            {/* Email Address */}
            <label className="w-full" htmlFor='email'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                    Email Address 
                </p>
                <input
                    type="text"
                    name="email"
                    id="email"
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    placeholder="Enter Email Address"
                    className=" w-full px-2  py-[10px] border-b shadow-lg
                     border-richblack-100 rounded-md bg-richblack-800 text-richblack-5"
                    {...register("email", {required:true})}
                />
                {/* error */}
                <div className='w-[200px] mb-5'>
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter Your Email Address
                        </span>
                    )
                }
                </div>
            </label>

            {/* Phone number */}
            <label className="w-full" htmlFor='phoneNo'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                    Phone Number  
                </p>

                {/* both input */}
                <div className='flex gap-5'>
                    {/* drop Down */}
                    <div className='flex w-[75px] flex-col gap-1'>
                        <select
                            name='dropdown'
                            id='dropdown'
                            placeholder="+91"
                            className=" lg:w-full px-2 py-[10px] border-b shadow-lg
                            border-richblack-100 rounded-md bg-richblack-800 text-richblack-100"
                            {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map((element,index) => {
                                    return (
                                        <option value="element.code" key={index}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                })
                            }
                            
                        </select>
                    </div>

                    {/* input */}
                    <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                        <input
                            type="number"
                            name="phoneNo"
                            id="phoneNo"
                            placeholder="12345 67890"
                            className=" lg:w-full px-2 py-[10px] border-b shadow-lg
                            border-richblack-100 rounded-md bg-richblack-800 text-richblack-5"
                            {...register("phoneNo", 
                                {
                                    required:{value:true, message: "Please Enter Phone Number"},
                                    maxLength: {value:10, message: "Invalid Phone Number"},
                                    minLength: {value:8, message: "Invalid Phone Number"},

                                })}
                        />
                        
                    </div>
                </div>
                            
                {/* error */}
                <div className='w-[200px] mb-5'>
                {
                    errors.phoneNo && (
                        <span className="mt-1 text-[12px]  flex flex-col translate-x-24 text-yellow-100">
                            {errors.phoneNo.message}
                        </span>
                    )
                }
                </div>

            </label>

            {/* message box */}
            <label htmlFor="message">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                     Message
                </p>

                <textarea 
                    name="message" 
                    id="message" 
                    cols="30"
                    rows="3"
                    placeholder="Enter Your Message Here"
                    className=" w-full px-2 py-[10px] border-b shadow-lg
                     border-richblack-100 rounded-md bg-richblack-800 text-richblack-5"
                    {...register("message", {required: true})}
                />

                {/* error */}
                <div className='w-[200px]'>
                {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please Enter Your Message
                        </span>
                    )
                }
                </div>
            </label>
            
            {/* Button */}
            <button
                disabled={loading}
                type="submit"
                className={`rounded-md w-full mt-7 bg-yellow-50 px-6 py-3 text-center
                     text-[13px] font-semibold text-richblack-700 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${ !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"}  
                disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button> 

        </form> 
    )
}

export default ContactUsForm