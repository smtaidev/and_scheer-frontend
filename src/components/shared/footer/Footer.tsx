import React from "react";
import { FaFacebookF, FaTwitter, FaVimeoV, FaYoutube } from "react-icons/fa";
import Container from "../../ui/Container";
import Logo from "../../ui/MainLogo";

const Footer: React.FC = () => {
  return (
    <div className="bg-neutral-50">
      <Container>
        <footer className=" py-10 px-3">
          <div className="mx-auto space-y-8">
            {/* Top section: Nav + Icons */}
            <div className="flex flex-col md:flex-row items-start justify-between gap-6">
              {/* Navigation Links */}
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a href="/#" className="hover:text-green-400">
                  Home
                </a>
                <a href="/#about" className="hover:text-green-400">
                  About Us
                </a>
                <a href="/#course" className="hover:text-green-400">
                  Courses
                </a>
                <a href="/create-account" className="hover:text-green-400">
                  For Employers
                </a>
                <a href="/jobSeeker/home" className="hover:text-green-400">
                  For Job Seekers
                </a>
              </nav>

              {/* Social Icons */}
              <div className="flex space-x-4 text-lg">
                <FaFacebookF className="hover:text-green-400 cursor-pointer" />
                <FaVimeoV className="hover:text-green-400 cursor-pointer" />
                <FaTwitter className="hover:text-green-400 cursor-pointer" />
                <FaYoutube className="hover:text-green-400 cursor-pointer" />
              </div>
            </div>

            {/* Bottom section: Logo + Terms */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-gray-700 pt-6 text-sm">
              {/* Logo and Copyright */}
              <div>
                <p>© 2022 ABC. All rights reserved.</p>
              </div>
              <Logo height={20} width={140} />

              {/* Terms and Privacy */}
              <div className="flex space-x-6">
                <a href="#" className="hover:text-green-400">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-green-400">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </footer>
      </Container>

    </div>

  );
};

export default Footer;
