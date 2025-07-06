import React from 'react'
import CourseCard from './CourseCard'

export default function CourseSection() {


  const courses = [
    {
      image:"/graphics.jpg",
      title: "Graphics Design",
      instructor:"Saiful Islam"

  },
    {
      image:"/graphics.jpg",
      title: "Graphics Design",
      instructor:"Saiful Islam"

  },
    {
      image:"/graphics.jpg",
      title: "Graphics Design",
      instructor:"Saiful Islam"

  },
    {
      image:"/graphics.jpg",
      title: "Graphics Design",
      instructor:"Saiful Islam"

  },

]  

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto'>
      {
        courses.map((course, index) => (
        <div className='flex justify-center' key={index}>
        <CourseCard  key={index} course={course}></CourseCard>
     
        </div>))
      }
        
    </div>
  )
}
