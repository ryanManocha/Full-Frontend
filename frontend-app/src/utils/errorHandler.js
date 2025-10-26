// Error handling utilities for API responses

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

export const getErrorMessage = (error) => {
  // Handle different types of errors
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.response?.data?.detail) {
    return error.response.data.detail;
  }
  
  if (error?.detail) {
    return error.detail;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};

export const isNetworkError = (error) => {
  return error?.message?.includes('fetch') || 
         error?.message?.includes('network') ||
         error?.message?.includes('Failed to fetch');
};

export const isValidationError = (error) => {
  const message = getErrorMessage(error).toLowerCase();
  return message.includes('not found') || 
         message.includes('invalid') ||
         message.includes('could not extract');
};

export const getErrorType = (error) => {
  if (isNetworkError(error)) {
    return 'network';
  }
  if (isValidationError(error)) {
    return 'validation';
  }
  return 'unknown';
};
