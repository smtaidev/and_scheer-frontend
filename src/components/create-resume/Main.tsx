"use client";
import React, { useEffect, useRef, useState } from "react";
import Container from "../ui/Container";
import ProgressBar from "../ui/progressBar";
import PersonalInformation from "./personalInfo";
import CareerOverview from "./CareerOverview";
import SkillsExperience from "./SkillnExp";
import EducationalBackground from "./EducationalBackground";
import ContactInfo from "./ContactInfo";
import GenerateResume from "./GenerateResume";
import MyResume from "./MyResume";
import Education from "./EducationCertificate";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

const MainComponents = () => {
  const [step, setStep] = useState(1);
  // const [formData,setNewForm ] = useState({})
  const [formData, setNewForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryRegion: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    recentJobTitle: "",
    jobExplanation: "",
    jobTitle: "",
    CompanyName: "",
    startDate: "",
    endDate: "",
    jobDescription: "",
    skills: [], // e.g. ["React", "TypeScript"]
    degree: "",
    institutionName: "",
    major: "",
    graduationStartDate: "",
    graduationEndDate: "",
    certificateTitle: "",
    issuingOrganization: "",
    certificateIssuedDate: "",
    certificateExpiryDate: null,
    linkedInProfileUrl: "",
    personalWebsiteUrl: "",
    otherSocialMedia: "",
    otherSocialMediaUrl: "",
    education: [], // e.g. [{ degree: "BSc", institution: "XYZ University", startDate: "2020-01-01", endDate: "2024-01-01" }]
    experiences: [] // e.g. [{ jobTitle: "Software Engineer", companyName:
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


  console.log("form Data", formData);

  const profileData = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    phoneNumber: formData.phoneNumber,
    countryRegion: formData.countryRegion,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    zipCode: formData.zipCode,
    // recentJobTitle: "Frontend Developer",
    // "jobExplanation": "Worked mainly on React.js and UI optimization.",
    jobTitle: formData.jobTitle,
    CompanyName: formData.CompanyName,
    startDate: formData.startDate,
    endDate: formData.endDate,
    jobDescription: formData.jobDescription,
    skills: formData.skills || [], // e.g. ["React", "TypeScript"]
    degree: formData.degree,
    institutionName: formData.institutionName,
    major: formData.major,
    education: formData.education || [], // e.g. [{ degree: "BSc", institution: "XYZ University", startDate: "2020-01-01", endDate: "2024-01-01" }]
    experiences: formData.experiences || [], // e.g. [{ jobTitle: "Software Engineer", companyName: "ABC Corp", startDate: "2020-01-01", endDate: "2024-01-01", jobDescription: "Developed web applications." }]
    graduationStartDate: formData.graduationStartDate,
    graduationEndDate: formData.graduationEndDate,
    certificateTitle: formData.certificateTitle,
    issuingOrganization: formData.issuingOrganization,
    certificateIssuedDate: formData.certificateIssuedDate,
    certificateExpiryDate: formData.certificateExpiryDate || null,
    linkedInProfileUrl: formData.linkedInProfileUrl,
    personalWebsiteUrl: formData.personalWebsiteUrl,
    otherSocialMedia: formData.otherSocialMedia || "",
    otherSocialMediaUrl: formData.otherSocialMediaUrl || "",

  };


  const onSubmit = async () => {
    console.log("profileData", profileData);
    
    // try {
    //   const sendForm = new FormData();

    //   // 🔄 Append dynamic profile data
    //   sendForm.append("data", JSON.stringify(profileData));

    //   // 📄 Append achievement file if selected
    //   if (achievementRef.current?.files?.[0]) {
    //     sendForm.append("achievementFiles", achievementRef.current.files[0]);
    //   }

    //   // 📄 Append graduation certificate file if selected
    //   if (certificateRef.current?.files?.[0]) {
    //     sendForm.append("graduationCertificateFiles", certificateRef.current.files[0]);
    //   }

    //   // 🚀 Send request
    //   const res = await fetch("http://localhost:5005/api/v1/profiles/create", {
    //     method: "POST",
    //     body: sendForm,
    //     // credentials: "include",
    //     headers: {
    //       Authorization: `Bearer ${Cookies.get("accessToken")}`, // Use Cookies.get if using cookies
    //     } // if using HttpOnly cookie
    //   });

    //   const result = await res.json();
    //   console.log("Profile created successfully!", result);

    // } catch (error) {
    //   console.error("Error:", error);
    // }
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
        {step === 7 && <MyResume />}
      </div>
    </Container>
  );
};

export default MainComponents;
