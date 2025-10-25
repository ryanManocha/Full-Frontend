// API utility functions for backend communication

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

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
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};

// Dataset API functions
export const getDataset = async (projectId) => {
  return apiRequest(`/api/datasets/${projectId}`);
};

export const createDataset = async (projectData) => {
  return apiRequest('/api/datasets', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
};

export const updateDataset = async (projectId, updates) => {
  return apiRequest(`/api/datasets/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
};

// Local dataset loading (for development)
export const getLocalDataset = async () => {
  const { parsePokemonCSV } = await import('./csvParser');
  return parsePokemonCSV();
};

// Model API functions
export const getModel = async (projectId) => {
  return apiRequest(`/api/models/${projectId}`);
};

export const createModel = async (modelData) => {
  return apiRequest('/api/models', {
    method: 'POST',
    body: JSON.stringify(modelData),
  });
};

export const updateModel = async (projectId, updates) => {
  return apiRequest(`/api/models/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
};

// Project API functions
export const getProjects = async () => {
  return apiRequest('/api/projects');
};

export const getProject = async (projectId) => {
  return apiRequest(`/api/projects/${projectId}`);
};

export const createProject = async (projectData) => {
  return apiRequest('/api/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
};

export const updateProject = async (projectId, updates) => {
  return apiRequest(`/api/projects/${projectId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
};

export const deleteProject = async (projectId) => {
  return apiRequest(`/api/projects/${projectId}`, {
    method: 'DELETE',
  });
};

// File upload function
export const uploadFile = async (file, projectId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('projectId', projectId);

  return apiRequest('/api/upload', {
    method: 'POST',
    headers: {}, // Let browser set Content-Type for FormData
    body: formData,
  });
};

export default {
  getDataset,
  createDataset,
  updateDataset,
  getModel,
  createModel,
  updateModel,
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  uploadFile,
};
