import React, { useState } from 'react';
import Footer from "../components/Footer/Footer.jsx";


const HealthEdPro = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  const healthTopics = [
    {
      id: 1,
      title: 'Nutrition Basics',
      description: 'Learn about the essential nutrients your body needs for optimal health.',
      image: '/api/placeholder/400/250',
      content: 'Proper nutrition is vital for maintaining good health. The major nutrients include proteins, carbohydrates, fats, vitamins, minerals, and water.'
    },
    {
      id: 2,
      title: 'Physical Activity',
      description: 'Discover the benefits of regular exercise and how to create an effective fitness routine.',
      image: '/api/placeholder/400/250',
      content: 'Regular physical activity helps maintain a healthy weight, reduces the risk of chronic diseases, and improves mental health and mood.'
    },
    {
      id: 3,
      title: 'Mental Health',
      description: 'Understand the importance of mental wellbeing and strategies for managing stress.',
      image: '/api/placeholder/400/250',
      content: 'Mental health is a crucial part of overall wellbeing. Strategies for maintaining good mental health include regular exercise, adequate sleep, and stress management techniques.'
    },
    {
      id: 4,
      title: 'Preventive Care',
      description: 'Learn about health screenings and vaccinations recommended for different age groups.',
      image: '/api/placeholder/400/250',
      content: 'Preventive care includes health services like screenings, check-ups, and patient counseling that are used to prevent illnesses, disease, and other health problems.'
    }
  ];
  
  const filteredTopics = healthTopics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    setShowModal(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 mt-25">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-teal-600">Health<span className="text-blue-600">Ed</span>Pro</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setActiveTab('home')}
                className={`px-3 py-2 rounded-md ${activeTab === 'home' ? 'bg-teal-100 text-teal-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setActiveTab('topics')}
                className={`px-3 py-2 rounded-md ${activeTab === 'topics' ? 'bg-teal-100 text-teal-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Topics
              </button>
              <button 
                onClick={() => setActiveTab('resources')}
                className={`px-3 py-2 rounded-md ${activeTab === 'resources' ? 'bg-teal-100 text-teal-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Resources
              </button>
              <button 
                onClick={() => setActiveTab('about')}
                className={`px-3 py-2 rounded-md ${activeTab === 'about' ? 'bg-teal-100 text-teal-800' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                About
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Guide to Better Health Education</h1>
              <p className="text-xl text-gray-600 mb-6">Explore our comprehensive resources to help you make informed decisions about your health and wellbeing.</p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setActiveTab('topics')}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-md"
                >
                  Explore Topics
                </button>
                <button 
                  onClick={() => setActiveTab('resources')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
                >
                  View Resources
                </button>
              </div>
            </div>
            
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search health topics..."
                  className="w-full p-4 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-4">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Health Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredTopics.map(topic => (
                <div 
                  key={topic.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => handleTopicClick(topic)}
                >
                  <img src={topic.image} alt={topic.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{topic.title}</h3>
                    <p className="text-gray-600">{topic.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredTopics.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No health topics found matching your search.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'topics' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Health Topics</h1>
            <p className="text-lg text-gray-600 mb-6">Browse our comprehensive collection of health education topics.</p>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Physical Health</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {healthTopics.slice(0, 2).map(topic => (
                    <div 
                      key={topic.id}
                      className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                      onClick={() => handleTopicClick(topic)}
                    >
                      <h3 className="text-lg font-medium text-teal-700">{topic.title}</h3>
                      <p className="text-gray-600 mt-2">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Mental Wellbeing</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {healthTopics.slice(2, 4).map(topic => (
                    <div 
                      key={topic.id}
                      className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
                      onClick={() => handleTopicClick(topic)}
                    >
                      <h3 className="text-lg font-medium text-blue-700">{topic.title}</h3>
                      <p className="text-gray-600 mt-2">{topic.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'resources' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Health Resources</h1>
            <p className="text-lg text-gray-600 mb-6">Discover valuable tools and resources to support your health journey.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-teal-700 mb-4">Health Assessment Tools</h2>
                <p className="text-gray-600 mb-4">Check your health status with our interactive assessment tools.</p>
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded">
                  Try Health Assessment
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-blue-700 mb-4">Educational Videos</h2>
                <p className="text-gray-600 mb-4">Watch informative videos on various health topics.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
                  Browse Videos
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-purple-700 mb-4">Downloadable Guides</h2>
                <p className="text-gray-600 mb-4">Access comprehensive guides on health and wellness.</p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded">
                  Download Guides
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-green-700 mb-4">Interactive Calculators</h2>
                <p className="text-gray-600 mb-4">Calculate your BMI, calorie needs, and other health metrics.</p>
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
                  Use Calculators
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'about' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">About HealthEdPro</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 mb-4">
                HealthEdPro is dedicated to providing accurate, accessible health education resources to help individuals make informed decisions about their health and wellbeing.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Our mission is to empower people through knowledge, making complex health information easy to understand and apply in everyday life.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                All content on HealthEdPro is developed by healthcare professionals and experts in their fields, ensuring the highest standards of accuracy and relevance.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Contact Us</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700 mb-2">Email: info@healthedpro.example</p>
                <p className="text-gray-700">Phone: (555) 123-4567</p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {showModal && selectedTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-y-auto">
            <div className="relative">
              <img 
                src={selectedTopic.image} 
                alt={selectedTopic.title} 
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedTopic.title}</h2>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-4">{selectedTopic.content}</p>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Key Points</h3>
                <ul className="list-disc pl-5 mb-4">
                  <li className="text-gray-700 mb-2">Important point about {selectedTopic.title.toLowerCase()}</li>
                  <li className="text-gray-700 mb-2">Research-backed information</li>
                  <li className="text-gray-700 mb-2">Practical tips for implementation</li>
                  <li className="text-gray-700 mb-2">Common misconceptions</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Related Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-teal-700">Expert Articles</h4>
                    <p className="text-gray-600 text-sm">In-depth information from health professionals</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <h4 className="font-medium text-blue-700">Video Guides</h4>
                    <p className="text-gray-600 text-sm">Visual explanations and demonstrations</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md mr-3"
                >
                  Close
                </button>
                <button 
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md"
                >
                  Save to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
     <Footer/>
    </div>
  );
};

export default HealthEdPro;