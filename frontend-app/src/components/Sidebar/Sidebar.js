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
    <div className="h-full bg-black/20 backdrop-blur-sm border-r border-black/30 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-black/30">
        <h2 className="text-white text-lg font-semibold mb-2 mix-blend-exclusion">Your Projects</h2>
        <p className="text-white/70 text-sm">Create AI models with natural language</p>
      </div>
      
      {/* Projects List */}
      <div className="flex-1 overflow-y-auto">
        {projects.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
              <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2 mix-blend-exclusion">No projects yet</h3>
            <p className="text-white/60 text-sm">Create your first AI model to get started</p>
          </div>
        ) : (
          <ProjectList projects={projects} />
        )}
      </div>
      
      {/* Sidebar Footer */}
      <div className="p-6 border-t border-black/30">
        <button 
          onClick={handleNewProject}
          className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-lg font-medium transition-all border border-white/30"
        >
          + New Project
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
