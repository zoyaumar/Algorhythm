'use client';

import { useState } from 'react';
import { RecommendationFilters, SpotifyTrack } from '@/types/spotify';
import FilterPanel from '@/components/FilterPanel';
import TrackList from '@/components/TrackList';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [filters, setFilters] = useState<RecommendationFilters>({
    tempo: 120,
    energy: 0.5,
    danceability: 0.5,
    valence: 0.5,
    acousticness: 0.5,
    instrumentalness: 0.5,
    genres: [],
  });

  const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setTracks(data.tracks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🎵 MusicFinder
          </h1>
          <p className="text-xl text-gray-300">
            Discover your perfect tracks with AI-powered recommendations
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onGetRecommendations={getRecommendations}
              loading={loading}
            />
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 min-h-[600px]">
              <h2 className="text-2xl font-bold text-white mb-6">
                Recommended Tracks
              </h2>
              
              {loading && <LoadingSpinner />}
              
              {error && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-100">
                  {error}
                </div>
              )}
              
              {!loading && !error && tracks.length === 0 && (
                <div className="text-center text-gray-300 mt-20">
                  <div className="text-6xl mb-4">🎵</div>
                  <p className="text-xl">
                    Adjust your preferences and click &ldquo;Get Recommendations&rdquo; to discover new music!
                  </p>
                </div>
              )}
              
              {!loading && tracks.length > 0 && (
                <TrackList tracks={tracks} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
