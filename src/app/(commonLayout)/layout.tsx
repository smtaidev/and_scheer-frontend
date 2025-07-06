import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

const navitem = [
  { name: "Home", href: "#" },
  { name: "For Job Seekers", href: "/jobseekeruser/jobSeekerHome" },
  { name: "For Employers", href: "#" },
  { name: "Course", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {" "}
      <Navbar navItem={navitem}></Navbar>
      {children}
    </div>
  );
}
