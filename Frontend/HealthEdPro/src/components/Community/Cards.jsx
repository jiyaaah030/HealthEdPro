import React, { useState } from "react";
import Jiya from "../../assets/Jiya_Bhati.jpg";
import Yash from "../../assets/Yash_Kumar_Verma.jpg";
import Adarsh from "../../assets/Adarsh_Pandey.jpg";
import Abhishek from "../../assets/Abhishek_Mishra.jpg";
import Khushi from "../../assets/Khushi_Teotia.png"; 

const FoundingMembers = () => {
  const [expandedMember, setExpandedMember] = useState(null);
  const [filter, setFilter] = useState("");
  
  const members = [
    {
      name: "Jiya Bhati",
      image: Jiya,
      description: "A mind that weaves with code, a heart that yearns to innovate. A digital architect, crafting the future, night and day.",
      role: "Technical Lead",
      portfolio: "https://jiyaaah030.github.io/Portfolio" 
    },
    {
      name: "Adarsh Pandey",
      image: Adarsh,
      description: "Tech enthusiast turned health advocate, using technology to empower individuals to take charge of their health.",
      role: "Health Tech Specialist",
      portfolio: "https://adarshpandey-007.github.io/portfolio/"
    },
    {
      name: "Yash Kumar Verma",
      image: Yash,
      description: "A dynamic achiever who is passionate about motivating others and has an infectious zest for life.",
      role: "Community Manager",
      portfolio: "https://yashkumarverma623.github.io/Portfolio-Website/"
    },
    {
      name: "Abhishek Mishra",
      image: Abhishek,
      description: "A dedicated and resilient dreamer, always striving for excellence and overcoming obstacles with determination.",
      role: "Product Designer",
      portfolio: "https://abhishekmishra02.github.io/Portfolio-Website/"
    },
    {
      name: "Khushi Teotia",
      image: Khushi,
      description: "A dynamic achiever who is passionate about motivating others and has an infectious zest for life.",
      role: "Marketing Strategist",
      portfolio: "https://thcurlyky.github.io/Potfolio_Website/"
    },
  ];

  const toggleExpand = (index) => {
    if (expandedMember === index) {
      setExpandedMember(null);
    } else {
      setExpandedMember(index);
    }
  };

  const openPortfolio = (portfolioUrl) => {
    window.open(portfolioUrl, '_blank');
  };


  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(filter.toLowerCase()) || 
    member.role.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-6 ">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 ">
        <h2 className="text-2xl font-bold">Founding Members</h2>
        <div className="mt-4 md:mt-0 ">
          <input
            type="text"
            placeholder="Search by name or role..."
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      
      {filteredMembers.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No members match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 ">
          {filteredMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              <div 
                className="relative flex justify-center cursor-pointer bg-black"
                onClick={() => openPortfolio(member.portfolio)}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-48 object-cover "
                />
                <div className="absolute inset-0   bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <span className="text-transparent hover:text-white font-bold">View Portfolio</span>
                </div>
              </div>
              
              <div className="p-4 text-center">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-blue-600 text-sm mb-2">{member.role}</p>
                
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedMember === index ? "max-h-40" : "max-h-12"
                }`}>
                  <p className="text-gray-600 text-sm mb-3">{member.description}</p>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  <button 
                    className="flex-1 bg-gray-900 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedMember === index ? "Show Less" : "Read More"}
                  </button>
                  <button 
                    className="flex-1 border border-gray-900 text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-300"
                    onClick={() => openPortfolio(member.portfolio)}
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundingMembers;