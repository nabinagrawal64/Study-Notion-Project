const { default: mongoose } = require("mongoose");
const Category = require("../models/Category");
const Course = require("../models/Course")

//create Category handler function
exports.createCategory = async(req, res) => {
    try{
        //fetch data
        const {name, description} = req.body;
        const allCourses = await Course.findOne({ status: "Published" },).populate("instructor").exec();
        console.log("ALLCOURSES ===>>>", allCourses);

        //validate data
        if(!name || !description){
            return res.status(401).json({
                success: false,
                message: "All fields are required",
            })
        }

        //create entry in db
        const categoryDetails = await Category.create({
            name: name,
            description: description,
            course: allCourses,
        });
        console.log(categoryDetails);

        return res.status(401).json({
            success: true,
            message: "Category created Successfully",
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

//get All Category handler function 
exports.getAllCategory = async(req, res) => {
    try{
        const allCategory = await Category.find();
        res.status(200).json({
            success: true,
            message: "All category return Successfully",
            data: allCategory,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message 
        })
    }
}

//category page details
exports.categoryPageDetails = async(req, res) => {
    try {
        // Log the request time to track multiple requests
        console.log("Request Received at:", new Date().toISOString());
        
        // Get category id
        const { categoryId } = req.body;
        console.log("Request Body:", req.body);
        console.log("Raw Category ID:", JSON.stringify(categoryId));
        
        // Validate category ID
        if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing Category ID",
            });
        }
        
        // Get courses for specific course id
        const selectedCategory = await Category.findById(categoryId)
        .populate({ path: "course", match: { status: "Published" }, })
        .exec();
        
        console.log("Selected Category:", selectedCategory);
        
        // Course validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }
        
        // Get courses for different categories
        const differentCategory = await Category.find({ _id: { $ne: categoryId } })
        .populate({ 
            path: "course",
            match: { status: "Published"} , 
            populate: {
                path: "instructor",  // The instructor field in the course model
                select: "firstName lastName",  // Select the fields you want to include
            },
        })
        .exec();
        
        // Get top-selling courses
        const allCategories = await Category.find()
        .populate({ 
            path: "course", 
            match: { status: "Published" },
            populate: {
                path: "instructor",  // The instructor field in the course model
                select: "firstName lastName",  // Select the fields you want to include
            },
        }).exec();  
        let allCourses = allCategories.flatMap(category => {        
            console.log("courses -->> ", category.course);
            if (!category.course || category.course.length === 0) {
                console.log("No courses found for category:", category.name);
            }
            return category.course || [];
        });
        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);
        console.log("mostSellingCourses -- ",mostSellingCourses);
        console.log("allCourses --",allCourses);
        console.log("All Categories:", JSON.stringify(allCategories, null, 2));
            
        const mappedCourses = allCategories.map(category => category.course || []);
        console.log("Mapped Courses:", mappedCourses);
        
        allCourses = mappedCourses.flat();
        console.log("All Courses:", allCourses);
        
        // Return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
                allCategories,
            },
        });
    } catch (error) {
        console.log("Error occurred:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


