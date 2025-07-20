'use client'
import AllFilterSection from '@/components/job-details/AllfilterSection';
import companies from '../../../../../../public/companies.json'
import JobDetailsCard from '@/components/job-details/JobDetailsCard';
import JobSeekerNavbar from '@/components/seeker-home/SeekerNavbar';
import Container from '@/components/ui/Container';
import React, { useState } from 'react'
import RecentJobCard from '@/components/recent-job/RecentJobCard';
// import companies from '@/data/companies.json'
// import RecentJobCard from '@/app/alloveruser/recentJobs/RecentJobCard'
// import JobSeekerNavbar from '../jobSeekerHome/SeekerNavbar'
// import Container from '@/components/Container'
// import JobDetailsCard from './JobDetailsCard'
// import AllFilterSection from './AllfilterSection'
import { ChevronLeft, List, Search, X } from "lucide-react"

export type Company = {
    icnos: string;
    name: string;
    position: string;
    location: string;
    salary: string;
};

export default function JobDetailspage() {

    const [currentCompany, setCurrentCompany] = useState<Company | undefined>(companies[0]);
    const [showCompanies, setShowCompanies] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredCompanies = companies.filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleCompanySelect = (company: Company) => {
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
                                    {showCompanies ? "Companies" : currentCompany?.name || "Job Details"}
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
                            className={`
            space-y-2 md:space-y-6 
            w-full md:w-[457px] 
            ${showCompanies ? "block" : "hidden md:block"}
          `}
                        >
                            {filteredCompanies.length > 0 ? (
                                filteredCompanies.map((company) => (
                                    <div
                                        key={company.name}
                                        className={`
                  cursor-pointer transition-all duration-200
                  ${currentCompany === company
                                                ? "border border-blue-500 rounded-lg shadow-sm shadow-blue-500/20"
                                                : "hover:shadow-md"
                                            }
                `}
                                        onClick={() => handleCompanySelect(company)}
                                    >
                                       <RecentJobCard key={company.name} job={company} />
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
