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
import AboutModal from "@/components/profile/modal/HeadAboutModal";

type ProfileSection = "bio" | "skills" | "profilePicture" | "resume";

const ProfilePage: React.FC = () => {
  // const { user, isLoading } = useAuthUser();

  // const [updateUser] = useUpdateUserMutation();

  const [bioLoading, setBioLoading] = useState(false);
  // Function to update profile data locally AND send to server
  const updateProfileData = async (section: ProfileSection, data: any) => {
    console.log(section, data);
    // Update local state optimistically
    const formData = new FormData();

    // if (section === "profilePicture") {
    //   if (data) {
    //     formData.append("profilePicture", data);
    //     // Only send what's needed
    //     // formData.append("bodyData", JSON.stringify({}));
    //   }
    // } else if (section === "resume") {
    //   if (data) {
    //     formData.append("resume", data);
    //     // formData.append("bodyData", JSON.stringify({}));
    //   }
    // } else if (section === "bio") {
    //   setBioLoading(true);
    //   formData.append(
    //     "bodyData",
    //     JSON.stringify({
    //       about: { bio: data },
    //     })
    //   );
    // } else if (section === "skills") {
    //   formData.append(
    //     "bodyData",
    //     JSON.stringify({
    //       about: { skills: data },
    //     })
    //   );
    // }

    // Send the update request
    // try {
    //   const res = await updateUser({ formData: formData });

    //   if (res.data?.success) {
    //     toast.success(`${section.toLocaleUpperCase()} updated successfully!`);
    //   } else {
    //     toast.error(`Failed to update ${section}`);
    //   }
    // } catch (error) {
    //   console.error(`Failed to update ${section}:`, error);
    //   toast.error(`Failed to update ${section}`);
    // } finally {
    //   setBioLoading(false); // Always runs regardless of success/failure
    // }
  };

  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <div className="max-w-6xl my-20 mx-auto px-4 section-gap bg-white">
      <ProfileHeader />

      <div className="space-y-12 mt-8">
        <AboutSection
          bio={"deome"}
          onBioUpdate={(bio) => updateProfileData("bio", bio)}
          loading={bioLoading}
        />

        <ExperienceSection experiences={[]} />

        <SkillsSection
          skills={[]}
          onSkillsUpdate={(skills) => updateProfileData("skills", skills)}
        />

        <EducationSection education={[]} />
        <ContactInfoProfile />
        <AboutModal />

        {/* <ResumeSection
          resume={user?.about?.resume ?? ""}
          onResumeUpdate={(resume) => updateProfileData("resume", resume)}
        /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
