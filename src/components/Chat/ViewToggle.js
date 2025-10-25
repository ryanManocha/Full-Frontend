import React from 'react';

const ViewToggle = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode('grid')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
          viewMode === 'grid'
            ? 'bg-white text-black shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        <span>Grid</span>
      </button>
      
      <button
        onClick={() => setViewMode('list')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
          viewMode === 'list'
            ? 'bg-white text-black shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
        <span>List</span>
      </button>
    </div>
  );
};

export default ViewToggle;
