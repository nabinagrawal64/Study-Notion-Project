import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { RxCountdownTimer } from "react-icons/rx";
import { signUp } from "../services/operations/authAPI";
import { sendOtp } from "../services/operations/authAPI";


const VerifyEmail = () => {
    const {signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");

    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
            navigate("/signup");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
          } = signupData;
      
          dispatch(
            signUp(
              accountType,
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              otp,
              navigate
            )
          );
    };

    return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className="max-w-[450px] p-4 lg:p-8 ">

                    {/* Heading */}
                    <h1 className="text-richblack-5 mx-1 lg:font-bold lg:text-3xl flex ">
                        <h1> Verify Email </h1>
                    </h1>

                    {/* Sub Heading */}
                    <p className="my-4 mx-1 leading-[1.625rem] text-xl text-richblack-100 ">
                        A verification code has been sent to you. Enter the code below
                    </p>

                    {/* Form */}
                    <form onSubmit={handleOnSubmit}>
                        {/* otp input */}
                        <OtpInput   
                            value = {otp}
                            onChange = {setOtp}
                            numInputs = {6} 
                            renderInput={(props) => (
                                <input
                                  {...props}
                                  placeholder="-"
                                  style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                  }}
                                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                              )}
                              containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                              }}
                            />
                        
                        {/* Button */}
                        <button
                            type="submit"
                            className="mt-6 w-full rounded-[8px] font-bold bg-yellow-50 py-[8px]
                             text-richblack-900"
                        >
                            Verify Email
                        </button>

                    </form>
                        
                    <div className="mt-6 flex items-center justify-between">
                        {/* Back To Login */}
                        <Link to="/signup">
                            <p className="text-richblack-5 flex items-center gap-x-2">
                                <HiMiniArrowLongLeft /> Back To Signup
                            </p>
                        </Link>
                        
                        {/* resnd otp */}
                        <button
                            className="flex items-center text-blue-100 gap-x-2"
                            onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                        >
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>

                </div>
                )
            }
        </div>
    );
};

export default VerifyEmail;
