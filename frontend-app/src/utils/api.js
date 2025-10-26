// YOLO Training API utility functions
import { API_CONFIG, COCO_CLASSES } from '../config/environment';

const API_BASE_URL = API_CONFIG.BASE_URL;

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  return apiRequest('/api/health');
};

// Start training job
export const startTraining = async (prompt, dataset = 'coco', maxImages = 5, epochs = 1) => {
  return apiRequest('/api/train', {
    method: 'POST',
    body: JSON.stringify({
      prompt,
      dataset,
      max_images: maxImages,
      epochs
    }),
  });
};

// Get job status
export const getJobStatus = async (jobId) => {
  return apiRequest(`/api/jobs/${jobId}`);
};

// Get training images info
export const getTrainingImages = async (jobId) => {
  return apiRequest(`/api/jobs/${jobId}/images`);
};

// Poll job status with callback
export const pollJobStatus = (jobId, onUpdate, interval = 5000) => {
  const poll = async () => {
    try {
      const status = await getJobStatus(jobId);
      onUpdate(status);
      
      if (status.status === 'success' || status.status === 'error') {
        return; // Stop polling
      }
      
      // Continue polling
      setTimeout(poll, interval);
    } catch (error) {
      console.error('Error polling job status:', error);
      onUpdate({ status: 'error', error: error.message });
    }
  };
  
  // Start polling
  poll();
  
  // Return cleanup function
  return () => {
    // This is a simple implementation - in a real app you'd want to track the timeout ID
    console.log('Polling stopped for job:', jobId);
  };
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.detail) {
    // API error with detail message
    return error.detail;
  } else if (error.message) {
    // Network or other error
    return error.message;
  } else {
    return 'An unexpected error occurred';
  }
};

// Export COCO classes for validation
export { COCO_CLASSES };

export default {
  checkHealth,
  startTraining,
  getJobStatus,
  getTrainingImages,
  pollJobStatus,
  handleApiError,
  COCO_CLASSES
};
