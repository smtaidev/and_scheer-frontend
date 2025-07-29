'use client'
import React from "react";
import CourseCard from "./CourseCard";
import { useGetRecommandedCourseQuery } from "@/redux/features/course/courseSlice";
import { Course } from "@/types/AllTypes";

export default function CourseSection() {
  // const courses = [
  //   {
  //     image: "/graphics.jpg",
  //     title: "Graphics Design",
  //     instructor: "Saiful Islam",
  //   },
  //   {
  //     image: "/graphics.jpg",
  //     title: "Graphics Design",
  //     instructor: "Saiful Islam",
  //   },
  //   {
  //     image: "/graphics.jpg",
  //     title: "Graphics Design",
  //     instructor: "Saiful Islam",
  //   },
  //   {
  //     image: "/graphics.jpg",
  //     title: "Graphics Design",
  //     instructor: "Saiful Islam",
  //   },
  // ];


  
  const {data:course} = useGetRecommandedCourseQuery({limit: 10});

  


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
      {course?.data?.courses?.slice(0,6).map((course:Course, index:any) => (
        <div className="flex justify-center" key={index}>
          <CourseCard key={index} course={course}></CourseCard>
        </div>
      ))}
    </div>
  );
}
