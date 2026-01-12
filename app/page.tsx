"use client";

import { ContinueWatching } from "@/components/continue-watching";
import HeroSection from "@/components/HeroSection";
import { MovieCarousel } from "@/components/MovieCarousel";
import { useWatchingMovies } from "@/hooks/use-watching-movies";

function home() {
  const { watchingMovies, handleMovieSelect, handleRemoveMovie } =
    useWatchingMovies();
  return (
    <div>
      <HeroSection />
      <div className="px-4 py-12">
        {/* <MovieCarousel title="Movies" category="newest" /> */}
        <MovieCarousel
          title="Movies"
          category="newest"
          type="movie"
          onMovieSelect={handleMovieSelect}
        />
        {watchingMovies.length > 0 && (
          <ContinueWatching
            movies={watchingMovies}
            onRemoveMovie={handleRemoveMovie}
          />
        )}
        <MovieCarousel
          title="series"
          category="New"
          onMovieSelect={handleMovieSelect}
          type="series"
        />
      </div>
    </div>
  );
}

export default home;
