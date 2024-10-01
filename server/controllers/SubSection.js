const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

//create subsection
exports.createSubSection = async (req, res) => {
    try {
        //data fetch
        const { title, description, sectionId } = req.body;

        console.log(title, description, sectionId );

        //extract video/file
        const video = req.files ? req.files.video : undefined;
        console.log(video);

        //data validation
        if ((!title || !description || !sectionId || !video)) {
            return res.status(400).json({
                success: false,
                message: "All fields are required in subSection",
            });
        }

        //upload video to clodinary
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );
        console.log("uploadDetails",uploadDetails)
        console.log(uploadDetails.secure_url);

        //create subsection
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });
        console.log(subSectionDetails)

        //update section with subsection object id
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {$push: {subSection: subSectionDetails._id,},},
            { new: true },
        ).populate("subSection");

        console.log("Updated Section Details -> ", updatedSection);

        //return response
        return res.status(200).json({
            success: true,
            message: "Section created Successfully",
            updatedSection,
        });
    } 
    
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to create SubSection, please try again ",
            error: error.message,
        });
    }
};

//update section
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        if (title !== undefined) {
            subSection.title = title;
        }

        if (description !== undefined) {
            subSection.description = description;
        }

        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            );
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        await subSection.save();

        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        );

        console.log("updated section", updatedSection);

        return res.json({
            success: true,
            message: "Section updated successfully",
            data: updatedSection,
        });
    } 

    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        });
    }
};

//delete subsection
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;
        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        );

        const subSection = await SubSection.findByIdAndDelete({
            _id: subSectionId,
        });

        //validation
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            });
        }

        // find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        );

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
            data: updatedSection,
        });
    } 

    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
        });
    }
};
