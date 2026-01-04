"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const movies = [
  {
    title: "RESCUED BY RUBY",
    rating: "7.2",
    poster: "rescued by ruby dog movie",
  },
  { title: "FRESH", rating: "6.7", poster: "fresh horror movie" },
  { title: "THE ADAM PROJECT", rating: "6.8", poster: "the adam project" },
  { title: "THE LAST DUEL", rating: "7.4", poster: "the last duel medieval" },
  { title: "THE OWNERS", rating: "5.9", poster: "the owners horror" },
  { title: "THE VANISHING", rating: "6.0", poster: "the vanishing lighthouse" },
  { title: "THE OWNERS", rating: "5.9", poster: "the owners thriller" },
  {
    title: "THE ADAM PROJECT",
    rating: "6.8",
    poster: "the adam project sci-fi",
  },
];

interface MovieCarouselProps {
  title: string;
  category: string;
}

export function MovieCarousel({ title, category }: MovieCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 6;

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const handleNext = () => {
    setStartIndex(Math.min(movies.length - visibleCount, startIndex + 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          <span className="text-foreground">Newest</span>{" "}
          <span className="text-primary">Movies</span>
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="rounded-full bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={startIndex >= movies.length - visibleCount}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-300"
          style={{
            transform: `translateX(-${startIndex * (100 / visibleCount)}%)`,
          }}
        >
          {movies.map((movie, index) => (
            <div
              key={`${movie.title}-${index}`}
              className="shrink-0 w-[calc((100%-5*1rem)/6)] group cursor-pointer"
            >
              <div className="relative rounded-lg overflow-hidden aspect-2/3 bg-card">
                <img
                  src={`/.jpg?height=450&width=300&query=${movie.poster}`}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute top-2 left-2">
                  <Badge
                    variant="secondary"
                    className="bg-black/70 text-primary border-primary"
                  >
                    IMDB: {movie.rating}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <h3 className="font-semibold text-sm">{movie.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
