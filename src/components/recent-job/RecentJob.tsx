"use client";
import Cookies from "js-cookie"; // Ensure you have js-cookie imported
import React, { useEffect, useState } from "react";
// import RecentJobCard from './RecentJobCard'

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import RecentJobCard from "./RecentJobCard";
import {
  useGetAllJobPostsQuery,
  useRecomandationJobsQuery,
} from "@/redux/features/job/jobSlice";
import { Job } from "@/types/AllTypes";
import {
  useGetMeQuery,
  useGetMyProfileQuery,
} from "@/redux/features/auth/auth";
import axios from "axios";
import { Loader } from "@/app/(jobSeeker)/jobSeeker/(pages)/my-profile/page";

interface JobTitle {
  title: string;
}

export default function RecentJob({ title }: JobTitle) {
  const [recomandationAllJobs, setRecomandationAllJobs] = useState<Job[]>([]);
  const { data: jobs } = useGetAllJobPostsQuery({});
  const { data: currentUser } = useGetMeQuery({});
  const { data: myProfile } = useGetMyProfileQuery(currentUser?.data?.id);
  const [jobDataLoading, setJobDataLoading] = useState(true);
  // const { data: recomandationJobs } = useRecomandationJobsQuery(myProfile?.data?.profileId);

  // console.log("Current User: ", currentUser?.data?.id);
  // console.log("My Profile: ", myProfile?.data);
  // console.log("Profile ID: ", myProfile?.data?.profileId)

  // console.log("Recomandation Jobs: ", recomandationJobs)

  useEffect(() => {
    // if (recomandationJobs?.data) {
    //   setRecomandationAllJobs(recomandationJobs?.data?.data);
    // }

    const fetchedRecomendationJobs = async () => {
      // Get the access token from cookies
      const token = Cookies.get("accessToken");

      try {
        const response = await axios.get(
          `http://172.252.13.71:5005/api/v1/jobs/recommended-jobs/${myProfile?.data?.profileId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "", // Add Authorization header if token exists
            },
          }
        );
        console.log("Response: ", response.data);
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);
      }
    };

    // fetchedRecomendationJobs()

    // if (jobs?.data) {
    //   setRecomandationAllJobs(jobs.data.data)
    // }

    if (jobs?.data?.data) {
      setJobDataLoading(false);
    }
  }, [jobs?.data?.data]);
  // }, [jobs?.data, recomandationJobs?.data, myProfile?.data?.profileId])

  return (
    <div className="bg-card ">
      <div className="bg-[#F8F8F8] ml-0  2xl:ml-44">
        <div className=" py-15  px-11 md:px-15">
          <h1 className="text-2xl md:text-5xl font-semibold mb-4">
            {title || "Recent Job"}{" "}
          </h1>

          {jobDataLoading && <p><Loader/></p>}

          {!jobDataLoading && (
            <div className="relative">
              {/* Custom arrows */}
              <div className="swiper-button-prev-custom custom-arrow left-[-50px]" />
              <div className="swiper-button-next-custom custom-arrow md:right-[-50px] right-[-40px]" />

              <Swiper
                spaceBetween={30}
                freeMode={true}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                modules={[FreeMode, Navigation]}
                className="mySwiper"
                breakpoints={{
                  320: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 2.5 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 3.5 },
                }}
              >
                {
                  // jobs && jobs?.data?.recommendations?.map((job: any, index: any) => (
                  jobs?.data?.data &&
                    jobs?.data?.data?.map((job: any, index: any) => (
                      <SwiperSlide key={index} className="pb-2">
                        <RecentJobCard job={job} />
                      </SwiperSlide>
                    ))
                }
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
