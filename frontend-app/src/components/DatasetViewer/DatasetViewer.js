import React, { useState, useEffect, useMemo } from 'react';
import DatasetStats from './DatasetStats';
import ImageGrid from './ImageGrid';
import ClassSidebar from './ClassSidebar';
import DatasetHeader from './DatasetHeader';
import { useUI } from '../../context/UIContext';
import { getTrainingImages } from '../../utils/api';

const DatasetViewer = () => {
  const [datasetData, setDatasetData] = useState(null);
  const [selectedClass, setSelectedClass] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { currentJobId, jobStatus } = useUI();

  // Parse CSV data
  const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
  };

  // Get type color
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

  // Load dataset data from Supabase
  useEffect(() => {
    const loadDataset = async () => {
      if (!currentJobId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Get Supabase connection info from backend
        const imageInfo = await getTrainingImages(currentJobId);
        
        // For now, show a placeholder until we implement Supabase client
        const datasetData = {
          name: 'YOLO Training Dataset',
          description: `Training images for ${jobStatus?.class_trained || 'object detection'} model`,
          totalImages: jobStatus?.training_images || 0,
          classes: [
            { 
              name: jobStatus?.class_trained || 'object', 
              count: jobStatus?.training_images || 0, 
              color: '#3b82f6' 
            }
          ],
          images: generatePlaceholderImages(jobStatus?.training_images || 0, jobStatus?.class_trained || 'object')
        };
        
        setDatasetData(datasetData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading dataset:', error);
        setError('Failed to load training images');
        setLoading(false);
      }
    };

    loadDataset();
  }, [currentJobId, jobStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  // Generate placeholder images for training dataset
  const generatePlaceholderImages = (count, className) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      name: `${className}_${index + 1}`,
      filename: `${className}_${index + 1}.jpg`,
      type1: className,
      type2: null,
      fileSize: Math.floor(Math.random() * 100 + 50), // 50-150 kB
      imageUrl: `https://via.placeholder.com/640x480/3b82f6/ffffff?text=${className}+${index + 1}`,
      confidence: Math.random() * 0.3 + 0.7 // 0.7-1.0
    }));
  };

  // Generate mock image data based on Pokemon names
  const generateMockImages = () => {
    const pokemonNames = [
      'bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard',
      'squirtle', 'wartortle', 'blastoise', 'caterpie', 'metapod', 'butterfree',
      'weedle', 'kakuna', 'beedrill', 'pidgey', 'pidgeotto', 'pidgeot',
      'rattata', 'raticate', 'spearow', 'fearow', 'ekans', 'arbok',
      'pikachu', 'raichu', 'sandshrew', 'sandslash', 'nidoran-f', 'nidorina',
      'nidoqueen', 'nidoran-m', 'nidorino', 'nidoking', 'clefairy', 'clefable',
      'vulpix', 'ninetales', 'jigglypuff', 'wigglytuff', 'zubat', 'golbat',
      'oddish', 'gloom', 'vileplume', 'paras', 'parasect', 'venonat',
      'venomoth', 'diglett', 'dugtrio', 'meowth', 'persian', 'psyduck',
      'golduck', 'mankey', 'primeape', 'growlithe', 'arcanine', 'poliwag',
      'poliwhirl', 'poliwrath', 'abra', 'kadabra', 'alakazam', 'machop',
      'machoke', 'machamp', 'bellsprout', 'weepinbell', 'victreebel', 'tentacool',
      'tentacruel', 'geodude', 'graveler', 'golem', 'ponyta', 'rapidash',
      'slowpoke', 'slowbro', 'magnemite', 'magneton', 'farfetchd', 'doduo',
      'dodrio', 'seel', 'dewgong', 'grimer', 'muk', 'shellder', 'cloyster',
      'gastly', 'haunter', 'gengar', 'onix', 'drowzee', 'hypno', 'krabby',
      'kingler', 'voltorb', 'electrode', 'exeggcute', 'exeggutor', 'cubone',
      'marowak', 'hitmonlee', 'hitmonchan', 'lickitung', 'koffing', 'weezing',
      'rhyhorn', 'rhydon', 'chansey', 'tangela', 'kangaskhan', 'horsea',
      'seadra', 'goldeen', 'seaking', 'staryu', 'starmie', 'mr-mime',
      'scyther', 'jynx', 'electabuzz', 'magmar', 'pinsir', 'tauros',
      'magikarp', 'gyarados', 'lapras', 'ditto', 'eevee', 'vaporeon',
      'jolteon', 'flareon', 'porygon', 'omanyte', 'omastar', 'kabuto',
      'kabutops', 'aerodactyl', 'snorlax', 'articuno', 'zapdos', 'moltres',
      'dratini', 'dragonair', 'dragonite', 'mewtwo', 'mew'
    ];

    return pokemonNames.map((name, index) => ({
      id: index + 1,
      name: name,
      filename: `${name}.png`,
      type1: getRandomType(),
      type2: Math.random() > 0.7 ? getRandomType() : null,
      fileSize: Math.floor(Math.random() * 50 + 10), // 10-60 kB
      imageUrl: `/images/${name}.png`
    }));
  };

  const getRandomType = () => {
    const types = ['Grass', 'Fire', 'Water', 'Bug', 'Normal', 'Electric', 'Psychic', 'Fighting', 'Rock', 'Ground', 'Flying', 'Poison', 'Ghost', 'Dragon', 'Steel'];
    return types[Math.floor(Math.random() * types.length)];
  };

  // Filter and sort images
  const filteredAndSortedImages = useMemo(() => {
    if (!datasetData) return [];

    let filtered = datasetData.images;

    // Filter by class
    if (selectedClass !== 'all') {
      filtered = filtered.filter(img => 
        img.type1 === selectedClass || img.type2 === selectedClass
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort images
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return b.fileSize - a.fileSize;
        case 'type':
          return a.type1.localeCompare(b.type1);
        default:
          return 0;
      }
    });

    return filtered;
  }, [datasetData, selectedClass, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-white/70">Loading training dataset...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-2">Error loading dataset</p>
        <p className="text-white/50 text-sm">{error}</p>
      </div>
    );
  }

  if (!datasetData || !currentJobId) {
    return (
      <div className="text-center py-8">
        <p className="text-white/70">No training dataset available</p>
        <p className="text-white/50 text-sm">Start a training job to view images</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black/20 backdrop-blur-sm">
      {/* Header */}
      <DatasetHeader 
        datasetName={datasetData.name}
        description={datasetData.description}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <ClassSidebar 
          classes={datasetData.classes}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          totalImages={datasetData.totalImages}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Stats */}
          <DatasetStats 
            totalImages={filteredAndSortedImages.length}
            totalClasses={datasetData.classes.length}
            selectedClass={selectedClass}
          />

          {/* Image Grid */}
          <div className="flex-1 overflow-auto p-4">
            <div className="min-h-full">
              <ImageGrid 
                images={filteredAndSortedImages}
                viewMode={viewMode}
                selectedClass={selectedClass}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetViewer;