'use client';
import { useGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { RiUserLocationLine } from 'react-icons/ri';

export default function SearchField({ setAnimate, animate }: any) {
  interface SearchFormInputs {
    jobName: string;
    location: string;
  }

  const { register, setValue, watch } = useForm<SearchFormInputs>();
  const watchFields = watch(); // watch the input fields
  const [searchJobs, setSearchJobs] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { data: info } = useGetAllJobPostsQuery({});
  const allJobsPost = info?.data?.data || [];
  const containerRef = useRef<HTMLDivElement>(null);

    const watchedJobName = watch('jobName');
  const watchedLocation = watch('location');

  useEffect(() => {
    const filteredJobs = allJobsPost.filter((job: any) => {
      const titleMatch = watchFields.jobName
        ? job.title.toLowerCase().includes(watchFields.jobName.toLowerCase())
        : true;
      const locationMatch = watchFields.location
        ? job.location.toLowerCase().includes(watchFields.location.toLowerCase())
        : true;
      return titleMatch && locationMatch;
    });

    setSearchJobs(filteredJobs);
    setShowResults(!!watchFields.jobName || !!watchFields.location); 
  }, [watchedJobName,watchedLocation, allJobsPost]);


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
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=yes`
          );
          const data = await response.json();
          setValue('location', data.location.name || "Germany");
        },
        () => alert('Unable to retrieve your location.')
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <h1 className="text-xl text-secondary font-medium">Find Your Favorite Job</h1>
      <div className="bg-white p-4 rounded-lg shadow flex flex-col 2xl:flex-row items-stretch gap-4 mt-2">
        <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
          <FaBriefcase className="text-gray-500" />
          <input
            type="text"
            placeholder="Frontend"
            className="flex-1 bg-transparent focus:outline-none"
            {...register('jobName')}
          />
        </div>

        <div className="flex items-center border-b border-gray-300 px-3 py-2 flex-1 gap-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <input
            type="text"
            placeholder="Location (Germany)"
            className="flex-1 bg-transparent focus:outline-none"
            {...register('location')}
          />
          <button type="button" onClick={getCurrentLocation} className="ml-2 text-subtitle">
            <RiUserLocationLine />
          </button>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-6 py-2 bg-secondary text-white rounded cursor-pointer"
          onClick={() => setShowResults(true)}
        >
          <FaSearch />
          Search
        </button>
      </div>

      {showResults && searchJobs.length === 0 && (
        <div className="absolute top-28 bg-gray-50 shadow-md rounded-lg px-4 py-2 w-full z-10">
          <p className="text-center text-primary">No jobs found</p>
        </div>
      )}

      {showResults && searchJobs.length > 0 && (
        <div className="absolute top-28 bg-gray-50 shadow-md rounded-lg w-full max-h-60 overflow-auto z-10">
          {searchJobs.slice(0, 5).map((job: any, index) => (
            <div key={index} className="px-4 py-2 hover:bg-green-100 cursor-pointer border-b border-gray-200">
              <Link className='flex gap-2' onClick={() => setAnimate(!animate)} href={`/jobSeeker/job-details/${job?.id}`}>
                <h3 className="text-md font-semibold text-gray-900 hover:text-primary transition-colors">
                  {job?.title}
                </h3>
                <p className='text-sm flex items-end'>
                    - {job.location}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
