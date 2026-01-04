"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

const movies = [
  {
    title: "მხსნელი რუბი",
    georgianTitle: "RESCUED BY RUBY",
    rating: "7.2",
    genres: "DRAMA, BIOGRAPHY, FAMILY",
    poster: "/1.jpg",
  },
  {
    title: "ახალი",
    georgianTitle: "FRESH",
    rating: "6.7",
    genres: "THRILLER, HORROR, COMEDY",
    poster: "/2.jpg",
  },
  {
    title: "ადამის პროექტი",
    georgianTitle: "THE ADAM PROJECT",
    rating: "6.8",
    genres: "ACTION, ADVENTURE, COMEDY",
    poster: "/3.jpg",
  },
  {
    title: "უკანასკნელი დუელი",
    georgianTitle: "THE LAST DUEL",
    rating: "7.4",
    genres: "DRAMA, HISTORY",
    poster: "/4.jpg",
  },
  {
    title: "მფლობელები",
    georgianTitle: "THE OWNERS",
    rating: "5.9",
    genres: "HORROR",
    poster: "/5.jpg",
  },
  {
    title: "გაუჩინარება",
    georgianTitle: "THE VANISHING",
    rating: "6.0",
    genres: "DRAMA, HISTORY",
    poster: "/6.jpg",
  },
  {
    title: "განდევნა",
    georgianTitle: "BANISHING",
    rating: "5.9",
    genres: "HORROR",
    poster: "/7.jpg",
  },
  {
    title: "ადამის პროექტი",
    georgianTitle: "THE ADAM PROJECT",
    rating: "6.8",
    genres: "ACTION, ADVENTURE, COMEDY",
    poster: "/8.jpg",
  },
];

interface MovieCarouselProps {
  title: string;
  category: string;
}

export function MovieCarousel({ title, category }: MovieCarouselProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="space-y-6 select-none">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-3">
          <span className="w-0.5 h-5 bg-yellow-500"></span>
          <span className="text-foreground">{category}</span>
          <span className="text-yellow-500">{title}</span>
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => swiperRef?.slidePrev()}
            disabled={isBeginning}
            className="rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => swiperRef?.slideNext()}
            disabled={isEnd}
            className="rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
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
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={`${movie.title}-${index}`}>
            <div className="group cursor-pointer">
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
