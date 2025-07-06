import AboutUs from "@/components/AboutUs";
import Banner from "@/components/Banner";
import ChooseUs from "@/components/ChooseUs";
import EmployerPlan from "@/components/EmployerPlan";
import Footer from "@/components/Footer";
import JobSeekerPlan from "@/components/JobSeekerPlan";
import Newsletter from "@/components/NewsLetter";
import PerfectJob from "@/components/Perfectjob";
import RecentJob from "@/components/recent-job/RecentJob";
import ScrollTop from "@/components/shared/ScrollTop";
import SuggestedCourses from "@/components/Suggested/SuggestedCourses";
import TopTalent from "@/components/TopTalent";

const page = () => {
  return (
    <div className="black-main relative">
      <Banner></Banner>
      <RecentJob title={"Recent Job"}></RecentJob>

      <ChooseUs></ChooseUs>
      <AboutUs></AboutUs>
      <PerfectJob></PerfectJob>
      <TopTalent></TopTalent>
      <SuggestedCourses></SuggestedCourses>
      <JobSeekerPlan />
      <EmployerPlan></EmployerPlan>
      <Newsletter />
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default page;
