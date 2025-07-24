"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import Button from "../shared/button/Button";
import SectionHeader from "../shared/SectionHeader";
import FormInput from "../ui/FormInput";

// Type definition
type WorkForm = {
  experiences: {
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    jobDescription: string;
    achievements: FileList | null;
    skills: string[];
  }[];
};

export default function SkillsExperience({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { control, register, handleSubmit } = useForm<WorkForm>({
    defaultValues: {
      experiences: [
        {
          jobTitle: "",
          companyName: "",
          startDate: "",
          endDate: "",
          jobDescription: "",
          achievements: null,
          skills: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const router = useRouter();

  
  const handleBack = (): void => {

    setStep(2);
    console.log("Back")
  };

  const onSubmit = (data: WorkForm) => {
    console.log("Got all skills data:", data);
    setStep(4);
    // router.push("/jobseekeruser/education");
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="p-6 w-full max-w-[1180px] h-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionHeader
            title="Your Work Experience & Skills"
            description="Highlight your work experience and skills. The more detail you provide, the better the AI can tailor your resume to match job opportunities."
          />

          {fields.map((field, index) => (
            <div key={field.id} className="mb-8">
              {/* Job Title */}
              <div className="mb-4">
                <FormInput
                  label="Job Title"
                  type="text"
                  placeholder="Mid-Level UI/UX Designer"
                  {...register(`experiences.${index}.jobTitle`)}
                />
              </div>

              {/* Company Name */}
              <div className="mb-4 md:w-1/2">
                <FormInput
                  label="Company Name"
                  type="text"
                  placeholder="SM Technology (betopia Group)"
                  {...register(`experiences.${index}.companyName`)}
                />
              </div>

              {/* Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormInput
                  label="Start Date"
                  type="date"
                  {...register(`experiences.${index}.startDate`)}
                />
                <FormInput
                  label="End Date"
                  type="date"
                  {...register(`experiences.${index}.endDate`)}
                />
              </div>

              {/* Job Description */}
              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-800">
                  Job Description
                </label>
                <textarea
                  className="w-full h-[224px] bg-gray-50 py-5 px-4 border border-[#c2c2c2] rounded-md"
                  placeholder="An experienced marketing professional..."
                  {...register(`experiences.${index}.jobDescription`)}
                />
              </div>

              {/* Achievements File Input */}
              <div className="mb-4">
                <label className="block text-xl font-medium text-gray-800 mb-2">
                  Achievements
                </label>
                <input
                  type="file"
                  multiple
                  {...register(`experiences.${index}.achievements`)}
                  className={`px-4 py-4 bg-gray-50 border border-[#c2c2c2]  rounded-md w-full`}
                />
              </div>

              {/* Skills */}
              <div className="mb-8">
                <label className="block text-xl font-medium text-gray-800 mb-2">
                  Skills
                </label>
                <div className="w-full p-2 bg-gray-50 border border-[#c2c2c2] rounded-md flex flex-wrap gap-2 items-center">
                  {["UI Designer", "UX Designer", "Figma"].map((skill) => (
                    <label key={skill} className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={skill}
                        {...register(`experiences.${index}.skills`)}
                        className={`px-4 py-4 bg-gray-50 border border-[#c2c2c2]  rounded-md w-full`}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 text-sm mb-4 text-end flex cursor-pointer"
                  >
                    <IoIosRemoveCircleOutline className="my-auto mr-1 " />{" "}
                    Remove Experience
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add Another Experience */}
          <div className="mb-12">
            <button
              type="button"
              onClick={() =>
                append({
                  jobTitle: "",
                  companyName: "",
                  startDate: "",
                  endDate: "",
                  jobDescription: "",
                  achievements: null,
                  skills: [],
                })
              }
              className="text-[#28C76F] font-medium flex items-center cursor-pointer"
            >
              <span className="mr-2">+</span> Add Another Work Experience
            </button>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => handleBack()} className="px-4  py-2 rounded-md bg-secondary text-white cursor-pointer hover:bg-black">
              Back
            </button>
            <Button
              type="submit"
              text="Next"
              icon="arrow-right"
              action="submit"
              bgColor="#28C76F"
              name="Next"
              className="px-4  py-2  rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
