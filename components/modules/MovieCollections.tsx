"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";
import { categoryData } from "@/data/collections";

interface CategoryCarouselProps {
  title?: string;
  category: string;
}

export function MovieCollections({ title, category }: CategoryCarouselProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const router = useRouter();

  const handleCategoryClick = (categoryName: string) => {
    console.log(`Navigate to category: ${categoryName}`);
    // router.push(`/category/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="space-y-6 select-none hidden lg:block">
      <div className="flex items-center justify-between">
        <h2 className="text-sm sm:text-md md:text-lg lg:text-lg font-bold flex items-center">
          <span className="w-0.5 h-4 sm:h-5 bg-yellow-500"></span>
          <span className="text-foreground pl-2">{category}</span>
          <span className="text-yellow-500">{title}</span>
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => swiperRef?.slidePrev()}
            disabled={isBeginning}
            className="text-yellow-500 disabled:opacity-50 transition-colors cursor-pointer hover:text-yellow-400"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => swiperRef?.slideNext()}
            disabled={isEnd}
            className="text-yellow-500 disabled:opacity-50 transition-colors cursor-pointer hover:text-yellow-400"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={1}
        onSwiper={setSwiperRef}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 12 },
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4.5, spaceBetween: 24 },
        }}
        className="px-4"
      >
        {categoryData.map((category, index) => (
          <SwiperSlide key={`${category.name}-${index}`}>
            <div className="group cursor-pointer bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800/70 transition-all duration-300 border border-zinc-800 hover:border-zinc-700">
              <div className="grid grid-cols-2 gap-3 mb-4">
                {category.movies.slice(0, 4).map((movie, movieIndex) => (
                  <div
                    key={`${movie.id}-${movieIndex}`}
                    className="relative rounded-md overflow-hidden aspect-2/2 bg-zinc-800"
                  >
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
              <div
                className="flex items-center justify-between"
                onClick={() => handleCategoryClick(category.name)}
              >
                <h3 className="text-base sm:text-sm font-bold text-gray-400">
                  {category.name}
                </h3>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MovieCollections;