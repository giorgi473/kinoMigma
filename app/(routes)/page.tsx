"use client";

import { useWatchingMovies } from "@/hooks/use-watching-movies";
import HeroSection from "@/components/HeroSection";
import { MovieCarousel } from "@/components/MovieCarousel";
import { ContinueWatching } from "@/components/continue-watching";
import FlixFeatured from "@/components/FlixFeatured";
import EpisodeShowcaseCarousel from "@/components/EpisodeShowcaseCarousel";
import { SerialCarousel } from "@/components/SerialCarusel";
import { PopularSerialCarousel } from "@/components/PopularSerialsCarusel";
import MovieCollections from "@/components/modules/MovieCollections";

function home() {
  const { watchingMovies, handleMovieSelect, handleRemoveMovie } =
    useWatchingMovies();
  return (
    <div>
      <HeroSection />
      <div className="px-4 py-12">
        <div className="grid grid-cols-1">
          <div className="order-2 lg:order-1">
            <MovieCarousel
              title="Movies"
              category="newest"
              onMovieSelect={handleMovieSelect}
            />
          </div>
          <div className="order-1 lg:order-2">
            {watchingMovies.length > 0 && (
              <ContinueWatching
                movies={watchingMovies}
                onRemoveMovie={handleRemoveMovie}
              />
            )}
          </div>
        </div>
        <FlixFeatured />
        <EpisodeShowcaseCarousel title="Episodes" category="New" />
        <SerialCarousel
          title="Serial"
          category="New"
          onMovieSelect={handleMovieSelect}
        />
        <PopularSerialCarousel
          title="Serials"
          category="Popular"
          onMovieSelect={handleMovieSelect}
        />
        <MovieCollections title="ქციები" category="კოლე" />
      </div>
    </div>
  );
}

export default home;

// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/sign-in");
// }
