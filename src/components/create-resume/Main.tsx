"use client";
import React, { useEffect, useState } from "react";
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

const MainComponents = () => {
  const [step, setStep] = useState(1);
const [formData,setNewForm ] = useState({})

 const setFormData = (newData: any) => {
    setNewForm((prevFormData) => ({
      ...prevFormData,
      ...newData
    }));
  };

useEffect(()=>{
     if(formData){
      localStorage.setItem("formData",JSON.stringify(formData))
     }
},[formData])


  console.log(formData)
  return (
    <Container>
      <div className=" px-2">
        <ProgressBar currentStep={step} totalSteps={7} />
        {step === 1 && <PersonalInformation setStep={setStep} formData={formData} setFormData={setFormData} />}
        {step === 2 && <CareerOverview setStep={setStep} formData={formData} setFormData={setFormData}/>}
        {step === 3 && <SkillsExperience setStep={setStep} formData={formData} setFormData={setFormData}/>}
        {step === 4 && <Education setStep={setStep} formData={formData} setFormData={setFormData}/>}
        {step === 5 && <ContactInfo setStep={setStep} formData={formData} setFormData={setFormData}/>}
        {step === 6 && <GenerateResume setStep={setStep} />}
        {step === 7 && <MyResume />}
      </div>
    </Container>
  );
};

export default MainComponents;
