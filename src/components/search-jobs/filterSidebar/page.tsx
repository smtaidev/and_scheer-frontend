'use client'
import { useGetCompanyNamesQuery, useGetDepartmentsQuery, useGetWorkModesQuery } from '@/redux/features/filters/filterSlice';
import { Department, WorkMode } from '@/types/categoryType/Category';
import React, { useMemo, useState } from 'react';


// Filter Sidebar Component
export const FilterSidebar = () => {
  //   const [workMode, setWorkMode] = useState('');
  const [experience, setExperience] = useState(5);
  const [showAll, setShowAll] = useState(false);

  const { data: type } = useGetWorkModesQuery({});
  const { data: department } = useGetDepartmentsQuery({})
  const {data:comName}=useGetCompanyNamesQuery({})


  const workType = type?.data;
  const allDepartment = department?.data || [];

  // Sort departments by length (highest to lowest) and slice based on showAll state
  const displayedDepartments = useMemo(() => {
    const sorted = [...allDepartment].sort((a, b) => b.length - a.length);
    return showAll ? sorted : sorted.slice(0, 6);
  }, [allDepartment, showAll]);

  const hasMoreDepartments = allDepartment.length > 5;

  return (
    <div className="md:w-[337px] h-[600px] lg:h-max overflow-auto lg:bg-white p-6 border border-gray-200 ml-3 2xl:ml-0 shadow-lg rounded-lg lg:rounded-none bg-green-50 ">
      <h2 className="text-lg font-semibold mb-6">All Filters</h2>

      {/* Work Mode Filter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Work mode</h3>
          <span className="text-blue-500 text-sm cursor-pointer">Applied (1)</span>
        </div>
        <div className="space-y-2">
          {
            workType?.map((type: WorkMode) => <><label className="flex items-center space-x-2">

              <input type="checkbox" className="rounded" />
              <span className="text-sm">{type.jobType}</span>
              <span className="text-gray-400 text-xs ml-auto">({type.length})</span>
            </label></>)

          }

        </div>
      </div>

      {/* Experience Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Experience</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm">0</span>
          <div className="flex-1 relative">
            <input
              type="range"
              min="0"
              max="10"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
              {experience}
            </div>
          </div>
          <span className="text-sm">25 Yr</span>
        </div>
      </div>

      {/* Department Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Department</h3>
        <div className="space-y-2">
          {displayedDepartments.map((dept, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{dept.title}</span>
              <span className="text-gray-400 text-xs ml-auto">{dept.length}</span>
            </label>
          ))}
        </div>

        {hasMoreDepartments && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-blue-500 text-sm mt-2 hover:text-blue-600 transition-colors"
          >
            {showAll ? 'View Less' : 'View More'}
          </button>
        )}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Location</h3>
        <div className="space-y-2">
          {[
            { name: 'Dhaka', count: '(2706)' },
            { name: 'Chittagong', count: '(567)' },
            { name: 'Cumilla', count: '(234)' },
            { name: 'Jashore', count: '(187)' },
            { name: 'Barishal', count: '(156)' },
            { name: 'Rangpur', count: '(98)' },
            { name: 'Sylhet', count: '(87)' }
          ].map((location, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{location.name}</span>
              <span className="text-gray-400 text-xs ml-auto">{location.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>

      {/* Salary Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Salary Range</h3>
        <div className="space-y-2">
          {[
            { range: '1tk - 20k', count: '(1760)' },
            { range: '20k - 40k', count: '(876)' },
            { range: '40k - 60k', count: '(567)' },
            { range: '60k - 80k', count: '(345)' },
            { range: '80k - 1lakh', count: '(234)' },
            { range: '1lakh - 2lakh', count: '(123)' },
            { range: 'Negotiable', count: '(89)' }
          ].map((salary, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{salary.range}</span>
              <span className="text-gray-400 text-xs ml-auto">{salary.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>

      {/* Education Qualification Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Education Qualification</h3>
        <div className="space-y-2">
          {[
            { qual: 'Any Postgraduate', count: '(1240)' },
            { qual: 'Graduate', count: '(876)' },
            { qual: 'MSC', count: '(567)' },
            { qual: 'B.Sc Honours', count: '(456)' },
            { qual: 'B.Sc Engineer', count: '(345)' },
            { qual: 'Diploma Engineer', count: '(234)' }
          ].map((edu, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{edu.qual}</span>
              <span className="text-gray-400 text-xs ml-auto">{edu.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>

      {/* Companies Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Companies</h3>
        <div className="space-y-2">
          {[
            { company: 'SM Technology', count: '(8)' },
            { company: 'Ocean Lab', count: '(6)' },
            { company: 'NexTech Agency', count: '(5)' },
            { company: 'Software Agency', count: '(4)' },
            { company: 'Creative Agency', count: '(3)' }
          ].map((comp, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input type="checkbox" className="rounded" />
              <span className="text-sm">{comp.company}</span>
              <span className="text-gray-400 text-xs ml-auto">{comp.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>
      <div className="flex justify-end">
        <button className='px-3 py-1 border border-gray-200 rounded-md shadow-md bg-primary text-white hover:bg-green-600 cursor-pointer transition-all duration-300'>Apply</button>

      </div>
    </div>
  );
};