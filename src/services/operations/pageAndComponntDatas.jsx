import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        // console.log("abc => ", catalogData.CATALOGPAGEDATA_API, )
        // console.log("UMM => ",categoryId,catalogData.CATALOGPAGEDATA_API)
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId: categoryId});
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Catagory page data.");
        }
        result = response?.data;
    } 
    catch (error) {
        console.log("CATALOG PAGE DATA API ERROR ", error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
};
