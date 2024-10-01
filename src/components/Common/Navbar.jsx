import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import Logo from "../../assets/logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai'
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import {apiConnector} from "../../services/apiConnector";
import { categories } from '../../services/apis'
import { IoIosArrowDropdownCircle } from "react-icons/io";

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    // console.log("Sublink -> ",subLinks?.length)

    const fetchSubLinks = async() => {
            setLoading(true)
        try {
            console.log("category: ->", categories.CATEGORIES_API)
            const result = await apiConnector("GET", categories.CATEGORIES_API );
            console.log("Printing Sublinks result ", result);
            setSubLinks(result.data.data);
        } 
        catch(error) {
            console.log("Could not fetch the Category list");
        }
    }

    useEffect( () => {
        fetchSubLinks();
    },[])

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className='flex lg:h-14 items-center justify-center lg:border-b-2 border-richblack-700'>
        <div className='flex lg:gap-x-80 items-center '>
            {/* image */}
            <Link to={"/"}>
                <img src={Logo} alt='' width={150} height={32} loading='lazy' className='flex left-3 translate-x-24'/>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:block mx-6">   
                <ul className='flex gap-x-5 text-richblack-25'>
                {
                    NavbarLinks.map((link,index) => {
                        return (
                            <li key={index}>
                                {
                                    link.title === "Catalog" 
                                    ? 
                                    (<div className={`relative flex items-center gap-2 group text-sm 
                                    ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}}`}>
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle />

                                        <div className='invisible absolute z-10 left-[50%] top-[50%]
                                            translate-x-[-51%] translate-y-[10%] flex flex-col 
                                            rounded-md bg-richblack-5 p-4 text-richblack-900
                                            opacity-0 transition-all duration-200 group-hover:visible 
                                            group-hover:opacity-100 lg:w-[300px]'>
                                                        
                                            <div className='absolute left-[50%] translate-x-[80%] 
                                            translate-y-[-45%] top-0 h-6 w-6 rotate-45 rounded 
                                            bg-richblack-5'>
                                            </div>

                                            {
                                                subLinks?.length 
                                                ? 
                                                (
                                                <>  
                                                    {
                                                        subLinks?.map( (subLink, i) => (
                                                                <Link to={`/catalog/${ 
                                                                    subLink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`
                                                                    }
                                                                    className="rounded-lg bg-transparent py-4 
                                                                              pl-4 hover:bg-richblack-50"
                                                                    key={i}
                                                                >
                                                                <p>{subLink.name}</p>
                                                                </Link>
                                                            )
                                                        )
                                                    }
                                                    </>
                                                ) 
                                                : 
                                                ( <p className="text-center">No Courses Found</p> )    
                                            }
                                        </div>
                                    </div>) 
                                    : 
                                    (
                                        <Link to={link?.path}>  
                                            <p className={`${matchRoute(link?.path) ? 'text-yellow-25' : 'text-richblack-25'} text-sm`}>
                                                {link.title}
                                            </p>
                                            
                                        </Link>
                                    ) 
                                }
                            </li>
                        )
                    })
                }

                </ul>
            </nav>

            {/* login/signup/dashboard */}
            <div className="hidden items-center gap-x-6 md:flex" >

                {/* if account type is instructor */}
                {
                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to={"/dashboard/cart"} className='relative'>
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {
                                totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center
                                                    overflow-hidden rounded-full bg-richblack-600 text-center 
                                                    text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }

                {/* if token is null */}
                {
                    token === null && (
                        <Link to="/login">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800
                                               px-[15px] py-[6px] text-richblack-100 -translate-x-24">
                                Log in
                            </button>
                        </Link>
                    )
                }

                {/* if token is null */}
                {
                    token === null && (
                        <Link to="/signup">
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 
                                               px-[15px] py-[6px] text-richblack-100 -translate-x-24">
                                Sign up
                            </button>
                        </Link>
                    )
                }

                {/* if token is not null */}
                {
                    token !== null && <ProfileDropDown />
                }
            </div>
            
            <button className="mr-4 md:hidden">
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
            </button>

        </div>
    </div>
  )
}

export default Navbar