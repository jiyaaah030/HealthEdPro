import React, { useState } from "react";
import { Link } from "react-router-dom";
import Communityimg from "../../assets/community.png";
import {FaUsers,FaBookReader,FaHandHoldingHeart, FaCheckCircle, FaArrowRight, FaRobot, FaHeadset, FaShieldAlt, FaLaptopMedical } from "react-icons/fa";

const CommunityHealthEdPro = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      title: "Founding Members' Profiles:",
      icon: <FaUsers className="text-blue-500 text-xl" />,
      description: "Learn about the profiles of founding members, their journeys, and their motivations behind creating HealthEdPro.",
      details: "Discover the inspiring stories of our founding team and their vision for healthcare education."
    },
    {
      title: "Personal Stories and Experiences:",
      icon: <FaBookReader className="text-green-500 text-xl" />,
      description: "Users can read personal stories and experiences related to other users' health journeys, fostering a sense of connection and understanding.",
      details: "Learn at your own pace with multimedia content designed to make health concepts accessible and memorable."
    },
    {
      title: "Share Your Experience:",
      icon: <FaHeadset className="text-purple-500 text-xl" />,
      description: "Accessible anytime for instant support and answers to health-related queries.",
      details: "If you'd like to share your experience, you can connect with the community and inspire others."
    },
  ];

  return (
    <div 
      className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl p-4 md:p-6 max-w-7xl mx-auto my-10 transition-all duration-500 transform hover:scale-[1.02] overflow-hidden"
      style={{
        boxShadow: isHovered ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        minHeight: "50vh"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full md:w-1/2 flex flex-col justify-center p-3 md:p-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 relative">
          <span className="relative z-10">WHY USE HEALTHEdPRO?</span>
          <span className="absolute -bottom-2 left-0 w-16 h-1 bg-blue-500 rounded z-0"></span>
        </h2>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg transition-all duration-300 ease-in cursor-pointer ${
                activeIndex === index ? 'bg-blue-50 shadow-lg' : 'bg-gray-100 shadow'
              }`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="flex items-start">
                <div className={`w-1 h-full bg-blue-500 mr-2 rounded transition-all duration-300 ${
                  activeIndex === index ? 'h-full' : 'h-10'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center">
                    {feature.icon}
                    <h3 className="font-bold ml-2 text-sm">{feature.title}:</h3>
                  </div>
                  <p className="text-sm">{feature.description}</p>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${
                    activeIndex === index ? 'max-h-20 mt-1 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-xs text-gray-700 bg-white p-2 rounded-lg border-l-4 border-blue-500">
                      {feature.details}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <button 
            className="group relative px-6 py-2 bg-blue-600 text-white rounded-lg overflow-hidden transition-all duration-300"
            style={{
              boxShadow: isHovered ? "0 10px 25px -5px rgba(59, 130, 246, 0.5)" : "0 4px 6px -1px rgba(59, 130, 246, 0.3)"
            }}
          >
            <span className="relative z-10 flex items-center text-sm">
              Learn More 
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <span className="absolute inset-0 w-full h-full bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            <Link to="/Community" className="absolute inset-0 z-20"></Link>
          </button>
        </div>
        
        <div className="mt-3 flex items-center justify-center text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
          <FaCheckCircle className="text-green-500 mr-2" />
          <p><em>"The chatbot helped me understand my medication schedule better!"</em> - Michael R.</p>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0 overflow-hidden rounded-xl">
        <div className="relative w-full h-48 md:h-full overflow-hidden rounded-xl">
          <img
            src={Communityimg} 
            alt="Healthcare Chatbot"
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-80 rounded-xl"></div>
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="text-lg font-bold">Community</h3>
            <p className="text-xs">Powered by HealthEdPro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHealthEdPro;