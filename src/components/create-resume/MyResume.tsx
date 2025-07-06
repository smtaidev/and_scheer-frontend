"use client";

import Link from "next/link";
import SectionHeader from "../shared/SectionHeader";
import ResumeComponent from "./ui/ResumeComponent";
import Button from "../shared/button/Button";

// Adjust path if different

export default function MyResume() {
  return (
    <div className="flex justify-center mt-12">
      <div className="p-6 w-full max-w-[1180px] h-[752px]">
        <SectionHeader
          title="Review Your AI-Generated Resume"
          description="Take a moment to review your resume. You can make changes and regenerate if needed. When you’re ready, download it and start applying!"
        ></SectionHeader>
        <ResumeComponent />
        <div className="flex gap-12 py-16 ">
          <button
            className="w-full bg-[#DBDBDB] text-black  py-3 px-6 rounded-lg hover:bg-gray-200 transition  font-medium"
            name="Download Resume"
          >
            Download Resume
          </button>

          <Link href={"/jobseekeruser/jobSeekerHome"} className="w-full">
            <Button name="Find Your Favorite Job">
              Find Your Favorite Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
