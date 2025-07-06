"use client";
import React from "react";
import { useForm } from "react-hook-form";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaSearch,
} from "react-icons/fa";

export default function SearchField() {
  const companies = ["Google", "Open Ai", "Meta"];

  interface SearchFormInputs {
    jobName: string;
    company: string;
    location: string;
  }

  const { register, handleSubmit } = useForm<SearchFormInputs>();

  const onSubmit = (data: SearchFormInputs) => {
    console.log(data, "Check the data here: ");
  };

  return (
    <div>
      <h1 className="text-xl text-primary-dark font-medium">
        Find Your Favorite Job
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="  max-w-6xl mx-auto bg-white p-4 rounded-lg shadow flex flex-col lg:flex-row items-stretch gap-4 mt-2">
          {/* Job Name Input */}
          <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
            <FaBriefcase className="text-gray-500" />
            <input
              type="text"
              placeholder="Frontend Developer"
              className="flex-1 bg-transparent focus:outline-none"
              {...register("jobName", { required: true })}
            />
          </div>

          {/* Company Select */}
          <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
            <FaBuilding className="text-gray-500" />
            <select
              {...register("company", { required: true })}
              className="flex-1    text-gray-700"
            >
              <option value="">Select Company </option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
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
              className="flex-1 bg-transparent focus:outline-none"
              {...register("location", { required: true })}
            />
          </div>

          {/* Search Button */}
          <button className="flex items-center gap-2 px-6 py-2 bg-primary-dark text-white rounded hover:bg-neutral-900 transition whitespace-nowrap cursor-pointer">
            <FaSearch />
            Search
          </button>
        </div>
      </form>
      <p className="text-gray-600 mt-2 ml-2">
        Popular : Full Stack Developer, Frontend Developer, UI Designer
      </p>
    </div>
  );
}
