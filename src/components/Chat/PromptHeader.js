import React from 'react';

const PromptHeader = ({ prompt }) => {
  return (
    <div className="glass-effect rounded-xl p-6 border border-gray-200 animate-slide-up">
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        <h3 className="text-gray-900 text-lg font-medium">Creating model for:</h3>
      </div>
      <p className="text-gray-700 text-lg mt-2 ml-6">"{prompt}"</p>
    </div>
  );
};

export default PromptHeader;
