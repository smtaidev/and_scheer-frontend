
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   // Personal & Contact Information
//   personalInfo: {
//     phoneNumber: '',
//     countryRegion: '',
//     address: '',
//     city: '',
//     state: '',
//     zipCode: ''
//   },

//   // Recent Job Information
//   recentJob: {
//     recentJobTitle: '',
//     jobExplanation: ''
//   },

//   // Work Experience
//   workExperience: {
//     jobTitle: '',
//     CompanyName: '',
//     startDate: '',
//     endDate: '',
//     jobDescription: ''
//   },

//   // Skills
//   skills: [],

//   // Education
//   education: {
//     degree: '',
//     institutionName: '',
//     major: '',
//     graduationStartDate: '',
//     graduationEndDate: ''
//   },

//   // Certification
//   certification: {
//     certificateTitle: '',
//     issuingOrganization: '',
//     certificateIssuedDate: '',
//     certificateExpiryDate: ''
//   },

//   // Social Media & Portfolio
//   socialMedia: {
//     linkedInProfileUrl: '',
//     personalWebsiteUrl: '',
//     otherSocialMedia: '',
//     otherSocialMediaUrl: ''
//   },

//   // File uploads (stored temporarily)
//   files: {
//     achievementFiles: [],
//     graduationCertificateFiles: []
//   },

//   // UI State
//   currentStep: 0,
//   totalSteps: 7,
  
//   // Form validation
//   validationErrors: {},
  
//   // Auto-save
//   lastSaved: null,
//   hasUnsavedChanges: false,
  
//   // Current resume ID (for editing)
//   currentResumeId: null,
//   isEditMode: false
// };

// const resumeSlice = createSlice({
//   name: 'resume',
//   initialState,
//   reducers: {
//     // Personal Info
//     updatePersonalInfo: (state, action) => {
//       state.personalInfo = { ...state.personalInfo, ...action.payload };
//       state.hasUnsavedChanges = true;
//     },

//     // Recent Job
//     updateRecentJob: (state, action) => {
//       state.recentJob = { ...state.recentJob, ...action.payload };
//       state.hasUnsavedChanges = true;
//     },

//     // Work Experience
//     updateWorkExperience: (state, action) => {
//       state.workExperience = { ...state.workExperience, ...action.payload };
//       state.hasUnsavedChanges = true;
//     },

//     // Skills management
//     updateSkills: (state, action) => {
//       state.skills = action.payload;
//       state.hasUnsavedChanges = true;
//     },
//     addSkill: (state, action) => {
//       if (!state.skills.includes(action.payload)) {
//         state.skills.push(action.payload);
//         state.hasUnsavedChanges = true;
//       }
//     },
//     removeSkill: (state, action) => {
//       state.skills = state.skills.filter((_, index) => index !== action.payload);
//       state.hasUnsavedChanges = true;
//     },

//     // Education
//     updateEducation: (state, action) => {
//       state.education = { ...state.education, ...action.payload };
//       state.hasUnsavedChanges = true;
//     },

//     // Certification
//     updateCertification: (state, action) => {
//       state.certification = { ...state.certification, ...action.payload };
//       state.hasUnsavedChanges = true;
//     },

//     // Social Media
//     updateSocialMedia: (state, action) => {
//       state.socialMedia = { ...state.socialMedia, ...action.payload };
//       state.hasUnsavedChanges = true;
//     },

//     // File management
//     setAchievementFiles: (state, action) => {
//       state.files.achievementFiles = action.payload;
//       state.hasUnsavedChanges = true;
//     },
//     addAchievementFile: (state, action) => {
//       state.files.achievementFiles.push(action.payload);
//       state.hasUnsavedChanges = true;
//     },
//     removeAchievementFile: (state, action) => {
//       state.files.achievementFiles = state.files.achievementFiles.filter(
//         (_, index) => index !== action.payload
//       );
//       state.hasUnsavedChanges = true;
//     },

//     setGraduationCertificateFiles: (state, action) => {
//       state.files.graduationCertificateFiles = action.payload;
//       state.hasUnsavedChanges = true;
//     },
//     addGraduationCertificateFile: (state, action) => {
//       state.files.graduationCertificateFiles.push(action.payload);
//       state.hasUnsavedChanges = true;
//     },
//     removeGraduationCertificateFile: (state, action) => {
//       state.files.graduationCertificateFiles = state.files.graduationCertificateFiles.filter(
//         (_, index) => index !== action.payload
//       );
//       state.hasUnsavedChanges = true;
//     },

//     // Navigation
//     setCurrentStep: (state, action) => {
//       state.currentStep = action.payload;
//     },
//     nextStep: (state) => {
//       if (state.currentStep < state.totalSteps - 1) {
//         state.currentStep += 1;
//       }
//     },
//     prevStep: (state) => {
//       if (state.currentStep > 0) {
//         state.currentStep -= 1;
//       }
//     },

//     // Validation
//     setValidationErrors: (state, action) => {
//       state.validationErrors = action.payload;
//     },
//     clearValidationErrors: (state) => {
//       state.validationErrors = {};
//     },

//     // Auto-save tracking
//     setLastSaved: (state, action) => {
//       state.lastSaved = action.payload;
//       state.hasUnsavedChanges = false;
//     },
    
//     // Resume management
//     setCurrentResumeId: (state, action) => {
//       state.currentResumeId = action.payload;
//       state.isEditMode = !!action.payload;
//     },
    
//     // Load resume data
//     loadResumeData: (state, action) => {
//       const { personalInfo, recentJob, workExperience, skills, education, certification, socialMedia } = action.payload;
//       if (personalInfo) state.personalInfo = personalInfo;
//       if (recentJob) state.recentJob = recentJob;
//       if (workExperience) state.workExperience = workExperience;
//       if (skills) state.skills = skills;
//       if (education) state.education = education;
//       if (certification) state.certification = certification;
//       if (socialMedia) state.socialMedia = socialMedia;
//       state.hasUnsavedChanges = false;
//     },

//     // Reset form
//     resetResume: (state) => {
//       return { ...initialState };
//     },
//   }
// });

// // Selector to get complete resume data in API format
// export const selectCompleteResumeData = (state) => {
//   const resume = state.resume;
//   return {
//     phoneNumber: resume.personalInfo.phoneNumber,
//     countryRegion: resume.personalInfo.countryRegion,
//     address: resume.personalInfo.address,
//     city: resume.personalInfo.city,
//     state: resume.personalInfo.state,
//     zipCode: resume.personalInfo.zipCode,
//     recentJobTitle: resume.recentJob.recentJobTitle,
//     jobExplanation: resume.recentJob.jobExplanation,
//     jobTitle: resume.workExperience.jobTitle,
//     CompanyName: resume.workExperience.CompanyName,
//     startDate: resume.workExperience.startDate,
//     endDate: resume.workExperience.endDate,
//     jobDescription: resume.workExperience.jobDescription,
//     skills: resume.skills,
//     degree: resume.education.degree,
//     institutionName: resume.education.institutionName,
//     major: resume.education.major,
//     graduationStartDate: resume.education.graduationStartDate,
//     graduationEndDate: resume.education.graduationEndDate,
//     certificateTitle: resume.certification.certificateTitle,
//     issuingOrganization: resume.certification.issuingOrganization,
//     certificateIssuedDate: resume.certification.certificateIssuedDate,
//     certificateExpiryDate: resume.certification.certificateExpiryDate,
//     linkedInProfileUrl: resume.socialMedia.linkedInProfileUrl,
//     personalWebsiteUrl: resume.socialMedia.personalWebsiteUrl,
//     otherSocialMedia: resume.socialMedia.otherSocialMedia,
//     otherSocialMediaUrl: resume.socialMedia.otherSocialMediaUrl
//   };
// };

// export const {
//   updatePersonalInfo,
//   updateRecentJob,
//   updateWorkExperience,
//   updateSkills,
//   addSkill,
//   removeSkill,
//   updateEducation,
//   updateCertification,
//   updateSocialMedia,
//   setAchievementFiles,
//   addAchievementFile,
//   removeAchievementFile,
//   setGraduationCertificateFiles,
//   addGraduationCertificateFile,
//   removeGraduationCertificateFile,
//   setCurrentStep,
//   nextStep,
//   prevStep,
//   setValidationErrors,
//   clearValidationErrors,
//   setLastSaved,
//   setCurrentResumeId,
//   loadResumeData,
//   resetResume
// } = resumeSlice.actions;

// export default resumeSlice.reducer;
