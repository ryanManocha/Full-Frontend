import React from 'react';

const ImageWithBoxes = ({ imageUrl, boundingBoxes = [], className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <img 
        src={imageUrl} 
        alt="Dataset image with bounding boxes"
        className="w-full h-auto rounded-lg"
      />
      
      {/* Render bounding boxes */}
      {boundingBoxes.map((box, index) => (
        <div
          key={index}
          className="absolute border-2 border-blue-500 bg-blue-500/20"
          style={{
            left: `${box.x}%`,
            top: `${box.y}%`,
            width: `${box.width}%`,
            height: `${box.height}%`,
          }}
        >
          {/* Label */}
          <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {box.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageWithBoxes;
