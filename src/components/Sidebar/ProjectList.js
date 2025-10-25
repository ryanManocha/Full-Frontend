import React from 'react';
import ProjectItem from './ProjectItem';

const ProjectList = ({ projects }) => {
  return (
    <div className="p-4 space-y-2">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
