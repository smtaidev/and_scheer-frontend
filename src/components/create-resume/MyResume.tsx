"use client";

import Link from "next/link";
import SectionHeader from "../shared/SectionHeader";
import ResumeComponent from "./ui/ResumeComponent";
import Button from "../shared/button/Button";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Cookies from "js-cookie";

// Adjust path if different

export default function MyResume({ userId }: { userId: string | null }) {
  const printRef = useRef<HTMLDivElement>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const downloadResume = async () => {
    const element = printRef.current;
    if (!element) {
      return;
    }


    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("my_resume.pdf");
  };
  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    setIsLoading(true);
    const fetchUserProfile = async () => {
      if (!userId && !storedUserId) return;
      const idToUse = userId || storedUserId;
      try {
        const response = await fetch(`http://172.252.13.71:5005/api/v1/profiles/resume/${idToUse}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`, // Use Cookies.get if using cookies
          } // if using HttpOnly cookie
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        console.log("Fetched User Profile Data:", data);
        if (!data.success) {
          throw new Error(data.message || "Failed to fetch user profile");
        }
        console.log("User Profile Data:", data);
        setProfileData(data.data || {});
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsLoading(false);
      }
    }
    fetchUserProfile();

  }, [storedUserId]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-medium text-gray-600">Loading your resume...</p>
      </div>
    );
    
  }
  return (
    <div className="flex justify-center mt-12 h-full">
      <div className="p-6 w-full max-w-[1180px]">
        <SectionHeader
          title="Review Your AI-Generated Resume"
          description="Take a moment to review your resume. You can make changes and regenerate if needed. When you’re ready, download it and start applying!"
        ></SectionHeader>
        {profileData && <ResumeComponent downloadResume={downloadResume} printRef={printRef} profileData={profileData} />}
        <div className="flex gap-12 py-16 ">
          <button
            onClick={downloadResume}
            className="w-full bg-[#DBDBDB] text-black  py-3 px-6 rounded-lg hover:bg-gray-200 transition  font-medium"
            name="Download Resume"
          >
            Download Resume
          </button>

          <Link href={"/jobSeeker/home"} className="w-full">
            <Button name="Find Your Favorite Job">
              Find Your Favorite Job
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
