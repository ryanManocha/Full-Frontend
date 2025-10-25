import React, { useState, useEffect } from 'react';
import ProgressBar from '../Shared/ProgressBar';
import DatasetViewer from './DatasetViewer';

const DatasetCard = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('generating');

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

  return (
    <div className="glass-effect rounded-xl border border-gray-200">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-gray-900 text-lg font-semibold">Dataset</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'completed' ? 'bg-black' : 'bg-black animate-pulse'
          }`}></div>
          <span className="text-gray-600 text-sm">{getStatusText()}</span>
        </div>
      </div>
      
      <div>
        {status === 'generating' ? (
          <div className="p-6 space-y-4">
            <ProgressBar progress={progress} />
            
            <div className="text-gray-700 text-sm">
              <p>Collecting and labeling images for your model...</p>
            </div>
          </div>
        ) : (
          <div className="max-h-[600px] overflow-auto">
            <DatasetViewer />
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetCard;
