'use client'
import JobCard from '@/components/search-jobs/jobCard/JobCard'
import JobList from '@/components/search-jobs/jobList/page'
import { useGetAllJobPostsQuery, useGetSavedJobsQuery } from '@/redux/features/job/jobSlice'
import React from 'react'

export default function SavedJobs() {
 const {data:jobs}=useGetAllJobPostsQuery({})
 const {data:savedJobs}=useGetSavedJobsQuery({})
console.log("saved jobs here", savedJobs?.data)
console.log("All nob heree",jobs?.data.data)



  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
      {
        savedJobs?.data?.map((p:any)=><JobCard job={p.job}/>)
      }
     
    </div>
  )
}
