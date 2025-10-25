import React from 'react';

const ProjectItem = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-blue-500';
      case 'training':
        return 'bg-purple-500 animate-pulse';
      case 'generating':
        return 'bg-blue-500 animate-pulse';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Ready';
      case 'training':
        return 'Training';
      case 'generating':
        return 'Generating';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors cursor-pointer group">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
          {project.name}
        </h3>
        <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-gray-600 text-sm">{project.lastModified}</span>
        <span className="text-gray-500 text-xs">{getStatusText(project.status)}</span>
      </div>
    </div>
  );
};

export default ProjectItem;
