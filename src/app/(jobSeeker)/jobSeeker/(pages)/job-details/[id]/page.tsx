'use client'
import AllFilterSection from '@/components/job-details/AllfilterSection';
import JobDetailsCard from '@/components/job-details/JobDetailsCard';
import JobSeekerNavbar from '@/components/seeker-home/SeekerNavbar';
import Container from '@/components/ui/Container';
import React, { useEffect, useState } from 'react'
import RecentJobCard from '@/components/recent-job/RecentJobCard';
// import companies from '@/data/companies.json'
// import RecentJobCard from '@/app/alloveruser/recentJobs/RecentJobCard'
// import JobSeekerNavbar from '../jobSeekerHome/SeekerNavbar'
// import Container from '@/components/Container'
// import JobDetailsCard from './JobDetailsCard'
// import AllFilterSection from './AllfilterSection'
import { ChevronLeft, List, Search, X } from "lucide-react"
import { Company, Job } from '@/types/AllTypes';
import { useGetAllCompaniesQuery } from '@/redux/features/company/companySlice';
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import { useParams } from 'next/navigation';



export default function JobDetailspage() {


    const [currentCompany, setCurrentCompany] = useState<Job | undefined>();
    const [showCompanies, setShowCompanies] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [companies, setCompanies] = useState<Company[]>([])
    const { data: res, isLoading } = useGetAllCompaniesQuery();

    const {id }=useParams();

    const [allJobs, setAllJobs] = useState<Job[]>([])
    const { data: jobs } = useGetAllJobPostsQuery({});


    useEffect(() => {
        if (jobs?.data) {
            setAllJobs(jobs.data.data)
            setCurrentCompany(jobs.data.data[0])
        }
        if(allJobs){
            const nowJob=jobs?.data.data.find((p:any)=>p.id ==id)
            setCurrentCompany(nowJob)
        }
       
    }, [jobs?.data])




    // const filteredCompanies = companies.filter((company) => company.companyName.toLowerCase().includes(searchTerm.toLowerCase()))


    useEffect(() => {

        if (res?.data) {
            setCompanies(res.data)
        }
    }, [res?.data]);

    if (isLoading) return <p>Loading...</p>
    console.log(companies)


    const handleCompanySelect = (company: Job) => {
        setCurrentCompany(company)
        setShowCompanies(false)
    }

    const toggleView = () => {
        setShowCompanies(!showCompanies)
    }

    const clearSearch = () => {
        setSearchTerm("")
    }
    return (
        <div>

            <Container>
                <AllFilterSection />
                <div className=" px-4 mt-5 md:mt-9">
                    {/* Mobile Header */}
                    <div className="md:hidden sticky top-0 bg-white border-b border-gray-200 p-4 z-10 mb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {!showCompanies && currentCompany && (
                                    <button
                                        onClick={() => setShowCompanies(true)}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                )}
                                <h1 className="text-lg font-semibold">
                                    {showCompanies ? "Companies" : currentCompany?.title || "Job Details"}
                                </h1>
                            </div>

                            {showCompanies && (
                                <button
                                    onClick={toggleView}
                                    className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors duration-200 text-sm"
                                    disabled={!currentCompany}
                                >
                                    <List size={16} />
                                    <span className="hidden xs:inline">Details</span>
                                </button>
                            )}
                        </div>


                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Companies List Section */}
                        <div
                            className={` space-y-2 md:space-y-6 w-full md:w-[300px] xl:w-[457px] max-h-[1440px] overflow-auto ${showCompanies ? "block" : "hidden md:block"}`}
                        >
                            {allJobs.length > 0 ? (
                                allJobs.map((company) => (
                                    <div
                                        key={company.companyId}
                                        className={`cursor-pointer transition-all duration-200 
                                            ${currentCompany?.id === company.id? "border border-primary rounded-lg shadow-sm shadow-primary/20": "hover:shadow-md"}`}
                                        onClick={() => handleCompanySelect(company)}
                                    >
                                        <RecentJobCard job={company} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">No companies found matching "{searchTerm}"</p>
                                </div>
                            )}
                        </div>

                        {/* Job Details Section */}
                        <div
                            className={`
            flex-1 
            ${!showCompanies ? "block" : "hidden md:block"}
          `}
                        >
                            <JobDetailsCard currentCompany={currentCompany} />
                        </div>
                    </div>
                </div>


            </Container>



        </div>
    )
}
