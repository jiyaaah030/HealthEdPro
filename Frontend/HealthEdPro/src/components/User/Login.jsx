import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { verifyUser } from "../../api.js";
import axios from "axios";
import { AnimatePresence } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
 
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
  
    try {
      let response = await verifyUser(user);
      if (response) {
        // Assuming response contains user details
        // If not, you'll need to modify this to fetch user details
        sessionStorage.setItem("user", JSON.stringify({
          email: user.email,
          // Add more user details as needed
          // For example: name, id, etc.
        }));
        
        // Set the authorization token
        axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
        navigate("/");
      } else {
        setError("Could not login. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Could not login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleForgotPassword() {
    // Placeholder for forgot password functionality
    alert("Forgot password functionality will be implemented soon!");
  }

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br bg-white p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input 
              placeholder="E-Mail" 
              onChange={handleChange} 
              name="email" 
              value={user.email}
              required 
              maxLength={40}
              className="w-full pl-12 pr-3 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
        
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <input 
              placeholder="Password" 
              type={showPassword ? "text" : "password"}
              onChange={handleChange} 
              name="password" 
              value={user.password}
              required 
              maxLength={20} 
              className="w-full pl-12 pr-12 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-600 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        
          <div className="flex justify-end">
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-600 hover:text-blue-800 transition"
            >
              Forgot Password?
            </button>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full text-white py-3 rounded-lg transition duration-300 ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        
          
          
          <AnimatePresence>
            {error && (
              <p className="mt-4 text-red-500 text-center text-sm">
                {error}
              </p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}

export default Login;