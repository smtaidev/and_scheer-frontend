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
          const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=yes`);
          const data = await response.json();
          console.log(data)
          if (data.error) {
            console.error(data.error);
            return;
          }

          setValue('location', data.location.name || `${data.city}, ${data.country}`|| "Germany");
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
    <div className={`relative`} ref={containerRef}>
      <h1 className="text-xl text-secondary font-medium">Find Your Favorite Job</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col 2xl:flex-row items-stretch gap-4 mt-2">
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

          {/* Location Input */}
          <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
            <FaMapMarkerAlt className="text-gray-500" />
            <input
              type="text"
              placeholder="Location (Germany)"
              className="flex-1 bg-transparent focus:outline-none"
              {...register('location')}
            />
            <div className="relative group">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="ml-2 text-subtitle cursor-pointer px-3 py-1 rounded relative"
              >
                <RiUserLocationLine />
                <p className="absolute hidden group-hover:inline-block w-40 shadow-md bg-green-50 border border-green-50 transition duration-300 text-sm rounded px-2 py-1 -bottom-10 left-1/2 transform -translate-x-1/2">
                  Use Current Location
                </p>
              </button>
            </div>
          </div>

                {/* Zip Code Input */}
              {/* <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
                <FaHashtag className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Zip code"
                  className="flex-1 bg-transparent focus:outline-none w-24"
                  {...register('zipCode')}
                />
              </div> */}

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

      {showResults && searchJobs.length === 0 && (
        <div className="w-md absolute top-40 md:top-30 bg-gray-50 shadow-md rounded-lg px-4 py-2">
          <p className="text-center text-gray-600">No jobs found</p>
        </div>
      )}

      {showResults && searchJobs.length > 0 && (
        <div className="w-md overflow-auto absolute scrollbar-none top-40 md:top-30 bg-gray-50 shadow-md rounded-lg">
          {searchJobs.slice(0, 4).map((job: any, index) => (
            <div
              key={index}
              className="px-4 py-2 mb-3 transition-shadow duration-200 cursor-pointer hover:bg-green-100 last:mb-0"
            >
              <Link
                onClick={() => setAnimate(!animate)}
                href={`/jobSeeker/job-details/${job?.id}`}
                className="block no-underline"
              >
                <div className="flex flex-col space-y-2">
                  <h3 className="text-md font-semibold text-gray-900 hover:text-primary transition-colors">
                    {job?.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
