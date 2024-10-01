const { default: mongoose } = require('mongoose');
const Course = require('../models/Course');
const RatingAndReviews = require('../models/RatingAndReview');
const User = require('../models/User');

//Create Rating
exports.createRating = async(req, res) => {
    try {
        //get user id
        const userId = req.user.id;

        //fetch data from req body
        const {rating, review, courseId} = req.body;

        //validation
        if(!userId || !rating || !review || !courseId){
            return res.status(404).JSON({
                message: "please give rating",
                success: false,
            })
        }

        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id: courseId,
            studentsEnrolled: {$elemMatch: {$eq: userId}},
        });

        console.log("rating => ", courseDetails)
        
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in this course',
            })
        };

        //check user already reviewd the course
        const alreadyReviewd = await RatingAndReviews.findOne({
            user: userId,
            course: courseId,
        });

        if(alreadyReviewd){
            return res.status(403).json({
                success: false,
                message: 'Course is already Reviewed bt the User',
            })
        };

        //create rating and review
        const ratingReview = await RatingAndReviews.create({
                rating, review, 
                course: courseId,
                user: userId,
        });

        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            {_id:courseId},
            {$push: {ratingAndReviews: ratingReview._id}},
            {new: true},
        )
        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success: true,
            message: 'rating and Review Created Successfully',
            data: ratingReview
        })

    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Get Average Rating
exports.getAverageRating = async(req, res) => {
    try {
        //get course id
        const courseId = req.body.courseid;

        //calculate average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group:{
                    _id: null,
                    averageRating: {$avg: "$rating"}, 
                }
            },
        ])

        //return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        //if no rating review exist
        return res.status(200).json({
            success: true,
            message: "Average rating is 0, no rating given till now",
            averageRating: 0,
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//Get ALl Rating
exports.getAllRatingReview = async(req, res) => {
    try {
        const allReview = await RatingAndReviews.find({})
                                                .sort({rating: "desc"})
                                                .populate({
                                                    path: "user",
                                                    select: "firstName lastName email image",
                                                })
                                                .populate({
                                                    path: "course",
                                                    select: "courseName",
                                                })
                                                .exec();

        return res.status(200).json({
            success: true,
            message: 'All Reviews fetched Successfully',
            data: allReview,
        })                                        
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


