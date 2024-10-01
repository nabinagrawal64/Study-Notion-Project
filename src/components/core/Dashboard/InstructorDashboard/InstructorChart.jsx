import React, { useState } from 'react'

import {Chart, registerables} from "chart.js"
import {Pie} from "react-chartjs-2";

Chart.register(...registerables)

const InstructorChart = ({courses}) => {

    const [currChart, setCurrChart] = useState("student");

    // function to generate random colors
    const randomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying student info
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: randomColors(courses.length),
            }
        ]
    }

    // create data for chart displaying income info
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: randomColors(courses.length),

            }
        ]
    }

    // create options
    const options = {
        maintainAspectRatio: false,
    }

    return (
        <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
            <p className="text-lg font-bold text-richblack-5">Visualize</p>

            {/* Button to switch between "students" "income chart" */}
            <div className="space-x-4 font-semibold">

                {/* button to switch to the "students" chart */}
                <button
                    onClick={() => setCurrChart("students")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                        currChart === "student"
                        ? "bg-richblack-700 text-yellow-50"
                        : "text-yellow-400"
                    }`}
                >
                    student
                </button>

                {/* button to switch to the "income" chart */}
                <button
                    onClick={() => setCurrChart("income")}
                    className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                        currChart === "income"
                        ? "bg-richblack-700 text-yellow-50"
                        : "text-yellow-400"
                    }`}
                >
                    income
                </button>
            </div>

            {/* pie chart */}
            <div className="relative mx-auto aspect-square h-[300px] w-full">
                <Pie 
                    data={currChart === "student" ? chartDataForStudents : chartDataForIncome}
                    options={options}
                />
            </div>
        </div>
    )
}

export default InstructorChart