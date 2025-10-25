import React, { useState, useEffect, useMemo } from 'react';
import DatasetStats from './DatasetStats';
import ImageGrid from './ImageGrid';
import ClassSidebar from './ClassSidebar';
import DatasetHeader from './DatasetHeader';

const DatasetViewer = () => {
  const [datasetData, setDatasetData] = useState(null);
  const [selectedClass, setSelectedClass] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

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

  // Load dataset data
  useEffect(() => {
    const loadDataset = async () => {
      try {
        // Load Pokemon CSV data
        const response = await fetch('/pokemon.csv');
        const csvText = await response.text();
        const pokemonData = parseCSV(csvText);
        
        // Count types for class statistics
        const typeCounts = {};
        pokemonData.forEach(pokemon => {
          typeCounts[pokemon.Type1] = (typeCounts[pokemon.Type1] || 0) + 1;
          if (pokemon.Type2) {
            typeCounts[pokemon.Type2] = (typeCounts[pokemon.Type2] || 0) + 1;
          }
        });

        const classes = Object.entries(typeCounts).map(([type, count]) => ({
          name: type,
          count: count,
          color: getTypeColor(type)
        })).sort((a, b) => b.count - a.count);

        const datasetData = {
          name: 'Pokemon Classification Dataset',
          description: 'A comprehensive dataset of Pokemon images with type classifications and evolution chains.',
          totalImages: pokemonData.length,
          classes: classes,
          images: pokemonData.map((pokemon, index) => ({
            id: index + 1,
            name: pokemon.Name,
            filename: `${pokemon.Name}.png`,
            type1: pokemon.Type1,
            type2: pokemon.Type2 || null,
            fileSize: Math.floor(Math.random() * 50 + 10), // 10-60 kB
            imageUrl: `/images/${pokemon.Name}.png`,
            evolution: pokemon.Evolution
          }))
        };
        
        setDatasetData(datasetData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading dataset:', error);
        // Fallback to mock data if CSV loading fails
        const mockData = {
          name: 'Pokemon Classification Dataset',
          description: 'A comprehensive dataset of Pokemon images with type classifications and evolution chains.',
          totalImages: 809,
          classes: [
            { name: 'Grass', count: 95, color: '#4ade80' },
            { name: 'Fire', count: 78, color: '#f87171' },
            { name: 'Water', count: 89, color: '#60a5fa' },
            { name: 'Bug', count: 67, color: '#a3a3a3' },
            { name: 'Normal', count: 98, color: '#d4d4d8' },
            { name: 'Electric', count: 45, color: '#fbbf24' },
            { name: 'Psychic', count: 56, color: '#c084fc' },
            { name: 'Fighting', count: 43, color: '#fb7185' },
            { name: 'Rock', count: 38, color: '#a78bfa' },
            { name: 'Ground', count: 41, color: '#f59e0b' },
            { name: 'Flying', count: 52, color: '#06b6d4' },
            { name: 'Poison', count: 48, color: '#8b5cf6' },
            { name: 'Ghost', count: 35, color: '#6366f1' },
            { name: 'Dragon', count: 28, color: '#ec4899' },
            { name: 'Steel', count: 31, color: '#64748b' }
          ],
          images: generateMockImages()
        };
        
        setDatasetData(mockData);
        setLoading(false);
      }
    };

    loadDataset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      </div>
    );
  }

  if (!datasetData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No dataset available</p>
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