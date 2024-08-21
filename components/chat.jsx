"use client";
import { useState, useEffect, useRef } from "react";
import { useParams } from 'next/navigation';
import Message from "./message";

const Chat = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [input, setInput] = useState('');
  const params = useParams();
  const chatId = params?.chatID;
  const abortControllerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setChatMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiMessage = { role: 'assistant', content: 'This is a simulated AI response.' };
      setChatMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col bg-white h-full">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
        {chatMessages.map((message, index) => (
          <Message key={index} role={message.role} content={message.content} />
        ))}
      </div>
      <footer className="bg-gray-100 border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="relative">
            <input
              className="w-full p-3 md:p-4 pr-20 md:pr-24 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={input}
              placeholder="Type your message here"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-blue-500 text-white px-3 md:px-4 py-1 md:py-2 rounded-full text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Chat;