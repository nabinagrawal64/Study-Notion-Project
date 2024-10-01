const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailsender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/template/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
// const { default: orders } = require("razorpay/dist/types/orders");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const { paymentSuccessEmail } = require("../mail/template/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");
// const CourseProgress = require("../models/CourseProgress")

// initiate the razorpay order 
exports.capturePayment = async(req, res) => {
    //get courseid and user id
    const userId = req.user.id;
    const {courses} = req.body;
    
    console.log("courses", courses.length);
    if (courses.length === 0) {
        return res.json({ success: false, message: "Please Provide Course ID" })
    }
  
    //valid courseId
    if(!courses){
        return res.status(401).json({
            success: false,
            message: "Please provide valid course ID"
        })
    }

    let totalAmount = 0;
    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course){
                return res.status(401).json({
                    success: false,
                    message: "Could not find the course"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                //iska matlab student pahle se enrolled hai
                return res.status(403).json({
                    success: false,
                    message: "Student is already Enrolled"
                });
            }
            totalAmount += course.price;    
        }
        catch(error){
            console.error = error;
            return res.status(500).json({
                success: false,
                error: error.message,
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        // reciept: Math.random(Date.now()).toString(),
        notes: {
            courseId: courses,
            userId,
        }
    };
    
    //initiate the payment using razorpay
    try {
        const paymentResponse = await instance.orders.create(options);
        console.log("paymentResponse -> ", paymentResponse);
        return res.status(200).json({
            success: true,
            data: paymentResponse,
        })
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "could not initiate order",
        })
    }

};

//verify Signature of Razorpay and Server
exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const {courses} = req.body;
    const userId = req.user.id;

    console.log("Request body: ", req.body);
    console.log("razorpay_order_id", razorpay_order_id); //dikkat hai
    console.log("razorpay_payment_id", razorpay_payment_id);
    console.log("razorpay_signature", razorpay_signature); //dikkat hai
    console.log("courses", courses);
    console.log("userId", userId);

    // validation
    if(!courses || !userId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) { 
        return res.status(400).json({
            success: false,
            message: "Payment Failed 1 ", 
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");
    
    // verify signature
    if(expectedSignature === razorpay_signature){
        //enrolled the student
        await enrollStudents(courses, userId, res)
        return res.status(200).json({
            success: true,
            message: "Payment Successful",
        })
    }
    else{
        return res.status(400).json({
            success: false,
            message: "Payment Failed 2",
        })
    }

}

const enrollStudents = async(courses,userId,res) =>{

    // validation
    if(!courses || !userId){
        return res.status(400).json({
            success: false,
            message: "Please provide data for courses o UserID",
        })
    }

    for(const courseId of courses){
        // find the course and thee student in it
        try {
            const enrolledCourses = await Course.findByIdAndUpdate(
                {_id: courseId},
                {$push:{studentsEnrolled: userId}},
                {new: true},
            )
            
            if(!enrolledCourses){
                return res.status(401).json({
                    success: false,
                    message: "Course Not Found",
                })
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideo: [],
            })
    
            //find the studentand add course to their list of enrolledCourses
            const enrolledStudent = await User.findByIdAndUpdate(
                {_id: userId},
                {$push:{courses: courseId, courseProgress: courseProgress._id}},
                {new: true},
            )
    
            //bachhe ko mail send kardo
            const emailResponse = await mailsender(
                enrolledStudent.email,
                `Successfully Enrollment into  ${enrolledCourses.courseName}`,
                courseEnrollmentEmail(enrolledCourses.courseName, `${enrolledStudent.firstName}`)
            )
            console.log("Email sent Successfully", emailResponse.response); 
        } 
        catch (error) {
            console.log(error); 
            return res.status(401).json({
                success: false,
                message: error.message,
                error: "Error while enrolling",
            })
        }
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const { orderId, paymentId, amount } = req.body

    const userId = req.user.id

    // validation
    // if (!orderId || !paymentId || !amount || !userId) {
    //     return res.status(400).json({ 
    //         success: false, 
    //         message: "Please provide all the details" 
    //     }) 
    // }

    try {
        const enrolledStudent = await User.findById(userId)
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail( `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
            amount / 100,orderId,paymentId)
        )
    } 
    catch (error) {
        console.log("error in sending mail", error)
        return res.status(400).json({ 
            success: false, 
            message: "Could not send email" 
        })
    }

}