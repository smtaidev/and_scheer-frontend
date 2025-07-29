import { Course } from '@/types/AllTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function CourseCard({ course }:{course:Course}) {
  return (
    <div className="w-full max-w-[457px]  bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col relative p-4 hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      <div className="relative w-full h-[255px] mb-4">
        <Image
          src={course.image}
          alt={course.title}
          className="object-cover w-full h-full rounded-lg"
          height={255}
          width={457}
        />
      </div>

      {/* Course Content */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{course.description}</p>

        {/* Course Features */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>⭐ {course.rating}</span>
            <span>•</span>
            <span>{course.num_reviews} reviews</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>📚 {course.num_lectures} Lectures</span>
            
          </div>
        </div>
      </div>

      {/* Bottom Info & Button */}
      <div className="p-4 pt-2 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Instructor - <span className="font-semibold text-gray-700">{course?.visible_instructors[0].name || ""}</span></p>
        </div>
        <div className="flex flex-col items-end">
          {course.is_paid && (
            <span className="text-sm text-gray-700 font-semibold">{course.price_detail.price_string}</span>
          )}
          <Link href={`${course.visible_instructors[0].url}`}>
          
          <button className="text-sm text-green-600 underline rounded cursor-pointer hover:font-semibold transition-all duration-300 mt-2">
            See Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
