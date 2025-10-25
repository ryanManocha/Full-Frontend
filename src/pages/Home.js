import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChatContainer from '../components/Chat/ChatContainer';

const Home = () => {
  const [chatSubmitted, setChatSubmitted] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const { resetKey } = useOutletContext();

  // Reset state when resetKey changes (New Project button clicked)
  useEffect(() => {
    setChatSubmitted(false);
    setCurrentPrompt('');
  }, [resetKey]);

  return (
    <div className="min-h-full bg-gray-50">
      {!chatSubmitted ? (
        <div className="flex items-center justify-center p-8 min-h-screen">
          <div className="w-full max-w-4xl">
            {/* Feature Announcement */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-blue-700 text-sm mb-6">
                <span>Introducing LovableModels</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* Main Title */}
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
                Build something{' '}
                <span className="gradient-text">LovableModels</span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Create AI object detection models by chatting with AI. Describe what you want to detect, and we'll build it for you.
              </p>
            </div>

            {/* Chat Container */}
            <ChatContainer 
              chatSubmitted={chatSubmitted}
              setChatSubmitted={setChatSubmitted}
              currentPrompt={currentPrompt}
              setCurrentPrompt={setCurrentPrompt}
            />
          </div>
        </div>
      ) : (
        <div className="p-8">
          <ChatContainer 
            chatSubmitted={chatSubmitted}
            setChatSubmitted={setChatSubmitted}
            currentPrompt={currentPrompt}
            setCurrentPrompt={setCurrentPrompt}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
