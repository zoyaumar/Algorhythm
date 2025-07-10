'use client';

import { RecommendationFilters } from '@/types/spotify';

interface FilterPanelProps {
  filters: RecommendationFilters;
  onFiltersChange: (filters: RecommendationFilters) => void;
  onGetRecommendations: () => void;
  loading: boolean;
}

const AVAILABLE_GENRES = [
  'pop', 'rock', 'hip-hop', 'electronic', 'jazz', 'classical',
  'country', 'r-n-b', 'latin', 'indie', 'alternative', 'blues',
  'folk', 'reggae', 'punk', 'metal', 'funk', 'soul'
];

export default function FilterPanel({ 
  filters, 
  onFiltersChange, 
  onGetRecommendations, 
  loading 
}: FilterPanelProps) {
  
  const updateFilter = (key: keyof RecommendationFilters, value: string | number | string[]) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const toggleGenre = (genre: string) => {
    const newGenres = filters.genres.includes(genre)
      ? filters.genres.filter(g => g !== genre)
      : [...filters.genres, genre];
    
    updateFilter('genres', newGenres);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Music Preferences</h2>
      
      {/* Tempo Slider */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">
          Tempo: {filters.tempo} BPM
        </label>
        <input
          type="range"
          min="60"
          max="200"
          value={filters.tempo}
          onChange={(e) => updateFilter('tempo', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>60 BPM</span>
          <span>200 BPM</span>
        </div>
      </div>

      {/* Energy Slider */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">
          Energy: {(filters.energy * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={filters.energy}
          onChange={(e) => updateFilter('energy', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      {/* Danceability Slider */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">
          Danceability: {(filters.danceability * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={filters.danceability}
          onChange={(e) => updateFilter('danceability', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Valence (Mood) Slider */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">
          Mood: {(filters.valence * 100).toFixed(0)}% Positive
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={filters.valence}
          onChange={(e) => updateFilter('valence', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Sad</span>
          <span>Happy</span>
        </div>
      </div>

      {/* Acousticness Slider */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">
          Acousticness: {(filters.acousticness * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={filters.acousticness}
          onChange={(e) => updateFilter('acousticness', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Instrumentalness Slider */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-2">
          Instrumentalness: {(filters.instrumentalness * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={filters.instrumentalness}
          onChange={(e) => updateFilter('instrumentalness', parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Genres */}
      <div className="mb-6">
        <label className="block text-white font-medium mb-3">
          Genres ({filters.genres.length} selected)
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
          {AVAILABLE_GENRES.map((genre) => (
            <label key={genre} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.genres.includes(genre)}
                onChange={() => toggleGenre(genre)}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-white capitalize">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Get Recommendations Button */}
      <button
        onClick={onGetRecommendations}
        disabled={loading || filters.genres.length === 0}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
      >
        {loading ? 'Finding Music...' : 'Get Recommendations'}
      </button>
      
      {filters.genres.length === 0 && (
        <p className="text-yellow-300 text-sm mt-2 text-center">
          Please select at least one genre
        </p>
      )}
    </div>
  );
}