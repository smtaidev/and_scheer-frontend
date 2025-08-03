'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiEdit, FiUser, FiMail, FiPhone, FiLock, FiCheck, FiX, FiCalendar } from 'react-icons/fi';
import { useGetMeQuery, useUpdateContactInfoMutation } from '@/redux/features/auth/auth';

export default function UserProfilePage() {
  // Sample user data - in production you'd fetch this from your API
  const [user, setUser] = useState({
    _id: "6887707047413d052c17a8c5",
    firstName: "Sk Shariful",
    lastName: "Islam",
    fullName: "Sk Shariful Islam",
    email: "eee@gmail.com",
    profilePic: "",
    phone: "",
    preferredContactMethod: "email",
    role: "EMPLOYEE",
    isSubscribed: true,
    companyName: "",
    createdAt: "2025-07-28T12:43:28.332+00:00",
    updatedAt: "2025-07-31T06:29:13.207+00:00",
    planExpiration: "2025-08-31T06:29:13.205+00:00",
    subscriptionType: "monthly",
    planId: "688769fe4d0192c4db3d1f0b",
    status: "ACTIVE"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...user });
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [updateProfile]=useUpdateContactInfoMutation();
  const {data:info}=useGetMeQuery({})
console.log(info?.data)
  useEffect(()=>{
     setUser(info?.data)
  },[info?.data])
  // Handle input changes for edit form
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Save updated profile
  const handleSave = async () => {
    setIsLoading(true);
    try {
        // Create FormData object
    const formData = new FormData();
    
    // Append all the data fields
    formData.append('data', JSON.stringify({
      firstName: editData.firstName,
      lastName: editData.lastName,
      phone: editData.phone,
      preferredContactMethod: editData.preferredContactMethod,
      // Add other fields you want to update
    }));
     if (profileImage) {
      formData.append('file', profileImage);
    }


      const res = await updateProfile(formData)
      console.log(res)
      
      setUser({
        ...editData,
        profilePic: previewImage || user?.profilePic,
        fullName: `${editData.firstName} ${editData.lastName}`
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString:any) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <Head>
        <title>My Profile | Your App Name</title>
        <meta name="description" content="View and edit your profile" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Profile Header */}
            <div className=" bg-gradient-to-r from-primary to-gray-600 px-6 py-8 sm:px-10 sm:py-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center">
                  <div className="relative">
                    {previewImage || user?.profilePic ? (
                      <img 
                        src={previewImage || user?.profilePic} 
                        alt="Profile" 
                        className="h-20 w-20 rounded-full object-cover border-4 border-white"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center border-4 border-white">
                        <FiUser className="h-10 w-10 text-white" />
                      </div>
                    )}
                    {isEditing && (
                      <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <FiEdit className="h-4 w-4 text-prbg-primary" />
                      </label>
                    )}
                  </div>
                  <div className="ml-4">
                    <h1 className="text-2xl font-bold text-white">
                      {user?.fullName}
                    </h1>
                    <p className="text-prbg-primary">
                      {user?.role === "EMPLOYEE" ? "Employee" : "Admin"}
                    </p>
                  </div>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-white text-prbg-primary rounded-md hover:bg-primary transition-colors"
                  >
                    <FiEdit className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="mt-4 sm:mt-0 flex space-x-2">
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditData({ ...user });
                        setPreviewImage("");
                      }}
                      className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      <FiX className="mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:bg-green-300"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiCheck className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Content */}
            <div className="px-6 py-8 sm:px-10">
              {isEditing ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-prbg-primary focus:border-prbg-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-prbg-primary focus:border-prbg-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 flex items-center p-2 bg-gray-100 rounded-md">
                      <FiMail className="text-gray-500 mr-2" />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Contact support to change email</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-prbg-primary focus:border-prbg-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
                    <select
                      name="preferredContactMethod"
                      value={editData.preferredContactMethod}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-prbg-primary focus:border-prbg-primary"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="flex items-center">
                      <FiUser className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium">{user?.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{user?.phone || "Not provided"}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiMail className="text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Contact Preference</p>
                        <p className="font-medium capitalize">{user?.preferredContactMethod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="flex items-center">
                        <FiLock className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Account Status</p>
                          <p className="font-medium capitalize">{user?.status.toLowerCase()}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium">{formatDate(user?.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Last Updated</p>
                          <p className="font-medium">{formatDate(user?.updatedAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FiCalendar className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Subscription Expires</p>
                          <p className="font-medium">{formatDate(user?.planExpiration)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {user?.companyName && (
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                      <div className="flex items-center">
                        <div>
                          <p className="text-sm text-gray-500">Company Name</p>
                          <p className="font-medium">{user?.companyName}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}