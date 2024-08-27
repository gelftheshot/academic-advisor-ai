import React from 'react'
import { FaUser, FaGraduationCap } from "react-icons/fa";

const Message = ({ role, content }) => {
  return (
    <div className={`flex flex-col ${role === 'user' ? 'items-end' : 'items-start'} mb-4`}>
      <div className={`flex items-center ${role === 'user' ? 'flex-row-reverse' : 'flex-row'} mb-2`}>
        {role === 'user' ? 
          <FaUser className="text-xl md:text-2xl text-blue-600 ml-2" /> : 
          <FaGraduationCap className="text-xl md:text-2xl text-green-600 mr-2" />
        }
        <span className="text-xs md:text-sm text-gray-500 font-medium">{role === 'user' ? 'You' : 'Professor AI'}</span>
      </div>
      <div className={`max-w-[85%] md:max-w-[70%] p-2 md:p-3 rounded-lg ${role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
        <div className="text-xs md:text-sm">{content}</div>
      </div>
    </div>
  )
}
export default Message