"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { series } from "@/data/series";
import "swiper/css";
import "swiper/css/navigation";

interface Episode {
  id: string;
  title: string;
  season: number;
  episode: number;
  image: string;
}

interface NewEpisodesSliderProps {
  title?: string;
  category?: string;
}
// ვქმნით ეპიზოდების მასივს seasons-დან
const episodes: Episode[] = series.flatMap((show) => {
  if (!show.seasons) return [];
  return show.seasons.flatMap((season) =>
    season.episodes.map((episode, index) => ({
      id: `${show.id}-${season.seasonNumber}-${index + 1}`,
      title: show.georgianTitle,
      season: season.seasonNumber,
      episode: index + 1,
      image: show.poster,
      videoUrl: episode.videoBaseUrl,
    })),
  );
});

export default function NewEpisodesSlider({
  title = "Episodes",
  category = "New",
}: NewEpisodesSliderProps) {
  // Group episodes into pairs for two-row layout
  const groupedEpisodes: Episode[][] = [];
  for (let i = 0; i < episodes.length; i += 2) {
    groupedEpisodes.push(episodes.slice(i, i + 2));
  }

  return (
    <div className="mb-10">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm md:text-lg font-bold flex items-center gap-2">
            <span className="w-0.5 h-5 bg-yellow-500"></span>
            <span className="text-white">{category}</span>
            <span className="text-yellow-500">{title}</span>
          </h2>
          <div className="flex gap-3">
            <button className="swiper-button-prev-episodes disabled:opacity-30 transition-all flex items-center justify-center">
              <ChevronLeft className="w-5 h-5 text-yellow-500" />
            </button>
            <button className="swiper-button-next-episodes disabled:opacity-30 transition-all flex items-center justify-center">
              <ChevronRight className="w-5 h-5 text-yellow-500" />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={4}
          navigation={{
            prevEl: ".swiper-button-prev-episodes",
            nextEl: ".swiper-button-next-episodes",
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            840: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
          className="episodes-two-row-swiper"
        >
          {groupedEpisodes.map((group, groupIndex) => (
            <SwiperSlide key={groupIndex}>
              <div className="flex flex-col gap-4">
                {group.map((episode) => (
                  <div key={episode.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-md shadow-lg aspect-video">
                      <img
                        src={episode.image || "/placeholder.svg"}
                        alt={episode.title}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-75"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-bold text-sm mb-1 tracking-wide uppercase">
                          {episode.title}
                        </h3>
                        <p className="text-gray-300 text-xs">
                          Season {episode.season} Episode {episode.episode}
                        </p>
                      </div>

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/50">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-8 border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .episodes-two-row-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </div>
  );
}
