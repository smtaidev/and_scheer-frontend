/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import AboutSection from "@/components/profile/AboutSection";
import ExperienceSection from "@/components/profile/Experience";
import SkillsSection from "@/components/profile/SkillsSection";
import EducationSection from "@/components/profile/EducationSection";
import ContactInfoProfile from "@/components/profile/Contact_info";
import Container from "@/components/ui/Container";
import Cookies from "js-cookie";
const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          "http://172.252.13.71:5005/api/v1/profiles/get-my-profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`, // Use Cookies.get if using cookies
            }, // if using HttpOnly cookie
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        console.log("Fetched Profile Data:", data);
        if (!data || !data.data) {
          throw new Error("Invalid profile data format");
        }

        setProfileData(data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const updateProfileData = async (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <Container>
        <div className="max-w-6xl my-20 mx-auto px-4 section-gap bg-white">
          <ProfileHeader profileData={profileData} />

          <div className="space-y-12 mt-8">
            <AboutSection profileData={profileData} />

            <ExperienceSection experiences={[]} />

            <SkillsSection
              skills={[]}
              onSkillsUpdate={(skills) => updateProfileData("skills")}
            />

            <EducationSection education={[]} />
            <ContactInfoProfile />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
