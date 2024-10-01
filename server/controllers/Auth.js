const bcrypt = require("bcrypt")
const User = require("../models/User")
const OTP = require("../models/OTP")
const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const mailSender = require("../utils/mailSender")
const { passwordUpdated } = require("../mail/template/passwordUpdate")
const Profile = require("../models/Profile")
require("dotenv").config()

//send otp while sign up
exports.sendOTP = async (req, res) => {
    try {
        // fetch email from request body
        const { email } = req.body;

        //check if user already exist
        const checkUserPresent = await User.findOne({ email });

        //if user already exist, then return a response
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }

        //else generate a otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        

        const otpInDB = await OTP.find();
        console.log("Generated OTP:", otp);
        console.log("Stored OTPs:", otpInDB);

        //check unique otp or not
        const result = await OTP.findOne({otp: otp});
        console.log("Result is Generating OTP ")
        console.log("OTP", otp)
        console.log("Result", result)

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            // result = await OTP.findOne({ otp });
        }

        const otpPayload = { email, otp };

        //create an entry for OTP in db
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody)

        //return response
        res.status(200).json({
            success: true,
            message: "OTP sent Successfully",
            otp,
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
            error: error.message,
        });
    }
};

//sign up
exports.signup = async (req, res) => {
    try {
        //data fetch from requeest body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        console.log(firstName,
            lastName,
            email,
            password,
            confirmPassword,otp,)

        //validate
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        //dono password match karo
        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Password should be same, please fill carefully",
            });
        }

        //check if user already exist
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user is already registered",
            });
        }

        //find most recent otp stored for the user
        const recentOtp = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1);
        console.log(recentOtp);

        //validate otp
        if (recentOtp.length === 0) {
            //otp not found
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } 
        else if (otp !== recentOtp[0].otp) {
            //invalid otp
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing Password",
            });
        }

        //create the user
        let approved = ""
        approved === "Instructor" ? (approved = false) : (approved = true)

        //create entry for user in DataBase

        const profileDetails = await Profile.create({
            gender: null,
            dateOdBirth: null,
            about: null,
            contactNumber: null,
            profession: null,
            displayName: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType: accountType,
            approved: approved,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            message: "User is registred Sucessfully",
            user,
        });
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be Resistered, please try again later",
        });
    }
};

//login
exports.login = async (req, res) => {
    try {
        //get data
        const { email, password } = req.body;

        //validation on email and password
        if (!email || !password) {
            
            return res.status(400).json({
                success: false,
                message: "Please fill the details carefully",
            });
        }

        //check for user registered
        const user = await User.findOne({ email }).populate("additionalDetails");
        console.log("user", user)

        //if not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not Resistered, please register first",
            });
        }

        const payLoad = {
            email: user.email,
            id: user._id,
            accountType: user.accountType,
        };
        console.log(user.email," ",user.accountType);


        //verify password and generate JWT token
        if (await bcrypt.compare(password, user.password)) {
            //password matched
            const token = jwt.sign(
                // {email: user.email, id: user._id, accountType: user.accountType},
                payLoad, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            user.token = token;
            user.password = undefined; //password hide

            const options = {
                expires: new Date(Date.now() +  24 * 60 * 60 * 1000), //1 day
                httpOnly: true,
            };

            //craete a cookie
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in Sucessfully",
            });
        } else {
            //password do not match
            return res.status(403).json({
                success: false,
                message: "Incorrect Password ",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure, please try again",
        });
    }
};

//change password
exports.changePassword = async (req, res) => {
    try {
        // Get user data from req.user
        const userDetails = await User.findById(req.user.id);

        // Get old password, new password, and confirm new password from req.body
        const { oldPassword, newPassword } = req.body;

        // Validate old password
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );

        if (!isPasswordMatch) {
            // If old password does not match, return a 401 (Unauthorized) error
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" });
        }

        // Update password
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        // Send notification email
        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", emailResponse.response);
        } 
        catch (error) {
            // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        // Return success response
        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" });
    } 
    catch (error) {
        // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while updating password:", error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        });
    }
};
