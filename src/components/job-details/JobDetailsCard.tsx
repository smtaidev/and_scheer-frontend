import { Company } from '@/app/(jobSeeker)/jobSeeker/(pages)/job-details/page';
import React from 'react';


type JobDetailsCardProps = {
    currentCompany: Company | undefined;
};

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({ currentCompany }) => {
    console.log(currentCompany)
    return (
        <section className="max-w-[939px] mx-auto p-6 bg-white text-scheer-primary-dark shadow-md rounded-lg">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold  dark:">{currentCompany?.name ||"dask"}</h1>
                <button className="bg-green-500 text-xs  font-medium px-2 md:px-4 py-2 rounded hover:bg-green-600 transition text-white">
                    Apply Now
                </button>
            </header>

            <h2 className="text-xl md:text-3xl lg:text-[42px]   dark:">{currentCompany?.position || "UI/UX Designer (Onsite)"}</h2>
            <p className="text-sm  dark: mt-1">
                Dhaka, Bangladesh • 1–2 Yr • Uploaded 2 days ago • 100+ applicants
            </p>

            <p className="text-sm  dark: mt-2">
                <strong className=" dark:">Skills:</strong> Figma, Adobe Illustrator, Photoshop, Adobe XD (optional)
            </p>

            <p className="text-3xl font-bold text-green-500 mt-4">$4,500 / Month</p>

            <p className="text-sm  dark: mt-1">
                <strong>Deadline:</strong> Aug 25, 2025
            </p>

            <section className="mt-6">
                <h3 className="text-lg font-semibold  dark: mb-2">Job Description</h3>
                <p className=" dark:">
                    We are looking for a talented UI/UX Designer to join our onsite team in Dhaka. You'll work closely with PMs and developers to design intuitive, user-friendly digital experiences.
                </p>
            </section>

            <section className="mt-6">
                <h3 className="text-lg font-semibold  dark: mb-2">Responsibilities</h3>
                <ul className="list-disc list-inside  dark: space-y-1">
                    <li>Design user-centric interfaces for web and mobile apps</li>
                    <li>Conduct user research and usability testing</li>
                    <li>Create wireframes, prototypes, and high-fidelity mockups</li>
                    <li>Collaborate cross-functionally to implement designs</li>
                    <li>Ensure brand consistency across products</li>
                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-lg font-semibold  dark: mb-2">Requirements</h3>
                <ul className="list-disc list-inside  dark: space-y-1">
                    <li>2+ years of UI/UX design experience</li>
                    <li>Skilled in Figma, Adobe XD, or Sketch</li>
                    <li>Strong portfolio of product designs</li>
                    <li>Excellent communication and problem-solving skills</li>
                    <li>Bachelor’s degree in Design or related field</li>
                </ul>
            </section>

            <section className="mt-6">
                <h3 className="text-lg font-semibold  dark: mb-2">Why Join SM Technology?</h3>
                <ul className="list-disc list-inside  dark: space-y-1">
                    <li>Attractive salary & benefits</li>
                    <li>Work on next-gen products</li>
                    <li>Support for professional development</li>
                    <li>Inclusive and collaborative culture</li>
                </ul>
            </section>

            <footer className="mt-6 flex gap-3">
                <button className="bg-primary text-white  px-4 py-2 rounded hover:bg-green-600 transition">
                    Apply Now
                </button>
                <button className="border border-gray-300   dark: px-4 py-2 rounded hover:bg-gray-300 text-scheer-body-gray  transition">
                    Back to Listing
                </button>
            </footer>
        </section>
    );
};

export default JobDetailsCard;