import React, { useEffect, useState } from 'react'
import JobCard from '../jobCard/JobCard';
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import { Job } from '@/types/AllTypes';


export default function JobList() {

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

    const [jobs, setJobs] = useState([])

    const { data: info } = useGetAllJobPostsQuery({});

    const allJob = info?.data;
    console.log(allJob?.data)

    useEffect(() => {
        if (allJob?.data) {
            setJobs(allJob?.data)
        }

    }, [allJob?.data])

    console.log(jobs);
    return (

        <div>
            <div className=" w-full  ">
                {jobs?.map((job:Job, index) => (
                    <JobCard key={index} job={job} />
                ))}


            </div>

        </div>

    );
};

