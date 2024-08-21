import Link from 'next/link'
import '../styles/global.css'
import { RiChatNewFill, RiMenu2Line } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import { TbMessageChatbot } from "react-icons/tb";


const Header = ({ toggleSidebar, isMobile }) => {
  return (
    <header className='flex items-center h-16 px-4 text-white bg-blue-600 w-full'>
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        {isMobile && (
          <button onClick={toggleSidebar} className="text-white mr-4">
            <RiMenu2Line className="w-6 h-6" />
          </button>
        )}
        <Link href='/'>
          <TbMessageChatbot className="h-8 w-auto" />
        </Link>
        <h1 className="text-xl font-bold hidden md:block">AI Chat Assistant</h1>
        <Link href={`/chat/${uuidv4()}`} className="flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
          <RiChatNewFill className="w-5 h-5 text-blue-600" />
          <span className="hidden md:inline">New Chat</span>
        </Link>
      </div>
    </header>
  )
}


export default Header