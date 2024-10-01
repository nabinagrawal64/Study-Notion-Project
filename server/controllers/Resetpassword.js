const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const mailSender = require('../utils/mailSender');
const bcrypt = require("bcrypt")
const crypto = require("crypto")
// const userService = require('./services/userService')(User);
// import User from "../models/User"


//reset password token
exports.resetPasswordToken = async(req, res) => {
    try{
        //get email from req. body
        const email = req.body.email;
        // const id = "66a4f38ce6df3d57858c0eb1";

        //check user for this email, email validation
        console.log(email);

        const user = await User.findOne({email: email});
        console.log(user);
        
        // User.f
        if(!user){
            return res.json({   
                success: false,
                message: "Your email is not registred with us",
            })
        }

        //generate token
        const token = crypto.randomBytes(20).toString("hex")

        //update user by adding token and expiring time 
        const updatedDetails = await User.findOneAndUpdate(
            {email: email}, 
            {token: token, resetPasswordExpires: Date.now() + 5*60*1000}, //5 minutes
            {new: true},
        );
        console.log("DETAILS", updatedDetails)

        //create url
        const url = `https://localhost:3000/update-password/${token}`; //frontend link

        //send a mail containing the url
        await mailSender(email, `Password Reset Link ${url}`, "Password Reset Link")

        return res.status(200).json({
            success: true,
            message: "Email sent Successfully"
            
        })
    }
    catch(error){
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "Something went wrong , while generating token",
            error: error.message,
        })
    }
}

// exports.resetPasswordToken = async (req, res) => {
//     try {
//       const email = req.body.email
//       const user = await User.findOne({ email: email })
//       if (!user) {
//         return res.json({
//           success: false,
//           message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
//         })
//       }
//       const token = crypto.randomBytes(20).toString("hex")
  
//       const updatedDetails = await User.findOneAndUpdate(
//         { email: email },
//         {
//           token: token,
//           resetPasswordExpires: Date.now() + 3600000,
//         },
//         { new: true }
//       )
//       console.log("DETAILS", updatedDetails)
  
//       // const url = `http://localhost:3000/update-password/${token}`
//       const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`
  
//       await mailSender(
//         email,
//         "Password Reset",
//         `Your Link for email verification is ${url}. Please click this url to reset your password.`
//       )
  
//       res.json({
//         success: true,
//         message:
//           "Email Sent Successfully, Please Check Your Email to Continue Further",
//       })
//     } catch (error) {
//       return res.json({
//         error: error.message,
//         success: false,
//         message: `Some Error in Sending the Reset Message`,
//       })
//     }
//   }


//reset password
exports.resetPassword = async(req, res) => {
    try{
        //data fetch
        const {password, confirmPassword, token} = req.body;
        //token ke aadhar per aap user details ko fetch karke laoge

        //validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password Do not Match",
            })
        }

        //get user details from db using token
        const UserDetails = await User.findOne({token: token});

        //if no entry -> invalid token
        if(!UserDetails){
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }

        //token expires 
        if(UserDetails.resetPasswordExpires < Date.now() ){
            return res.status(401).json({
                success: false,
                message: "Token is expired, please regenerate your token",
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update the password
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true},
        )

        return res.status(200).json({
            success: true,
            message: "Password reset Successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(200).json({
            success: false,
            message: "Something went wrong , while reset password",
        })
    }
}
