import React, { useEffect, useRef, useState } from 'react'
import Footer from "../components/Common/Footor"
import { useParams } from 'react-router-dom'
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis";
import {getCatalogPageData} from "../services/operations/pageAndComponntDatas"
import CourseSlider from "../components/core/Catalog/CourseSlider"
import CourseCard from "../components/core/Catalog/CourseCard"
import Error from "./Error"
import { useSelector } from 'react-redux';

const Catalog = () => {
    const { loading } = useSelector((state) => state.profile)
    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active, setActive] = useState(1)

    // fetch all categories
    useEffect(() => {
        const getCategories = async() => {
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            const category_id = result?.data?.data
            ?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            if (category_id && category_id !== categoryId) {
                setCategoryId(category_id);
            }        
        }   
        getCategories();
    },[catalogName, categoryId]);

    const initialFetch = useRef(true);
    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                if (categoryId && initialFetch.current) {
                    const res = await getCatalogPageData(categoryId);
                    setCatalogPageData(res);
                    console.log(res);
                    initialFetch.current = false; // Set to false after first fetch
                }
            } catch (error) {
                console.log(error);
            }
        };
        if(categoryId) {
            getCategoryDetails();
        }
    }, [categoryId]);

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
    }
    if (!loading && !catalogPageData.success) {
      return <Error />
    }

    console.log("differentCategory = ",catalogPageData?.data?.differentCategory);
    console.log("selectedCategory",catalogPageData?.data?.selectedCategory);
    
    return (
        <div className=" box-content bg-richblack-800 px-4">
            {/* heading */}
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                {/* kaha per ho */}
                <p className="text-sm text-richblack-300">
                    {`Home / Catalog / `} <span>{catalogPageData?.data?.selectedCategory?.name}</span>
                </p>
                {/* title */}
                <p className="text-3xl text-richblack-5">{catalogPageData?.data?.selectedCategory?.name}</p>
                {/* description */}
                <p className="max-w-[870px] text-richblack-200">{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>

            {/* CONTENT */}
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4  lg:max-w-maxContent">
                {/* courses to get you started */}
                <div>
                    <h2 className="section_heading">Courses to get you started</h2>
                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                        <p
                            className={`px-4 py-2 ${active === 1 ? "border-b border-b-yellow-25 text-yellow-25"  
                            : "text-richblack-50"} cursor-pointer`} onClick={() => setActive(1)}
                        >
                            Most Popular
                        </p>
                        <p
                            className={`px-4 py-2 ${active === 2 ? "border-b border-b-yellow-25 text-yellow-25"  
                            : "text-richblack-50"} cursor-pointer`} onClick={() => setActive(1)}
                        >
                            New
                        </p>
                    </div>

                    {/* CourseSlider */}
                    <div>
                        <CourseSlider Course = {catalogPageData?.data?.selectedCategory?.course}/> 
                    </div>
                </div>
                
                {/* Top Courses */}
                <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <h2 className="section_heading">
                        Top courses in <span>{catalogPageData?.data?.selectedCategory?.name}</span>
                    </h2>
                    <div className='py-8'>
                        <CourseSlider Course = {catalogPageData?.data?.mostSellingCourses}/> 
                    </div>
                </div>

                {/* frequenty brought */}
                <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                    <div className="section_heading">Frequently Brought</div>
                    <div className='py-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-3'>
                            {console.log(catalogPageData?.data?.mostSellingCourses)}
                            {
                                catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                                ?.map((crs, index) => {
                                    return (
                                        <CourseCard crs = {crs} key={index} Height={"h-[350px]"} Width={"w-[350px]"}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>

            {/* footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Catalog