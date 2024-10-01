import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { RiEditBoxLine } from "react-icons/ri";

// import { formattedDate } from "../../../utils/dateFormatter"
const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className="relative mx-auto lg:gap-10 gap-5 flex flex-col w-full text-white justify-center">

            <h1 className="mb-14 text-3xl -translate-x-32 items-start text-richblack-5
            bg-gradient-to-br font-bold from-[#1fff9a] via-[#10b3d8] to-[#11c4ca] text-transparent bg-clip-text"
            
            >
                My Profile
            </h1>

            {/* section 1 */}
            <div className="flex w-full items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">

                {/* image and description */}
                <div className="flex items-center gap-x-4" >
                    <img 
                        src={`${user?.image}`} 
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover"
                    />
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-richblack-5">
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className="text-sm text-richblack-300">{user?.email}</p>
                    </div>
                </div>

                {/* Button */}
                <IconBtn 
                    text={"Edit"}
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                >
                     <RiEditBoxLine />
                </IconBtn>
            </div>

            {/* About */}
            <div className="flex flex-col w-full justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                {/* About + Button */}
                <div className="flex w-full items-center justify-between">

                    <p className="text-lg font-semibold text-richblack-5">
                        About
                    </p>

                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    >   
                        <RiEditBoxLine />
                    </IconBtn>
                </div>

                {/* Additional Details */}
                <p className={`text-richblack-300 text-sm font-medium`}>
                    {user?.additionalDetails?.about ?? "Write Something About Yourself"}
                </p>    
            </div>

            {/* personal details */}
            <div className="flex flex-col w-full justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                {/* Details + Button */}
                <div className="flex w-full items-center justify-between">

                    <p className="text-lg font-semibold text-richblack-5">
                        Personal Details
                    </p>

                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings")
                        }}
                    >   
                        <RiEditBoxLine />
                    </IconBtn>
                </div>

                {/* Additional Details */}
                <div className="flex max-w-[500px] justify-between">
                    {/* left wala */}
                    <div className="flex flex-col gap-y-5">
                        {/* Display NAme */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">
                                Desplay Name
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.displayName}
                            </p>
                        </div>

                        {/* First Name */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">
                                First Name
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.firstName}
                            </p>
                        </div>
                        
                        {/* Email */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">
                                Email
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.email}
                            </p>
                        </div>

                        {/* Gender */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">
                                Gender
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>
                    </div>

                    {/* Right Wala */}
                    <div className="flex flex-col gap-y-5">
                        {/* Profession */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">
                                Profession
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.profession}
                            </p>
                        </div>

                        {/* Last Name */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">
                                Last Name
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.lastName}
                            </p>
                        </div>

                        {/* Contact Number */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">
                                Phone Number
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>

                        {/* Date Of Birth */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-600">
                                Date Of Birth
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    ); 
};

export default MyProfile;
