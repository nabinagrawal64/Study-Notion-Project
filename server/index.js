const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require('./routes/Course');
// const contactRoutes = require('./routes/Contact');
const paymentRoutes = require('./routes/Payments');

const dbConnect = require("./config/database");  
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//database connect
dbConnect();

//middleware connect
app.use(express.json());
app.use(cookieParser());

//frontend to entertaint karne ke liye
app.use(
    cors({
        origin: "http://localhost:3000",
        // https://study-notion-sand-five.vercel.app
        credentials: true,
    })
)

//file upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp'
}));

//cloudinary Connection
cloudinaryConnect();

//mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/payment", paymentRoutes);

//default routes
app.get("/", (req,res) => {
    return res.json({
        success: true,
        message: "Your server is up and running",
    })
})

app.listen(PORT, () => {
    console.log(`server started Successfully at ${PORT}`);
})

 

