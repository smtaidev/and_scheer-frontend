
import React from 'react'
import RecentUploadedPost from './RecentUploadedPost'
import Link from 'next/link'
import { IoMdArrowForward } from 'react-icons/io'
import Container from '@/components/ui/Container'

export default function RecentUpload() {
    return (
        <div className='bg-scheer-bg-gray mx-4'>
            <Container>

                <h1 className='text-2xl md:text-5xl font-semibold text-center mb-12'>Recent Uploaded Jobs</h1>
                <RecentUploadedPost />


                <div className='flex justify-center items-center mt-9 md:mt-14 '>
                    <Link href={"/jobSeeker/search-jobs"}>
                        <button className='border border-gray-400 text-scheer-primary-dark rounded font-medium py-[11px] px-6 flex hover:bg-primary cursor-pointer hover:text-white  transition-all duration-300 '>View all Jobs <IoMdArrowForward className='ml-2 my-auto'/></button>
                    </Link>
                </div>



            </Container>

        </div>
    )
}
