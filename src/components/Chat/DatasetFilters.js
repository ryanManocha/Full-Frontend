import React from 'react';

const DatasetFilters = ({
  searchTerm,
  setSearchTerm,
  type1Filter,
  setType1Filter,
  type2Filter,
  setType2Filter,
  evolutionFilter,
  setEvolutionFilter,
  uniqueType1s,
  uniqueType2s,
  clearFilters
}) => {
  const hasActiveFilters = searchTerm || type1Filter || type2Filter || evolutionFilter !== 'all';

  return (
    <div className="flex items-center gap-4">
      {/* Search */}
      <div className="flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="w-full px-3 py-1 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <select
          value={type1Filter}
          onChange={(e) => setType1Filter(e.target.value)}
          className="px-2 py-1 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">Type 1</option>
          {uniqueType1s.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={type2Filter}
          onChange={(e) => setType2Filter(e.target.value)}
          className="px-2 py-1 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">Type 2</option>
          {uniqueType2s.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={evolutionFilter}
          onChange={(e) => setEvolutionFilter(e.target.value)}
          className="px-2 py-1 border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="all">Evolution</option>
          <option value="has-evolution">Has Evolution</option>
          <option value="no-evolution">No Evolution</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            Clear
          </button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm('')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {type1Filter && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                Type 1: {type1Filter}
                <button
                  onClick={() => setType1Filter('')}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {type2Filter && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                Type 2: {type2Filter}
                <button
                  onClick={() => setType2Filter('')}
                  className="ml-1 text-purple-600 hover:text-purple-800"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            
            {evolutionFilter !== 'all' && (
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Evolution: {evolutionFilter === 'has-evolution' ? 'Has Evolution' : 'No Evolution'}
                <button
                  onClick={() => setEvolutionFilter('all')}
                  className="ml-1 text-green-600 hover:text-green-800"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatasetFilters;
