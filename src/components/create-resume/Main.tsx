"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import ProgressBar from "../ui/progressBar";
import CareerOverview from "./CareerOverview";
import ContactInfo from "./ContactInfo";
import Education from "./EducationCertificate";
import GenerateResume from "./GenerateResume";
import MyResume from "./MyResume";
import Cookies from "js-cookie";
import PersonalInformation from "./personalInfo";
import SkillsExperience from "./SkillnExp";

const MainComponents = () => {
  const [step, setStep] = useState(1);

  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setNewForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",

    jobTitle: "",
    jobDescription: "",

    linkedin_profile_url: "",
    personal_website_url: "",
    other_social_media: "",
    other_social_media_url: "",
    skills: [], // e.g. ["JavaScript", "React", "Node.js"]

    education: [], // e.g. [{ degree: "BSc", institution: "XYZ University", major: "",  startDate: "2020-01-01", endDate: "2024-01-01", achievements: [] }]
    experiences: [], // e.g. [{ jobTitle: "Software Engineer", companyName: "ABC Corp", startDate: "2020-01-01", endDate: "2024-01-01", jobDescription: "Developed web applications.", skills: ["JavaScript", "React"], achievements: [{}] }]
    certificates: [] // e.g. [{ certificateTitle: "AWS Certified", issuingOrganization: "Amazon", certificateIssuedDate: "2023-01-01", certificateExpiryDate: "2025-01-01" }]

  });

  const achievementRef = useRef<HTMLInputElement>(null);
  const certificateRef = useRef<HTMLInputElement>(null);
  const setFormData = (newData: any) => {
    setNewForm((prevFormData) => ({
      ...prevFormData,
      ...newData
    }));
  };

  useEffect(() => {
    if (formData) {
      localStorage.setItem("formData", JSON.stringify(formData))
    }
  }, [formData])



  const profileData = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    phone_number: formData.phone,
    email_address: formData.email,
    country_region: formData.country,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    zip_code: formData.zip,
    recent_job_title: formData.jobTitle,
    job_explanation: formData.jobDescription,
    // skills: formData.experiences.flatMap((exp: any) => exp.skills || []),

    education: formData.education.map((edu: any) => ({
      degree: edu.degree,
      institution_name: edu.institution,
      major: edu.major,
      graduation_start_date: edu.startDate,
      graduation_end_date: edu.endDate,
      achievements: edu.achievements || []
    })),

    experiences: formData.experiences.map((exp: any) => ({
      job_title: exp.jobTitle,
      company_name: exp.companyName,
      start_date: exp.startDate,
      end_date: exp.endDate,
      job_description: exp.jobDescription,
      achievements: exp.achievements || []
    })),
    skills: formData.experiences.flatMap((ex: any) => ex.skills || []), // Flattens all skills into a single array

    certifications: formData.certificates?.map((cert: any) => ({
      certification_title: cert.certificateTitle,
      issuing_organization: cert.issuingOrganization,
      certification_issue_date: cert.certificateIssuedDate,
      certification_expiry_date: cert.certificateExpiryDate || null
    })),
    linkedin_profile_url: formData.linkedin_profile_url,
    personal_website_url: formData.personal_website_url,
    other_social_media: formData.other_social_media || "",
    other_social_media_url: formData.other_social_media_url || "",

  };
  console.log("profileData in MainComponents:", profileData);


  const onSubmit = async () => {

    try {
      const sendForm = new FormData();

      // 🔄 Append dynamic profile data
      sendForm.append("data", JSON.stringify(profileData));


      // 🚀 Send request
      const res = await fetch("http://172.252.13.71:5005/api/v1/profiles/create", {
        method: "POST",
        body: sendForm,
        // credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`, // Use Cookies.get if using cookies
        } // if using HttpOnly cookie
      });

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to create profile");
      }
      setUserId(result?.data?.profile?.user_id); // Assuming the response contains the user ID
      localStorage.setItem("userId", result?.data?.profile?.profileId || "");

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <div className=" px-2">
        <ProgressBar currentStep={step} totalSteps={7} />
        {step === 1 && <PersonalInformation setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 2 && <CareerOverview setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 3 && <SkillsExperience setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 4 && <Education setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 5 && <ContactInfo setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 6 && <GenerateResume setStep={setStep} onSubmit={onSubmit} />}
        {step === 7 && <MyResume userId={userId} />}
      </div>
    </Container>
  );
};

export default MainComponents;
