import { useState, useRef, useEffect } from 'react';
import API from "../../Api.env";
const MentalHealthChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m here to provide support and listen. How are you feeling today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const CRISIS_RESOURCES = [
    { name: 'National Suicide Prevention Lifeline', contact: '988 or 1-800-273-8255' },
    { name: 'Crisis Text Line', contact: 'Text HOME to 741741' },
    { name: 'SAMHSA National Helpline', contact: '1-800-662-HELP (4357)' },
    { name: 'National Alliance on Mental Illness Helpline', contact: '1-800-950-NAMI (6264)' }
  ];

  const EMOJI_OPTIONS = ['😊', '😔', '😢', '😰', '😡', '😴', '🙂', '❤️', '🙏', '✨'];

  const detectCrisisTerms = (text) => {
    const crisisTerms = ['suicide', 'kill myself', 'die', 'end my life', 'hurt myself'];
    return crisisTerms.some(term => text.toLowerCase().includes(term));
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    
    if (detectCrisisTerms(input)) {
      setShowResources(true);
    }
    
    setInput('');
    setIsLoading(true);
    setShowEmojis(false);

    try {
      setTimeout(() => {
        setIsTyping(true);
      }, 500);

      const previousMessages = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const currentMessage = {
        role: 'user',
        parts: [{ text: input }]
      };

      const requestBody = {
        contents: [
          ...previousMessages,
          currentMessage
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ],
        systemInstruction: {
          parts: [{
            text: `You are a supportive, compassionate mental health assistant. Your goal is to provide a safe space for users to express their feelings and get support. 
            
            Guidelines:
            - Be empathetic and non-judgmental
            - Ask open-ended questions to encourage reflection
            - Suggest healthy coping mechanisms when appropriate
            - Encourage professional help for serious concerns
            - Never diagnose or prescribe medication
            - Prioritize user safety - if someone expresses thoughts of self-harm, encourage them to seek immediate professional help
            - Maintain a warm, supportive tone
            - Focus on validation and emotional support
            - Avoid generic platitudes like "everything will be fine"
            - Respect privacy and confidentiality
            
            Important: If someone is in crisis or danger, always recommend appropriate crisis resources.`
          }]
        }
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      const assistantResponseText = data.candidates[0].content.parts[0].text;

      if (detectCrisisTerms(assistantResponseText)) {
        setShowResources(true);
      }
      
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: assistantResponseText
      }]);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInput(prev => prev + emoji);
    inputRef.current?.focus();
    setShowEmojis(false);
  };

  const handleInputFocus = () => {
    setShowResources(false);
  };

  const toggleResources = () => {
    setShowResources(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 mt-23">
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        <div className="fixed top-4 right-4 z-50">
          <button 
            onClick={toggleResources}
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-2 shadow-lg transition-colors mt-25"
            aria-label="Resources"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 rounded-lg p-3 max-w-xs md:max-w-md">
              <div className="flex space-x-2 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
        )}

        {showResources && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-lg shadow-md mx-auto max-w-md">
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="ml-2 text-base font-bold text-yellow-800">Crisis Resources</h3>
                <button
                  onClick={() => setShowResources(false)}
                  className="ml-auto text-yellow-700 hover:text-yellow-800"
                  aria-label="Close"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-white rounded-md p-2 shadow-inner text-sm">
                <ul className="space-y-1">
                  {CRISIS_RESOURCES.map((resource, i) => (
                    <li key={i} className="py-1 border-b border-yellow-100 last:border-b-0">
                      <div className="font-medium text-yellow-900">{resource.name}</div>
                      <div className="text-yellow-800">{resource.contact}</div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-2 text-xs text-yellow-700 text-center">
                These resources are available 24/7 and are staffed by trained professionals.
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white fixed bottom-0 left-0 right-0 z-10 shadow-lg">
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setShowEmojis(!showEmojis)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading || isTyping}
          />

          <button
            type="submit"
            disabled={isLoading || isTyping || !input.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>

        {showEmojis && (
          <div className="absolute bottom-16 left-0 right-0 mx-4 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="flex flex-wrap">
              {EMOJI_OPTIONS.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleEmojiSelect(emoji)}
                  className="p-2 text-xl hover:bg-gray-100 rounded-full"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mood check-in reminder - shows occasionally */}
        {Math.random() > 0.3 && messages.length > 3 && (
          <div className="mt-2 text-xs text-gray-800 text-center">
            Remember to take a moment for yourself. How are you feeling right now?
          </div>
        )}
      </form>
    </div>
  );
};

export default MentalHealthChatbot;