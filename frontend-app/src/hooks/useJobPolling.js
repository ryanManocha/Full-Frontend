import { useState, useEffect, useRef } from 'react';
import { getJobStatus } from '../utils/api';

export const useJobPolling = (jobId, interval = 5000) => {
  const [jobStatus, setJobStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!jobId) {
      setJobStatus(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const poll = async () => {
      try {
        const status = await getJobStatus(jobId);
        setJobStatus(status);
        
        // Stop polling if job is complete or failed
        if (status.status === 'success' || status.status === 'error') {
          setIsLoading(false);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } catch (err) {
        console.error('Error polling job status:', err);
        setError(err.message);
        setIsLoading(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    // Initial poll
    poll();

    // Set up interval polling
    intervalRef.current = setInterval(poll, interval);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [jobId, interval]);

  // Manual stop function
  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsLoading(false);
  };

  return {
    jobStatus,
    isLoading,
    error,
    stopPolling
  };
};
