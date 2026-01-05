"use client";

import { useState } from "react";

export interface WatchingMovie {
  id: string;
  title: string;
  georgianTitle: string;
  poster: string;
  currentTime: string;
  totalTime: string;
  progress: number;
}

export function useWatchingMovies() {
  const [watchingMovies, setWatchingMovies] = useState<WatchingMovie[]>([]);

  const handleMovieSelect = (movie: {
    title: string;
    georgianTitle: string;
    poster: string;
  }) => {
    // Check if movie already exists in watching list
    const exists = watchingMovies.some((m) => m.title === movie.title);
    if (exists) return;

    // Add movie with random progress for demo
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
