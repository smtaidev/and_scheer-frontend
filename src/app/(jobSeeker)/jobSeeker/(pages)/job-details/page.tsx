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

export type Company = {
    icnos: string;
    name: string;
    position: string;
    location: string;
    salary: string;
};

export default function JobDetailspage() {

    const [currentCompany, setCurrentCompany] = useState<Company | undefined>(companies[0]);
    return (
        <div>

            <Container>
                <AllFilterSection/>
                <div className='flex mt-16 '>

                    <div className='space-y-6  w-[457px]'>
                        {
                            companies.map(company => <div className={`${currentCompany===company? "border border-scheer-primary rounded-lg shadow-xs shadow-scheer-primary":""}`} onClick={() => setCurrentCompany(company)}><RecentJobCard key={company.name} job={company} /> </div>)
                        }
                    </div>


                    <div className='flex-1'>
                        <JobDetailsCard currentCompany={currentCompany}/>
                    </div>

                </div>



            </Container>



        </div>
    )
}
