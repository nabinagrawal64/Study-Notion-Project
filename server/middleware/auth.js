// auth, isStudent,isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = (req, res, next) => {
    try {
        // Extract JWT token from cookies, body, or header
        const authHeader = req.header("Authorization");
        let token;

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.replace("Bearer ", "");
        } else if (req.cookies.token) {
            token = req.cookies.token;
        } else if (req.body.token) {
            token = req.body.token;
        }

        console.log("Token:", token);

        // Check if token is present
        if (!token || token === undefined) {
            return res.status(401).json({
                success: false,
                message: 'Token is Missing',
            });
        }

        // Verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload; // Attaching the payload to req.user
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
                error: error.message
            });
        }

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while verifying the token',
            error: error.message,
        });
    }
}


//student
exports.isStudent = (req,res,next) => {
    try{
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:'THis is a protected route for Students only ',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User role is not matching',
        })
    }
}

//isAdmin
exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admin only',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

//isInstructor
exports.isInstructor = (req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:'THis is a protected route for Instructor only',
            });
        }
        next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

