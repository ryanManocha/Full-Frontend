import React, { useState } from 'react';
import ProjectList from './ProjectList';

const Sidebar = ({ onNewProject }) => {
  const [projects] = useState([]);

  const handleNewProject = () => {
    if (onNewProject) {
      onNewProject();
    }
  };

  return (
    <div className="h-full glass-effect border-r border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-gray-900 text-lg font-semibold mb-2">Your Projects</h2>
        <p className="text-gray-600 text-sm">Create AI models with natural language</p>
      </div>
      
      {/* Projects List */}
      <div className="flex-1 overflow-y-auto">
        {projects.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-gray-900 font-medium mb-2">No projects yet</h3>
            <p className="text-gray-500 text-sm">Create your first AI model to get started</p>
          </div>
        ) : (
          <ProjectList projects={projects} />
        )}
      </div>
      
      {/* Sidebar Footer */}
      <div className="p-6 border-t border-gray-200">
        <button 
          onClick={handleNewProject}
          className="w-full px-4 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-all"
        >
          + New Project
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
