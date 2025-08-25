import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  try {
    const { category, page = 1 } = await request.json();
    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }
    const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
    if (!API_KEY) {
      console.error('API Key missing. Available env vars:', {
        TMDB_API_KEY: !!process.env.TMDB_API_KEY,
        NEXT_PUBLIC_TMDB_API_KEY: !!process.env.NEXT_PUBLIC_TMDB_API_KEY,
        NODE_ENV: process.env.NODE_ENV
      });
      return NextResponse.json(
        {
          error: 'TMDB API key is not configured',
          details: 'Check your .env.local file and restart the server'
        },
        { status: 500 }
      );
    }
    const API_URL = 'https://api.themoviedb.org/3';
    let url = '';
    switch (category) {
      case 'trending':
        url = `${API_URL}/trending/movie/week?api_key=${API_KEY}`;
        break;
      case 'popular':
        url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
        break;
      case 'top_rated':
        url = `${API_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`;
        break;
      case 'upcoming':
        url = `${API_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`;
        break;
      case 'now_playing':
        url = `${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`;
        break;
      default:
        url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    }
    console.log('Fetching from TMDB:', url.replace(API_KEY, '***'));
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error('TMDB API Error:', response.status, errorText);
      throw new Error(`TMDB API error: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in movies API:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch movies from TMDB',
      },
      { status: 500 }
    );
  }
}