/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import Loading from "@/components/Others/Loading";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AboutSection from "@/components/profile/AboutSection";
import ExperienceSection from "@/components/profile/Experience";
import SkillsSection from "@/components/profile/SkillsSection";
import EducationSection from "@/components/profile/EducationSection";
import ContactInfoProfile from "@/components/profile/Contact_info";

const ProfilePage: React.FC = () => {
  const [bioLoading, setBioLoading] = useState(false);

  const updateProfileData = async (data: any) => {
    console.log(data);

    const formData = new FormData();
  };

  return (
    <div className="max-w-6xl my-20 mx-auto px-4 section-gap bg-white">
      <ProfileHeader />

      <div className="space-y-12 mt-8">
        <AboutSection />

        <ExperienceSection experiences={[]} />

        <SkillsSection
          skills={[]}
          onSkillsUpdate={(skills) => updateProfileData("skills")}
        />

        <EducationSection education={[]} />
        <ContactInfoProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
