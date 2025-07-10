'use client';

import { SpotifyTrack } from '@/types/spotify';
import TrackCard from './TrackCard';

interface TrackListProps {
  tracks: SpotifyTrack[];
}

export default function TrackList({ tracks }: TrackListProps) {
  return (
    <div className="space-y-4">
      {tracks.map((track, index) => (
        <TrackCard key={track.id} track={track} index={index + 1} />
      ))}
    </div>
  );
}