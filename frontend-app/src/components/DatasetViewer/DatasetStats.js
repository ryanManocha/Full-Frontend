import React from 'react';

const DatasetStats = ({ totalImages, totalClasses, selectedClass }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalImages}</div>
            <div className="text-sm text-gray-600">Images</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalClasses}</div>
            <div className="text-sm text-gray-600">Classes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">98.2%</div>
            <div className="text-sm text-gray-600">Quality</div>
          </div>
        </div>
        
        {selectedClass !== 'all' && (
          <div className="text-sm text-gray-600">
            Showing: <span className="font-medium text-gray-900">{selectedClass}</span> class
          </div>
        )}
      </div>
    </div>
  );
};

export default DatasetStats;
