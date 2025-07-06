"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../shared/button/Button";
import SectionHeader from "../shared/SectionHeader";
// Adjust path if different

interface CareerFormData {
  jobTitle: string;
  jobDescription: string;
}

export default function CareerOverview({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { register, handleSubmit } = useForm<CareerFormData>();
  const router = useRouter();

  const onSubmit = (data: CareerFormData): void => {
    console.log(data, " Tour career here");
    setStep(3);
    // router.push("/jobseekeruser/skillexprience");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-center mt-12">
        <div className="p-6 w-full max-w-[1180px] h-[752px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <SectionHeader
              title="Your Career Overview"
              description="A strong career summary will make a lasting impression on recruiters. Let’s create a summary that highlights your experience and goals."
            ></SectionHeader>

            <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
              <div className="w-full ">
                <label className="block text-xl font-medium text-gray-800 ">
                  Job Title
                </label>
                <select
                  className="w-full bg-gray-50 py-4 px-4 border border-[#c2c2c2] rounded"
                  {...register("jobTitle", { required: true })}
                >
                  <option value="" disabled hidden>
                    Enter your most recent or current job title
                  </option>
                  <option value="software-engineer">Software Engineer</option>
                  <option value="marketing-manager">Marketing Manager</option>
                  <option value="graphic-designer">Graphic Designer</option>
                  <option value="sales-representative">
                    Sales Representative
                  </option>
                  <option value="project-manager">Project Manager</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xl font-medium text-gray-800 ">
                Job Description
              </label>
              <textarea
                className="w-full h-[224px] bg-gray-50 py-4 px-4 border border-[#c2c2c2] rounded-md mb-16"
                id="textarea"
                placeholder="An experienced marketing professional with over 5 years of expertise in digital marketing, specializing in SEO, social media strategies, and content creation"
                {...register("jobDescription", { required: true })}
              />
            </div>

            <Button
                          type="submit"
              text="Next"
              icon="arrow-right"
              action="log"
              bgColor="#28C76F"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
