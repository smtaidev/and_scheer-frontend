'use client'
import JobList from '@/components/search-jobs/jobList/page'
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice'
import React from 'react'

export default function SavedJobs() {
 const {data:jobs}=useGetAllJobPostsQuery({})

console.log(jobs?.data.data)
  return (
    <div>
        <JobList />
    </div>
  )
}
