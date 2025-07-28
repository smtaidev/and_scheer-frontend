"use client";
import { useGetCompanyNamesQuery } from "@/redux/features/filters/filterSlice";
import { useGetAllJobPostsQuery } from "@/redux/features/job/jobSlice";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";

export default function SearchField() {
  // const companies = ["Google", "Open Ai", "Meta"];
  // const companies = [
  //   { companyName: "Google" },
  //   { companyName: "Open AI" },
  //   { companyName: "Meta" }
  // ]

  interface SearchFormInputs {
    jobName: string;
    company: string;
    location: string;
  }

  const { register, handleSubmit } = useForm<SearchFormInputs>();
  const { data: info, isLoading, error } = useGetAllJobPostsQuery({});
  // console.log(info?.data?.data?.length);
  // console.log(info?.data?.data[0]);
  const allJobsPost = info?.data?.data;

  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const { data: comName } = useGetCompanyNamesQuery({});
  const allCompany = comName?.data;
  // const filteredJobs = [];
  const [searchJobs, setSearchJobs] = useState([]);
  // const allCompany = companies;

  const displayedCompanies = useMemo(() => {
    if (!Array.isArray(allCompany)) return [];
    const sorted = [...allCompany].sort((a: any, b: any) => b.length - a.length);
    return showAllCompanies ? sorted : sorted.slice(0, 6);
  }, [allCompany, showAllCompanies]);

  const onSubmit = (data: SearchFormInputs) => {
    // console.log("Check the data here: ", data);

    // console.log("All Job Posts: ", allJobsPost);
    // console.log("Title: ", allJobsPost[0].title);
    // console.log("Company Name: ", allJobsPost[0].company.companyName);
    // console.log("Location: ", allJobsPost[0].location);

    const filteredJobs = allJobsPost.filter((job: any) => {
      const titleMatch = data.jobName
        ? job.title.toLowerCase().includes(data.jobName.toLowerCase())
        : true;

      const companyMatch = data.company
        ? job.company?.companyName.toLowerCase().includes(data.company.toLowerCase())
        : true;

      const locationMatch = data.location
        ? job?.location.toLowerCase().includes(data.location.toLowerCase())
        : true;

      return titleMatch && companyMatch && locationMatch;
    });

    setSearchJobs(filteredJobs);

    console.log(filteredJobs);
  };

  return (
    <div className="">
      <h1 className="text-xl text-primary-dark font-medium">
        Find Your Favorite Job
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="  bg-white p-4  rounded-lg shadow flex flex-col xl:flex-row items-stretch gap-4 mt-2">
          {/* Job Name Input */}
          <div className=" flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
            <FaBriefcase className="text-gray-500" />
            <input
              type="text"
              placeholder="Frontend "
              className="flex-1 w-[100px] bg-transparent focus:outline-none"
              {...register("jobName", { required: true })}
            />
          </div>

          {/* Company Select */}
          <div className="flex items-center border-b border-gray-300 text-black px-3 py-2 flex-1 gap-2">
            <FaBuilding className="text-gray-500" />
            <select
              {...register("company", { required: true })}
              className="flex-1 text-gray-700 "
            >
              <option value="">Select Company </option>
              {displayedCompanies.map((company, idx) => (
                <option key={idx} value={company?.companyName} className="text-black">
                  {company?.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* Location Select */}
          <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              type="text"
              placeholder="Location"
              className="flex-1 w-[100px] bg-transparent focus:outline-none"
              {...register("location", { required: true })}
            />
          </div>

          {/* Search Button */}
          <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-primary-dark text-white rounded bg-neutral-700 hover:bg-neutral-900 transition whitespace-nowrap cursor-pointer">
            <FaSearch />
            Search
          </button>
        </div>
      </form>
      <p className="text-gray-600 mt-2 ml-2">
        Popular : Full Stack Developer, Frontend Developer, UI Designer
      </p>
      {searchJobs.length > 0 ? (
        <div className="mt-4 space-y-2 border rounded p-4 bg-gray-50">
          {searchJobs.map((job: any, index) => (
            <div key={index} className="p-2 border-b last:border-b-0">
              <Link href={`/jobSeeker/job-details/${job?.id}`}>
                <h3 className="font-semibold text-gray-800">{job?.title}</h3>
                <p className="text-gray-600">{job.company?.companyName} — {job?.location}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (<p className="text-red-500 mt-2">No jobs found matching your search.</p>)
      }

    </div>
  );
}
