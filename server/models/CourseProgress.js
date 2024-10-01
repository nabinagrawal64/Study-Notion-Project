
const mongoose = require("mongoose");

const courseProgess = new mongoose.Schema(
    {
        courseID:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        completedVideo:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubSection",  
            }
        ]
    }
)

module.exports = mongoose.model("CourseProgess", courseProgess);