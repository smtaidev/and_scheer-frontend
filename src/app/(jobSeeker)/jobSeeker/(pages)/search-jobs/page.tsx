"use client"
import { FilterSidebar } from "@/components/search-jobs/filterSidebar/page";
import JobList from "@/components/search-jobs/jobList/page";
import SerachRightSideBar from "@/components/search-jobs/rightSearchBar/page";
import JobSeekerNavbar from "@/components/seeker-home/SeekerNavbar";
import AllCategory from "@/components/seeker-home/TopCategory/AllCategory";
import { useState } from "react";


export default function SearchJobPage() {


    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(true);
    console.log(isFilterSidebarVisible)

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

                {/* FilterSidebar with visibility controlled by the state */}
                <div className={`transition-all duration-300 ${isFilterSidebarVisible ? 'absolute translate-y-0 opacity-100 visible' : ' -translate-x-120 opacity-0 hidden'} lg:relative lg:block `}>
                    <FilterSidebar />
                </div>

                <div className="flex-1 px-4 md:px-6 lg:px-8 md:flex">
                    <JobList />
                    <SerachRightSideBar />
                </div>
            </div>
        </div>
    )
}
