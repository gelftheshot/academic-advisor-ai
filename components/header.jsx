import Link from 'next/link';
import '../styles/global.css';
import { RiUserSearchLine, RiMenu2Line } from "react-icons/ri";
import { FaGraduationCap } from "react-icons/fa";

const Header = ({ toggleSidebar, isMobile }) => {
  return (
    <header className='flex items-center h-16 px-4 text-white bg-green-600 w-full'>
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        {isMobile && (
          <button onClick={toggleSidebar} className="text-white mr-4">
            <RiMenu2Line className="w-6 h-6" />
          </button>
        )}
        <Link href='/' className="flex items-center space-x-2">
          <FaGraduationCap className="h-8 w-auto" />
          <span className="text-xl font-bold hidden md:inline">Rate My Professor AI</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/chat?new=true" className="flex items-center space-x-2 px-4 py-2 bg-white text-green-600 rounded-full hover:bg-green-100 transition-colors">
            <RiUserSearchLine className="w-5 h-5" />
            <span className="hidden md:inline">Find a Professor</span>
          </Link>
          <Link href="/majorAdvisor" className="text-white">Major Advisor</Link>
          <Link href="/coursePlanner" className="text-white">Course Planner</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;