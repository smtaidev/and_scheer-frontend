'use client'
import { useGetCompanyNamesQuery, useGetDepartmentsQuery, useGetWorkModesQuery } from '@/redux/features/filters/filterSlice';
import { Department, WorkMode } from '@/types/categoryType/Category';
import React, { useMemo, useState } from 'react';

// Filter Sidebar Component
export const FilterSidebar = () => {
  const [experience, setExperience] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  // State for tracking selected filters
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const { data: type } = useGetWorkModesQuery({});
  const { data: department } = useGetDepartmentsQuery({});
  const { data: comName } = useGetCompanyNamesQuery({});

  const workType = type?.data;
  const allDepartment = department?.data || [];
  const allCompany = comName?.data;

  // Sort departments by length (highest to lowest) and slice based on showAll state
  const displayedDepartments = useMemo(() => {
    const sorted = [...allDepartment].sort((a, b) => b.length - a.length);
    return showAll ? sorted : sorted.slice(0, 6);
  }, [allDepartment, showAll]);
  const hasMoreDepartments = allDepartment.length > 5;

  const displayedCompanies = useMemo(() => {
    if (!Array.isArray(allCompany)) return [];
    const sorted = [...allCompany].sort((a, b) => b.length - a.length);
    return showAllCompanies ? sorted : sorted.slice(0, 6);
  }, [allCompany, showAllCompanies]);
  const hasMoreCompanies = Array.isArray(allCompany) && allCompany.length > 5;

  console.log(allCompany)
  // Handlers for checkbox changes
  const handleWorkModeChange = (jobType: string) => {
    setSelectedWorkModes((prev) =>
      prev.includes(jobType)
        ? prev.filter((item) => item !== jobType)
        : [...prev, jobType]
    );
  };

  const handleDepartmentChange = (title: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleLocationChange = (name: string) => {
    setSelectedLocations((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const handleSalaryChange = (range: string) => {
    setSelectedSalaries((prev) =>
      prev.includes(range)
        ? prev.filter((item) => item !== range)
        : [...prev, range]
    );
  };

  const handleEducationChange = (qual: string) => {
    setSelectedEducations((prev) =>
      prev.includes(qual)
        ? prev.filter((item) => item !== qual)
        : [...prev, qual]
    );
  };

  const handleCompanyChange = (companyName: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyName)
        ? prev.filter((item) => item !== companyName)
        : [...prev, companyName]
    );
  };

  // Handle Apply button click
  const handleApply = () => {
    const formData = {
      workModes: selectedWorkModes,
      experience: experience,
      departments: selectedDepartments,
      locations: selectedLocations,
      salaryRanges: selectedSalaries,
      educations: selectedEducations,
      companies: selectedCompanies,
    };
    console.log('Form Data:', formData);
  };

  return (
    <div className="md:w-[337px] h-[600px] lg:h-max overflow-auto lg:bg-white p-6 border border-gray-200 ml-3 2xl:ml-0 shadow-lg rounded-lg lg:rounded-none bg-green-50 relative z-50">
      <h2 className="text-lg font-semibold mb-6">All Filters</h2>

      {/* Work Mode Filter */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Work mode</h3>
          <span className="text-blue-500 text-sm cursor-pointer">
            Applied ({selectedWorkModes.length})
          </span>
        </div>
        <div className="space-y-2">
          {workType?.map((type: WorkMode) => (
            <label key={type.jobType} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedWorkModes.includes(type.jobType)}
                onChange={() => handleWorkModeChange(type.jobType)}
              />
              <span className="text-sm">{type.jobType}</span>
              <span className="text-gray-400 text-xs ml-auto">({type.length})</span>
            </label>
          ))}
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
          {displayedDepartments.map((dept: Department, index: number) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedDepartments.includes(dept.title)}
                onChange={() => handleDepartmentChange(dept.title)}
              />
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
            { name: 'Sylhet', count: '(87)' },
          ].map((location, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedLocations.includes(location.name)}
                onChange={() => handleLocationChange(location.name)}
              />
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
            { range: 'Negotiable', count: '(89)' },
          ].map((salary, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedSalaries.includes(salary.range)}
                onChange={() => handleSalaryChange(salary.range)}
              />
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
            { qual: 'Diploma Engineer', count: '(234)' },
          ].map((edu, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedEducations.includes(edu.qual)}
                onChange={() => handleEducationChange(edu.qual)}
              />
              <span className="text-sm">{edu.qual}</span>
              <span className="text-gray-400 text-xs ml-auto">{edu.count}</span>
            </label>
          ))}
        </div>
        <button className="text-blue-500 text-sm mt-2">View More</button>
      </div>

      {/* Companies Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Company</h3>
        <div className="space-y-2">
          {displayedCompanies.map((company, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded"
                checked={selectedCompanies.includes(company.companyName)}
                onChange={() => handleCompanyChange(company.companyName)}
              />
              <span className="text-sm">{company.companyName}</span>
              <span className="text-gray-400 text-xs ml-auto">{company.length}</span>
            </label>
          ))}
        </div>
        {hasMoreCompanies && (
          <button
            onClick={() => setShowAllCompanies(!showAllCompanies)}
            className="text-blue-500 text-sm mt-2 hover:text-blue-600 transition-colors"
          >
            {showAllCompanies ? 'View Less' : 'View More'}
          </button>
        )}
      </div>

      {/* Apply Button */}
      <div className="flex justify-end">
        <button
          onClick={handleApply}
          className="px-3 py-1 border border-gray-200 rounded-md shadow-md bg-primary text-white hover:bg-green-600 cursor-pointer transition-all duration-300"
        >
          Apply
        </button>
      </div>
    </div>
  );
};