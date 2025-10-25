import React, { useState, useEffect } from 'react';
import ProgressBar from '../Shared/ProgressBar';
import DatasetViewer from '../DatasetViewer/DatasetViewer';
import { GlowingEffect } from '../ui/glowing-effect.jsx';

const DatasetCard = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('generating');
  const [activeTab, setActiveTab] = useState('overview');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setStatus('completed');
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    switch (status) {
      case 'generating':
        return 'Generating dataset...';
      case 'completed':
        return 'Dataset ready!';
      default:
        return 'Preparing...';
    }
  };

  // Handle escape key to close expanded view
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  return (
    <>
      <div className="relative bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={0}
          inactiveZone={0.5}
          borderWidth={8}
          movementDuration={1}
        />
        {/* Tab Navigation */}
        <div className="border-b border-white/20 relative z-10">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-white/70 hover:text-white hover:border-white/30'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'data'
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-white/70 hover:text-white hover:border-white/30'
              }`}
            >
              Data
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6 relative z-10">
          {activeTab === 'overview' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-semibold">Dataset</h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    status === 'completed' ? 'bg-blue-400' : 'bg-blue-400 animate-pulse'
                  }`}></div>
                  <span className="text-white/70 text-sm">{getStatusText()}</span>
                </div>
              </div>
              
              <ProgressBar progress={progress} />
              
              <div className="text-white/80 text-sm">
                {status === 'generating' ? (
                  <p>Collecting and labeling images for your model...</p>
                ) : (
                  <p>Dataset generated with 1,247 labeled images</p>
                )}
              </div>
              
              {status === 'completed' && (
                <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-white font-semibold">1,247</div>
                      <div className="text-white/70 text-xs">Images</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">15</div>
                      <div className="text-white/70 text-xs">Classes</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">98.2%</div>
                      <div className="text-white/70 text-xs">Quality</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Expand Button */}
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-semibold">Dataset Viewer</h3>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  <span>Expand View</span>
                </button>
              </div>
              
              {/* Compact Preview */}
              <div className="h-96 -m-6">
                <DatasetViewer />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Expanded View */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
          <div className="h-full flex flex-col">
            {/* Expanded Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20 bg-black/20 backdrop-blur-sm">
              <div>
                <h2 className="text-xl font-bold text-white">Pokemon Classification Dataset</h2>
                <p className="text-white/70 text-sm">Full dataset viewer with enhanced navigation</p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors border border-white/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Close</span>
              </button>
            </div>

            {/* Full Screen Content */}
            <div className="flex-1 overflow-hidden">
              <DatasetViewer />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DatasetCard;
