import React, { useEffect } from 'react';

const ImageDetailModal = ({ 
  pokemon, 
  onClose, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext 
}) => {
  // Handle keyboard navigation and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      }
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">
              {pokemon.name}
            </h2>
            <p className="text-gray-600">
              {pokemon.index + 1} of {pokemon.total || '?'} items
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row max-h-[calc(95vh-120px)] overflow-hidden">
          {/* Image Section */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="relative">
              <img
                src={pokemon.imagePath}
                alt={pokemon.name}
                className="w-full h-auto max-h-none object-contain rounded-lg bg-gray-50"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y3ZjhmYyIvPjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+PC9zdmc+';
                }}
              />
              
              {/* Navigation Arrows */}
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-black hover:text-gray-800 p-2 rounded-full shadow-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              
              {hasNext && (
                <button
                  onClick={onNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-black hover:text-gray-800 p-2 rounded-full shadow-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Metadata Section */}
          <div className="lg:w-80 p-6 bg-gray-50 border-l border-gray-200 overflow-auto">
            <div className="space-y-6">
              {/* Types */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Types</h3>
                <div className="space-y-2">
                  {pokemon.type1 && (
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex px-3 py-1 text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full">
                        {pokemon.type1}
                      </span>
                      <span className="text-sm text-gray-600">Primary</span>
                    </div>
                  )}
                  {pokemon.type2 && (
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex px-3 py-1 text-sm font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full">
                        {pokemon.type2}
                      </span>
                      <span className="text-sm text-gray-600">Secondary</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Evolution */}
              {pokemon.evolution && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Evolution</h3>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <span className="text-sm text-gray-700 capitalize">{pokemon.evolution}</span>
                  </div>
                </div>
              )}

              {/* Navigation Info */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2">Navigation</p>
                <div className="space-y-1 text-xs text-gray-600">
                  <div>• Click outside to close</div>
                  <div>• Use arrow keys to navigate</div>
                  <div>• Press Esc to close</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageDetailModal;
