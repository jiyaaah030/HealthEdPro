import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Heplogo from "../../assets/HEPlogo.png";
import { FaHome, FaUsers, FaSignInAlt, FaExclamationTriangle, FaBars, FaTimes, FaUserCircle,  FaHeartbeat, FaBook, FaBlog, FaRegCommentDots, FaInfoCircle } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      try {

        const parsedUser = JSON.parse(storedUser);
        setUserDetails(parsedUser);
      } catch (error) {
        console.error("Error parsing user details:", error);
      }
    }

    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".navbar-menu") && !event.target.closest(".menu-button")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  function handleLogout() {
    sessionStorage.removeItem("user");
    setUserDetails(null);
    navigate("/Login_Signup");
  }

  return (
    <nav className="bg-yellow-400 p-4 shadow-lg fixed top-0 left-0 w-full z-50 h-auto">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={Heplogo} alt="HealthEdPro Logo" className="w-12 h-12 rounded-full" />
          <div>
            <h1 className="text-black text-2xl font-bold">HealthEdPro</h1>
            <p className="text-black font-semibold">Selfcare</p>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-6 items-center ml-auto">
          <Link to="/" className="text-black flex items-center gap-1 hover:text-gray-700"><FaHome /> Home</Link>
          <Link to="/Emergency" className="text-black flex items-center gap-1 hover:text-gray-700"><FaExclamationTriangle /> Emergency</Link>
          <Link to="/Community" className="text-black flex items-center gap-1 hover:text-gray-700"><FaUsers /> Community</Link>
          
          {userDetails ? (
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-black" />
              <span className="text-black">{userDetails.name || userDetails.email}</span>
            </div>
          ) : (
            <Link to="/Login_Signup" className="text-black flex items-center gap-1 hover:text-gray-700"><FaSignInAlt /> Login</Link>
          )}
        </div>
        
        <button
          className="text-black focus:outline-none ml-4 menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      <div className={`fixed top-0 right-0 h-auto w-1/6 bg-yellow-400 shadow-lg transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out navbar-menu`}> 
        <div className="flex flex-col items-center space-y-4 mt-6 p-4">
          {userDetails && (
            <div className="flex flex-col items-center mb-4">
              <FaUserCircle className="text-4xl mb-2" />
              <p className="text-black font-semibold">{userDetails.name || userDetails.email}</p>
            </div>
          )}
          
          <Link to="/" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaHome /> Home</Link>
          <Link to="/Emergency" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaExclamationTriangle /> Emergency</Link>
          <Link to="/Community" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaUsers /> Community</Link>
          <Link to="/Test" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaHeartbeat /> Assess Yourself</Link>
          {/*<Link to="/Welfare" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaHeartbeat /> Welfare</Link>*/}
          <Link to="/Library" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaBook /> Library</Link>
          <Link to="/Blog" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaBlog /> Blog</Link>
          <Link to="/Reviews" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaRegCommentDots /> Reviews</Link>
          <Link to="/AboutUs" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaInfoCircle /> About Us</Link>
          
          {userDetails ? (
            <button 
              onClick={handleLogout}
              className="text-black hover:text-gray-700 border-b border-black pb-2 w-full text-center"
            >
              Log Out
            </button>
          ) : (
            <Link to="/Login_Signup" className="text-black flex items-center gap-2 hover:text-gray-700 border-b border-black pb-2 w-full text-center"><FaSignInAlt /> Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;