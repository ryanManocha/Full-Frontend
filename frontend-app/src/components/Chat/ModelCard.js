import React, { useState, useEffect } from 'react';
import ProgressBar from '../Shared/ProgressBar';
import { GlowingEffect } from '../ui/glowing-effect.jsx';
import { useUI } from '../../context/UIContext';
import { useJobPolling } from '../../hooks/useJobPolling';

const ModelCard = () => {
  const { currentJobId, setModelUrl, setModelSize, setModelStatus, isDatasetViewerExpanded } = useUI();
  
  // Use job polling hook
  const { jobStatus, isLoading, error } = useJobPolling(currentJobId);

  // Update global state when job status changes (only when jobStatus actually changes)
  useEffect(() => {
    if (jobStatus) {
      if (jobStatus.model_url) {
        setModelUrl(jobStatus.model_url);
      }
      if (jobStatus.model_size_mb) {
        setModelSize(jobStatus.model_size_mb);
      }
      
      if (jobStatus.status === 'training') {
        setModelStatus('training', 50);
      } else if (jobStatus.status === 'success') {
        setModelStatus('completed', 100);
      } else if (jobStatus.status === 'error') {
        setModelStatus('error', 0);
      }
    }
  }, [jobStatus?.status, jobStatus?.model_url, jobStatus?.model_size_mb]); // Only depend on the actual values

  const getStatusText = () => {
    if (!currentJobId) return 'Waiting for training...';
    
    if (isLoading) return 'Checking status...';
    
    if (error) return 'Error occurred';
    
    if (jobStatus) {
      switch (jobStatus.status) {
        case 'training':
          return 'Training model...';
        case 'success':
          return 'Model ready!';
        case 'error':
          return 'Training failed';
        default:
          return 'Preparing...';
      }
    }
    
    return 'Starting training...';
  };

  const getProgress = () => {
    if (!currentJobId) return 0;
    if (jobStatus?.status === 'success') return 100;
    if (jobStatus?.status === 'training') return 50;
    return 0;
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
            jobStatus?.status === 'success' ? 'bg-blue-400' : 
            jobStatus?.status === 'error' ? 'bg-red-400' :
            jobStatus?.status === 'training' ? 'bg-purple-400 animate-pulse' : 'bg-white/50'
          }`}></div>
          <span className="text-white/70 text-sm">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {currentJobId && <ProgressBar progress={getProgress()} />}
        
        <div className="text-white/80 text-sm">
          {!currentJobId && (
            <p>Waiting for training to start...</p>
          )}
          {jobStatus?.status === 'training' && (
            <p>Training your YOLO model with COCO dataset...</p>
          )}
          {jobStatus?.status === 'success' && (
            <p>Model trained successfully and ready for use!</p>
          )}
          {jobStatus?.status === 'error' && (
            <p className="text-red-300">Training failed: {error}</p>
          )}
        </div>
        
        {jobStatus?.status === 'success' && (
          <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-white font-semibold">{jobStatus.model_size_mb || 0}MB</div>
                <div className="text-white/70 text-xs">Model Size</div>
              </div>
              <div>
                <div className="text-white font-semibold">YOLOv8</div>
                <div className="text-white/70 text-xs">Architecture</div>
              </div>
            </div>
            
                {!isDatasetViewerExpanded && (
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white text-sm font-medium transition-colors">
                      Test Model
                    </button>
                    {jobStatus.model_url && (
                      <a
                        href={jobStatus.model_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 text-sm font-medium transition-all text-center"
                      >
                        Download Model
                      </a>
                    )}
                  </div>
                )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelCard;
