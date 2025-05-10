import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import CreateUser from "../components/User/CreateUser.jsx";
import Login from "../components/User/Login.jsx";

const Login_Signup = () => {
  const [view, setView] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        
        <div className="p-8">
          <AnimatePresence mode="wait">
            {!view ? (
              <div key="login">
                <Login />
                <div className="mt-4 text-center">
                  <p className="text-gray-600 mb-2">Don't have an account?</p>
                  <button 
                    onClick={() => setView(1)}
                    className="w-full py-3 rounded-lg bg-purple-100 text-purple-800 hover:bg-gradient-to-r from-purple-500 to-blue-500 hover:text-white transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    <FaUserPlus className="mr-2" />
                    Sign Up Now
                  </button>
                </div>
              </div>
            ) : (
              <div 
                key="signup"
              >
                <CreateUser />
                <div className="mt-4 text-center">
                  <p className="text-gray-600 mb-2">Already have an account?</p>
                  <button 
                    onClick={() => setView(0)}
                    className="w-full py-3 rounded-lg bg-blue-100 text-blue-800 hover:bg-gradient-to-r from-blue-500 to-purple-500 hover:text-white transition duration-300 ease-in-out flex items-center justify-center"
                  >
                    <FaSignInAlt className="mr-2" />
                    Login Instead
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Login_Signup;