'use client';

import { SpotifyTrack } from '@/types/spotify';
import { useState } from 'react';
import Image from 'next/image';

interface TrackCardProps {
  track: SpotifyTrack;
  index: number;
}

export default function TrackCard({ track, index }: TrackCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const albumImage = track.album.images[0]?.url;
  const artistNames = track.artists.map(artist => artist.name).join(', ');
  const durationMinutes = Math.floor(track.duration_ms / 60000);
  const durationSeconds = Math.floor((track.duration_ms % 60000) / 1000);
  const formattedDuration = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;

  // Extract Spotify track ID from the external URL
  const spotifyTrackId = track.external_urls.spotify.split('/').pop()?.split('?')[0];

  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/25 transition-all duration-200">
      <div className="flex items-center space-x-4">
        {/* Track Number */}
        <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          {index}
        </div>

        {/* Album Art */}
        <div className="flex-shrink-0">
          {albumImage && !imageError ? (
            <Image
              src={albumImage}
              alt={`${track.album.name} cover`}
              width={64}
              height={64}
              className="w-16 h-16 rounded-lg object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-2xl">🎵</span>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex-grow min-w-0">
          <h3 className="text-white font-semibold text-lg truncate">
            {track.name}
          </h3>
          <p className="text-gray-300 text-sm truncate">
            by {artistNames}
          </p>
          <p className="text-gray-400 text-xs truncate">
            {track.album.name} • {formattedDuration}
          </p>
        </div>

        {/* Spotify Link */}
        <div className="flex-shrink-0">
          <a
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            <span>Open in Spotify</span>
          </a>
        </div>
      </div>

      {/* Spotify Embed Player */}
      {spotifyTrackId && (
        <div className="mt-4">
          <iframe
            src={`https://open.spotify.com/embed/track/${spotifyTrackId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      )}
    </div>
  );
}