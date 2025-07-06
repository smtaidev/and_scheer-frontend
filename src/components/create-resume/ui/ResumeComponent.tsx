import React from 'react';
// import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { CgMail } from 'react-icons/cg';
import { FiExternalLink } from 'react-icons/fi';
import { HiExternalLink } from 'react-icons/hi';
import Image from 'next/image';
import { PiPhone } from 'react-icons/pi';
import { TbMapPinCode } from 'react-icons/tb';

const ResumeComponent = () => {
  return (
    <div className="  border mx-auto bg-white  overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-blue-200 overflow-hidden">
              <Image  
                src="/man.png" 
                alt="Saifur Rahman" 
                className="w-full h-full object-cover"
                height={200}
                width={200}
              />
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">SAIFUR RAHMAN</h1>
            <p className="text-xl text-gray-600 mb-4">UX/UI Designer</p>
            <div className="flex flex-col space-y-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <PiPhone className="w-4 h-4" />
                <span>+880 1632254789</span>
              </div>
              <div className="flex items-center space-x-2">
                <CgMail className="w-4 h-4" />
                <span>saifurrahman@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <TbMapPinCode className="w-4 h-4" />
                <span>House-7810, Bagan-01, Block-C, Section-06, Mirpur, Dhaka Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Column */}
        <div className="w-1/3 bg-gray-50 p-6">
          {/* Portfolio */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">PORTFOLIO</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FiExternalLink className="w-4 h-4 text-blue-500" />
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  Dribbble.com/ux_saifur_info
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <HiExternalLink className="w-4 h-4 text-blue-500" />
                <a href="#" className="text-blue-600 hover:underline text-sm">
                  linkedin.com/ux_saifur_info
                </a>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">SKILLS</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>UI/UX Design</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Figma</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Graphics Designer</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Adobe XD</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Adobe Illustrator</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Adobe InDesign</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Adobe Photoshop</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Adobe Premiere Pro</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Data Entry</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Typing Bangla & English Both Language</span>
              </li>
            </ul>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">LANGUAGES</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>BANGLA</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>ENGLISH</span>
              </li>
            </ul>
          </div>

          {/* Co-curricular Activities */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">CO-CURRICULAR ACTIVITIES</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>BEE Member</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Travelling</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Cricket</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-2/3 p-6">
          {/* About Me */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">ABOUT ME</h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Hello! I am a Professional UI/UX Designer & Graphics Designer with a keen eye for detail and a drive for creativity. My expertise extends to proficiency in UI/UX designing, allowing me to create visually stunning graphics.
            </p>
          </div>

          {/* Education Qualification */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">EDUCATION QUALIFICATION</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">B. Sc. in Electronics and Communication Engineering</h3>
                <p className="text-sm text-gray-600">Institute of Science Trade & Technology (ISTT)</p>
                <p className="text-sm text-gray-500">2020 - Till Now</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Higher Secondary in Science</h3>
                <p className="text-sm text-gray-600">Voikunthapur Govt. College</p>
                <p className="text-sm text-gray-500">2018 - 2020</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">SSC in Science</h3>
                <p className="text-sm text-gray-600">Voikunthapur Islamiah Madrasah</p>
                <p className="text-sm text-gray-500">2016 - 2018</p>
              </div>
            </div>
          </div>

          {/* Training/Certification */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">TRAINING/CERTIFICATION</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Course Name: - Certified UI/UX Design</h3>
              <p className="text-sm text-gray-600 mb-1">Training Institute: - Bohubrihi of Sohojoware Limited</p>
              <p className="text-sm text-gray-600 mb-1">Duration: - 01/01/2023 – 24/07/2024 (1.5 Months)</p>
              <p className="text-sm text-gray-600 mb-1">Topic: - User Experience, Website of Software design, Mobile Application Design, User Interface Design etc.</p>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">WORK EXPERIENCE</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">UI/UX Designer</h3>
                  <span className="text-sm text-gray-500">01/01/2025 - Till Now</span>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-2">RioCarting.lf Ltd</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I am very happy to get the opportunity for UI/UX designer expert. I drive to bring beauty designs and make user experiences for every project I take on with I approach every project with...
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">UI/UX Designer Intern</h3>
                  <span className="text-sm text-gray-500">01/04/2024 - 30/07/2024</span>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-2">RioCarting.lf Ltd</p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  I am very happy to get the opportunity for UI/UX designer expert. I drive to bring beauty designs and make user experiences for every project I take on with I approach every project with...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ResumeComponent; 