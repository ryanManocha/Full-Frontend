import React, { useState } from 'react';
import { GlowingEffect } from '../ui/glowing-effect.jsx';

const ImageGrid = ({ images, viewMode, selectedClass }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-white/40 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No images found</h3>
        <p className="text-white/70">
          {selectedClass !== 'all' 
            ? `No images found for ${selectedClass} class`
            : 'Try adjusting your search or filter criteria'
          }
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(image)}
              className="group cursor-pointer bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105 relative"
            >
              <GlowingEffect
                spread={30}
                glow={false}
                disabled={false}
                proximity={0}
                inactiveZone={0.7}
                borderWidth={3}
                movementDuration={1.5}
              />
              <div className="aspect-square bg-white/10 relative overflow-hidden z-10">
                <img
                  src={image.imageUrl}
                  alt={image.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                        <rect width="200" height="200" fill="#1f2937"/>
                        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="12">${image.name}</text>
                      </svg>
                    `)}`;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-2 relative z-10">
                <h4 className="font-medium text-white text-xs truncate">{image.name}</h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex space-x-1">
                    <span 
                      className="inline-block px-1.5 py-0.5 text-xs rounded-full text-white"
                      style={{ backgroundColor: getTypeColor(image.type1) }}
                    >
                      {image.type1.charAt(0)}
                    </span>
                    {image.type2 && (
                      <span 
                        className="inline-block px-1.5 py-0.5 text-xs rounded-full text-white"
                        style={{ backgroundColor: getTypeColor(image.type2) }}
                      >
                        {image.type2.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-white/70">{image.fileSize}k</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-2">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(image)}
              className="group cursor-pointer bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 hover:shadow-md transition-shadow relative"
            >
              <GlowingEffect
                spread={30}
                glow={false}
                disabled={false}
                proximity={0}
                inactiveZone={0.7}
                borderWidth={3}
                movementDuration={1.5}
              />
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={image.imageUrl}
                    alt={image.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                          <rect width="64" height="64" fill="#1f2937"/>
                          <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="10">${image.name}</text>
                        </svg>
                      `)}`;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">{image.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span 
                      className="inline-block px-2 py-1 text-xs rounded-full text-white"
                      style={{ backgroundColor: getTypeColor(image.type1) }}
                    >
                      {image.type1}
                    </span>
                    {image.type2 && (
                      <span 
                        className="inline-block px-2 py-1 text-xs rounded-full text-white"
                        style={{ backgroundColor: getTypeColor(image.type2) }}
                      >
                        {image.type2}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right text-sm text-white/70">
                  <div>{image.fileSize} kB</div>
                  <div className="text-xs">{image.filename}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg max-w-4xl max-h-full overflow-hidden border border-white/20">
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h3 className="text-lg font-semibold text-white">{selectedImage.name}</h3>
              <button
                onClick={closeModal}
                className="text-white/70 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex space-x-6">
                <div className="flex-1">
                  <img
                    src={selectedImage.imageUrl}
                    alt={selectedImage.name}
                    className="w-full h-96 object-contain bg-white/10 rounded-lg"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                          <rect width="400" height="400" fill="#1f2937"/>
                          <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="16">${selectedImage.name}</text>
                        </svg>
                      `)}`;
                    }}
                  />
                </div>
                <div className="w-64 space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-white/70">Name:</span> {selectedImage.name}</div>
                      <div><span className="text-white/70">File:</span> {selectedImage.filename}</div>
                      <div><span className="text-white/70">Size:</span> {selectedImage.fileSize} kB</div>
                      <div><span className="text-white/70">Type 1:</span> {selectedImage.type1}</div>
                      {selectedImage.type2 && (
                        <div><span className="text-white/70">Type 2:</span> {selectedImage.type2}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Helper function to get type colors
const getTypeColor = (type) => {
  const colors = {
    'Grass': '#4ade80',
    'Fire': '#f87171',
    'Water': '#60a5fa',
    'Bug': '#a3a3a3',
    'Normal': '#d4d4d8',
    'Electric': '#fbbf24',
    'Psychic': '#c084fc',
    'Fighting': '#fb7185',
    'Rock': '#a78bfa',
    'Ground': '#f59e0b',
    'Flying': '#06b6d4',
    'Poison': '#8b5cf6',
    'Ghost': '#6366f1',
    'Dragon': '#ec4899',
    'Steel': '#64748b'
  };
  return colors[type] || '#6b7280';
};

export default ImageGrid;
