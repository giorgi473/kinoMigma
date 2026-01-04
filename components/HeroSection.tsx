"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { movies } from "@/data/data";
import { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function MovieHeroSlider() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="relative w-full overflow-hidden bg-black px-4 select-none"
      style={{ height: "60vh" }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1000}
        allowTouchMove={true}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full w-full rounded-lg md:rounded-xl my-hero-swiper"
        pagination={{
          clickable: true,
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative h-full w-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-lg md:rounded-xl"
                style={{
                  backgroundImage: `url('${movie.backdrop}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 30%",
                }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="relative z-10 flex h-full items-center select-none px-4 sm:px-6 md:px-8 lg:pl-24">
                <div className="max-w-full md:max-w-3xl animate-fade-in">
                  <div className="space-y-3 md:space-y-5">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight animate-slide-up">
                      {movie.title}
                    </h1>

                    <div
                      className="flex items-center gap-4 md:gap-6 text-xs sm:text-sm animate-slide-up"
                      style={{ animationDelay: "0.1s" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 font-bold">IMDB:</span>
                        <span className="text-white font-semibold">
                          {movie.imdb}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 font-bold">
                          GENRE:
                        </span>
                        <span className="text-gray-300 font-medium">
                          {movie.genre}
                        </span>
                      </div>
                    </div>
                    <p
                      className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl md:max-w-2xl animate-slide-up line-clamp-3"
                      style={{ animationDelay: "0.2s" }}
                    >
                      {movie.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ქვედა ღილაკები */}
      <div className="absolute left-8 sm:left-10 md:left-12 lg:left-28 bottom-20 sm:bottom-20 md:bottom-20 z-20 flex items-center w-auto md:w-80 justify-between gap-2 md:gap-4">
        <button className="flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-black/30 backdrop-blur-md border-2 border-white/50 hover:border-yellow-500 text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg text-xs sm:text-sm">
          Watch now
          <div className="bg-yellow-500 rounded-full p-1">
            <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-white text-white" />
          </div>
        </button>
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-md border-2 border-white/20 text-white transition hover:bg-black/60 hover:border-yellow-500 hover:scale-110"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          <button
            onClick={() => swiperInstance?.slideNext()}
            className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-md border-2 border-white/20 text-white transition hover:bg-black/60 hover:border-yellow-500 hover:scale-110"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* მარჯვენა პოსტერები - მხოლოდ xl და უფრო დიდ ეკრანებზე (≥1280px) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20 hidden 2xl:block">
        <div className="grid grid-cols-3 gap-4">
          {movies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => swiperInstance?.slideTo(index)}
              className={`group relative w-44 h-32 rounded-lg overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? "ring-2 ring-yellow-500 scale-105 shadow-2xl shadow-yellow-500/50"
                  : "ring-2 ring-white/10 hover:ring-yellow-500/50 hover:scale-105"
              }`}
            >
              <img
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-black/0"
                    : "bg-black/20 group-hover:bg-black/10"
                }`}
              />
              <div className="absolute bottom-2 left-2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {movie.title}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* სტილები - პაგინაცია მხოლოდ lg-მდე (≤1023px) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slide-up {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-slide-up { animation: slide-up 0.8s ease-out forwards; opacity: 0; }
            .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }

            /* პაგინაცია მხოლოდ lg-მდე */
            .my-hero-swiper .swiper-pagination {
              position: absolute !important;
              left: 40px !important;
              top: 50% !important;
              transform: translateY(-50%);
              display: flex !important;
              flex-direction: column !important;
              align-items: center;
              gap: 8px !important;
              width: auto !important;
              height: auto !important;
            }

            /* მობილურზე ჰორიზონტალური */
            @media (max-width: 1268px) {
              .my-hero-swiper .swiper-pagination {
                flex-direction: row !important;
                top: auto !important;
                bottom: 30px !important;
                left: 50% !important;
                transform: translateX(-50%);
                gap: 6px !important;
              }
            }

            .my-hero-swiper .swiper-pagination-bullet {
              width: 3px !important;
              height: 20px !important;
              background: rgba(255, 255, 255, 0.7) !important;
              border-radius: 4px !important;
              opacity: 0.6 !important;
              transition: all 0.5s ease !important;
              margin: 0 !important;
            }

            @media (max-width: 1268px) {
              .my-hero-swiper .swiper-pagination-bullet {
                width: 20px !important;
                height: 3px !important;
              }
            }

            .my-hero-swiper .swiper-pagination-bullet:hover {
              opacity: 0.8 !important;
              height: 30px !important;
            }

            @media (max-width: 1268px) {
              .my-hero-swiper .swiper-pagination-bullet:hover {
                width: 30px !important;
                height: 3px !important;
              }
            }

            .my-hero-swiper .swiper-pagination-bullet-active {
              background: white !important;
              height: 50px !important;
              opacity: 1 !important;
              box-shadow: 0 0 15px rgba(234, 179, 8, 0.5) !important;
            }

            @media (max-width: 1268px) {
              .my-hero-swiper .swiper-pagination-bullet-active {
                width: 50px !important;
                height: 3px !important;
              }
            }
          `,
        }}
      />
    </div>
  );
}
