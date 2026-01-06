"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { movies } from "@/data/movies";
import { useRouter } from "next/navigation";

interface MovieCarouselProps {
  title: string;
  category: string;
  onMovieSelect?: (movie: {
    title: string;
    georgianTitle: string;
    poster: string;
    id: number;
    slug: string;
  }) => void;
}

export function MovieCarousel({
  title,
  category,
  onMovieSelect,
}: MovieCarouselProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const router = useRouter();

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

  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-md md:text-lg lg:text-lg font-bold flex items-center gap-2">
          <span className="w-0.5 h-4 sm:h-5 bg-yellow-500"></span>
          <span className="text-foreground">{category}</span>
          <span className="text-yellow-500">{title}</span>
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => swiperRef?.slidePrev()}
            disabled={isBeginning}
            className="text-yellow-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => swiperRef?.slideNext()}
            disabled={isEnd}
            className="text-yellow-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={6}
        slidesPerGroup={1}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          320: { slidesPerView: 2.5 },
          640: { slidesPerView: 3.5 },
          1024: { slidesPerView: 5.5 },
          1280: { slidesPerView: 6.5 },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={`${movie.title}-${index}`}>
            <div
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
                    className="bg-yellow-600/90 text-white border-0 font-semibold px-2 py-1"
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
