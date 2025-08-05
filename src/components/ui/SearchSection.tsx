import React from "react";
import SearchField from "../shared/searchField/SearchField";
import { animate } from "framer-motion";
import Navbar from "../shared/Navbar/Navbar";
import FloatNavbar from "../shared/searchField/FloatNavbar";
import { usePathname } from "next/navigation";

const navitem1 = [
  { name: "Home", href: "/" },
  { name: "For Job Seekers", href: "/jobSeeker/home" },
  { name: "For Employers", href: "/create-account" },
  { name: "Course", href: "#course" },
  { name: "Pricing", href: "#pricing" },
];

   const navitem2=[
    { name: "Home", href: "/jobSeeker/home" },
    { name: "Job", href: "/jobSeeker/job-details/jobs" },
    { name: "Company", href: "/jobSeeker/search-jobs" },
   
  ];

  

export default function SearchSection({setAnimate,animate}:any) {
  const path=usePathname();

  const navitem= path.includes("jobSeeker")? navitem2:navitem2
  return (
    <div className="">
      <div className="absolute -top-27 w-full">

      <FloatNavbar navItem={navitem}/>
      </div>

    <div className=" max-w-[1420px] mx-auto flex  justify-center">

      <SearchField setAnimate={setAnimate} animate={animate} />
    </div>
    </div>
  );
}

//  <div className="h-[400px] w-md overflow-auto absolute scrollbar-none top-40 md:top-30">
//         {searchJobs.map((job: any, index) => (
//           <div
//             key={index}
//             className="p-4 mb-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer bg-white hover:bg-blue-50 border border-gray-100 last:mb-0 "
//           >
//             <Link
//               onClick={() => setAnimate(!animate)}
//               href={`/jobSeeker/job-details/${job?.id}`}
//               className="block no-underline"
//             >
//               <div className="flex flex-col space-y-2">
//                 <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
//                   {job?.title}
//                 </h3>

//                 <div className="flex items-center text-gray-600">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-sm">{job.company?.companyName}</span>
//                 </div>

//                 <div className="flex items-center text-gray-600">
//                   <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-sm">{job?.location}</span>
//                 </div>

//                 {job.salary && (
//                   <div className="flex items-center text-gray-600">
//                     <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                       <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
//                     </svg>
//                     <span className="text-sm">{job.salary}</span>
//                   </div>
//                 )}

//                 <div className="pt-2">
//                   <span className="inline-block px-2 py-1 text-xs font-medium text-primary bg-green-100 rounded-full">
//                     {job.jobType|| 'Full-time'}
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>
