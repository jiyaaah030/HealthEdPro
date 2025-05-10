import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogRedirectButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <Link 
        to="/blog"
        className={`relative overflow-hidden group px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out transform ${
          isHovered ? 'scale-105 bg-indigo-700' : 'bg-indigo-600'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="relative z-10 flex items-center space-x-2">
          <svg 
            className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l5-5-5-5m-12 5h12"></path>
          </svg>
          <span>Explore Our Blog</span>
        </span>
        
        <span className={`absolute inset-0 w-full h-full transition-all duration-300 ${
          isHovered ? 'bg-gradient-to-r from-blue-500 to-indigo-600 opacity-100' : 'opacity-0'
        }`}></span>
      </Link>
      
      <div className="text-center text-gray-700">
        <p className="text-sm">Read and write engaging blog content</p>
        <p className="text-xs mt-1 text-gray-500">Join our community today!</p>
      </div>
    </div>
  );
};

export default BlogRedirectButton;