import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectView = () => {
  const { id } = useParams();

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Project {id}</h1>
        <div className="glass-effect rounded-xl p-6 border border-gray-200">
          <p className="text-gray-700">Project details will be displayed here...</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
