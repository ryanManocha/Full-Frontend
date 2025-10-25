// CSV Parser utility for loading Pokemon dataset

export const parsePokemonCSV = async () => {
  try {
    // For now, we'll use a hardcoded approach since we can't directly read files in browser
    // In a real implementation, this would be served by the backend
    const response = await fetch('/archive/pokemon.csv');
    const csvText = await response.text();
    
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    const pokemonData = lines.slice(1)
      .filter(line => line.trim()) // Remove empty lines
      .map(line => {
        const values = line.split(',');
        const pokemon = {};
        
        headers.forEach((header, index) => {
          pokemon[header.toLowerCase()] = values[index] || '';
        });
        
        // Add image path
        pokemon.imagePath = `/archive/images/${pokemon.name}.png`;
        
        return pokemon;
      });
    
    return pokemonData;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    
    // Fallback: return mock data for development
    return [
      {
        name: 'pikachu',
        type1: 'Electric',
        type2: '',
        evolution: 'raichu',
        imagePath: '/archive/images/pikachu.png'
      },
      {
        name: 'charmander',
        type1: 'Fire',
        type2: '',
        evolution: 'charmeleon',
        imagePath: '/archive/images/charmander.png'
      },
      {
        name: 'squirtle',
        type1: 'Water',
        type2: '',
        evolution: 'wartortle',
        imagePath: '/archive/images/squirtle.png'
      },
      {
        name: 'bulbasaur',
        type1: 'Grass',
        type2: 'Poison',
        evolution: 'ivysaur',
        imagePath: '/archive/images/bulbasaur.png'
      }
    ];
  }
};

export const getUniqueValues = (data, field) => {
  const values = data.map(item => item[field]).filter(Boolean);
  return [...new Set(values)].sort();
};

export default {
  parsePokemonCSV,
  getUniqueValues,
};
