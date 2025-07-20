// import React from 'react'
// import JobSeekerNavbar from '../jobSeekerHome/SeekerNavbar'
// import AllCategory from './searchCategory/page'

import { FilterSidebar } from "@/components/search-jobs/filterSidebar/page";
import JobList from "@/components/search-jobs/jobList/page";
import SerachRightSideBar from "@/components/search-jobs/rightSearchBar/page";
import JobSeekerNavbar from "@/components/seeker-home/SeekerNavbar";
import AllCategory from "@/components/seeker-home/TopCategory/AllCategory";

// import { FilterSidebar } from './filterSidebar/page'
// import JobList from './jobList/page'
// import SerachRightSideBar from './rightSearchBar/page'




export default function SearchJobPage() {
    return (
        <div>

            <AllCategory />
            <div className='max-w-[1420px]  mx-auto'>
                {/* <JobSearchPage /> */}

            </div>
            <div className=" max-w-[1420px] flex mx-auto ">
                <FilterSidebar />
                <JobList />
                <SerachRightSideBar />
            </div>


        </div>
    )
}
