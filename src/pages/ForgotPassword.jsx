import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { HiMiniArrowLongLeft } from "react-icons/hi2";

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.auth);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    };

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="max-w-[450px] p-4 lg:p-8">
                    {/* Heading */}
                    <h1 className="text-richblack-5 lg:font-bold lg:text-2xl flex ">
                        {!emailSent
                            ? "Reset Your Password"
                            : "Check Your Email"}
                    </h1>

                    {/* Sub Heading */}
                    <p className="my-4 leading-[1.625rem] text-richblack-100 ">
                        {!emailSent
                            ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            : `We have sent the reset email to ${email}`}
                    </p>

                    {/* Form */}
                    <form onSubmit={handleOnSubmit}>
                        {/* email */}
                        {!emailSent && (
                            <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-100">
                                    Email Address{" "}
                                    <sup className="text-pink-200">*</sup>
                                </p>
                                
                                <input
                                    required
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email Address"
                                    className="w-full px-2 py-[6px] rounded-md shadow-sm
                                     shadow-pure-greys-200 bg-richblack-800 text-richblack-50"
                                />
                            </label>
                        )}

                        {/* button */}
                        <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] font-bold bg-yellow-50 py-[8px] px-[12px]  text-richblack-900"
                        >
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>

                    {/* Back To Login */}
                    <div className="text-white flex items-center mt-5">
                        <HiMiniArrowLongLeft className="text-3xl" />
                        <Link to="/login">Back to Login</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
