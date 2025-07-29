'use client'
import { useGetCompanyNamesQuery, useGetDepartmentsQuery, useGetWorkModesQuery } from '@/redux/features/filters/filterSlice';
import { JobFilterType, useGetAllJobPostsQuery, useLazyGetAllJobPostsQuery } from '@/redux/features/job/jobSlice';
import { Department, WorkMode } from '@/types/categoryType/Category';
import React, { useMemo, useState } from 'react';

const allLocation = [
  { name: 'Erdmannhausen', count: '(2706)' },
  { name: 'München', count: '(567)' },
  { name: 'Wembach', count: '(234)' },
  { name: 'Malgersdorf', count: '(187)' },
  { name: 'Neustetten', count: '(156)' },
  { name: 'The Black Forest', count: '(156)' },
  { name: 'Cologne Cathedral', count: '(156)' },

  // { name: 'In velit eu est co', count: '(98)' },
  // { name: 'Exercitation sapient', count: '(87)' },
]

const salaryRanges = [
  { range: '$1000-$2000', count: '(1760)' },
  { range: '$2000 - $5000', count: '(567)' },
  { range: '$1000-$7000', count: '(876)' },
  { range: '$9,000 - $12,000', count: '(345)' },
  // { range: '80k - 1lakh', count: '(234)' },
  // { range: '1lakh - 2lakh', count: '(123)' },
  // { range: 'Negotiable', count: '(89)' },
];

const educationQualifications = [
  { qual: 'Any Postgraduate', count: '(1240)' },
  { qual: 'Graduate', count: '(876)' },
  { qual: 'MSC', count: '(567)' },
  { qual: 'B.Sc Honours', count: '(456)' },
  { qual: 'B.Sc Engineer', count: '(345)' },
  { qual: 'Diploma Engineer', count: '(234)' },
];


// Filter Sidebar Component
export const FilterSidebar = ({ setFiltersData }: any) => {
  const [experience, setExperience] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);
  // State for tracking selected filters
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);
  const [selectedEducations, setSelectedEducations] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  // Handle All Location Button
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showAllSalaries, setShowAllSalaries] = useState(false);
  const [showAllEducations, setShowAllEducations] = useState(false);
  // const [showAllCompanies, setShowAllCompanies] = useState(false);

  // Filter store data
  const filters: JobFilterType = {
    companyName: [],
    title: [],
    educations: [],
    experience: 0,
    locations: [],
    salaryRange: [],
    jobType: []
  };

  const { data: type } = useGetWorkModesQuery({});
  const { data: department } = useGetDepartmentsQuery({});
  const { data: comName } = useGetCompanyNamesQuery({});
  // const [filterJobPostsTrigger, { isFetching }] = useGetAllJobPostsQuery({});
  // const { data: info, isFetching } = useGetAllJobPostsQuery({ filters });
  // const { data: info, isFetching } = useGetAllJobPostsQuery(filters);
  const [filterJobPostsTrigger, { data: info, isFetching }] = useLazyGetAllJobPostsQuery();
  // const { data: info, isFetching } = useGetAllJobPostsQuery(filters);

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
  const handleApply = async () => {
    const formData = {
      jobType: selectedWorkModes,
      experience: experience > 0 && `${experience === 1 ? `${experience}-year` : `${experience}-years`}`,
      title: selectedDepartments,
      locations: selectedLocations,
      salaryRange: selectedSalaries,
      educations: selectedEducations,
      companyName: selectedCompanies,
    };
    console.log('Form Data printed:', formData);

    // filterJobPostsTrigger(formData);

    const response = await filterJobPostsTrigger(formData);
    setFiltersData(response?.data?.data?.data);
    // const response = await filterJobPostsTrigger(formData);
    console.log(response?.data?.data?.data);
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
          <span className="text-sm">10 Yr</span>
        </div>
      </div>

      {/* Position Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Position</h3>
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
          {(showAllLocations ? allLocation : allLocation.slice(0, 5)).map((location, index) => (
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
        {allLocation.length > 5 && (
          <button
            className="text-blue-500 text-sm mt-2"
            onClick={() => setShowAllLocations(!showAllLocations)}
          >
            {showAllLocations ? "Show Less" : "View More"}
          </button>
        )}
      </div>

      {/* Salary Range Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-3">Salary Range</h3>
        <div className="space-y-2">
          {(showAllSalaries ? salaryRanges : salaryRanges.slice(0, 5)).map((salary, index) => (
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
        {salaryRanges.length > 5 && (
          <button
            className="text-blue-500 text-sm mt-2"
            onClick={() => setShowAllSalaries(!showAllSalaries)}
          >
            {showAllSalaries ? "Show Less" : "View More"}
          </button>
        )}
      </div>

      {/* Education Qualification Filter */}
      {/* <div className="mb-6">
        <h3 className="font-medium mb-3">Education Qualification</h3>
        <div className="space-y-2">
          {(showAllEducations ? educationQualifications : educationQualifications.slice(0, 4)).map((edu, index) => (
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
        {educationQualifications.length > 4 && (
          <button
            className="text-blue-500 text-sm mt-2"
            onClick={() => setShowAllEducations(!showAllEducations)}
          >
            {showAllEducations ? "Show Less" : "View More"}
          </button>
        )}
      </div> */}

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
          disabled={isFetching}
        >
          {isFetching ? "Applying..." : "Apply"}
        </button>
      </div>
    </div>
  );
};