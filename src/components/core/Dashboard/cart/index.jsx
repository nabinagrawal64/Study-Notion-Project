import React from 'react'
import { useSelector } from 'react-redux'
import RenderTotalAmount from './RenderTotalAmount'
import RenderCartCourses from "./RenderCartCourses"

const Index = () => {

    const {total, totalItems} = useSelector((state) => state.cart)
    const { paymentLoading } = useSelector((state) => state.course)

    if (paymentLoading){
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className="relative mx-auto lg:gap-10 gap-5 flex flex-col w-full text-white justify-center">

            <h1 className="mb-14 text-3xl -translate-x-32 items-start text-richblack-5
            bg-gradient-to-br font-bold from-[#1fff9a] via-[#10b3d8] to-[#11c4ca] text-transparent bg-clip-text"

            >
                Your Cart
            </h1>

            <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
                {totalItems} courses in cart
            </p>

            {
                total > 0 
                ? (
                    <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>
                )
                : (
                <p className="mt-14 text-center text-3xl text-richblack-100">
                    Your Cart Is Empty
                </p>
                )
            }



        </div>
    )
}

export default Index