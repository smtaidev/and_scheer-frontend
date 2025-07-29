'use client'
import React, { useEffect, useState } from 'react'
import JobCard from '../jobCard/JobCard';
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import { Job } from '@/types/AllTypes';


export default function JobList({ filtersData }: any) {

    // const jobs = [
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    //     {
    //         company: "SM Technology",
    //         title: "UI/UX Designer",
    //         location: "Dhaka, Bangladesh (Onsite)",
    //         rating: "2.9",
    //         reviews: "4.0 (50 Reviews)",
    //         skills: "Figma • Adobe Illustrator • Adobe Photoshop • Adobe XD(optional)",
    //         salary: "4,500",
    //         timePosted: "Updated 2 days ago"
    //     },
    // ];

    console.log("Filters Data From the Job List Page: ", filtersData);

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

    if (isLoading) return <p>All Job Posts Loading.....</p>

    console.log(jobs);
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

