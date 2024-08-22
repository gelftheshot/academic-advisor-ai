"use client"
import { useState } from "react";
import { RiChat3Line, RiSettings4Line, RiQuestionLine, RiCloseLine } from "react-icons/ri";
import Link from 'next/link';

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const [chats] = useState([
    { id: '1', title: 'Chat 1' },
    { id: '2', title: 'Chat 2' },
    { id: '3', title: 'Chat 3' },
  ]);

  const truncateTitle = (title, maxLength = 30) => {
    if (!title) return 'Untitled Chat';
    if (title.length <= maxLength) return title;
    return title.substr(0, maxLength) + '...';
  };

  const sidebarClasses = `w-64 border-gray-200 bg-gray-100 text-gray-800 flex flex-col h-full border-r border-gray-300 ${
    isMobile ? (isOpen ? 'fixed inset-y-0 left-0 z-50' : 'hidden') : 'relative'
  }`;

  return (
    <div className={sidebarClasses}>
      {isMobile && (
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <RiCloseLine className="w-6 h-6" />
        </button>
      )}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li key={chat.id}>
              <Link href="/chat" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors">
                <RiChat3Line className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">{truncateTitle(chat.title || 'Untitled Chat')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <footer className="p-4 border-t border-gray-400">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <RiQuestionLine className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Help & FAQ</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-200 transition-colors">
              <RiSettings4Line className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Settings</span>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Sidebar;