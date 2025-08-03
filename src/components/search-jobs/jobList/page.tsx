'use client'
import React, { useEffect, useState } from 'react'
import JobCard from '../jobCard/JobCard';
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import { Job } from '@/types/AllTypes';
import { Loader } from '@/components/shared/MainLoader';


export default function JobList({ filtersData }: any) {

console.log(filtersData)

    const [jobs, setJobs] = useState([])

    const { data: info, isLoading, error } = useGetAllJobPostsQuery({});

    const allJob = info?.data;
    console.log(allJob?.data)

    useEffect(() => {
        if (filtersData?.length > 0) {
            setJobs(filtersData);
        } else {
            setJobs(allJob?.data)
        }
        // if (allJob?.data) {
        //     setJobs(allJob?.data)
        // }

    }, [allJob?.data, filtersData])

    if (isLoading) return <p><Loader/></p>

    return (

        <div>
            <div className=" w-full  ">
                {jobs?.map((job: Job, index) => (
                    <JobCard key={index} job={job} />
                ))}
            </div>
        </div>

    );
};

