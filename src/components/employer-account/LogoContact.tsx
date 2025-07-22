'use client'
import React, { useState } from 'react';
import { Upload, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFormContext } from './FormContext';
import { useCreateCompanyMutation } from '@/redux/features/company/companySlice';
// Import the context

function LogoContact() {
    const router = useRouter();
    const { formData, updatePage1Data } = useFormContext();
    const [updateCompany] = useCreateCompanyMutation()

    const [localFormData, setLocalFormData] = useState({
        email: formData.page1Data.email || "",
        phoneNumber: formData.page1Data.phoneNumber || "",
        website: formData.page1Data.website || "https://www.google.com/",
        logo: formData.page1Data.logo || null
    });

    const [isDragOver, setIsDragOver] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = (file: File) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        const maxSize = 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a PNG, JPG, or JPEG file.');
            return;
        }

        if (file.size > maxSize) {
            alert('File size must be less than 1MB.');
            return;
        }

        setLocalFormData(prev => ({
            ...prev,
            logo: file
        }));
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileUpload(files[0]);
        }
    };



    const handleSubmit = async () => {
        try {
            updatePage1Data(localFormData);

            // Combine all form data
            const formDataToSend = new FormData();
            // const formDataApi = new FormData();


            // Page 1 data
            // formDataToSend.append("email", formData.page1Data.email);
            // formDataToSend.append("phoneNumber", formData.page1Data.phoneNumber);
            // formDataToSend.append("website", formData.page1Data.website);
            // if (formData.page1Data.logo) {
            //     formDataToSend.append("logo", formData.page1Data.logo);
            // }

            // Page 2 data
            // formDataToSend.append("companyName", formData.page2Data.companyName);
            // formDataToSend.append("industryType", formData.page2Data.industryType);
            // formDataToSend.append("roleInCompany", formData.page2Data.roleInCompany);
            // formDataToSend.append("description", formData.page2Data.description);
            // formDataToSend.append("country", formData.page2Data.country);
            // formDataToSend.append("address", formData.page2Data.address);
            // formDataToSend.append("city", formData.page2Data.city);
            // formDataToSend.append("state", formData.page2Data.state);
            // formDataToSend.append("zipCode", formData.page2Data.zipCode);

            // console.log('Sending combined data:', {
            //     page1: formData.page1Data,
            //     page2: formData.page2Data
            // });

            const fullData = {
                companyName: formData.page2Data.companyName,
                industryType: formData.page2Data.industryType,
                roleInCompany: formData.page2Data.roleInCompany,
                description: formData.page2Data.description,
                country: formData.page2Data.country,
                email: formData.page1Data.email,
                phoneNumber: formData.page1Data.phoneNumber,
                address: formData.page2Data.address,
                city: formData.page2Data.city,
                state: formData.page2Data.state,
                zipCode: formData.page2Data.zipCode,
                website: formData.page1Data.website,
            };

            // ✅ 2. Append logo file
            if (formData.page1Data.logo) {
                formDataToSend.append("logo", formData.page1Data.logo); // file
            }

            // ✅ 3. Append data object as JSON string
            formDataToSend.append("data", JSON.stringify(fullData));


            const res = await updateCompany(formDataToSend).unwrap();
            console.log('Success:', res);

            // Handle success (redirect, show message, etc.)

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <div className="w-full max-w-[1180px] mx-auto bg-white">
            <div className="px-8 py-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-5xl text-center font-semibold text-gray-900 mb-4">
                        Add Logo & Contact Information
                    </h1>
                    <p className="text-scheer-body-gray text-base leading-relaxed mx-auto">
                        Branding your profile with your logo helps candidates recognize and connect with your company. Plus, providing contact details makes it easy for candidates to reach out.
                    </p>
                </div>

                {/* Form Content */}
                <div className="space-y-8">
                    {/* Upload Logo and Company Number Row */}
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Upload Company Logo */}
                        <div className="space-y-3 md:w-[458px]">
                            <label className="block text-sm font-medium text-gray-900">
                                Upload Company Logo
                            </label>
                            <div
                                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver
                                    ? 'border-green-400 bg-green-50'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <div className="flex flex-col items-center space-y-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-700">
                                            Drop file or browse
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Supports: PNG, JPG, JPEG, 1 MB
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors"
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                    >
                                        Browse Files
                                    </button>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileInput}
                                    />
                                </div>
                                {localFormData.logo && (
                                    <div className="absolute inset-0 bg-green-50 border-2 border-green-300 rounded-lg flex items-center justify-center">
                                        <p className="text-green-700 font-medium">
                                            {localFormData.logo.name}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Company Email and Website Row */}
                        <div className="flex gap-7 flex-col w-full">
                            {/* Company Number */}
                            <div className="space-y-3">
                                <label htmlFor="companyNumber" className="block text-sm font-medium text-gray-900">
                                    Company Number
                                </label>
                                <input
                                    id="companyNumber"
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="+880 1567890747"
                                    value={localFormData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                />
                            </div>
                            {/* Company Email */}
                            <div className="space-y-3">
                                <label htmlFor="companyEmail" className="block text-sm font-medium text-gray-900">
                                    Company Email
                                </label>
                                <input
                                    id="companyEmail"
                                    name="email"
                                    type="email"
                                    placeholder="ur.saifur.info@gmail.com"
                                    value={localFormData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Website */}
                            <div className="space-y-3">
                                <label htmlFor="website" className="block text-sm font-medium text-gray-900">
                                    Website
                                </label>
                                <input
                                    id="website"
                                    name="website"
                                    type="url"
                                    placeholder="www.smtechnology24.com"
                                    value={localFormData.website}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Next Button */}
                    <div className="pt-6">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group"
                        >
                            <span>Next</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogoContact;