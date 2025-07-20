

import RecentJobCard from '@/components/recent-job/RecentJobCard'
import React from 'react'

export default function RecentUploadedPost() {
    const jobs = [
        {
            icnos: "/company1.png",
            name: "BLUE Technology",
            position: "Full Stack Developer",
            location: "Dhaka, Bangladesh",
            salary: " $4500",

        },
        {
            icnos: "",
            name: "BLUE Technology",
            position: "Full Stack Developer",
            location: "Dhaka, Bangladesh",
            salary: " $4500",

        },
        {
            icnos: "",
            name: "BLUE Technology",
            position: "Full Stack Developer",
            location: "Dhaka, Bangladesh",
            salary: "$4500",

        },
        {
            icnos: "",
            name: "BLUE Technology",
            position: "Full Stack Developer",
            location: "Dhaka, Bangladesh",
            salary: "$4500",

        },
        {
            icnos: "",
            name: "BLUE Technology",
            position: "Full Stack Developer",
            location: "Dhaka, Bangladesh",
            salary: "$4500",

        },
        {
            icnos: "",
            name: "BLUE Technology",
            position: "Full Stack Developer",
            location: "Dhaka, Bangladesh",
            salary: "$4500",

        },
        {
            icnos: "",
            name: "BLUE Technology",
            position: "Full Stack Developer",
            location: "Dhaka, Bangladesh",
            salary: "$4500",

        },

    ]
    return (

         
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6  '>
            {jobs.slice(0, 15).map((job, index) => (

                <RecentJobCard key={index} job={job} />

            ))}



        </div>

    )
}
