import React, { useState } from "react";
import { Plus } from "lucide-react";
import SkillsAddModal from "./modal/SkillsAddModal";

interface JobExperience {
  title: string;
  company: string;
  date: string;
  description: string;
  hugs?: number | null;
  ExperienceNumber: string;
  skills: string
}

export interface ProfileData {
  jobExperience: JobExperience[];
  skills: string[]; // Add skills directly in ProfileData
}

interface SkillsSectionProps {
  skills: string[];
  onSkillsUpdate: (skills: string[]) => void;
  profileData?: ProfileData;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onSkillsUpdate,
  profileData
}) => {
  // const [newSkill, setNewSkill] = useState("");
  // const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const handleAddSkill = () => {
  //   if (!newSkill.trim()) return;

  //   // Check if skill already exists
  //   if (skills.includes(newSkill.trim())) {
  //     alert("This skill already exists in your profile");
  //     return;
  //   }

  //   onSkillsUpdate([...skills, newSkill.trim()]);
  //   setNewSkill("");
  //   setIsAdding(false);
  // };

  // const handleRemoveSkill = (skillToRemove: string) => {
  //   onSkillsUpdate(skills.filter((skill) => skill !== skillToRemove));
  // };

  // const [newSkill, setNewSkill] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const handleAddSkill = () => {
  //   if (!newSkill.trim()) return;

  //   // Check if skill already exists
  //   if (skills.includes(newSkill.trim())) {
  //     alert("This skill already exists in your profile");
  //     return;
  //   }

  //   onSkillsUpdate([...skills, newSkill.trim()]); // Update skills
  //   setNewSkill("");
  // };

  // Combine skills from profileData.skills and job experiences
  // const allSkills = [
  //   ...new Set([
  //     ...(profileData?.skills || []),
  //     ...(profileData?.jobExperience?.flatMap((job: any) => job.skills) || [])
  //   ])
  // ];

  const allSkills = [
    ...new Set([
      ...(profileData?.skills || []),
      ...(profileData?.jobExperience?.flatMap((job: any) =>
        job.skills ? job.skills.split(',').map((s: string) => s.trim()) : []
      ) || [])
    ])
  ].filter(skill => skill && skill.trim() !== ''); // Filter out empty/null skills

  const handleAddSkill = (newSkill: string) => {
    if (!newSkill.trim()) return;

    // Check if skill already exists
    if (allSkills.includes(newSkill.trim())) {
      alert("This skill already exists in your profile");
      return;
    }

    // Update skills
    onSkillsUpdate([...allSkills, newSkill.trim()]);
  };

  return (
    <section>
      <div>
        <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
          <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
            Skills
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-3 space-x-4 pb-4">
          {/* {
            // Flattening skills from all job experiences and rendering unique skills
            [...new Set(profileData?.jobExperience?.flatMap((job: any) => job.skills) || [])] // TypeScript type assertion
              .map((skill: string, index: number) => (
                <button
                  key={index}
                  className="px-6 py-2 bg-gray-100 text-secondary rounded-full shadow hover:bg-gray-200"
                >
                  {skill}
                </button>
              ))
          } */}

          {
            // Combine skills from both profileData.skills and job experiences
            [...new Set([
              ...(profileData?.skills || []), // Include profile-level skills
              ...(profileData?.jobExperience?.flatMap((job) => job?.skills as string || []) || []) // Include job skills
            ])]
              .filter(skill => skill) // Filter out any empty/null/undefined skills
              .map((skill) => (
                <button
                  key={skill} // Use skill as key since it's unique
                  className="px-6 py-2 bg-gray-100 text-secondary rounded-full shadow hover:bg-gray-200"
                >
                  {skill}
                </button>
              ))
          }
        </div>
      </div>

      {/* <SkillsAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}

      /> */}

      <SkillsAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onAddSkill={handleAddSkill}
      />
    </section>
  );
};

export default SkillsSection;















































// import React, { useState } from "react";
// import { Plus, X, Wrench } from "lucide-react";
// import SkillsAddModal from "./modal/SkillsAddModal";

// export interface JobExperience {
//   achievements: string[];
//   company_name: string;
//   end_date: string;
//   job_description: string;
//   job_title: string;
//   skills: string[];
//   start_date: string;
//   education?: Education;
// }

// type Education = {
//   institution_name?: string;
//   degree?: string;
//   startDate?: string;
//   endDate?: string;
//   major?: string;
// };

// export interface ProfileData {
//   jobExperience: JobExperience[];
// }

// interface SkillsSectionProps {
//   skills: string[];
//   onSkillsUpdate: (skills: string[]) => void;
//   profileData?: ProfileData;
// }


// // interface SkillsSectionProps {
// //   skills: string[];
// //   onSkillsUpdate: (skills: string[]) => void;
// //   profileData?: string
// // }

// const SkillsSection: React.FC<SkillsSectionProps> = ({
//   skills,
//   onSkillsUpdate,
//   profileData
// }) => {
//   const [newSkill, setNewSkill] = useState("");
//   const [isAdding, setIsAdding] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   const handleAddSkill = () => {
//     if (!newSkill.trim()) return;

//     // Check if skill already exists
//     if (skills.includes(newSkill.trim())) {
//       alert("This skill already exists in your profile");
//       return;
//     }

//     onSkillsUpdate([...skills, newSkill.trim()]);
//     setNewSkill("");
//     setIsAdding(false);
//   };

//   const handleRemoveSkill = (skillToRemove: string) => {
//     onSkillsUpdate(skills.filter((skill) => skill !== skillToRemove));
//   };

//   return (
//     <section>
//       <div>
//         <div className="flex items-center justify-between mb-4 border-b border-[#ccc] pb-3">
//           <h2 className="lg:text-4xl md:text-2xl text-xl font-medium flex items-center gap-1">
//             Skills
//           </h2>
//           <button
//             className="text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors duration-300"
//             onClick={() => setIsModalOpen(true)}
//           >
//             <Plus className="w-4 h-4" />
//             <span className="text-sm">Add</span>
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-3 space-x-4 pb-4">
//           {
//             // Flattening skills from all job experiences and rendering unique skills
//             [...new Set(profileData?.jobExperience?.flatMap((job: any) => job.skills) || [])]
//               .map((skill: string, index: number) => (
//                 <button
//                   key={index}
//                   className="px-6 py-2 bg-gray-100 text-secondary rounded-full shadow hover:bg-gray-200"
//                 >
//                   {skill}
//                 </button>
//               ))
//           }

//         </div>
//       </div>

//       <SkillsAddModal
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//       />
//     </section>
//   );
// };

// export default SkillsSection;
