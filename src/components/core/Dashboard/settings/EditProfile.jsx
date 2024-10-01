import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../Common/IconBtn";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../../../services/operations/settingAPI"
import CountryCode from "../../../../data/countrycode.json";

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth)
    console.log(token);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitProfileForm = async (data) => {
        console.log("Form Data - ", data)
        try {
            dispatch(updateProfile(token, data));
        } 
        catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
    };

    const gen = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

    return (
        <form onSubmit={handleSubmit(submitProfileForm)}
              className="relative mx-auto mt-20 lg:gap-10 gap-5 flex flex-col w-full text-white justify-center">

            {/* personal details */}
            <div className="flex flex-col w-full justify-between rounded-md border-[1px] 
                            border-richblack-700 bg-richblack-800 p-8 px-12">
                {/* Details */}
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg lg:mb-6 mb-4 font-semibold text-richblack-5">
                        Profile Information
                    </p>
                </div>

                {/* Additional Details */}
                <div className="flex max-w-[1100px] gap-10 ">
                    {/* left wala */}
                    <div className="flex flex-col gap-y-5 w-full">

                        {/* Display NAme */}
                        <label className="w-full lable-style" htmlFor='displayName' >
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                                Display Name 
                            </p>
                            <input
                                type="text"
                                name="displayName"
                                id="displayName"
                                placeholder="Enter Display Name"
                                className=" w-full px-2  py-[10px] border-b shadow-lg
                                border-richblack-100 rounded-md bg-richblack-700 text-richblack-5" 
                                {...register("displayName", )}
                                defaultValue={user?.displayName}
                            />
                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Display Name.
                                </span>
                            )}
                        </label>

                        {/* First Name */}
                        <label className="w-full lable-style" htmlFor='firstName' >
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                                First Name 
                            </p>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter First Name"
                                className=" w-full px-2  py-[10px] border-b shadow-lg
                                border-richblack-100 rounded-md bg-richblack-700 text-richblack-5" 
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your First Name.
                                </span>
                            )}
                        </label>

                        {/* date Of Birth */}
                        <label className="w-full lable-style" htmlFor='dateOfBirth'>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                                Date Of Birth 
                            </p>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className=" w-full px-2 py-[10px] border-b shadow-lg
                                border-richblack-100 rounded-md bg-richblack-700 text-richblack-5"
                                {...register("dateOfBirth")}
                                defaultValue={user?.dateOfBirth}
                            />
                        </label>
                        
                        {/* Gender */}
                        <label className="w-full lable-style" htmlFor='gender'>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                                Gender  
                            </p>

                            <div className='flex gap-5'>
                                {/* drop Down */}
                                <div className='flex w-full flex-col gap-1'>
                                    <select
                                        type="text"
                                        name='gender'
                                        id='gender'
                                        className=" lg:w-full px-2 py-[10px] border-b shadow-lg
                                        border-richblack-100 rounded-md bg-richblack-700 text-richblack-100"
                                        {...register("gender", {required:true})}
                                        defaultValue={user?.additionalDetails?.gender}
                                    >
                                        {
                                            gen.map((ele, idx) => {
                                                return (
                                                    <option value="ele" key={idx}>
                                                        {ele}
                                                    </option>
                                                )
                                            })   
                                        }
                                    </select>

                                    {/* error */}
                                    <div className='w-[200px] mb-5'>
                                        {
                                            errors.gender && (
                                                <span className="-mt-1 text-[12px] text-yellow-100">
                                                    Please Enter Your Gender
                                                </span>
                                            )
                                        }
                                    </div>
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

                    </div>

                    {/* right Wala */}
                    <div className="flex flex-col gap-y-5 w-full">

                        {/* Profession */}
                        <label className="w-full lable-style" htmlFor='profession' >
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                                Profession 
                            </p>
                            <input
                                type="text"
                                name="profession"
                                id="profession"
                                placeholder="Enter Display Name"
                                className=" w-full px-2  py-[10px] border-b shadow-lg
                                border-richblack-100 rounded-md bg-richblack-700 text-richblack-5" 
                                {...register("profession", )}
                                defaultValue={user?.profession}
                            />
                            {errors.profession && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Profession.
                                </span>
                            )}
                        </label>

                        {/* Last Name */}
                        <label className="w-full lable-style" htmlFor='lastName' >
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                                Last Name 
                            </p>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter First Name"
                                className=" w-full px-2 mb-1 py-[10px] border-b shadow-lg
                                border-richblack-100 rounded-md bg-richblack-700 text-richblack-5" 
                                {...register("lastName")}
                                defaultValue={user?.lastName}
                            />
                        </label>

                        {/* Phone Number */}
                        <label className="w-full" htmlFor='contactNumber'>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                                Contact Number  
                            </p>

                            {/* both input */}
                            <div className='flex gap-4'>

                                {/* drop Down */}
                                <div className='flex w-[75px] flex-col gap-1'>
                                    <select
                                        name='contactNumber'
                                        id='contactNumber'
                                        placeholder="+91"
                                        className=" lg:w-full px-2 py-[9px] border-b shadow-lg
                                        border-richblack-100 rounded-md bg-richblack-700 text-richblack-100"
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
                                        name="contactNumber"
                                        id="contactNumber"
                                        placeholder="12345 67890"
                                        className=" lg:w-full px-2 py-[7px] border-b shadow-lg
                                        border-richblack-100 rounded-md bg-richblack-700 text-richblack-5"
                                        {...register("contactNumber", 
                                            {
                                                required: {value:true, message: "Please Enter Phone Number"},
                                                maxLength: {value:10, message: "Invalid Phone Number"},
                                                minLength: {value:8, message: "Invalid Phone Number"},
                                            }
                                        )}
                                    />
                                    
                                </div>
                            </div>
                                            
                            {/* error */}
                            <div className='w-[200px] mb-1 '>
                                {
                                    errors.contactNumber && (
                                        <span className="mt-1 text-[12px] flex flex-col translate-x-24 text-yellow-100">
                                            {errors.contactNumber.message}
                                        </span>
                                    )
                                }
                            </div>

                        </label>
                        
                        {/* About  */}
                        <label className="w-full lable-style" htmlFor='about' >
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-50">
                                About  
                            </p>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="About Yourself"
                                className=" w-full px-2 py-[8px] border-b shadow-lg
                                border-richblack-100 rounded-md bg-richblack-700 text-richblack-5" 
                                {...register("about")}
                                defaultValue={user?.about}
                            />
                        </label>

                    </div>
                        
                </div>    
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                    navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <IconBtn type="submit" text="Save" />
            </div>

        </form>
    );
};

export default MyProfile;
