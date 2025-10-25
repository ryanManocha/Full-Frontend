import React from 'react';

const ClassSidebar = ({ classes, selectedClass, setSelectedClass, totalImages }) => {
  return (
    <div className="w-64 bg-white/10 backdrop-blur-sm border-r border-white/20 overflow-y-auto">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-4">Classes</h3>
        
        {/* All Classes */}
        <div className="mb-4">
          <button
            onClick={() => setSelectedClass('all')}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedClass === 'all'
                ? 'bg-blue-500 text-white font-medium'
                : 'text-white/80 hover:bg-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>All Classes</span>
              <span className="text-sm text-white/70">{totalImages}</span>
            </div>
          </button>
        </div>

        {/* Individual Classes */}
        <div className="space-y-1">
          {classes.map((classItem) => (
            <button
              key={classItem.name}
              onClick={() => setSelectedClass(classItem.name)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                selectedClass === classItem.name
                  ? 'bg-blue-500 text-white font-medium'
                  : 'text-white/80 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: classItem.color }}
                  ></div>
                  <span>{classItem.name}</span>
                </div>
                <span className="text-sm text-white/70">{classItem.count}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassSidebar;
