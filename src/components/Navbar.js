import React from 'react';

const Navbar = () => {
  return (
    <nav className="glass-effect border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LM</span>
          </div>
          <span className="text-gray-900 text-xl font-bold">LovableModels</span>
        </div>
        
        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Community</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Enterprise</a>
        </div>
        
        {/* Right side - Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            Log in
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium">
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
