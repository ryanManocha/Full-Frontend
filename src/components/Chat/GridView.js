import React from 'react';

const GridView = ({ data, onImageClick }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {data.map((pokemon, index) => (
        <div
          key={pokemon.name}
          className="border border-gray-300 hover:border-gray-400 cursor-pointer"
          onClick={() => onImageClick(pokemon, index)}
        >
          {/* Image */}
          <div className="aspect-square bg-gray-50">
            <img
              src={pokemon.imagePath}
              alt={pokemon.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjhmYyIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
              }}
            />
          </div>

          {/* Content */}
          <div className="p-2">
            <div className="text-xs text-gray-900 capitalize truncate">
              {pokemon.name}
            </div>
            <div className="text-xs text-gray-500">
              {pokemon.type1} {pokemon.type2 && `• ${pokemon.type2}`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
