'use client'
import { Job } from '@/types/AllTypes';
import Image from 'next/image';
import { toast } from "sonner"; // Assuming you're using the `sonner` library for toasts.
import React, { useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { PiBagSimpleFill } from 'react-icons/pi';
import { formatDistanceToNow, format } from 'date-fns'
import { LuDot } from 'react-icons/lu';
import { useApplyJobMutation } from '@/redux/features/job/jobSlice';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import LoadingButton from '../loading/LoadingButton';
import { useGetMeQuery } from '@/redux/features/auth/auth';

type JobDetailsCardProps = {
    currentCompany: Job | undefined;
};

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ currentCompany }) => {
    const company = currentCompany?.company;
    const { id } = useParams();
    const [loading,setLoading]=useState(false)
    const router=useRouter()

    const [applyJob, { isLoading }] = useApplyJobMutation();
    const {data:user}=useGetMeQuery({})

    // const handleApplyNow = () => {
    //     console.log("Job Applied Successfully: ", currentCompany?.id as string);
    // }
    const handleApplyJob = async () => {
        setLoading(true);
        if(!user.data) return router.push("/signIn");
       
        try {
            const jobId = currentCompany?.id;
            const response = await applyJob({ jobId });


            if (response && 'data' in response && response.data?.success) {
                toast.success("Successfully applied for the job!");
                setLoading(false)
            }else{
                const errorMessage =
                    response?.error && 'data' in response.error
                        ? (response.error as { data?: { message?: string } }).data?.message
                        : 'Failed to apply for the job.';
                toast.warning(errorMessage);
                setLoading(false)
            }
        } catch (error: any) {
            toast.error(error.data.message)
            setLoading(false)
        }
    };


    return (
        <section className="max-w-[939px] mx-auto p-6 bg-white text-scheer-primary-dark shadow-md rounded-lg">
            <header className="flex justify-between items-center mb- 4">
                <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold  flex items-center gap-3">
                    {currentCompany?.company?.companyName || "Superjob Technology"}</h1>
            </header>

            <h2 className="text-xl md:text-3xl xl:text-[42px]  md:mt-8 dark:">{currentCompany?.title || "UI/UX Designer (Onsite)"} <span className='text-primary text-2xl'>({currentCompany?.jobType})</span></h2>
            <p className="text-sm  text-subtitle  flex flex-wrap gap-3 md:my-3">
                <span className='flex items-center gap-1'><FaLocationDot className='text-blue-600' /> <p>{currentCompany?.location}</p></span>
                | <span className='flex items-center gap-1'><PiBagSimpleFill className='text-purple-600' />{currentCompany?.experience}</span> |
                <span className='text-sm text-gray-500'>
                    {currentCompany?.createdAt && formatDistanceToNow(new Date(currentCompany.createdAt), { addSuffix: true })}
                </span>
                |

                100+ applicants
            </p>

            <p className="text-sm  dark: mt-2 flex  md:items-center md:mb-3 gap-2">
                <strong className="  mt-0.5 md:mt-0">Skills:</strong>
                <div className='flex gap-1 flex-wrap text-subtitle'>
                    {currentCompany?.skills?.map(skill => <div className='flex items-center'>{skill} <LuDot className='size-6' /></div>)}
                </div>
            </p>

            <p className="text-sm  dark: mt-1">
                {currentCompany?.deadline && (
                    <div className='flex items-center gap-2'>
                        <p className='md:text-lg'>Application Deadline:</p >
                        <p className='md:text-lg text-subtitle'>{format(new Date(currentCompany.deadline), 'MMM dd, yyyy')}</p>
                    </div>
                )}

            </p>

            <p className="text-xl py-3 md:py-8 border-b border-gray-200"><span className="text-2xl md:text-5xl font-bold text-green-500">{currentCompany?.salaryRange}</span>/ Month</p>

            <section className="mt-6">
                <h3 className="text-lg md:text-[28px] font-semibold  dark: mb-2">Job Description</h3>
                <p className=" ">
                    {currentCompany?.features.find(p => p.featureTitle == "Description")?.paragraph}
                </p>
            </section>

            <section className="mt-6">
                <h3 className="text-lg md:text-[28px] font-semibold  dark: mb-2">Responsibilities</h3>
                <ul className="list-disc list-inside  dark: space-y-1">

                    {currentCompany?.features?.find(p => p.featureTitle == "Responsibilities")?.point?.map(p => <li>{p}</li>)}

                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-lg  font-semibold md:text-[28px] dark: mb-2">Requirements</h3>
                <ul className="list-disc list-inside  dark: space-y-1">
                    {currentCompany?.features?.find(p => p.featureTitle == "Requirements:")?.point?.map(p => <li>{p}</li>)}

                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-lg md:text-[28px] font-semibold  dark: mb-2">Why Join Us?</h3>
                <ul className="list-disc list-inside  dark: space-y-1">
                    {currentCompany?.features?.find(p => p.featureTitle == "Why Join SM Technology?:")?.point?.map(p => <li>{p}</li>)}
                </ul>
            </section>

            <footer className="mt-6 flex gap-3">
                {
                    loading? <div className='bg-primary text-white  px-4 py-2 rounded'><LoadingButton/></div>:<> <button
                    onClick={handleApplyJob}
                    className="bg-primary text-white  px-4 py-2 rounded hover:bg-green-600 transition cursor-pointer">
                    Apply Now
                </button></>
                }
               
                <Link href={'/jobSeeker/search-jobs'}>
                    <button className="border border-gray-300   dark: px-4 py-2 rounded hover:bg-gray-300 text-scheer-body-gray  transition cursor-pointer">
                        Back to Listing
                    </button>
                </Link>
            </footer>
        </section>
    );
};

export default JobDetailsCard;