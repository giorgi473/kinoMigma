"use client";

import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

interface WatchingMovie {
  id: string;
  title: string;
  georgianTitle: string;
  poster: string;
  currentTime: string;
  totalTime: string;
  progress: number;
}

interface ContinueWatchingProps {
  movies: WatchingMovie[];
  onRemoveMovie: (id: string) => void;
}

export function ContinueWatching({
  movies,
  onRemoveMovie,
}: ContinueWatchingProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (swiperRef) {
        const slidesPerView = swiperRef.params.slidesPerView;
        const hasOverflow =
          typeof slidesPerView === "number" &&
          swiperRef.slides.length > slidesPerView;
        setCanScroll(hasOverflow);

        // Update navigation states
        setIsBeginning(swiperRef.isBeginning);
        setIsEnd(swiperRef.isEnd);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [swiperRef, movies.length]);

  const showNavigation = canScroll;

  return (
    <div className="space-y-6 select-none mt-10 mb-10">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-md md:text-lg lg:text-xl font-bold flex items-center gap-2">
          <span className="w-0.5 h-4 sm:h-5 bg-yellow-500"></span>
          <span className="text-foreground">Continue</span>
          <span className="text-yellow-500">Watching</span>
        </h2>
        {showNavigation && (
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
        )}
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={6}
        slidesPerGroup={1}
        onSwiper={(swiper) => {
          setSwiperRef(swiper);
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
          const slidesPerView = swiper.params.slidesPerView;
          const hasOverflow =
            typeof slidesPerView === "number" &&
            swiper.slides.length > slidesPerView;
          setCanScroll(hasOverflow);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          320: { slidesPerView: 1.4 },
          640: { slidesPerView: 2.4 },
          1024: { slidesPerView: 3.4 },
          1280: { slidesPerView: 3.7 },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="group cursor-pointer relative">
              <div className="relative rounded-lg overflow-hidden aspect-video bg-card/50">
                <img
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveMovie(movie.id);
                  }}
                  className="absolute top-2 right-2 bg-gray-500/60 hover:bg-gray-600/90 rounded-sm p-1 transition-colors z-10 opacity-0 group-hover:opacity-100"
                >
                  <X className="h-4 w-4 text-white" />
                </button>

                {/* Movie info overlay */}
                <div className="absolute inset-0 bg-black/10 hover:bg-black/40 transition-all duration-300 ease-in-out flex flex-col justify-end p-3">
                  <div className="space-y-1 flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-white line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-gray-300">{movie.currentTime}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 transition-all duration-300"
                      style={{ width: `${movie.progress}%` }}
                    />
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
