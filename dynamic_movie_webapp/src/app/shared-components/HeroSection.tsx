'use client';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

interface HeroSectionProps {
  movie: Movie | null;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  if (!movie) {
    return (
      <div className="relative h-screen flex items-center justify-start bg-cover bg-center bg-gray-800">
        <div className="container mx-auto px-4 z-10 pt-16">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-700 rounded mb-4 w-3/4"></div>
            <div className="h-6 bg-gray-700 rounded mb-8 w-1/2"></div>
            <div className="flex space-x-4">
              <div className="h-12 bg-gray-700 rounded-lg w-32"></div>
              <div className="h-12 bg-gray-700 rounded-lg w-40"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative h-screen flex items-center justify-start bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
      }}
    >
      <div className="container mx-auto px-4 z-10 pt-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{movie.title}</h1>
        <p className="text-xl max-w-2xl mb-8">{movie.overview?.substring(0, 150)}...</p>
        <div className="flex space-x-4">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold">
            Play Trailer
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold">
            Add to Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}