import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";


const UpdatePassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        //password length
        if (password.length < 8) {
            toast.error("Password must be of at least eight characters");
            return;
        }

        //check password  correct 
        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match");
            return;
        }

        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate));
        
        setFormData({
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className="max-w-[450px] p-4 lg:p-8 ">

                    {/* Heading */}
                    <h1 className="text-richblack-5 mx-1 lg:font-bold lg:text-2xl flex ">
                        <h1> Choose New Password </h1>
                    </h1>

                    {/* Sub Heading */}
                    <p className="my-4 mx-1 leading-[1.625rem] text-xl text-richblack-100 ">
                        Almost done. Enter your new password and youre all set.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleOnSubmit}>
                        {/* New password */}
                        <label className="w-full">

                            {/* new password */}
                            <p className="m-1 mt-6 text-[0.875rem] leading-[1.375rem] text-richblack-100">
                                New Password{" "}
                                <sup className="text-pink-200">*</sup>
                            </p>

                            {/* input */}
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter New Password"
                                className=" w-full px-2 py-[10px] rounded-md hadow-sm
                                     shadow-pure-greys-200 mb-5 bg-richblack-800 text-richblack-50"
                            />
                            
                            {/* eye wala icon */}
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF" 
                                    />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>

                        </label>
                        
                        {/* confirm new password */}
                        <label className="w-full">

                            {/* confirm new password */}
                            <p className="mx-1 mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Confirm New Password{" "}
                                <sup className="text-pink-200">*</sup>
                            </p>

                            {/* input */}
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Enter Confirm Password"
                                className=" w-full px-2 py-[10px] rounded-md hadow-sm
                                     shadow-pure-greys-200 mb-2 bg-richblack-800 text-richblack-50"
                            />
                            
                            {/* eye wala icon */}
                            <span
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                            
                        </label>
                        
                        {/* Button */}
                        <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] font-bold bg-yellow-50 py-[8px]
                             text-richblack-900"
                        >
                            Reset Password
                        </button>

                    </form>
                        
                    {/* Back To Login */}
                    <div className="text-white flex items-center gap-1 mt-5">
                        <HiMiniArrowLongLeft className="text-3xl" />
                        <Link to="/login">Back to Login</Link>
                    </div>

                </div>
                )
            }
        </div>
    )
};

export default UpdatePassword;
