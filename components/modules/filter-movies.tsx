"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FilterMoviesTags, {
  type MovieFilters,
} from "@/components/modules/FilterMoviesTags";
import { movies } from "@/data/movies";

interface MovieCarouselProps {
  onMovieSelect?: (movie: {
    title: string;
    georgianTitle: string;
    poster: string;
    id: number;
    slug: string;
  }) => void;
}

export function FilterMovies({ onMovieSelect }: MovieCarouselProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<MovieFilters>({});
  const router = useRouter();

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      if (filters.movies) {
        const typeMap: { [key: string]: string } = {
          movie: "ფილმი",
          series: "სერიალი",
          trailer: "თრეილერი",
        };
        const expectedType = typeMap[filters.movies];
        if (movie.movies !== expectedType) {
          return false;
        }
      }

      if (filters.genre) {
        const movieGenres = movie.genres.toLowerCase();
        const filterGenre = filters.genre.toLowerCase();
        if (!movieGenres.includes(filterGenre)) {
          return false;
        }
      }

      if (filters.ratingMin) {
        const movieRating = Number.parseFloat(movie.rating);
        const minRating = Number.parseFloat(filters.ratingMin);
        if (movieRating < minRating) {
          return false;
        }
      }

      if (filters.ratingMax) {
        const movieRating = Number.parseFloat(movie.rating);
        const maxRating = Number.parseFloat(filters.ratingMax);
        if (movieRating > maxRating) {
          return false;
        }
      }

      if (filters.yearMin) {
        const minYear = Number.parseInt(filters.yearMin);
        if (movie.year < minYear) {
          return false;
        }
      }

      if (filters.yearMax) {
        const maxYear = Number.parseInt(filters.yearMax);
        if (movie.year > maxYear) {
          return false;
        }
      }

      return true;
    });
  }, [filters]);

  const itemsPerPage = 30;
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = filteredMovies.slice(startIndex, endIndex);

  const handleMovieClick = (movie: {
    title: string;
    georgianTitle: string;
    poster: string;
    id: number;
    slug: string;
  }) => {
    onMovieSelect?.(movie);
    router.push(`/movie/${movie.id}/${movie.slug}`);
  };

  const handleFiltersChange = (newFilters: MovieFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const generatePageNumbers = (isMobile: boolean): number[] => {
    const pages: number[] = [];
    const maxPagesToShow = isMobile ? 3 : 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        // მობილურზე: მიმდინარე, წინა და შემდეგი
        if (currentPage === 1) {
          pages.push(1, 2, -1, totalPages);
        } else if (currentPage === totalPages) {
          pages.push(1, -1, totalPages - 1, totalPages);
        } else {
          pages.push(currentPage - 1, currentPage, currentPage + 1);
        }
      } else {
        // დესკტოპზე: სრული ლოგიკა
        if (currentPage <= 3) {
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push(-1);
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1);
          pages.push(-1);
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push(-1);
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push(-1);
          pages.push(totalPages);
        }
      }
    }

    return pages;
  };

  return (
    <>
      <div className="mb-5">
        <FilterMoviesTags onFiltersChange={handleFiltersChange} />
      </div>
      <div className="space-y-6 select-none mt-8">
        {filteredMovies.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-xl text-muted-foreground">არ მოიძებნა</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {currentMovies.map((movie, index) => (
                <div
                  key={`${movie.title}-${index}`}
                  className="group cursor-pointer"
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="relative rounded-lg overflow-hidden aspect-2/3 bg-card/50">
                    <img
                      src={movie.poster || "/placeholder.svg"}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge
                        variant="secondary"
                        className="bg-yellow-500/90 text-white border-0 font-semibold px-2 py-1"
                      >
                        IMDB: {movie.rating}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="space-y-1">
                        <h3 className="font-bold text-base text-white">
                          {movie.georgianTitle}
                        </h3>
                        <p className="text-xs text-gray-300">{movie.genres}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination>
                  <PaginationContent className="gap-1 sm:gap-2">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border-0 [&>span]:hidden ${
                          currentPage === 1 ? "opacity-50" : "cursor-pointer"
                        }`}
                      />
                    </PaginationItem>

                    {/* მობილური ვერსია */}
                    <div className="flex sm:hidden gap-1">
                      {generatePageNumbers(true).map((pageNum, idx) => (
                        <PaginationItem key={idx}>
                          {pageNum === -1 ? (
                            <PaginationEllipsis className="w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 text-xs" />
                          ) : (
                            <PaginationLink
                              onClick={() => setCurrentPage(pageNum)}
                              isActive={currentPage === pageNum}
                              className={`w-9 h-9 rounded-full cursor-pointer border-0 text-sm ${
                                currentPage === pageNum
                                  ? "bg-yellow-500 text-black hover:bg-yellow-500"
                                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                              }`}
                            >
                              {pageNum}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                    </div>

                    {/* დესკტოპ ვერსია */}
                    {generatePageNumbers(false).map((pageNum, idx) => (
                      <PaginationItem key={idx} className="hidden sm:block">
                        {pageNum === -1 ? (
                          <PaginationEllipsis className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-400" />
                        ) : (
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className={`w-10 h-10 rounded-full cursor-pointer border-0 ${
                              currentPage === pageNum
                                ? "bg-yellow-500 text-black hover:bg-yellow-500"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                            }`}
                          >
                            {pageNum}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 border-0 [&>span]:hidden ${
                          currentPage === totalPages
                            ? "opacity-50"
                            : "cursor-pointer"
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}