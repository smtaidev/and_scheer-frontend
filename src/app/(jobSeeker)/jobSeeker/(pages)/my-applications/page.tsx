'use client';
import React from 'react';
import { CgArrowsV } from 'react-icons/cg';
import { MoreHorizontal } from 'lucide-react';
import Container from '@/components/ui/Container';

const aiLogData = [
  {
    id: 1,
    timestamp: 'Jun 30, 2025 | 10:45 AM',
    userName: 'Rafiq Islam',
    projectName: 'Skyline Tower',
    action: 'AI Extracted FloorPlan.pdf',
    status: 'Success',
    notes: 'No issues found.',
  },
  {
    id: 2,
    timestamp: 'Jun 30, 2025 | 09:10 AM',
    userName: 'Nusrat Jahan',
    projectName: 'Green Valley',
    action: 'AI Extraction Failed',
    status: 'Failed',
    notes: 'Unsupported file format.',
  },
  {
    id: 3,
    timestamp: 'Jun 29, 2025 | 03:33 PM',
    userName: 'Tanvir Hasan',
    projectName: 'Bridge Point',
    action: 'Updated certificate via AI',
    status: 'Success',
    notes: 'Manually reviewed post-extraction.',
  },
];

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

const ActionButton = () => (
  <button className="p-1 hover:bg-gray-100 rounded transition-colors">
    <MoreHorizontal size={16} className="text-gray-500" />
  </button>
);

export default function AppliedJobList() {
  return (
    <Container>

      <div className="md:px-12   mx-3">
        {/* Header */}
        <div className="py-4 border-gray-200">
          <h2 className="text-lg md:text-[32px] font-semibold text-gray-900">Applied Job List</h2>

        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <div className="min-w-[1000px]">
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
              {aiLogData.map((row) => (
                <div key={row.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-7 gap-4 items-center text-gray-700">
                    <div className="col-span-1">{row.timestamp}</div>
                    <div className="col-span-1">{row.userName}</div>
                    <div className="col-span-1">{row.userName}</div>
                    <div className="col-span-1">{row.userName}</div>
                    <div className="col-span-1">{row.userName}</div>
                    <div className="col-span-1"><StatusBadge status={row.status} /></div>
                    <div className="col-span-1 underline text-scheer-primary">View Details</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>

  );
}