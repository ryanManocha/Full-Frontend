import React, { useState } from 'react';

const ListView = ({ data, onImageClick }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';
    
    // Handle empty values
    if (!aVal && !bVal) return 0;
    if (!aVal) return 1;
    if (!bVal) return -1;
    
    // String comparison
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.toLowerCase().localeCompare(bVal.toLowerCase());
      return sortDirection === 'asc' ? comparison : -comparison;
    }
    
    // Numeric comparison
    const comparison = aVal - bVal;
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return sortDirection === 'asc' ? (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <div className="border border-gray-300">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
              <th 
                className="px-4 py-2 text-left text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  <SortIcon field="name" />
                </div>
              </th>
              <th 
                className="px-4 py-2 text-left text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type1')}
              >
                <div className="flex items-center space-x-1">
                  <span>Type 1</span>
                  <SortIcon field="type1" />
                </div>
              </th>
              <th 
                className="px-4 py-2 text-left text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('type2')}
              >
                <div className="flex items-center space-x-1">
                  <span>Type 2</span>
                  <SortIcon field="type2" />
                </div>
              </th>
              <th 
                className="px-4 py-2 text-left text-xs font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('evolution')}
              >
                <div className="flex items-center space-x-1">
                  <span>Evolution</span>
                  <SortIcon field="evolution" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {sortedData.map((pokemon, index) => (
              <tr 
                key={pokemon.name}
                className="hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => onImageClick(pokemon, index)}
              >
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <img
                      src={pokemon.imagePath}
                      alt={pokemon.name}
                      className="w-8 h-8 object-cover bg-gray-100"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjZjdmOGZjIi8+PHRleHQgeD0iMTYiIHk9IjE2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                    <span className="text-sm text-gray-900 capitalize">
                      {pokemon.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {pokemon.type1 || '—'}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {pokemon.type2 || '—'}
                  </span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {pokemon.evolution || '—'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListView;
