import React, { useState, useEffect, useMemo } from 'react';
import { parsePokemonCSV, getUniqueValues } from '../../utils/csvParser';
import GridView from './GridView';
import ListView from './ListView';
import DatasetFilters from './DatasetFilters';
import ViewToggle from './ViewToggle';
import ImageDetailModal from './ImageDetailModal';

const DatasetViewer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // View state
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [type1Filter, setType1Filter] = useState('');
  const [type2Filter, setType2Filter] = useState('');
  const [evolutionFilter, setEvolutionFilter] = useState('all'); // 'all', 'has-evolution', 'no-evolution'
  
  // Modal state
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const pokemonData = await parsePokemonCSV();
        setData(pokemonData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    return data.filter(pokemon => {
      // Search filter
      if (searchTerm && !pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Type1 filter
      if (type1Filter && pokemon.type1 !== type1Filter) {
        return false;
      }

      // Type2 filter
      if (type2Filter && pokemon.type2 !== type2Filter) {
        return false;
      }

      // Evolution filter
      if (evolutionFilter === 'has-evolution' && !pokemon.evolution) {
        return false;
      }
      if (evolutionFilter === 'no-evolution' && pokemon.evolution) {
        return false;
      }

      return true;
    });
  }, [data, searchTerm, type1Filter, type2Filter, evolutionFilter]);

  // Get unique values for filter dropdowns
  const uniqueType1s = useMemo(() => getUniqueValues(data, 'type1'), [data]);
  const uniqueType2s = useMemo(() => getUniqueValues(data, 'type2'), [data]);

  // Handle image selection
  const handleImageClick = (pokemon, index) => {
    setSelectedImage({ ...pokemon, index });
    setIsModalOpen(true);
  };

  // Handle modal navigation
  const handlePrevious = () => {
    if (selectedImage && selectedImage.index > 0) {
      const prevPokemon = filteredData[selectedImage.index - 1];
      setSelectedImage({ ...prevPokemon, index: selectedImage.index - 1 });
    }
  };

  const handleNext = () => {
    if (selectedImage && selectedImage.index < filteredData.length - 1) {
      const nextPokemon = filteredData[selectedImage.index + 1];
      setSelectedImage({ ...nextPokemon, index: selectedImage.index + 1 });
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setType1Filter('');
    setType2Filter('');
    setEvolutionFilter('all');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dataset...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-600 mb-4">Error loading dataset: {error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">Dataset</h3>
            <p className="text-xs text-gray-500">
              {filteredData.length} of {data.length} items
            </p>
          </div>
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-300">
        <DatasetFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          type1Filter={type1Filter}
          setType1Filter={setType1Filter}
          type2Filter={type2Filter}
          setType2Filter={setType2Filter}
          evolutionFilter={evolutionFilter}
          setEvolutionFilter={setEvolutionFilter}
          uniqueType1s={uniqueType1s}
          uniqueType2s={uniqueType2s}
          clearFilters={clearFilters}
        />
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto">
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">No items match your filters</p>
              <button 
                onClick={clearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {viewMode === 'grid' ? (
              <GridView 
                data={filteredData} 
                onImageClick={handleImageClick}
              />
            ) : (
              <ListView 
                data={filteredData} 
                onImageClick={handleImageClick}
              />
            )}
          </div>
        )}
      </div>

      {/* Image Detail Modal */}
      {isModalOpen && selectedImage && (
        <ImageDetailModal
          pokemon={selectedImage}
          onClose={() => setIsModalOpen(false)}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={selectedImage.index > 0}
          hasNext={selectedImage.index < filteredData.length - 1}
        />
      )}
    </div>
  );
};

export default DatasetViewer;
