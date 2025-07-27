"use client";
import { useState } from "react";
import Container from "../ui/Container";
import ProgressBar from "../ui/progressBar";
import CareerOverview from "./CareerOverview";
import ContactInfo from "./ContactInfo";
import Education from "./EducationCertificate";
import GenerateResume from "./GenerateResume";
import MyResume from "./MyResume";
import PersonalInformation from "./personalInfo";
import SkillsExperience from "./SkillnExp";

const MainComponents = () => {
  const [step, setStep] = useState(1);
  const [formData, setNewForm] = useState({})

  const setFormData = (newData: any) => {
    setNewForm((prevFormData) => ({
      ...prevFormData,
      ...newData
    }));
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
        {step === 6 && <GenerateResume setStep={setStep} />}
        {step === 7 && <MyResume />}
      </div>
    </Container>
  );
};

export default MainComponents;
