"use client";
import Logo from "@/components/ui/MainLogo";
import SearchSection from "@/components/ui/SearchSection";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaDownload,
  FaBriefcase,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";

import { FiMenu, FiX } from "react-icons/fi"; // For modern icons
import { LuUser } from "react-icons/lu";
import { toast } from "sonner";

type NavItem = {
  name: string;
  href: string;
};

type NavbarProps = {
  navItem: NavItem[];
};

export default function Navbar({ navItem }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [user, setUser] = useState<string | null>(null);

  // const [searchView, setSearchView] = useState(false)

  const MenuItem = ({
    icon,
    label,
    active = false,
    danger = false,
    logoutBtn,
  }: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    danger?: boolean;
    logoutBtn?: () => void;
  }) => (
    <div
      onClick={logoutBtn}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition
      ${active ? "  font-medium" : ""}
      ${danger ? "text-red-500 hover:bg-red-100" : "hover:bg-gray-100"}`}
    >
      <div className="text-xl">{icon}</div>
      <span>{label}</span>
    </div>
  );

  const navItems = [
    { name: "Home", href: "/" },
    { name: "For Job Seekers", href: "/jobSeeker/start-now" },
    { name: "For Employers", href: "#employers" },
    { name: "Course", href: "#course" },
    { name: "Pricing", href: "#pricing" },
  ];

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    let access: string | null = localStorage.getItem("accessToken");
    setUser(access);
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, user]);

  const handleSearch = () => {
    console.log("first");

    setAnimate(!animate);
  };

  // logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setShowMenu(false);
    toast.success("Logged out successfully");
  };

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center space-x-2">
            {/* <img src="/mainlogo.png" alt="Logo" className="h-[40px] w-auto" /> */}
            <Logo width={153} height={72} />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center text-sm font-medium text-gray-700">
          <button
            onClick={() => handleSearch()}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded hover:bg-neutral-900 transition whitespace-nowrap cursor-pointer"
          >
            <FaSearch />
            Search
          </button>
          <span className="w-0.5 h-6 bg-gray-300 inline-block"></span>
          {navItems?.map((item, index) => (
            <React.Fragment key={item.name}>
              <Link
                href={item.href}
                className="hover:text-primary hover:underline transition-colors duration-200 "
              >
                {item.name}
              </Link>

              {index < navItems.length - 1 && (
                <span className="w-0.5 h-6 bg-gray-300 inline-block"></span>
              )}
            </React.Fragment>
          ))}

          {/* <Image
            src={"src"}
            alt={"alt"}
            width={60}
            height={60}
            className="rounded-full object-cover"
          /> */}

          <div className="relative">
            <button onClick={toggleMenu}>
              <LuUser className="size-9 bg-primary hover:bg-green-700 transition-all duration-300 cursor-pointer rounded-full p-2 text-white" />
            </button>

            {showMenu && (
              <div className="absolute top-12 right-0 bg-white  rounded-md p-3 min-w-[120px] z-50">
                {user ? (
                  // <button
                  //   onClick={() => setShowMenu(false)}
                  //   className="w-full text-left hover:text-main-green">Profile</button>
                  <div onClick={() => setShowMenu(false)}>
                    <div className="w-72 bg-white shadow-lg rounded-xl p-4 space-y-2">
                      <MenuItem icon={<FaUser />} label="My Profile" />
                      <MenuItem
                        icon={<FaDownload />}
                        label="Download My Resume"
                        active
                      />
                      <MenuItem icon={<FaBriefcase />} label="Applied Job" />
                      <MenuItem
                        icon={<FaSignOutAlt />}
                        label="Log Out"
                        danger
                        logoutBtn={handleLogout}
                      />
                    </div>
                  </div>
                ) : (
                  <Link
                    onClick={() => setShowMenu(false)}
                    href={"/signIn"}
                    className="w-full text-left hover:text-main-green"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <FiX className="w-6 h-6" />
          ) : (
            <FiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-gray-700 hover:text-main-green font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="relative">
            <button onClick={toggleMenu}>
              <LuUser className="size-9 bg-primary hover:bg-green-700 transition-all duration-300 cursor-pointer rounded-full p-2 text-white" />
            </button>

            {showMenu && (
              <div className="absolute -top-2 left-10 bg-white shadow-lg rounded-md p-3 min-w-[120px] z-50">
                {user ? (
                  // <Link
                  //   onClick={() => setShowMenu(false)}
                  //   href={"/profile"} className="w-full text-left hover:text-main-green">Profile</Link>
                  <div onClick={() => setShowMenu(false)}>
                    <div className="w-72 bg-white shadow-lg rounded-xl p-4 space-y-2">
                      <MenuItem icon={<FaUser />} label="My Profile" />
                      <MenuItem
                        icon={<FaDownload />}
                        label="Download My Resume"
                        active
                      />
                      <MenuItem icon={<FaBriefcase />} label="Applied Job" />
                      <MenuItem
                        icon={<FaSignOutAlt />}
                        label="Log Out"
                        danger
                        logoutBtn={handleLogout}
                      />
                    </div>
                  </div>
                ) : (
                  <Link
                    onClick={() => setShowMenu(false)}
                    href={"/login"}
                    className="w-full text-left hover:text-main-green"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {animate && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-40 z-5 transition-opacity duration-300"
          onClick={handleSearch} // Optional: click backdrop to close
        ></div>
      )}

      <div
        className={`
        absolute bg-white border-t-2 border-gray-400 w-full py-12 
        transform transition-all duration-500 ease-out z-10
        ${animate ? "translate-y-0 opacity-100" : "-translate-y-80 opacity-0"}
      `}
      >
        <SearchSection />
      </div>
    </nav>
  );
}
