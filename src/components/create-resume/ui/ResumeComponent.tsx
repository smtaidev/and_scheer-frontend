import React from 'react';
import { CgMail } from 'react-icons/cg';
import { FaDribbble } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import Image from 'next/image';
import { PiPhone } from 'react-icons/pi';
import { TbMapPinCode } from 'react-icons/tb';
import { RefObject } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface ResumeComponentProps {
  downloadResume: () => void;
  printRef: RefObject<HTMLDivElement | null>;
  profileData: any; // Adjust type as needed
}

const ResumeComponent: React.FC<ResumeComponentProps> = ({ downloadResume, printRef, profileData }) => {
  function getDuration(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const totalMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let duration = "";
    if (years) duration += `${years} year${years > 1 ? "s" : ""}`;
    if (months) duration += `${years ? " " : ""}${months} month${months > 1 ? "s" : ""}`;

    return duration || "Less than a month";
  }


  return (
    <div ref={printRef} className="p-5 border-4 border-[#2B93DD] mx-auto bg-white  overflow-hidden">
      {/* Header Section */}
      <div className="p-8">
        <div className='p-8 flex gap-20'>
          <div className="pr-28">
            <div className="w-48 h-48 p-2 rounded-full border-4 border-[#7fbeeb] overflow-hidden">
              <Image
                src="/man.png"
                alt="Saifur Rahman"
                className="w-full h-full rounded-full justify-center object-cover"
                height={200}
                width={200}
              />
            </div>
          </div>
          <div className="">
            <h1 className="text-5xl font-bold text-[#323B4C] mb-2">{profileData.profile?.firstName} {profileData.profile?.lastName}</h1>
            <p className="text-xl text-[#323B4C] mb-4">{profileData.profile?.jobTitle}</p>
            <div className="flex flex-row gap-16 justify-start items-center space-y-2 text-[#323B4C]">
              <div className="flex items-center space-x-2">
                <PiPhone className="w-4 h-4" />
                <span>{profileData?.profile.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CgMail className="w-4 h-4" />
                <span>{profileData?.profile.email}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-[#323B4C]">
              <TbMapPinCode className="w-4 h-4" />
              <span>{profileData.profile?.address},{profileData.profile?.city},{profileData.profile?.state},{profileData.profile?.countryRegion},</span>
            </div>
          </div>
        </div>
      </div>

      <div className='p-8 flex gap-20'>
        {/* Left Column */}
        <div className='border-r-[1px] border-[#a2d2f0] pr-16'>
          {/* Portfolio */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-blue pb-2">PORTFOLIO</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaExternalLinkAlt className="w-4 h-4 text-[#ff46b8]" />
                <a href={`${profileData?.profile?.socialMedia?.personal_website_url}`} className="text-[#2563EB] hover:underline text-sm">
                  Portfolio
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaLinkedin className="w-4 h-4 text-[#3B82F6]" />
                <a href={`${profileData.profile?.socialMedia?.linkedin_profile_url}`} className="text-[#2563EB] hover:underline text-sm">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">SKILLS</h2>
            <ul className='flex justify-center items-start flex-col'>
              {[
                "UI/UX Design", "Figma", "Graphics Designer", "Adobe XD",
                "Adobe Illustrator", "Adobe InDesign", "Adobe Photoshop",
                "Adobe Premiere Pro", "Data Entry", "Typing Bangla & English Both Language"
              ].map((skill) => (
                <li key={skill} className="flex items-center  space-x-2">
                  <div className="w-1 h-1 bg-[#90CDF4] rounded-full"></div>
                  <span className='text-[#374151]'>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">LANGUAGES</h2>
            <ul>
              {["BANGLA", "ENGLISH"].map((lang) => (
                <li key={lang} className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-[#90CDF4] rounded-full"></div>
                  <span className='text-[#374151]'>{lang}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Co-curricular Activities */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">CO-CURRICULAR ACTIVITIES</h2>
            <ul>
              {["BEE Member", "Travelling", "Cricket"].map((activity) => (
                <li key={activity} className="flex items-center space-x-2">
                  <div className="w-1 h-1 bg-[#90CDF4] rounded-full"></div>
                  <span className='text-[#374151]'>{activity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-2/3">
          {/* About Me */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">ABOUT ME</h2>
            <p className="text-[#374151]">
              {profileData.resume?.data?.sections[1]?.content[0]}
            </p>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">EDUCATION QUALIFICATION</h2>
            <div>
              {profileData?.profile?.education?.map((edu: any, idx: any) => (
                <div key={idx} className='mb-3'>
                  <h3 className="font-semibold text-[#1F2937]">{edu.degree}</h3>
                  <p className="text-sm text-[#374151]">{edu.school}</p>
                  <p className="text-sm text-[#374151]">{edu.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Training */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">TRAINING / CERTIFICATION</h2>
            <div className=''>

              {profileData?.profile?.certifications?.map((certificate: any, idx: any) => (
                <div key={idx} className='mb-3'>
                  <h3 className="font-semibold text-[#1F2937]">{certificate?.certification_name}</h3>
                  <p className="text-sm text-[#374151]">{certificate?.issuing_organization}</p>

                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">WORK EXPERIENCE</h2>
            <div>
              {profileData?.profile?.jobExperience?.map((job: any, idx: any) => (
                <div key={idx} className='space-y-6 mb-5'>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm text-[#1F2937]">{job?.job_title}</h3>
                    <span className="text-sm text-[#6B7280]">
                      {getDuration(job?.start_date, job?.end_date)}
                    </span>
                  </div>
                  <p className='font-semibold text-[#1F2937] mb-2'>{job?.company_name}</p>
                  <p className='text-[#6B7280]'>
                    {job?.job_description}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeComponent;
