'use client'
import Link from 'next/link';
import React, { useState } from 'react';

type FormData = {
    companyName: string;
    industryType: string;
    role: string;
    country: string;
    companyDescription: string;
    companyAddress: string;
    cityName: string;
    stateName: string;
    zipCode: string;
};

type FormErrors = {
    [K in keyof FormData]?: string;
};

const roleOptions = [
    { label: "Owner", value: "owner" },
    { label: "Developer", value: "developer" },
    { label: "Designer", value: "designer" },
    { label: "Manager", value: "manager" },
    { label: "Marketer", value: "marketer" },
    { label: "Other", value: "other" },
];

const regionOptions = [
    { label: "Bangladesh", value: "bangladesh" },
    { label: "India", value: "india" },
    { label: "United States", value: "usa" },
    { label: "United Kingdom", value: "uk" },
    { label: "Canada", value: "canada" },
    { label: "Australia", value: "australia" },
];

function AboutCompany() {
    const [formData, setFormData] = useState<FormData>({
        companyName: '',
        industryType: '',
        role: '',
        country: '',
        companyDescription: '',
        companyAddress: '',
        cityName: '',
        stateName: '',
        zipCode: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.companyName.trim()) {
            newErrors.companyName = 'Company name is required';
        }
        if (!formData.industryType.trim()) {
            newErrors.industryType = 'Industry type is required';
        }
        if (!formData.role) {
            newErrors.role = 'Role is required';
        }
        if (!formData.country) {
            newErrors.country = 'Country is required';
        }
        if (!formData.companyDescription.trim()) {
            newErrors.companyDescription = 'Company description is required';
        }
        if (!formData.companyAddress.trim()) {
            newErrors.companyAddress = 'Company address is required';
        }
        if (!formData.cityName.trim()) {
            newErrors.cityName = 'City is required';
        }
        if (!formData.stateName.trim()) {
            newErrors.stateName = 'State is required';
        }
        if (!formData.zipCode.trim()) {
            newErrors.zipCode = 'ZIP code is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Form Data:", formData);
            alert("Form submitted successfully! Check console for data.");

            // You can also display the data in a more user-friendly way
            const dataString = Object.entries(formData)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');
            console.log("Formatted Data:\n", dataString);
        }
        console.log(formData)
    };

    return (
        <div className="max-w-[1180px] mx-auto p-6 bg-white">
            <div className="space-y-6">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                        Tell Us About Your Company
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        This is your company's opportunity to shine - provide some basic details to help potential candidates understand your business better.
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Company Name */}
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                        </label>
                        <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            placeholder="SM Technology"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.companyName && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.companyName}</span>
                        )}
                    </div>

                    <div className="md:flex items-start gap-6 space-y-6 md:space-y-0">
                        {/* Industry Type */}
                        <div className="w-full md:w-1/2">
                            <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 mb-1">
                                Industry Type
                            </label>
                            <input
                                id="industryType"
                                name="industryType"
                                type="text"
                                placeholder="Tech, Marketing, Finance, etc."
                                value={formData.industryType}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.industryType && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.industryType}</span>
                            )}
                        </div>

                        {/* Role */}
                        <div className="w-full md:w-1/2">
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                What is your role in the company?
                            </label>
                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select your role</option>
                                {roleOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errors.role && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.role}</span>
                            )}
                        </div>
                    </div>

                    {/* Company Description */}
                    <div>
                        <label htmlFor="companyDescription" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Description
                        </label>
                        <textarea
                            id="companyDescription"
                            name="companyDescription"
                            rows={5}
                            placeholder="Tell us about your company..."
                            value={formData.companyDescription}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.companyDescription && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.companyDescription}</span>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row items-start gap-6 space-y-6 md:space-y-0">
                        {/* Country/Region */}
                        <div className="w-full md:w-[30%]">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                Company Country/Region
                            </label>
                            <select
                                id="country"
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select country</option>
                                {regionOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {errors.country && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.country}</span>
                            )}
                        </div>

                        {/* Company Address */}
                        <div className="w-full md:w-[70%]">
                            <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">
                                Company Address
                            </label>
                            <input
                                id="companyAddress"
                                name="companyAddress"
                                type="text"
                                placeholder="Section-06, Mirpur, Dhaka"
                                value={formData.companyAddress}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.companyAddress && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.companyAddress}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 space-y-6 md:space-y-0">
                        {/* City */}
                        <div className="w-full md:w-1/3">
                            <label htmlFor="cityName" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                id="cityName"
                                name="cityName"
                                type="text"
                                placeholder="Dhaka"
                                value={formData.cityName}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.cityName && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.cityName}</span>
                            )}
                        </div>

                        {/* State */}
                        <div className="w-full md:w-1/3">
                            <label htmlFor="stateName" className="block text-sm font-medium text-gray-700 mb-1">
                                State
                            </label>
                            <input
                                id="stateName"
                                name="stateName"
                                type="text"
                                placeholder="Dhaka"
                                value={formData.stateName}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.stateName && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.stateName}</span>
                            )}
                        </div>

                        {/* ZIP Code */}
                        <div className="w-full md:w-1/3">
                            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                ZIP Code
                            </label>
                            <input
                                id="zipCode"
                                name="zipCode"
                                type="text"
                                placeholder="1216"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.zipCode && (
                                <span className="text-red-500 text-sm mt-1 block">{errors.zipCode}</span>
                            )}
                        </div>
                    </div>

                    <Link
                        href={"/logo-contact"}
                    >
                        <button

                            onClick={handleSubmit}
                            className="w-full  bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-8 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Next
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AboutCompany;