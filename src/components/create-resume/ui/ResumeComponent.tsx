import React from 'react';
import { CgMail } from 'react-icons/cg';
import { FiExternalLink } from 'react-icons/fi';
import { FaDribbble } from "react-icons/fa6";
import { HiExternalLink } from 'react-icons/hi';
import { FaLinkedin } from "react-icons/fa6";
import Image from 'next/image';
import { PiPhone } from 'react-icons/pi';
import { TbMapPinCode } from 'react-icons/tb';
import { FC, RefObject } from 'react';

interface ResumeComponentProps {
  downloadResume: () => void;
  printRef: RefObject<HTMLDivElement | null>;
}

const ResumeComponent: React.FC<ResumeComponentProps> = ({ downloadResume, printRef }) => {
  return (
    <div ref={printRef} className="p-5 border-4 border-[#2B93DD] mx-auto bg-white  overflow-hidden">
      {/* Header Section */}
      <div className="p-8">
        {/* <div className="flex gap-28 items-center space-x-6"> */}
        <div className='p-8 flex gap-20'>
          {/* <div className="relative"> */}
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
            <h1 className="text-5xl font-bold text-[#323B4C] mb-2">SAIFUR RAHMAN</h1>
            <p className="text-xl text-[#323B4C] mb-4">UX / UI Designer</p>
            <div className="flex flex-row gap-16 justify-start items-center space-y-2 text-[#323B4C]">
              <div className="flex items-center space-x-2">
                <PiPhone className="w-4 h-4" />
                <span>+880 1632254789</span>
              </div>
              <div className="flex items-center space-x-2">
                <CgMail className="w-4 h-4" />
                <span>saifurrahman@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-[#323B4C]">
              <TbMapPinCode className="w-4 h-4" />
              <span>House-7810, Bagan-01, Block-C, Section-06, Mirpur, Dhaka Bangladesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='p-8 grid grid-cols-2 gap-10'> */}
      <div className='p-8 flex gap-20'>
        {/* Left Column */}
        <div className='border-r-[1px] border-[#a2d2f0] pr-16'>
          {/* Portfolio */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-blue pb-2">PORTFOLIO</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaDribbble className="w-4 h-4 text-[#ff46b8]" />
                <a href="#" className="text-[#2563EB] hover:underline text-sm">
                  Dribbble.com/ux_saifur_info
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FaLinkedin className="w-4 h-4 text-[#3B82F6]" />
                <a href="#" className="text-[#2563EB] hover:underline text-sm">
                  linkedin.com/ux_saifur_info
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
              Hello! I am a Professional UI/UX Designer & Graphics Designer with a keen eye for detail and a drive for creativity. My expertise extends to proficiency in UI/UX designing, allowing me to create visually stunning graphics.
            </p>
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">EDUCATION QUALIFICATION</h2>
            <div>
              {[{
                degree: "B. Sc. in Electronics and Communication Engineering",
                school: "Institute of Science Trade & Technology (ISTT)",
                time: "2020 - Till Now"
              }, {
                degree: "Higher Secondary in Science",
                school: "Voikunthapur Govt. College",
                time: "2018 - 2020"
              }, {
                degree: "SSC in Science",
                school: "Voikunthapur Islamiah Madrasah",
                time: "2016 - 2018"
              }].map((edu, idx) => (
                <div key={idx} className='mb-3'>
                  {/* <h3 className="font-semibold text-gray-800">{edu.degree}</h3> */}
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
              <h3><span className='text-sm'>Course Name:-</span> - Certified UI/UX Design</h3>
              <p><span className='text-sm'>Training Institute:-</span> - Bohubrihi of Sohojoware Limited</p>
              <p><span className='text-sm'>Duration:-</span> 01/01/2023 – 24/07/2024 (1.5 Months)</p>
              <p><span className='text-sm'>Topic:-</span> User Experience, Website of Software design, Mobile Application Design, User Interface Design etc.</p>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-black mb-4 border-b-0 border-black pb-2">WORK EXPERIENCE</h2>
            <div>
              {[{
                title: "UI/UX Designer",
                company: "RioCarting.lf Ltd",
                duration: "01/01/2025 - Till Now"
              }, {
                title: "UI/UX Designer Intern",
                company: "RioCarting.lf Ltd",
                duration: "01/04/2024 - 30/07/2024"
              }].map((job, idx) => (
                <div key={idx} className='space-y-6 mb-5'>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm text-[#1F2937]">{job.title}</h3>
                    <span className="text-sm text-[#6B7280]">{job.duration}</span>
                  </div>
                  <p className='font-semibold text-[#1F2937] mb-2'>{job.company}</p>
                  <p className='text-[#6B7280]'>
                    I am very happy to get the opportunity for UI/UX designer expert...I am very happy to get the opportunity for UI/UX designer expert...I am very happy to get the opportunity for UI/UX designer expert...
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
