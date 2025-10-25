import React from 'react';
import { GlowingEffect } from './ui/glowing-effect.jsx';

const Navbar = () => {
  return (
    <nav className="bg-black/20 backdrop-blur-sm border-b border-black/30 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LM</span>
          </div>
          <span className="text-white text-xl font-bold mix-blend-exclusion">LovableModels</span>
        </div>
        
        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white/70 hover:text-white transition-colors">Community</a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-white/70 hover:text-white transition-colors">Enterprise</a>
        </div>
        
        {/* Right side - Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-white/70 hover:text-white transition-colors">
            Log in
          </button>
          <button className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all font-medium border border-white/30 relative">
            <GlowingEffect
              spread={30}
              glow={false}
              disabled={false}
              proximity={0}
              inactiveZone={0.7}
              borderWidth={3}
              movementDuration={1.5}
            />
            <span className="relative z-10">Get started</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
