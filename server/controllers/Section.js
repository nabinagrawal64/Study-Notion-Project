const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")
//create section
exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;

        //data validation
        if (!sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "Missing Properties",
            });
        }

        //create section
        const newSection = await Section.create({ sectionName });

        //update course with section object id
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {$push: {courseContent: newSection._id,},},
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();

        console.log("Updated Course Details -> ", updatedCourseDetails);

        return res.status(200).json({
            success: true,
            message: "Section created Successfully",
            updatedCourseDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to craete Section, please try again ",
            error: error.message,
        });
    }
};

//update section
exports.updateSection = async (req, res) => {
    try {
        //data input
        const { sectionName, sectionId, courseId } = req.body;
        console.log("Name -> ", sectionName,"id -> ",  sectionId);
        
        //data validation
        if (!sectionName || !sectionId) {
            return res.status(401).json({
                success: false,
                message: "Missing Properties",
            });
        }

        //create course
        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        .exec();

        //update data
        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Section updated Successfully",
            data: course,
            section
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to Update Section, please try again ",
            error: error.message,
        });
    }
};

//delete section
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            },
        })

        const section = await Section.findById(sectionId)
        console.log(sectionId, courseId)
        
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            })   
        }
        // Delete the associated subsections
        await SubSection.deleteMany({ _id: { $in: section.subSection } })
    
        await Section.findByIdAndDelete(sectionId)
    
        // find the updated course and return it
        const course = await Course.findById(courseId)
            .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
                },
            })
            .exec()
    
        res.status(200).json({
            success: true,
            message: "Section deleted",
            data: course,
        })
    } 
    catch (error) {
        console.error("Error deleting section:", error)
        res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
        })
    };
}