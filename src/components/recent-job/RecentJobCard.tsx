import Image from 'next/image';
import React from 'react'

interface Job {
  icons?: string;
  position: string;
  name: string;
  location: string;
  salary: string | number;
}

interface RecentJobCardProps {
  job: Job;
}

export default function RecentJobCard({ job }: RecentJobCardProps) {
  return (
    <div className='w-full md:max-w-[457px]  border border-gray-100 rounded-lg shadow-md p-4 bg-white '>
        <div className='flex gap-2 items-center'>
            <Image src={job.icons ||"/company1.png"} alt="company" height={48} width={48} className=' rounded-3xl'/>
            <h1 className='text-md xl:text-xl font-semibold'>{job.name}</h1>
        </div>
        <h2 className='text-sm  mt-3 xl:text-lg  font-semibold'>{job.position}</h2>
        <p className='text-gray-500 text-xs xl:text-base'>{job.location}</p>

    <hr className="xl:my-3 my-2 border-t border-gray-200" />

        <div className='flex items-center justify-between'>
            <h1 className='text-xs xl:text-base'><span className='text-md 2xl:text-xl font-semibold'>{job.salary}</span>/Month</h1>
            <button className='2xl:px-6 px-2 py-2 2xl:py-3 main-bg rounded xl:text-base  text-xs text-white cursor-pointer'>Apply Now</button>
        </div>

    </div>
  )
}
