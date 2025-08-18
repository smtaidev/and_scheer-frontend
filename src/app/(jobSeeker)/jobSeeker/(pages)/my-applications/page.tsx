'use client';
import React from 'react';
import { CgArrowsV } from 'react-icons/cg';
import Container from '@/components/ui/Container';
import { useGetAppliedJobsQuery } from '@/redux/features/job/jobSlice';
import Link from 'next/link';
import { Loader } from '@/components/shared/MainLoader';




const StatusBadge = ({ status }: { status: string }) => {
  const isSuccess = status === 'Success';
  const bg = isSuccess ? 'bg-green-100' : 'bg-red-100';
  const text = isSuccess ? 'text-green-800' : 'text-red-800';
  const border = isSuccess ? 'border-green-200' : 'border-red-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text} ${border} border`}>
      {status}
    </span>
  );
};

// Change Time Format
const changeTimeFormat = (timeStr: string) => {
  // const timeStr = "2025-07-29T03:50:11.596Z";
  const date = new Date(timeStr);
  const formattedDate = date.toISOString().split('T')[0];
  return formattedDate
}

export default function AppliedJobList() {

  const { data, isLoading, error } = useGetAppliedJobsQuery({});

  const appliedJobs = data?.data || [];

  if (isLoading) return <p className='min-h-[500px] flex items-center justify-center'><Loader /></p>;
  // if (error) return <p>Failed to fetch applied jobs.</p>;


  return (
    <Container>

      <div className="md:px-12   mx-3">
        {/* Header */}
        <div className="py-4 border-gray-200 flex justify-between">
          <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">Applied Job List</h2>
          <Link className='mt-5 underline font-semibold' href={"/jobSeeker/interview-list"}>
            Interview List
          </Link>
        </div>

        {/* Table */}

        {
          appliedJobs && appliedJobs.length > 0 ? <><div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <div className="min-w-[1200px]">
              {/* Table Header */}
              <div className="bg-primary text-white px-6 py-3 rounded-t-lg text-sm md:text-base lg:text-lg font-medium">
                <div className="grid grid-cols-7 gap-4">
                  <div className="col-span-1 flex items-center">Applied Date <CgArrowsV className="ml-1" /></div>
                  <div className="col-span-1 flex items-center">Company Name <CgArrowsV className="ml-1" /></div>
                  <div className="col-span-1 flex items-center">Contact <CgArrowsV className="ml-1" /></div>
                  <div className="col-span-1 flex items-center">Salary Range <CgArrowsV className="ml-1" /></div>
                  <div className="col-span-1 flex items-center">Position <CgArrowsV className="ml-1" /></div>
                  <div className="col-span-1 flex items-center">Status <CgArrowsV className="ml-1" /></div>
                  <div className="col-span-1 flex items-center">Action <CgArrowsV className="ml-1" /></div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200 text-sm md:text-base">
                {appliedJobs?.map((row: any) => (
                  <div key={row.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-7 gap-4 items-center text-gray-700">
                      <div className="col-span-1">{changeTimeFormat(row?.appliedAt)}</div>
                      <div className="col-span-1">{row?.job?.company?.companyName}</div>
                      <div className="col-span-1">{row?.job?.company?.phoneNumber}</div>
                      <div className="col-span-1">{row?.job?.salaryRange}</div>
                      <div className="col-span-1">{row?.job?.title}</div>
                      <div className="col-span-1"><StatusBadge status={row.status} /></div>
                      <Link href={`/jobSeeker/job-details/${row?.jobId}`}>
                        <div className="col-span-1 underline text-primary hover:text-green-700 cursor-pointer">View Details</div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div></> : <><div className="flex justify-center items-center h-[400px] bg-gray-50">
            <div className="text-center p-8 rounded-lg bg-white shadow-md">
              <div className="text-gray-500 text-xl font-medium">
                No Application Found
              </div>
              <p className="mt-2 text-gray-400">
                Please check your search or create a new application
              </p>
              {/* Optional button */}
              <Link href={"/jobSeeker/job-details/jobs"}>
                <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-green-600 transition cursor-pointer">
                  Apply for Jobs
                </button>
              </Link>
            </div>
          </div></>
        }

      </div>
    </Container>

  );
}