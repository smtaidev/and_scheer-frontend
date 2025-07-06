import Image from 'next/image';
import React from 'react'

interface Course {
    image: string;
    title: string;
    instructor: string;
}


export default function CourseCard({ course }:{ course: Course }) {
    return (
     
            <div

                className="w-full max-w-[457px]  lg:h-[403px] bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col relative p-4"
            >
                {/* Image */}
                
                <Image
                    src={course.image}
                    alt={course.title}
                    className="w-full h-63% object-cover rounded-t-lg"
                    height={255}
                    width={425}
                />

                {/* Content */}
                <div className=" flex flex-col mt-3 gap-2">
                    <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                    <p className="text-sm mt-1">Instructor - <span className='text-gray-500 '>{course.instructor}</span></p>
                </div>

                {/* Button at bottom right */}
                <div className="p-4 pt-0 mt-auto flex justify-end">

                    <button className="text-sm text-green-600  underline rounded 0 transition">
                        See Details
                    </button>
                </div>
            </div>
     
    )
}
