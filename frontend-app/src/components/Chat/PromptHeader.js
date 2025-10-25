import React from 'react';
import { GlowingEffect } from '../ui/glowing-effect.jsx';

const PromptHeader = ({ prompt }) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-slide-up">
          <GlowingEffect
            spread={40}
            glow={false}
            disabled={false}
            proximity={0}
            inactiveZone={0.7}
            borderWidth={5}
            movementDuration={1.5}
          />
      <div className="flex items-center space-x-3">
        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
        <h3 className="text-white text-lg font-medium">Creating model for:</h3>
      </div>
      <p className="text-white/80 text-lg mt-2 ml-6">"{prompt}"</p>
    </div>
  );
};

export default PromptHeader;
