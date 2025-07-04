import { NextRequest, NextResponse } from 'next/server';
import { RecommendationFilters } from '@/types/spotify';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

async function getSpotifyAccessToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const filters: RecommendationFilters = await request.json();

    // Validate that at least one genre is selected
    if (!filters.genres || filters.genres.length === 0) {
      return NextResponse.json(
        { error: 'At least one genre must be selected' },
        { status: 400 }
      );
    }

    // Get Spotify access token
    const accessToken = await getSpotifyAccessToken();

    // Build the recommendations API URL with parameters
    const params = new URLSearchParams({
      seed_genres: filters.genres.slice(0, 5).join(','), // Spotify allows max 5 seeds
      target_tempo: filters.tempo.toString(),
      target_energy: filters.energy.toString(),
      target_danceability: filters.danceability.toString(),
      target_valence: filters.valence.toString(),
      target_acousticness: filters.acousticness.toString(),
      target_instrumentalness: filters.instrumentalness.toString(),
      limit: '20', // Get 20 recommendations
    });

    const recommendationsUrl = `${SPOTIFY_API_BASE}/recommendations?${params}`;

    // Fetch recommendations from Spotify
    const response = await fetch(recommendationsUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify API error:', errorData);
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
}