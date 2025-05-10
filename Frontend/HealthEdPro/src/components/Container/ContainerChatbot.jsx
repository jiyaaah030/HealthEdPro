import React from "react";
import { Link } from "react-router-dom";
import MentalHealthMatters from "../../assets/Mentalmatters.png";

const MentalHealthDescription = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-16 space-y-12 md:space-y-0 md:space-x-12 min-h-screen w-full">
      <div className="max-w-2xl text-center md:text-left">
        <h2 className="text-5xl font-bold flex justify-center">Description</h2>
        <h3 className="text-3xl font-semibold text-gray-800 mt-4">HealthEdPro: Your Mental Wellness Companion</h3>
        <p className="text-lg text-gray-700 mt-6 font-medium ">
          Welcome to <span className="text-green-600 font-bold">HealthEdPro</span>, a safe space for mental health
          assessment and support. Our interactive self-assessment tools allow you to gain insights into your mental well-being.
          Chat with our AI for personalized advice and find tailored solutions to recover faster. Your journey to better mental health starts here.
        </p>
        <div className="flex justify-center mt-8">
          <button className="px-8 py-3 text-lg bg-black text-white rounded-full shadow-md hover:bg-gray-800">
            <a href="#/Chatbot">CLICK the image</a>
          </button>
        </div>
        <p className="text-base text-gray-500 mt-4 text-center">To ask any query, click on the image or click on the button above!</p>
      </div>
      <div className="w-full md:w-2/5 flex justify-center">
        <Link to="/Chatbot"><img
          src={MentalHealthMatters}
          alt="Mental Health Matters"
          className="w-96 md:w-[500px]"
        /></Link>
      </div>
    </div>
  );
};

export default MentalHealthDescription;
