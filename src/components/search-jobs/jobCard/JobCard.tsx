import React from 'react'
import { MapPin, Star, Save, Eye } from 'lucide-react';
type Job = {
  company: string;
  title: string;
  location: string;
  rating: string;
  reviews: string;
  skills: string;
  salary: string;
  timePosted: string;
};

export default function JobCard({job}:{job:Job}) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4 hover:shadow-md transition-shadow w-full">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">SM</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-gray-900">{job.company}</h3>
                        <p className="text-gray-500 text-sm">{job.timePosted}</p>
                    </div>
                </div>
                <Save className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>

            <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{job.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{job.reviews} Reviews</span>
                </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Skill Needed:</span> {job.skills}
            </p>

            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-900">
                    ${job.salary} <span className="text-sm font-normal text-gray-500">/month</span>
                </div>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    View Details
                </button>
            </div>
        </div>
    )
}
