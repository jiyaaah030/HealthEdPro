import { Link } from "react-router-dom";

const AssessYourself = () => {
  return (
    <div className="w-full  mt-10 ">   {/* for original website h-[80vh] flex justify-center*/}
    <div className="flex flex-col items-center justify-center text-center p-6 ">
      <button className="bg-yellow-400 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300">
        <Link to="/Test">Assess Yourself</Link>
      </button>
      <p className="mt-4 text-gray-700 max-w-2xl">
        "Ready to take control of your mental wellness? Click 'Assess Yourself' to start your personalized journey toward better mental health. 
        Discover insights and actionable steps tailored just for you. Let's begin the path to a healthier mind!"
      </p>
    </div>
    </div>
  );
};

export default AssessYourself;
