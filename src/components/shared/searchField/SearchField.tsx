'use client';
import { useGetMeQuery } from '@/redux/features/auth/auth';
import { useGetCompanyNamesQuery } from '@/redux/features/filters/filterSlice';
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaBriefcase, FaHashtag, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { RiUserLocationLine } from 'react-icons/ri';



export default function SearchField({ setAnimate, animate }: any) {
  interface SearchFormInputs {
    jobName: string;
    zipCode: string;
    location: string;
  }

  const [searchJobs, setSearchJobs] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { register, handleSubmit, setValue } = useForm<SearchFormInputs>();
  const { data: info } = useGetAllJobPostsQuery({});
  const { data: user } = useGetMeQuery({});
  const { data: comName } = useGetCompanyNamesQuery({});
  const allJobsPost = info?.data?.data || [];
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  const allCompany = comName?.data;
  const containerRef = useRef<HTMLDivElement>(null);

  const displayedCompanies = useMemo(() => {
    if (!Array.isArray(allCompany)) return [];
    const sorted = [...allCompany].sort((a: any, b: any) => b.length - a.length);
    return showAllCompanies ? sorted : sorted.slice(0, 6);
  }, [allCompany, showAllCompanies]);

  const onSubmit = (data: SearchFormInputs) => {
    const filteredJobs = allJobsPost.filter((job: any) => {
      const titleMatch = data.jobName
        ? job.title.toLowerCase().includes(data.jobName.toLowerCase())
        : true;
      const companyMatch = data.zipCode
        ? job.company?.companyName.toLowerCase().includes(data.zipCode.toLowerCase())
        : true;
      const locationMatch = data.location
        ? job?.location.toLowerCase().includes(data.location.toLowerCase())
        : true;

      return titleMatch && companyMatch && locationMatch;
    });

    setSearchJobs(filteredJobs);
    setShowResults(true); // Show results after search
  };

  const currentRoute = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);





  const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Call your API route
        const response = await fetch(`/api/geocode?lat=${latitude}&lon=${longitude}`);
        const data = await response.json();
         console.log(data)
        if (data.error) {
          console.error(data.error);
          return;
        }
        
        setValue('location', data.formattedAddress || `${data.city}, ${data.country}`);
      },
      (error) => {
        alert('Unable to retrieve your location.');
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
};

  return (
    <div className="relative" ref={containerRef}>
      <h1 className="text-xl text-secondary font-medium">Find Your Favorite Job</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col xl:flex-row items-stretch gap-4 mt-2">
          {/* Job Name Input */}
          <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
            <FaBriefcase className="text-gray-500" />
            <input
              type="text"
              placeholder="Frontend"
              className="flex-1 bg-transparent focus:outline-none"
              {...register('jobName')}
            />
          </div>
          {user?.data?.role == 'JOB_SEEKER' && currentRoute.includes('/jobSeeker') ? (
            <>
              {/* Location Input */}
              <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Location (Germany)"
                  className="flex-1 bg-transparent focus:outline-none"
                  {...register('location')}
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="ml-2 text-subtitle cursor-pointer px-3 py-1 rounded relative"
                >
                  <RiUserLocationLine />
                  <p className='absolute hidden  hover:block'>Get your Location</p>
                </button>
              </div>

              {/* Zip Code Input */}
              <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
                <FaHashtag className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Zip code"
                  className="flex-1 bg-transparent focus:outline-none w-24"
                  {...register('zipCode')}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-primary-dark text-white rounded bg-neutral-700 hover:bg-neutral-900 transition whitespace-nowrap cursor-pointer"
          >
            <FaSearch />
            Search
          </button>
        </div>
      </form>
      <p className="text-gray-600 mt-3 lg:text-base text-sm">
        Popular : Full Stack Developer, Frontend Developer, UI Designer
      </p>

      {showResults && searchJobs.length > 0 && (
        <div className="h-[400px] w-md overflow-auto absolute scrollbar-none top-40 md:top-30">
          {searchJobs.map((job: any, index) => (
            <div
              key={index}
              className="p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer bg-gray-50 hover:bg-green-50 border border-gray-100 last:mb-0 "
            >
              <Link
                onClick={() => setAnimate(!animate)}
                href={`/jobSeeker/job-details/${job?.id}`}
                className="block no-underline"
              >
                <div className="flex flex-col space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors">
                    {job?.title}
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{job.company?.companyName}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm">{job?.location}</span>
                  </div>

                  {job.salary && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{job.salary}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-green-100 rounded-full">
                      {job.jobType || 'Full-time'}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
