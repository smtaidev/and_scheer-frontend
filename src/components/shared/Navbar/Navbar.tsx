"use client";
import Logo from "@/components/ui/MainLogo";
import SearchSection from "@/components/ui/SearchSection";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { 
  FaBriefcase, 
  FaDownload, 
  FaSearch, 
  FaSignOutAlt, 
  FaUser,
} from "react-icons/fa";
import { useGetMeQuery } from "@/redux/features/auth/auth";
import Cookies from "js-cookie";
import { X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { toast } from "sonner";
import { motion, AnimatePresence,easeInOut } from "framer-motion";


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
  const [isTrue, setIsTrue] = useState(false);
  const { data: me,refetch } = useGetMeQuery({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState<string | any>("");
  const [isLogned, setIsLogned] = useState<string | null>(null);
  const [searchView, setSearchView] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const hiddenMenuByClick = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        hiddenMenuByClick.current &&
        !hiddenMenuByClick.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const targetRoutes = ["/", "/jobSeeker/home", "/jobs"];
    if (targetRoutes.includes(pathname)) {
      setSearchView(true);
    } else {
      setSearchView(false);
    }
  }, [pathname]);

  const MenuItem = ({
    icon,
    label,
    active = false,
    danger = false,
    logoutBtn,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    danger?: boolean;
    logoutBtn?: () => void;
    onClick?: () => void;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={logoutBtn}
      className={`flex items-center gap-3  p-2 md:p-3 rounded-lg cursor-pointer transition  text-xs md:text-base${
        active ? "" : ""
      } ${
        danger ? "text-red-500 hover:bg-red-100" : "hover:bg-gray-100"
      }`}
    >
      {label === "Applied Job" ? (
        
        <Link className="flex gap-3" href="/jobSeeker/my-applications">
          <div className="text-xl">{icon}</div>
          <span>{label}</span>
        </Link>
      ) : label === "My Profile" ? (
        
          user?.role=="JOB_SEEKER" ? <> <Link className="flex gap-3" href="/jobSeeker/my-profile">
          <div className="text-xl">{icon}</div>
          <span>{label}</span>
        </Link></>:<> <Link className="flex gap-3" href="/my-profile">
          <div className="text-xl">{icon}</div>
          <span>{label}</span>
        </Link></>
        
       
      ) : label === "Download My Resume" ? (
        <Link className="flex gap-3" href="/jobSeeker/resume-download">
          <div className="text-xl">{icon}</div>
          <span>{label}</span>
        </Link>
      ) : (
        <>
          <div className="text-xl">{icon}</div>
          <span>{label}</span>
        </>
      )}
    </motion.div>
  );

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setIsLogned(accessToken);
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    if (me?.data) {
      setUser(me?.data);
    }
    refetch()
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu, me?.data]);

  const handleSearch = () => {
    console.log("first");
    setAnimate(!animate);
  };

  const handleLogout = () => {
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    localStorage.removeItem("accessToken");
    Cookies.remove("accessToken");
    setUser(null);
    setShowMenu(false);
    setShowDeleteModal(false);
    setIsLogned(null);
    toast.success("Logged out successfully");
    router.push("/");
  };

  // Animation variants for profile dropdown
  const profileVariants = {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };


const mobileMenuVariants = {
  hidden: { 
    height: 0,
    opacity: 0 
  },
  visible: { 
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easeInOut
    }
  },
  exit: { 
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easeInOut
    }
  }
};


  const filteredNavItems = navItem.filter((item) => {
      if (!user) {
      return item.name !== "For Job Seekers" && item.name !== "For Employers";
    }
    if (user?.role === "JOB_SEEKER" && item.name === "For Employers") {
      return false; // Hide "For Employers" for job seekers
    }
    if (user?.role === "EMPLOYEE" && item.name === "For Job Seekers") {
      return false; // Hide "For Employers" for employees
    }
    return true; // Keep all other items
  });


  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center space-x-2">
            <Logo width={153} height={72} />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 items-center text-sm font-medium text-gray-700">
          <button
            onClick={() => handleSearch()}
            className={`flex items-center gap-2 px-6 py-3 bg-primary text-white rounded hover:bg-neutral-900 transition whitespace-nowrap cursor-pointer ${
              searchView ? "hidden" : ""
            }`}
          >
            <FaSearch />
            Search
          </button>
          <span
            className={`w-0.5 h-6 bg-gray-300 ${
              searchView ? "hidden" : "inline-block"
            }`}
          ></span>
          {Array.isArray(filteredNavItems) &&
            filteredNavItems.map((item, index) => (
              <React.Fragment key={item.name}>
                <Link
                  href={item.href}
                  className="hover:text-primary hover:underline transition-colors duration-200"
                >
                  {item.name}
                </Link>
                {index < filteredNavItems.length - 1 && (
                  <span className="w-0.5 h-6 bg-gray-300 inline-block"></span>
                )}
              </React.Fragment>
            ))}

          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 cursor-pointer"
            >
              <p className="flex items-center hover:scale-105 transition-all duration-300">
                {isLogned ? (
                  <>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <LuUser className="size-9 bg-primary hover:bg-green-700 transition-all duration-300 cursor-pointer rounded-full p-2 text-white mr-2" />
                    </motion.div>
                    {user?.fullName}
                  </>
                ) : (
                  <Link
                    onClick={() => setShowMenu(false)}
                    href={"/signIn"}
                    className="w-full text-left hover:bg-green-600 bg-primary text-white rounded-md px-5 py-2 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                )}
              </p>
            </button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={profileVariants}
                  className="absolute top-12 -right-0 min-w-[120px] z-50"
                >
                  {isLogned ? (
                    <motion.div
                      onClick={() => setShowMenu(false)}
                      className="w-72 bg-white/80 backdrop-blur-xl shadow-md rounded-xl p-4 space-y-2 border border-gray-200"
                    >
                      <MenuItem icon={<FaUser />} label="My Profile" />
                      <div className="border-b border-gray-300 my-2"></div>
                      <MenuItem
                        icon={<FaDownload />}
                        label="Download My Resume"
                        active
                      />
                      <div className="border-b border-gray-300 my-2"></div>
                      <MenuItem icon={<FaBriefcase />} label="Applied Job" />
                      <div className="border-b border-gray-300 my-2"></div>
                      <MenuItem
                        icon={<FaSignOutAlt />}
                        label="Log Out"
                        danger
                        logoutBtn={handleLogout}
                        onClick={() => setShowDeleteModal(true)}
                      />
                    </motion.div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={hiddenMenuByClick}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden overflow-hidden"
          >
            <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-3">
              {filteredNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-main-green font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="" ref={menuRef}>
               <button
              onClick={toggleMenu}
              className="flex items-center gap-2 cursor-pointer"
            >
              <p className="flex items-center hover:scale-105 transition-all duration-300">
                {isLogned ? (
                  <>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <LuUser className="size-9 bg-primary hover:bg-green-700 transition-all duration-300 cursor-pointer rounded-full p-2 text-white mr-2" />
                    </motion.div>
                    <p className="font-semibold">{user?.fullName}</p>
                  </>
                ) : (
                  <Link
                    onClick={() => setShowMenu(false)}
                    href={"/signIn"}
                    className="w-full text-left hover:bg-green-600 bg-primary text-white rounded-md px-5 py-2 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                )}
              </p>
            </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={profileVariants}
                      className="absolute  top-30 left-17 z-50"
                    >
                      {isLogned ? (
                        <motion.div onClick={() => setShowMenu(false)}>
                          <div className="w-56 bg-white/80 backdrop-blur-xl shadow-md rounded-xl p-2 border border-gray-200 ">
                            <MenuItem icon={<FaUser />} label="My Profile" />
                            <div className="border-b border-gray-300 my-2"></div>
                            <MenuItem
                              icon={<FaDownload />}
                              label="Download My Resume"
                              active
                            />
                            {/* <div className="border-b border-gray-300 my-2"></div> */}
                            <Link href={"/jobSeeker/my-application"}>
                              <div className="border-b border-gray-300 my-2"></div>
                            </Link>
                            <Link href={"/jobSeeker/my-application"}>
                              <MenuItem icon={<FaBriefcase />} label="Applied Job" />
                            </Link>
                            <div className="border-b border-gray-300 my-2"></div>
                            <MenuItem
                              icon={<FaSignOutAlt />}
                              label="Log Out"
                              danger
                              logoutBtn={handleLogout}
                            />
                          </div>
                        </motion.div>
                      ) : (
                        null
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {animate && (
        <div
          className="fixed inset-0 bg-black/30 bg-opacity-40 z-5 transition-opacity duration-300"
          onClick={handleSearch}
        ></div>
      )}
      <div
        className={`absolute bg-white border-t-2 border-gray-400 w-full py-12 transform transition-all duration-500 ease-out z-10 ${
          animate ? "translate-y-0 opacity-100" : "-translate-y-250 opacity-0"
        }`}
      >
        <SearchSection setAnimate={setAnimate} animate={animate} />
      </div>

      {/* modal logout */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-[645px] w-full mx-4 relative">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="p-8 text-center">
              <div className="flex justify-center md:mb-[32px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="195"
                  height="194"
                  viewBox="0 0 195 194"
                  fill="none"
                >
                  {/* SVG paths remain the same */}
                </svg>
              </div>
              <h2 className="text-2xl md:text-4xl font-semibold md:font-bold text-gray-900 mb-2">
                <>
                  Are you sure <br /> Logout your Account?
                </>
              </h2>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 md:px-6 cursor-pointer md:py-3 py-2 border border-gray-300 bg-gray-200 rounded md:rounded-lg hover:bg-gray-50 transition-colors font-medium text-xs md:text-base"
                >
                  No, Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className={`flex-1 px-2 md:px-6 py-1 md:py-3 rounded md:rounded-lg font-medium bg-red-600 hover:bg-red-800 transition text-white text-xs md:text-base cursor-pointer`}
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}