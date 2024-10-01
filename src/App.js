import { Route,Routes, useNavigate } from "react-router-dom";
import "./App.css";

import Cart from "./components/core/Dashboard/cart"
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import SignUp from "./pages/signup"
import Login from "./pages/login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard"
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Error from "./pages/Error";

import Navbar from "./components/Common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/settings"
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourses from "./components/core/Dashboard/addCourses";
import MyCourses from "./components/core/Dashboard/My Courses/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import CourseDetails from "./pages/CourseDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor"


const App = () => {

     // const dispatch = useDispatch();
     // const navigate = useNavigate();

     const {user} = useSelector((state) => state.profile);


    return (
        <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>

                {/* Open Route - for Only Non Logged in User */}
                <Route path="/signup" 
                       element={
                       <OpenRoute>
                            <SignUp/>
                       </OpenRoute>}
                /> 
                <Route path="/login" 
                       element={
                       <OpenRoute>
                            <Login/>
                       </OpenRoute>}
                /> 
                <Route path="/forgot-password" 
                       element={
                       <OpenRoute>
                            <ForgotPassword/>
                       </OpenRoute>}
                /> 
                <Route path="/update-password/:id" 
                       element={
                       <OpenRoute>
                            <UpdatePassword/>
                       </OpenRoute>}
                /> 
                <Route path="/verify-email" 
                       element={
                       <OpenRoute>
                            <VerifyEmail/>
                       </OpenRoute>}
                />
                <Route path="/about" element={ <About/>} />
                <Route path="/contact" element={<ContactUs/>}/>
                <Route path="catalog/:catalogName" element={<Catalog />} />
                <Route path="courses/:courseId" element={<CourseDetails />} />
                
                {/* Private Route - for Only Logged in User */}
               <Route 
                    element={
                         <PrivateRoute>
                              <Dashboard />
                         </PrivateRoute>
                    }
               >
                    {/* Route for all users */}
                    <Route path="dashboard/my-profile" element={<MyProfile />} />
                    <Route path="dashboard/settings" element={<Settings />} />

                    {/* Route for student */}
                    {
                         user?.accountType === ACCOUNT_TYPE.STUDENT && (
                              <>
                                   <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                                   <Route path="dashboard/cart" element={<Cart />} />
                              </>
                         )
                    }
                    <Route path="dashboard/settings" element={<Settings />} />
                    
                    {/* Route for Instructor */}
                    {
                         user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                              <>
                                   <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
                                   <Route path="dashboard/add-course" element={<AddCourses />} />
                                   <Route path="dashboard/my-courses" element={<MyCourses />} />
                                   <Route path="dashboard/instructor" element={<Instructor />} />
                              </>
                         )
                    }
               </Route>

               {/* For the watching course lectures for student*/}
               <Route
                    element={
                    <PrivateRoute>
                         <ViewCourse />
                    </PrivateRoute>
                    }
               >
                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                    <>
                         <Route
                              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                              element={<VideoDetails />}
                         />
                    </>
                    )}
               </Route>

                    
                {/* error route */}
                <Route path="*" element={<Error/>} />

            </Routes>
        </div>
    )
};

export default App;
 