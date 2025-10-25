import React from 'react';
import ChatInput from './ChatInput';
import PromptHeader from './PromptHeader';
import DatasetCard from './DatasetCard';
import ModelCard from './ModelCard';

const ChatContainer = ({ chatSubmitted, setChatSubmitted, currentPrompt, setCurrentPrompt }) => {
  return (
    <div className="w-full">
      {!chatSubmitted ? (
        <ChatInput 
          setChatSubmitted={setChatSubmitted}
          setCurrentPrompt={setCurrentPrompt}
        />
      ) : (
        <div className="space-y-8">
          {/* Prompt Header - Animated to top */}
          <div className="animate-slide-up">
            <PromptHeader prompt={currentPrompt} />
          </div>
          
          {/* Cards Container */}
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <DatasetCard />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <ModelCard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
