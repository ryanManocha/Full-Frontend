import React, { useState, useEffect } from 'react';
import ProgressBar from '../Shared/ProgressBar';

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
    <div className="glass-effect rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 text-lg font-semibold">Dataset</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'completed' ? 'bg-blue-500' : 'bg-blue-500 animate-pulse'
          }`}></div>
          <span className="text-gray-600 text-sm">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <ProgressBar progress={progress} />
        
        <div className="text-gray-700 text-sm">
          {status === 'generating' ? (
            <p>Collecting and labeling images for your model...</p>
          ) : (
            <p>Dataset generated with 1,247 labeled images</p>
          )}
        </div>
        
        {status === 'completed' && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-gray-900 font-semibold">1,247</div>
                <div className="text-gray-600 text-xs">Images</div>
              </div>
              <div>
                <div className="text-gray-900 font-semibold">15</div>
                <div className="text-gray-600 text-xs">Classes</div>
              </div>
              <div>
                <div className="text-gray-900 font-semibold">98.2%</div>
                <div className="text-gray-600 text-xs">Quality</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetCard;
