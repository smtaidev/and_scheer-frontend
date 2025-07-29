"use client"
import { FilterSidebar } from "@/components/search-jobs/filterSidebar/page";
import JobList from "@/components/search-jobs/jobList/page";
import SerachRightSideBar from "@/components/search-jobs/rightSearchBar/page";
import JobSeekerNavbar from "@/components/seeker-home/SeekerNavbar";
import AllCategory from "@/components/seeker-home/TopCategory/AllCategory";
import { useEffect, useState } from "react";


export default function SearchJobPage() {


    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(true);

    const [filtersData, setFiltersData] = useState([]);
    // console.log(isFilterSidebarVisible)

    // console.log("Filter Data: ", filtersData);
    console.log("Filter Data: ", filtersData?.length);

    useEffect(() => {
        console.log(filtersData)
        console.log("Filter Data Updated: ", filtersData?.length);
    }, [filtersData])


    return (
        <div>
            <AllCategory />

            {/* Toggle Button for FilterSidebar */}
            <button
                className="px-4 py-2 border rounded-md shadow-md border-gray-200 ml-12 mb-4 lg:hidden"
                onClick={() => setIsFilterSidebarVisible(!isFilterSidebarVisible)}
            >
                All Filter
            </button>

            <div className="max-w-[1420px] flex mx-auto">
                <div
                    className={`
    transition-all duration-300

    // Small screens (mobile/tablet)
    absolute
    ${isFilterSidebarVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}

    // Large screens (desktop and up)
    lg:relative
    lg:translate-x-0
    lg:opacity-100
    lg:visible
    lg:block
  `}
                >
                    <FilterSidebar setFiltersData={setFiltersData} />
                </div>


                <div className="flex-1 gap-5 px-4 md:px-6 lg:px-8 md:flex">
                    <JobList filtersData={filtersData} />
                    <SerachRightSideBar />
                </div>
            </div>
        </div>
    )
}
