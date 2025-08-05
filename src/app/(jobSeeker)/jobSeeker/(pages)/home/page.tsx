import Footer from '@/components/shared/footer/Footer'
import RecentJob from '@/components/recent-job/RecentJob'
import PopularCompany from '@/components/seeker-home/popularCompany/page'
import RecentUpload from '@/components/seeker-home/RecentUploaded/RecentUploaded'
import SeekerBanner from '@/components/seeker-home/SeekerBanner'
import JobSeekerNavbar from '@/components/seeker-home/SeekerNavbar'
import TopCategory from '@/components/seeker-home/TopCategory/page'
import SuggestedCourses from '@/components/Suggested/SuggestedCourses'
import React from 'react'
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice'
import RecomandationJob from '@/components/recomandation-job/RecomandationJob'



export default function JobSeekerHomePage() {
  const title = "Recommend for you"

  return (
    <div>
 
      <RecomandationJob title={title}></RecomandationJob>
      <SeekerBanner />
      {/* <RecentJob title={title}></RecentJob> */}
      <TopCategory />
      <RecentUpload />
      <PopularCompany />
      <SuggestedCourses />

    </div>
  )
}
