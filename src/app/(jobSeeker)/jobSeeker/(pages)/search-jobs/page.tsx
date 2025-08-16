"use client"
import { FilterSidebar } from "@/components/search-jobs/filterSidebar/page";
import JobList from "@/components/search-jobs/jobList/page";
import SerachRightSideBar from "@/components/search-jobs/rightSearchBar/page";
import JobSeekerNavbar from "@/components/seeker-home/SeekerNavbar";
import AllCategory from "@/components/seeker-home/TopCategory/AllCategory";
import Container from "@/components/ui/Container";
import { setFilters } from "@/redux/features/search/searchSlice";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function SearchJobPage() {

    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(true);
    const [filtersData, setFiltersData] = useState([]);
    const searchConfig = useSelector((state: RootState) =>
        state.search.find((config: any) => config.id === 1)
    );
      const dispatch=useDispatch()

    const { searchFilters }: any = searchConfig

    useEffect(() => {
        console.log(filtersData)
        console.log("Filter Data Updated: ", filtersData?.length);
    }, [filtersData])

    const handleCross=()=>{
       dispatch(setFilters({ id: 1, searchFilters: [] }));
    }

    return (
        <div className="mt-8">
            {/* <AllCategory /> */}
           {
            searchFilters && searchFilters.length >0 && <div className="max-w-[1320px] mx-5 xl:mx-auto mb-7 flex gap-4 items-center">
                <p className=" md:text-2xl">Search :</p>
            <p className="md:text-xl bg-gray-200 px-5 py-1 rounded-full flex gap-3 items-center">{searchFilters[0]} <button onClick={()=>handleCross()} className="mt-1 text-sm ">✕</button> </p>
            
            </div>
           }
            

            {/* Toggle Button for FilterSidebar */}
            <button
                className="px-4 py-2 border rounded-md shadow-md border-gray-200 ml-2 mb-4 lg:hidden"
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
                    <FilterSidebar setIsFilterSidebarVisible={setIsFilterSidebarVisible} isFilterSidebarVisible={isFilterSidebarVisible} setFiltersData={setFiltersData} />
                </div>


                <div className="flex-1 gap-5 px-4 md:px-6 lg:px-8 md:flex">

                    <JobList filtersData={filtersData} />
                    <SerachRightSideBar />
                </div>
            </div>
        </div>
    )
}
