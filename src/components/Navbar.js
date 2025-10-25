import React from 'react';

const Navbar = () => {
  return (
    <nav className="glass-effect border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-2">
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
          <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium">
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
