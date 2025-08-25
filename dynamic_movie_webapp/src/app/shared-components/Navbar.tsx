'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-gray-900 bg-opacity-90 fixed w-full z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-500">
          Moovie
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <Link href="/category/popular" className="hover:text-purple-400 transition-colors">Movies</Link>
          <Link href="/category/top_rated" className="hover:text-purple-400 transition-colors">TV Shows</Link>
        </div>
        
        <form onSubmit={handleSearch} className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r"
          >
            Search
          </button>
        </form>
        
        <div className="flex items-center space-x-4">
          <Link href="/login" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white">
            Sign In
          </Link>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2 absolute w-full">
          <form onSubmit={handleSearch} className="flex mb-4">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-r"
            >
              Search
            </button>
          </form>
          <Link href="/" className="block py-2 hover:text-purple-400">Home</Link>
          <Link href="/category/popular" className="block py-2 hover:text-purple-400">Movies</Link>
          <Link href="/category/top_rated" className="block py-2 hover:text-purple-400">TV Shows</Link>
        </div>
      )}
    </nav>
  );
}