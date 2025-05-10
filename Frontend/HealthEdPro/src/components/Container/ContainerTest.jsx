import { React } from "react";
import Testimg1 from "../../assets/test.png";
import Testimg2 from "../../assets/optional.png";
import Testimg3 from "../../assets/result.png";


const AnxietyTestComponent = () => {
  return (
    <div className=" mt-20 flex justify-center">
    <div className="  bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 w-7xl   md:grid-cols-3 gap-6 ">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img src={Testimg1} alt="Test Levels" className="w-full rounded-t-2xl" />
        <h2 className="text-xl font-semibold mb-4 mt-4">Test Levels:</h2>
        <div>
          <h3 className="font-medium">1. Test Questions (Mandatory):</h3>
          <p className="bg-white p-3 rounded-lg shadow mb-5">
            These are essential questions that all users must answer to complete the test.
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-medium">2. Optional Questions (Skippable):</h3>
          <p className="bg-white p-3 rounded-lg shadow">
            These questions are not mandatory and can be skipped if preferred.
          </p>
        </div>
        <div className="mt-4">
          <h3 className="font-medium">3. Final Result:</h3>
          <p className="bg-white p-3 rounded-lg shadow">
            After completing the test, users receive results based on their responses.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img src={Testimg2} alt="Details of Source" className="w-full rounded-t-2xl" />
        <h2 className="text-xl font-semibold mb-4 mt-4">Details of Source:</h2>
        <p className="bg-white p-3 rounded-lg shadow mb-5">
          After users complete the mandatory and optional questions, they are provided with detailed information about the sources.
        </p>
        <p className="bg-white p-3 rounded-lg shadow mb-5">
          This includes references to scientific studies, expert opinions, and credible health resources used to create the test.
        </p>
        <p className="bg-white p-3 rounded-lg shadow">
          HealthEdPro ensures transparency, allowing users to understand the basis of their assessment.
        </p>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img src={Testimg3} alt="Test Results" className="w-full rounded-t-2xl" />
        <h2 className="text-xl font-semibold mb-4 mt-4">Test Results:</h2>
        <p className="text-sm text-black font-semibold">Test will give the following aspects:</p>
        <ul className="mt-4 space-y-2">
          <li className="bg-white p-3 rounded-lg shadow">GAD (Generalized Anxiety Disorder) Score</li>
          <li className="bg-white p-3 rounded-lg shadow">Severity</li>
          <li className="bg-white p-3 rounded-lg shadow">Symptoms</li>
          <li className="bg-white p-3 rounded-lg shadow">Recommendations</li>
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AnxietyTestComponent;
