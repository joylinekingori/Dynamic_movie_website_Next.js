'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useFetchMovies } from '../hooks/useFetchMovies';
import MovieCard from '../shared-components/MovieCard';
import Navbar from '../shared-components/Navbar';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;
  const [page, setPage] = useState(1);
  
  const { movies, isLoading, error, totalPages } = useFetchMovies(categoryId, page);
  
  const categoryNames: { [key: string]: string } = {
    popular: 'Popular Movies',
    top_rated: 'Top Rated Movies',
    upcoming: 'Upcoming Movies',
    now_playing: 'Now Playing Movies'
  };

  const categoryName = categoryNames[categoryId] || 'Movies';

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error loading movies</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {page < totalPages && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={loadMore}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}