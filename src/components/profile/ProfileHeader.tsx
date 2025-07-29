import { Phone, Mail, MapPin, Edit2 } from "lucide-react";
import AboutModal from "./modal/HeadAboutModal";
import HeadAboutModal from "./modal/HeadAboutModal";
import { useState } from "react";

const ProfileHeade = ({profileData}:any) => {
  console.log("profileData in ProfileHeader", profileData);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleAboutMode = () => {
    setIsModalOpen(true);
    console.log("yes");
  };
  return (
    <div className=" mx-auto bg-white shadow-sm border border-[#9191914D] rounded-lg p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      {/* Profile Image */}

      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
        {/* Placeholder circle for avatar */}
        <div className="w-20 h-20 bg-blue-200 rounded-full"></div>
      </div>

      {/* Profile Info */}
      <div className="flex-1 w-full">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{profileData?.firstName} {profileData?.lastName}</h2>
            <p className="text-gray-600 text-sm line-clamp-1">{profileData?.JobTitle}</p>
          </div>
          <button
            onClick={handleAboutMode}
            className="bg-gray-800 text-white px-4 py-1 text-sm rounded-md hover:bg-gray-700"
          >
            <Edit2 size={14} className="inline-block mr-1 cursor-pointer" />
            Edit
          </button>
        </div>

        {/* Contact Details */}
        {/* Contact Details - Fully Responsive */}
        <div className="mt-4 flex flex-col sm:flex-row sm:divide-x divide-gray-300 gap-5 text-sm text-gray-700">
          {/* Phone */}
          <div className=" sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-1">
              <Phone size={14} />
              <span className="font-medium">Phone:</span>
            </div>

            <span className="ml-1 block text-gray-600">{profileData?.phoneNumber}</span>
          </div>
          {/* Phone */}
          <div className=" sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-1">
              <Mail size={14} />
              <span className="font-medium">Email:</span>
            </div>

            <span className="ml-1 block text-gray-600 line-clamp-1">
              {profileData?.email || profileData?.user?.email}
            </span>
          </div>

          {/* Phone */}
          <div className=" sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span className="font-medium">Location:</span>
            </div>

            <span className="ml-1 block text-gray-600 line-clamp-1">{profileData?.city}, {profileData?.state}, {profileData?.countryRegion}</span>
          </div>
        </div>
      </div>
      <HeadAboutModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        profileData={profileData}
      />
    </div>
  );
};

export default ProfileHeade;
