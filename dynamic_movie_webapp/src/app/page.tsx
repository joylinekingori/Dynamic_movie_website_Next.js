'use client';

import { useEffect, useState } from 'react';
import { fetchMoviesDirect } from './utils/fetchMovie';
import HeroSection from './shared-components/HeroSection';
import CategoryRow from './shared-components/CategoryRow';
import Navbar from './shared-components/Navbar';
import TeaserScreen from './shared-components/TeaserScreen';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

interface Category {
  id: string;
  name: string;
  movies: Movie[];
}

export default function Home() {
  const [showTeaser, setShowTeaser] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hasSeenTeaser = localStorage.getItem('hasSeenTeaser');
    
    if (hasSeenTeaser) {
      setShowTeaser(false);
      fetchMovies();
    } else {
      const timer = setTimeout(() => {
        setShowTeaser(false);
        localStorage.setItem('hasSeenTeaser', 'true');
        fetchMovies();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const trendingData = await fetchMoviesDirect('trending');
      setFeaturedMovie(trendingData.results[0] || null);

      const categoryList = [
        { id: 'popular', name: 'Popular' },
        { id: 'top_rated', name: 'Top Rated' },
        { id: 'upcoming', name: 'Upcoming' },
        { id: 'now_playing', name: 'Now Playing' },
      ];

      const categoryData = await Promise.all(
        categoryList.map(async (category) => {
          const data = await fetchMoviesDirect(category.id);
          return { ...category, movies: data.results.slice(0, 10) };
        })
      );

      setCategories(categoryData);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to load movies. Please check your API configuration.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showTeaser) {
    return <TeaserScreen />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={fetchMovies}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <HeroSection movie={featuredMovie} />
      
      <div className="container mx-auto px-4 py-8">
        {categories.map((category) => (
          <CategoryRow
            key={category.id}
            title={category.name}
            movies={category.movies}
            categoryId={category.id}
          />
        ))}
      </div>
    </main>
  );
}