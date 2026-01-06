"use client";

import { useState, useEffect } from "react";

export interface WatchingMovie {
  id: string;
  title: string;
  georgianTitle: string;
  poster: string;
  currentTime: string;
  totalTime: string;
  progress: number;
}

const STORAGE_KEY = "watching-movies";

export function useWatchingMovies() {
  const [watchingMovies, setWatchingMovies] = useState<WatchingMovie[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setWatchingMovies(JSON.parse(stored));
        } catch {
          setWatchingMovies([]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isClient && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchingMovies));
    }
  }, [watchingMovies, isClient]);

  const handleMovieSelect = (movie: {
    title: string;
    georgianTitle: string;
    poster: string;
  }) => {
    const exists = watchingMovies.some((m) => m.title === movie.title);
    if (exists) return;

    const progress = Math.floor(Math.random() * 70) + 10;
    const totalMinutes = Math.floor(Math.random() * 60) + 60;
    const currentMinutes = Math.floor((totalMinutes * progress) / 100);

    const formatTime = (mins: number) => {
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60;
      const seconds = Math.floor(Math.random() * 60);
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    };

    const newMovie: WatchingMovie = {
      id: `${movie.title}-${Date.now()}`,
      title: movie.title,
      georgianTitle: movie.georgianTitle,
      poster: movie.poster,
      currentTime: formatTime(currentMinutes),
      totalTime: formatTime(totalMinutes),
      progress,
    };

    setWatchingMovies([newMovie, ...watchingMovies]);
  };

  const handleRemoveMovie = (id: string) => {
    setWatchingMovies(watchingMovies.filter((m) => m.id !== id));
  };

  return {
    watchingMovies,
    handleMovieSelect,
    handleRemoveMovie,
  };
}
