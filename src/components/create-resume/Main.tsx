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

    linkedInProfileUrl: "",
    personalWebsiteUrl: "",
    otherSocialMedia: "",
    otherSocialMediaUrl: "",

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
    education: formData.education.map((edu: any) => ({
      degree: edu.degree,
      school: edu.institution,
      major: edu.major,
      start_year: edu.startDate,
      end_year: edu.endDate,
      achievements: edu.achievements || []
    })),

    experiences: formData.experiences.map((exp: any) => ({
      job_title: exp.jobTitle,
      company_name: exp.companyName,
      start_date: exp.startDate,
      end_date: exp.endDate,
      job_description: exp.jobDescription,
      skills: exp.skills || [],
      achievements: exp.achievements || []
    })),
    certificates: formData.certificates.map((cert: any) => ({
      name: cert.certificateTitle,
      issuingOrganization: cert.issuingOrganization,
      year: cert.certificateIssuedDate,
      certificateExpiryDate: cert.certificateExpiryDate || null
    })),
    linkedin_profile_url: formData.linkedInProfileUrl,
    personal_website_url: formData.personalWebsiteUrl,
    other_social_media: formData.otherSocialMedia || "",
    other_social_media_url: formData.otherSocialMediaUrl || "",

  };


  const onSubmit = async () => {

    try {
      const sendForm = new FormData();

      // 🔄 Append dynamic profile data
      sendForm.append("data", JSON.stringify(profileData));


      // 🚀 Send request
      const res = await fetch("http://localhost:5005/api/v1/profiles/create", {
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
