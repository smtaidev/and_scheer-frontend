"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../shared/button/Button";
import SectionHeader from "../shared/SectionHeader";
import FormInput from "../ui/FormInput";

interface ContactInfoType {
  linkedProfile: string;
  portfolio: string;
  socialMedia: string;
  socialMediaLink: string; // Use string instead of URL for form compatibility
}

export default function ContactInfo({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { register, handleSubmit } = useForm<ContactInfoType>();
  const router = useRouter();

  const onSubmit = (data: ContactInfoType) => {
    console.log(data, "Got the personal info");
    setStep(6)
    // router.push("/jobseekeruser/aimagic");
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="w-full max-w-[1180px] h-auto">
        <SectionHeader
          title="Your Contact Information"
          description="Include additional contact details and social media links to showcase your professional presence."
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* LinkedIn Profile */}
          <div className="mb-4">
            <FormInput
              label="LinkedIn Profile"
              type="text"
              placeholder="Enter your LinkedIn profile URL"
              {...register("linkedProfile", { required: true })}
            />
          </div>

          {/* Portfolio */}
          <div className="mb-4">
            <FormInput
              label="Personal Website/Portfolio"
              type="text"
              placeholder="Enter your personal website or portfolio URL"
              {...register("portfolio")}
            />
          </div>

          {/* Social Media Selection and Link */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
            <div className="w-full md:w-1/3">
              <label className="block font-medium text-primary-dark mb-1">
                Other Social Media
              </label>
              <select
                {...register("socialMedia", { required: true })}
                className="w-full bg-gray-50 py-4 px-4 border border-[#c2c2c2] rounded"
              >
                <option value="" disabled hidden>
                  Select a platform
                </option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="X">X</option>
              </select>
            </div>
            <div className="w-full md:w-2/3">
              <FormInput
                label="Social Media URL"
                type="text"
                placeholder="Enter other social media profile URL"
                {...register("socialMediaLink")}
              />
            </div>
          </div>

          <Button
                        type="submit"
            text="Next"
            icon="arrow-right"
            action="submit"
            bgColor="#28C76F"
          />
        </form>
      </div>
    </div>
  );
}
