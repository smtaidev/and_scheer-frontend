import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";


  const navitem = [
    { name: "Home", href: "/" },
    { name: "For Job Seekers", href: "/jobSeeker/start-now" },
    { name: "For Employers", href: "#employers" },
    { name: "Course", href: "#course" },
    { name: "Pricing", href: "#pricing" },
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
