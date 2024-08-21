"use client";

import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

const StartChat = () => {
  const router = useRouter();

  const handleStartChat = () => {
    const newChatId = uuidv4();
    router.push(`/chat/${newChatId}`);
  };

  return (
    <div className='w-full h-full flex items-center justify-center bg-gray-100 p-4'>
      <button 
        onClick={handleStartChat} 
        className='bg-blue-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out text-base md:text-lg font-semibold shadow-md'
      >
        Start New Conversation
      </button>
    </div>
  )
}

export default StartChat