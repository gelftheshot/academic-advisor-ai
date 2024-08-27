"use client"
import { useState } from "react";
import { RiBookmarkLine, RiUserSearchLine, RiQuestionLine, RiCloseLine } from "react-icons/ri"; // Updated import
import Link from 'next/link';

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const [chats] = useState([
    { id: '1', title: 'Computer Science Professors' },
    { id: '2', title: 'Physics Department' },
    { id: '3', title: 'Best Rated Professors' },
  ]);

  return (
    <div className={`bg-blue-800 text-white w-64 fixed h-full overflow-y-auto transition-all duration-300 ease-in-out ${isOpen ? 'left-0' : '-left-64'} ${isMobile ? 'z-50' : ''}`}>
      {isMobile && (
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
          <RiCloseLine className="w-6 h-6" />
        </button>
      )}
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/chat?new=true" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
              <RiUserSearchLine className="w-5 h-5" />
              <span>Find a Professor</span>
            </Link>
          </li>
          <li>
            <Link href="/departments" className="flex items-center space-x-2 p-2 rounded hover:bg-blue-700">
              <RiBookmarkLine className="w-5 h-5" /> {/* Updated icon */}
              <span>Departments</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link href={`/chat/${chat.id}`} className="block p-2 rounded hover:bg-blue-700">
                {chat.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <footer className="absolute bottom-0 w-full p-4 bg-blue-900">
        <Link href="/help" className="flex items-center space-x-2 text-sm hover:text-blue-300">
          <RiQuestionLine className="w-5 h-5" />
          <span>Help & FAQ</span>
        </Link>
      </footer>
    </div>
  );
};

export default Sidebar;