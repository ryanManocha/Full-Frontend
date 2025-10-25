import React from 'react';
import { useParams } from 'react-router-dom';
import { GlowingEffect } from '../components/ui/glowing-effect.jsx';

const ProjectView = () => {
  const { id } = useParams();

  return (
    <div className="flex-1 p-8 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6 mix-blend-exclusion">Project {id}</h1>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 relative">
          <GlowingEffect
            spread={40}
            glow={false}
            disabled={false}
            proximity={0}
            inactiveZone={0.7}
            borderWidth={5}
            movementDuration={1.5}
          />
          <div className="relative z-10">
            <p className="text-white/80">Project details will be displayed here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
