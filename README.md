# 🎵 Algorhythm

A modern, responsive web application that helps musicians and music lovers discover new tracks based on specific audio attributes using the Spotify Web API.
(The specific Spotify endpoint that was used has since been deprecated, app unfortunatly no longer works)

## ✨ Features

- **Interactive Dashboard**: User-friendly interface with sliders and checkboxes
- **Real-time Recommendations**: Get instant music suggestions based on your preferences
- **Audio Attributes Control**: Adjust tempo, energy, danceability, mood, acousticness, and instrumentalness
- **Genre Selection**: Choose from 18+ popular music genres
- **Integrated Spotify Player**: Listen to track previews directly in the app
- **Responsive Design**: Beautiful UI that works on desktop and mobile devices
- **Modern Tech Stack**: Built with Next.js 14, React, TypeScript, and Tailwind CSS

## 🚀 Quick Start

Go to https://alg0rhythm.netlify.app/

## 🎛️ How to Use

1. **Select Genres**: Choose one or more genres from the checkbox list
2. **Adjust Audio Attributes**:
   - **Tempo**: Set the desired BPM (60-200)
   - **Energy**: Control the intensity and power of the track
   - **Danceability**: How suitable the track is for dancing
   - **Mood (Valence)**: Musical positivity (sad to happy)
   - **Acousticness**: How acoustic vs. electronic the track sounds
   - **Instrumentalness**: Whether the track contains vocals or is purely instrumental
3. **Get Recommendations**: Click the button to fetch personalized suggestions
4. **Explore Results**: Listen to previews and open tracks in Spotify

## 🛠️ Technical Architecture

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management and side effects

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Spotify Web API**: Music data and recommendations
- **Client Credentials Flow**: Secure API authentication

### Key Components
- `FilterPanel`: Interactive controls for music preferences
- `TrackList`: Display grid for recommended tracks
- `TrackCard`: Individual track display with Spotify integration
- `LoadingSpinner`: Animated loading state

## 📱 API Endpoints

### POST `/api/recommendations`

Get music recommendations based on filters.

**Request Body:**
```json
{
  "tempo": 120,
  "energy": 0.7,
  "danceability": 0.6,
  "valence": 0.8,
  "acousticness": 0.2,
  "instrumentalness": 0.1,
  "genres": ["pop", "rock", "electronic"]
}
```

**Response:**
```json
{
  "tracks": [
    {
      "id": "track_id",
      "name": "Track Name",
      "artists": [{"name": "Artist Name"}],
      "album": {
        "name": "Album Name",
        "images": [{"url": "image_url"}]
      },
      "external_urls": {"spotify": "spotify_url"}
    }
  ]
}
```

## 🎨 Customization

### Adding New Genres
Edit `src/components/FilterPanel.tsx` and add genres to the `AVAILABLE_GENRES` array:

```typescript
const AVAILABLE_GENRES = [
  'pop', 'rock', 'hip-hop', 'electronic', 'jazz', 'classical',
  'your-new-genre' // Add here
];
```

### Styling
The app uses Tailwind CSS. Customize colors and components in:
- `src/app/globals.css`: Global styles and custom CSS
- Component files: Tailwind utility classes

## 🔧 Development

### Project Structure
```
src/
├── app/
│   ├── api/recommendations/    # API routes
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx              # Main dashboard
├── components/
│   ├── FilterPanel.tsx        # Audio controls
│   ├── TrackList.tsx         # Track grid
│   ├── TrackCard.tsx         # Individual track
│   └── LoadingSpinner.tsx    # Loading animation
└── types/
    └── spotify.ts            # TypeScript interfaces
```

### Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 🌟 Features to Add

- [ ] User authentication with Spotify
- [ ] Save favorite tracks
- [ ] Create custom playlists
- [ ] Advanced audio analysis visualization
- [ ] Social sharing features
- [ ] Music taste profiling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See `LICENSE` for details.

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api/) for music data
- [Next.js](https://nextjs.org/) for the awesome framework
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [Vercel](https://vercel.com/) for deployment platform

---

Built with ❤️ for music lovers and developers
