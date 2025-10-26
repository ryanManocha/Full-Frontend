import React, { useState, useRef } from 'react';
import { GlassButton } from '../ui/glass-button.tsx';
import { useUI } from '../../context/UIContext';
import { startTraining, handleApiError, COCO_CLASSES } from '../../utils/api';

const ChatInput = ({ setChatSubmitted, setCurrentPrompt }) => {
  const [inputValue, setInputValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [maxImages, setMaxImages] = useState(10);
  const [epochs, setEpochs] = useState(5);
  const fileInputRef = useRef(null);
  
  const { setCurrentJobId, setError: setGlobalError } = useUI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      setIsLoading(true);
      setError(null);
      setGlobalError(null);
      
      try {
        // Start training with the prompt using user-specified parameters
        const result = await startTraining(inputValue.trim(), 'coco', maxImages, epochs);
        
        // Store the job ID and update UI
        setCurrentJobId(result.job_id);
        setCurrentPrompt(inputValue.trim());
        setChatSubmitted(true);
        
        console.log('Training started:', result);
      } catch (err) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
        setGlobalError(errorMessage);
        console.error('Training failed:', errorMessage);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleLinkClick = () => {
    setShowLinkInput(!showLinkInput);
  };

  const addLink = () => {
    if (linkInput.trim()) {
      setLinks(prev => [...prev, linkInput.trim()]);
      setLinkInput('');
      setShowLinkInput(false);
    }
  };

  const removeLink = (index) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}
        
        {/* Main Input */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask LovableModels to create a model that detects..."
            className="w-full bg-transparent text-white placeholder-white/60 text-lg focus:outline-none"
          />
          
          {/* Attached Files Display */}
          {attachedFiles.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm text-white truncate max-w-32">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-white/70 hover:text-white"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Links Display */}
          {links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {links.map((link, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-white truncate max-w-48 hover:text-white/80"
                  >
                    {link}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="text-white/70 hover:text-white"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Link Input */}
          {showLinkInput && (
            <div className="mt-3 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="Enter URL (dataset, documentation, etc.)"
                  className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-md text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  onKeyPress={(e) => e.key === 'Enter' && addLink()}
                />
                <button
                  type="button"
                  onClick={addLink}
                  className="px-4 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors text-sm border border-white/30"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowLinkInput(false)}
                  className="px-4 py-2 bg-white/10 text-white/80 rounded-md hover:bg-white/20 transition-colors text-sm border border-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          
          {/* Bottom Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleAttachClick}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm">Attach</span>
              </button>
              
              <button
                type="button"
                onClick={handleLinkClick}
                className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-sm">Links</span>
              </button>
            </div>
            
            {/* Training Parameters */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-white/70 text-sm font-medium">Images:</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={maxImages}
                  onChange={(e) => setMaxImages(parseInt(e.target.value) || 10)}
                  className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-white/70 text-sm font-medium">Epochs:</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={epochs}
                  onChange={(e) => setEpochs(parseInt(e.target.value) || 5)}
                  className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                className="p-2 text-white/70 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
              
              <GlassButton
                type="submit"
                size="icon"
                contentClassName="flex items-center justify-center"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;