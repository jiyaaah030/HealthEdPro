import React, { useState, useEffect } from "react";

const OcdTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [optionalAnswers, setOptionalAnswers] = useState({});
  const [currentOptionalSection, setCurrentOptionalSection] = useState(0);
  const [showOptional, setShowOptional] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(true);
 
  const questions = [
    "How many hours per day do you spend on obsessive thoughts?",
    "To what extent do obsessions interfere with your daily life?",
    "How much distress do your obsessions cause you?",
    "How often do you try to resist your obsessions?",
    "How much control do you have over your obsessive thoughts?",
    "How many hours per day do you spend on compulsive behaviors?",
    "To what extent do compulsions interfere with your daily life?",
    "How much distress do your compulsions cause you?",
    "How often do you try to resist your compulsive behaviors?",
    "How much control do you have over your compulsive behaviors?"
  ];

  const optionalSections = [
    {
      title: "About You",
      questions: [
        { id: "for", label: "Are you taking this test for yourself or for someone else?", type: "select", options: ["Myself", "Someone else"] },
        { id: "age", label: "What is your age range?", type: "select", options: ["Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"] },
        { id: "gender", label: "What is your gender?", type: "select", options: ["Male", "Female", "Non-binary", "Prefer not to say", "Other"] }
      ]
    },
    {
      title: "Demographics",
      questions: [
        { id: "ethnicity", label: "Select your race/ethnicity?", type: "select", options: ["Asian", "Black", "Hispanic/Latino", "Indigenous", "Middle Eastern", "White", "Mixed", "Other"] },
        { id: "income", label: "Select your household income range?", type: "select", options: ["Under $25,000", "$25,000-$50,000", "$50,000-$75,000", "$75,000-$100,000", "Over $100,000"] },
        { id: "country", label: "What country do you live in?", type: "text" }
      ]
    },
    {
      title: "Mental Health History",
      questions: [
        { id: "treatment", label: "Have you ever received treatment/support for a mental health problem?", type: "select", options: ["Yes", "No"] },
        { id: "factors", label: "What are the main things contributing to your mental health problems right now?", type: "multiselect", options: ["Work stress", "Relationship issues", "Financial problems", "Health concerns", "Social isolation", "Family issues", "Academic pressure", "Other"] },
        { id: "insurance", label: "Do you currently have health insurance?", type: "select", options: ["Yes", "No"] }
      ]
    }
  ];

  const options = ["NEVER", "OCCASIONALLY", "FREQUENTLY", "ALMOST ALWAYS",];
  const scores = { "NEVER": 0, "OCCASIONALLY": 1, "FREQUENTLY": 2, "ALMOST ALWAYS": 3,};
  const interpretations = [
    { range: [0, 7], level: "Minimal OCD ", color: "bg-green-100 border-green-500 text-green-700" },
    { range: [8, 15], level: "Mild OCD ", color: "bg-yellow-100 border-yellow-500 text-yellow-700" },
    { range: [16, 22], level: "Moderate OCD ", color: "bg-orange-100 border-orange-500 text-orange-700" },
    { range: [23, 30], level: "Severe OCD ", color: "bg-red-100 border-red-500 text-red-700" }
  ];

  useEffect(() => {
    if (!fadeIn) {
      const timer = setTimeout(() => setFadeIn(true), 50);
      return () => clearTimeout(timer);
    }
  }, [fadeIn]);

  const handleSelect = (qIndex, option) => {
    setSelectedOptions((prev) => ({ ...prev, [qIndex]: option }));
    setError(""); 
  };

  const handleOptionalSelect = (qId, value, isMulti = false) => {
    if (isMulti) {
      setOptionalAnswers(prev => {
        const current = Array.isArray(prev[qId]) ? prev[qId] : [];
        const updated = current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value];
        return { ...prev, [qId]: updated };
      });
    } else {
      setOptionalAnswers(prev => ({ ...prev, [qId]: value }));
    }
  };

  const goToNextQuestion = () => {
    if (selectedOptions[currentQuestion] === undefined) {
      setError("Please select an option before proceeding.");
      return;
    }
    setError("");
    setFadeIn(false);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        finishRequiredQuestions();
      }
    }, 300);
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
      }, 300);
    }
  };

  const goToNextOptionalSection = () => {
    setFadeIn(false);
    setTimeout(() => {
      if (currentOptionalSection < optionalSections.length - 1) {
        setCurrentOptionalSection(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }, 300);
  };

  const goToPrevOptionalSection = () => {
    setFadeIn(false);
    setTimeout(() => {
      if (currentOptionalSection > 0) {
        setCurrentOptionalSection(prev => prev - 1);
      } else {
        setShowOptional(false);
        setCurrentQuestion(questions.length - 1);
      }
    }, 300);
  };

  const finishRequiredQuestions = () => {
    try {
      
      const score = Object.entries(selectedOptions).reduce((sum, [, option]) => {
  return sum + (scores[option] ?? 0);
}, 0);
      
      setTotalScore(score);
      setShowOptional(true);
      setFadeIn(false);
      setTimeout(() => setFadeIn(true), 300);
    } catch (err) {
      console.error("Error calculating score:", err);
      setError("There was an error calculating your score. Please try again.");
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 300);
  };

  const resetTest = () => {
    setFadeIn(false);
    setTimeout(() => {
      setSelectedOptions({});
      setOptionalAnswers({});
      setCurrentQuestion(0);
      setCurrentOptionalSection(0);
      setShowOptional(false);
      setShowResults(false);
      setTotalScore(0);
      setError("");
      setFadeIn(true);
    }, 300);
  };

  const getInterpretation = (score) => {
    const found = interpretations.find(int => score >= int.range[0] && score <= int.range[1]);
    
    return found || interpretations[0];
  };

  const renderProgressBar = () => {
    const progress = !showOptional 
      ? ((currentQuestion + 1) / questions.length) * 100 
      : 100;
    
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    );
  };

  const renderRequiredQuestions = () => {
    const question = questions[currentQuestion];
    
    if (!question) {
      return <p className="text-red-500">Error loading question. Please reset the test.</p>;
    }

    return (
      <div className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-500">Question {currentQuestion + 1} of {questions.length}</p>
          <p className="text-sm font-medium text-purple-700">Adult OCD Assessment</p>
        </div>
        
        {renderProgressBar()}
        
        <h2 className="text-lg text-gray-700 mb-6">Please answer the questions below, rating yourself on each of the criteria shown. As you answer each question, select the button that best describes how you have felt and conducted yourself over the past 6 months.</h2>
        
        <div className="mb-8">
          <p className="text-xl font-semibold text-gray-900 mb-4">{question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((option) => (
              <button
                key={option}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  selectedOptions[currentQuestion] === option 
                    ? "bg-purple-700 text-white border-purple-700" 
                    : "bg-white border-gray-300 text-gray-700 hover:border-purple-500"
                }`}
                onClick={() => handleSelect(currentQuestion, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        <div className="flex justify-between mt-6">
          <button
            className={`px-6 py-2 rounded-lg ${currentQuestion > 0 ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'invisible'}`}
            onClick={goToPrevQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-600 transition-colors"
            onClick={goToNextQuestion}
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    );
  };

  const renderOptionalQuestions = () => {
    const section = optionalSections[currentOptionalSection];
    
    if (!section) {
      return <p className="text-red-500">Error loading optional questions. Please proceed to results.</p>;
    }
    
    return (
      <div className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm font-medium text-gray-500">Optional Section {currentOptionalSection + 1} of {optionalSections.length}</p>
          <button 
            className="text-sm font-medium text-purple-700 hover:underline"
            onClick={() => handleSubmit()}
          >
            Skip to Results
          </button>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-purple-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentOptionalSection + 1) / optionalSections.length) * 100}%` }}
          ></div>
        </div>
        
        <h2 className="text-xl font-bold text-purple-700 mb-2">{section.title}</h2>
        <p className="text-sm text-gray-600 mb-6">These questions help us better understand your situation but are not required.</p>
        
        {section.questions.map((question) => (
          <div key={question.id} className="mb-6">
            <p className="text-md font-semibold text-gray-900 mb-2">{question.label}</p>
            
            {question.type === 'select' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {question.options.map((opt) => (
                  <button
                    key={opt}
                    className={`px-3 py-2 rounded-lg border transition-all ${
                      optionalAnswers[question.id] === opt
                        ? "bg-purple-100 border-purple-500 text-purple-700"
                        : "bg-white border-gray-300 text-gray-700 hover:border-purple-300"
                    }`}
                    onClick={() => handleOptionalSelect(question.id, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            
            {question.type === 'multiselect' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {question.options.map((opt) => {
                  const isSelected = Array.isArray(optionalAnswers[question.id]) && 
                                    optionalAnswers[question.id].includes(opt);
                  return (
                    <button
                      key={opt}
                      className={`px-3 py-2 rounded-lg border transition-all ${
                        isSelected
                          ? "bg-purple-100 border-purple-500 text-purple-700"
                          : "bg-white border-gray-300 text-gray-700 hover:border-purple-300"
                      }`}
                      onClick={() => handleOptionalSelect(question.id, opt, true)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}
            
            {question.type === 'text' && (
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your answer"
                value={optionalAnswers[question.id] || ""}
                onChange={(e) => handleOptionalSelect(question.id, e.target.value)}
              />
            )}
          </div>
        ))}
        
        <div className="flex justify-between mt-6">
          <button
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={goToPrevOptionalSection}
          >
            Previous
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-600 transition-colors"
            onClick={goToNextOptionalSection}
          >
            {currentOptionalSection < optionalSections.length - 1 ? 'Next' : 'View Results'}
          </button>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const interpretation = getInterpretation(totalScore);
    
    return (
      <div className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-2xl font-bold text-purple-700 mb-6">Your OCD Assessment Results</h2>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="p-6 bg-gray-100 rounded-lg">
              <div className="text-center mb-4">
                <span className="text-4xl font-bold text-purple-700">{totalScore}</span>
                <span className="text-lg text-gray-600">/21</span>
              </div>
              
              <div className="w-full bg-gray-300 rounded-full h-4 mb-3">
                <div 
                  className="bg-purple-600 h-4 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(totalScore / 21) * 100}%` }}
                ></div>
              </div>
              
              <p className="text-lg font-semibold text-center">
                Score: {interpretation.level}
              </p>
            </div>
          </div>
          
          <div className="flex-1">
            <div className={`p-6 border-l-4 rounded-r-lg ${interpretation.color}`}>
              <h3 className="font-bold text-lg mb-2">What does this mean?</h3>
              <p className="mb-4">
                {totalScore >= 10 
                  ? "Your score suggests you may be experiencing significant OCD symptoms. This could be impacting your daily life."
                  : "Your score suggests minimal to mild OCD symptoms. Most people experience some OCD symptoms from time to time."}
              </p>
              <p>
                {totalScore >= 10 
                  ? "Consider consulting a mental health professional for further evaluation and support."
                  : "Continue to monitor your symptoms and practice self-care techniques."}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h3 className="font-bold text-lg mb-4">Self-Care Recommendations</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 mr-3">1</span>
              <span>Structured Environment: Create a structured environment at home and work to minimize distractions. Designate specific areas for tasks.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 mr-3">2</span>
              <span>Behavioral Strategies: Implement behavioral strategies like reward systems for completing tasks to improve focus and motivation.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 mr-3">3</span>
              <span>Professional Support: Consider seeking support from a mental health professional for coping strategies and guidance.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 mr-3">4</span>
              <span>Peer Support: Engage with support groups or communities for individuals with OCD to share experiences and strategies.</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 mr-3">5</span>
              <span>Connect with supportive friends and family</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="flex-1 py-3 rounded-lg bg-purple-700 text-white hover:bg-purple-600 transition-colors"
            onClick={resetTest}
          >
            Take Test Again
          </button>
          <button
            className="flex-1 py-3 rounded-lg border border-purple-700 text-purple-700 hover:bg-purple-50 transition-colors"
            onClick={() => {
              try {
                window.print();
              } catch (err) {
                console.error("Print function error:", err);
              }
            }}
          >
            Print Results
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto mt-8 sm:mt-20">
        <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">OCD Assessment</h1>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          {!showOptional && !showResults && renderRequiredQuestions()}
          {showOptional && !showResults && renderOptionalQuestions()}
          {showResults && renderResults()}
        </div>
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>This assessment is based on the  The The Yale-Brown Obsessive Compulsive Scale screening tool.</p>
          <p className="mt-1">Not intended to replace professional medical advice. Please consult a healthcare provider.</p>
        </div>
      </div>
    </div>
  );
};

export default OcdTest;