import React, { createContext, useContext, useState, useReducer } from 'react';

// UI Context for managing application state
const UIContext = createContext();

// Action types for state management
const UI_ACTIONS = {
  SET_SELECTED_PROJECT: 'SET_SELECTED_PROJECT',
  SET_CHAT_SUBMITTED: 'SET_CHAT_SUBMITTED',
  SET_CURRENT_PROMPT: 'SET_CURRENT_PROMPT',
  SET_DATASET_STATUS: 'SET_DATASET_STATUS',
  SET_MODEL_STATUS: 'SET_MODEL_STATUS',
  RESET_STATE: 'RESET_STATE',
};

// Initial state
const initialState = {
  selectedProjectId: null,
  chatSubmitted: false,
  currentPrompt: '',
  datasetStatus: 'idle', // idle, generating, completed, error
  modelStatus: 'idle', // idle, waiting, training, completed, error
  datasetProgress: 0,
  modelProgress: 0,
};

// Reducer function
const uiReducer = (state, action) => {
  switch (action.type) {
    case UI_ACTIONS.SET_SELECTED_PROJECT:
      return {
        ...state,
        selectedProjectId: action.payload,
      };
    
    case UI_ACTIONS.SET_CHAT_SUBMITTED:
      return {
        ...state,
        chatSubmitted: action.payload,
      };
    
    case UI_ACTIONS.SET_CURRENT_PROMPT:
      return {
        ...state,
        currentPrompt: action.payload,
      };
    
    case UI_ACTIONS.SET_DATASET_STATUS:
      return {
        ...state,
        datasetStatus: action.payload.status,
        datasetProgress: action.payload.progress || state.datasetProgress,
      };
    
    case UI_ACTIONS.SET_MODEL_STATUS:
      return {
        ...state,
        modelStatus: action.payload.status,
        modelProgress: action.payload.progress || state.modelProgress,
      };
    
    case UI_ACTIONS.RESET_STATE:
      return {
        ...initialState,
        selectedProjectId: state.selectedProjectId, // Keep selected project
      };
    
    default:
      return state;
  }
};

// UI Context Provider
export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  // Action creators
  const setSelectedProject = (projectId) => {
    dispatch({
      type: UI_ACTIONS.SET_SELECTED_PROJECT,
      payload: projectId,
    });
  };

  const setChatSubmitted = (submitted) => {
    dispatch({
      type: UI_ACTIONS.SET_CHAT_SUBMITTED,
      payload: submitted,
    });
  };

  const setCurrentPrompt = (prompt) => {
    dispatch({
      type: UI_ACTIONS.SET_CURRENT_PROMPT,
      payload: prompt,
    });
  };

  const setDatasetStatus = (status, progress = 0) => {
    dispatch({
      type: UI_ACTIONS.SET_DATASET_STATUS,
      payload: { status, progress },
    });
  };

  const setModelStatus = (status, progress = 0) => {
    dispatch({
      type: UI_ACTIONS.SET_MODEL_STATUS,
      payload: { status, progress },
    });
  };

  const resetState = () => {
    dispatch({
      type: UI_ACTIONS.RESET_STATE,
    });
  };

  const value = {
    // State
    ...state,
    
    // Actions
    setSelectedProject,
    setChatSubmitted,
    setCurrentPrompt,
    setDatasetStatus,
    setModelStatus,
    resetState,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

// Custom hook to use UI context
export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export default UIContext;
