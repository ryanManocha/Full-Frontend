import React, { useState, useEffect } from 'react';
import ProgressBar from '../Shared/ProgressBar';

const ModelCard = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('waiting');

  useEffect(() => {
    // Start training after dataset is ready (simulate delay)
    const timer = setTimeout(() => {
      setStatus('training');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'training') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setStatus('completed');
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 6;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status]);

  const getStatusText = () => {
    switch (status) {
      case 'waiting':
        return 'Waiting for dataset...';
      case 'training':
        return 'Training model...';
      case 'completed':
        return 'Model ready!';
      default:
        return 'Preparing...';
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 text-lg font-semibold">Model</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'completed' ? 'bg-blue-500' : 
            status === 'training' ? 'bg-purple-500 animate-pulse' : 'bg-gray-500'
          }`}></div>
          <span className="text-gray-600 text-sm">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {status !== 'waiting' && <ProgressBar progress={progress} />}
        
        <div className="text-gray-700 text-sm">
          {status === 'waiting' && (
            <p>Waiting for dataset to be ready...</p>
          )}
          {status === 'training' && (
            <p>Training your AI model with the generated dataset...</p>
          )}
          {status === 'completed' && (
            <p>Model trained successfully and ready for use!</p>
          )}
        </div>
        
        {status === 'completed' && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-gray-900 font-semibold">94.7%</div>
                <div className="text-gray-600 text-xs">Accuracy</div>
              </div>
              <div>
                <div className="text-gray-900 font-semibold">2.3s</div>
                <div className="text-gray-600 text-xs">Inference Time</div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium transition-colors">
                Test Model
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 text-sm font-medium transition-all">
                Deploy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelCard;
