import React, { useState, useEffect } from 'react';
import ProgressBar from '../Shared/ProgressBar';
import { GlowingEffect } from '../ui/glowing-effect.jsx';

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
    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <GlowingEffect
            spread={40}
            glow={false}
            disabled={false}
            proximity={0}
            inactiveZone={0.7}
            borderWidth={5}
            movementDuration={1.5}
          />
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Model</h3>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            status === 'completed' ? 'bg-blue-400' : 
            status === 'training' ? 'bg-purple-400 animate-pulse' : 'bg-white/50'
          }`}></div>
          <span className="text-white/70 text-sm">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {status !== 'waiting' && <ProgressBar progress={progress} />}
        
        <div className="text-white/80 text-sm">
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
          <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-white font-semibold">94.7%</div>
                <div className="text-white/70 text-xs">Accuracy</div>
              </div>
              <div>
                <div className="text-white font-semibold">2.3s</div>
                <div className="text-white/70 text-xs">Inference Time</div>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white text-sm font-medium transition-colors">
                Test Model
              </button>
              <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 text-sm font-medium transition-all">
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
