import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/core/Dashboard/Sidebar";

function Dashboard() {
    const {user, loading: profileLoading } = useSelector(
        (state) => state.profile
    );
    const { loading: authLoading } = useSelector((state) => state.auth);

    // console.log(profileLoading , authLoading);
    if (profileLoading || authLoading) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center text-richblack-5
            border-r-[1px] border-r-richblack-700 bg-richblack-800">
                <p>User data is not available</p>
            </div>
        );
    }

    return (
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <Sidebar />
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet />
                </div>
            </div>
            
        </div>
    );
}

export default Dashboard;
