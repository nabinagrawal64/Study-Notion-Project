const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const mongoose = require("mongoose")
const { convertSecondsToDuration } = require("../utils/secToDuration")

//update profile
exports.updateProfile = async (req, res) => {
    try {
        //get data
        const {
            firstName = "",
            lastName = "",
            dataOfBirth = "",
            gender = "",
            about = "",
            contactNumber,
            profession = "",
            displayName = "",
        } = req.body;

        // get userID
        const id = req.user.id;

        //validation
        if (!gender || !contactNumber || !id) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            });
        }

        //find profile
        const userDetails = await User.findById(id); //ham pahle user la id laye
        const profileId = userDetails.additionalDetails; //fir usme se additional details me gaye
        const profileDetails = await Profile.findById(profileId); //additional details me se profile id laye

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        });
        await user.save();

        //update profile
        profileDetails.dateOfBirth = dataOfBirth;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.profession = profession;
        profession.displayName = displayName;
        await profileDetails.save();

        const updatedUserDetails = await User.findById(id).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            updatedUserDetails,
        });
    } 
    catch (error) {
        console.log("Error while updating profile");
        return res.status(500).json({
            success: false,
            message: "Profile could not Update ",
            error: error.message,
        });
    }
};

//delete account
//Explore -> how can we schedule this deletion operation (cronjob)
exports.deleteAccount = async (req, res) => {
    try {
        //get id
        const id = req.user.id;

        //check valid id or not 
        const userDetails = await User.findById({ _id: id });
        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        //delete profile
        await Profile.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(userDetails.additionalDetails),
        });

        for (const courseId of userDetails.courses) {
            await Course.findByIdAndUpdate(
                courseId,
                { $pull: { studentsEnroled: id } },
                { new: true }
            );
        }

        //delete user
        await User.findByIdAndDelete({ _id: id });

        //return response
        return res.status(200).json({
            success: true,
            message: "Account deleted Successfully",
        });
        await CourseProgress.deleteMany({ userId: id });
    } catch (error) {
        console.log("Error while deleting account");
        return res.status(500).json({
            success: false,
            message: "Account Delete unSuccessfull",
            error: error.message,
        });
    }
};

//get all details
exports.getAllUserDetails = async (req, res) => {
    try {
        //get user id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        
        console.log(userDetails);

        //return response
        return res.status(200).json({
            success: true,
            message: "User data fetched Successfully",
            data: userDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "can not the user details",
            error: error.message,
        });
    }
};

// update Display Picture
exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        );
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// get Enrolled Courses
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({
            _id: userId,
        })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();
        userDetails = userDetails.toObject();
        var SubsectionLength = 0;
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            SubsectionLength = 0;
            for (
                var j = 0;
                j < userDetails.courses[i].courseContent.length;
                j++
            ) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce(
                    (acc, curr) => acc + parseInt(curr.timeDuration),
                    0
                );
                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                );
                SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length;
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            });
            courseProgressCount = courseProgressCount?.completedVideo.length;
            if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100;
            } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgressCount / SubsectionLength) *
                            100 *
                            multiplier
                    ) / multiplier;
            }
        }

        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            });
        }
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: "Error aa gaya"
        });
    }
};

//instructor Dashboard
exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            // Create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                // Include other course properties as needed
                totalStudentsEnrolled,
                totalAmountGenerated,
            };

            console.log("courseDataWithStats ", courseDataWithStats);

            return courseDataWithStats;
        });

        res.status(200).json({ 
            success: true,
            courses: courseData,
            message: "Dashboard successfully", 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
