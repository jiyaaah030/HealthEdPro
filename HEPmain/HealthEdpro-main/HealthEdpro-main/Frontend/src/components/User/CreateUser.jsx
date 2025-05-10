import React, { useState } from 'react'
import { createUser } from "../../api.js";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Password strength and validation checks
    if (name === 'password') {
      const newValidations = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        specialChar: /[^A-Za-z0-9]/.test(value)
      };
      setValidations(newValidations);

      const strength = Object.values(newValidations).filter(v => v).length;
      setPasswordStrength(strength);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (passwordStrength < 3) {
      setError("Password is too weak. Please meet all requirements.");
      return;
    }

    try {
      let response = await createUser(user);
      if (response) {
        setSuccess(true);
        setUser({ name: "", email: "", password: "" });
        setPasswordStrength(0);
        setValidations({
          length: false,
          uppercase: false,
          lowercase: false,
          number: false,
          specialChar: false
        });
      } else {
        setError("Could not create user account. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    }
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className=" flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-blue-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              placeholder="Name" 
              onChange={handleChange} 
              name="name" 
              value={user.name}
              required 
              maxLength={20}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div>
            <input 
              placeholder="E-Mail" 
              type="email"
              onChange={handleChange} 
              name="email" 
              value={user.email}
              required 
              maxLength={40}
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
            />
          </div>
          <div className="relative">
            <input 
              placeholder="Password" 
              type={showPassword ? "text" : "password"}
              onChange={handleChange} 
              name="password" 
              value={user.password}
              required 
              maxLength={20} 
              className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 pr-12"
            />
            <button 
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {user.password && (
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    passwordStrength <= 2 
                      ? 'bg-red-500 w-1/3' 
                      : passwordStrength <= 4 
                      ? 'bg-yellow-500 w-2/3' 
                      : 'bg-green-500 w-full'
                  }`}
                ></div>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <div className="flex items-center">
                  {validations.length ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />}
                  At least 8 characters
                </div>
                <div className="flex items-center">
                  {validations.uppercase ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />}
                  One uppercase letter
                </div>
                <div className="flex items-center">
                  {validations.lowercase ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />}
                  One lowercase letter
                </div>
                <div className="flex items-center">
                  {validations.number ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />}
                  One number
                </div>
                <div className="flex items-center">
                  {validations.specialChar ? <FaCheckCircle className="text-green-500 mr-2" /> : <FaTimesCircle className="text-red-500 mr-2" />}
                  One special character
                </div>
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Create Account
          </button>

          <AnimatePresence>
            {error && (
              <p className="text-red-500 text-sm text-center">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 text-sm text-center">
                Account created successfully!
              </p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}

export default CreateUser;