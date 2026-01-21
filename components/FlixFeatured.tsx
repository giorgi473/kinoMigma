import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";
import { movies } from "@/data/movies";
import { series } from "@/data/series";
import { anime } from "@/data/anime";

function FlixFeatured() {
  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating);
    const fullStars = Math.floor(numRating / 2);
    const hasHalfStar = numRating % 2 >= 1;

    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={
              i < fullStars || (i === fullStars && hasHalfStar)
                ? "text-yellow-400"
                : "text-gray-600"
            }
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderSection = (title: string, items: any[], isMovie = false) => (
    <div>
      <h2 className="text-sm sm:text-sm md:text-lg font-semibold mb-4 px-3">
        <span className="text-yellow-500">Popular</span> {title}
      </h2>
      <div className="flex flex-col">
        {items.map((item, index) => (
          <Fragment key={index}>
            <div className="flex items-center gap-4 bg-opacity-50 p-3 hover:bg-opacity-70 transition">
              <img
                src={item.poster}
                alt={"georgianTitle" in item ? item.georgianTitle : item.title}
                className="w-20 h-32 object-cover"
              />
              <div className="flex-1">
                <h3 className="text-white text-sm mb-2 line-clamp-1">
                  {"georgianTitle" in item ? item.georgianTitle : item.title}
                </h3>
                <div className="flex flex-col gap-2 mb-2">
                  <span className="text-yellow-500 text-sm font-semibold">
                    IMDB: {item.rating}
                  </span>
                  {renderStars(item.rating)}
                </div>
                <p className="text-gray-400 text-xs uppercase">{item.genres}</p>
              </div>
              <div className="text-gray-600 text-lg font-bold">
                #{index + 1}
              </div>
            </div>
            {index < items.length - 1 && <Separator className="bg-gray-800" />}
          </Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mt-10 mb-10">
      <div className="lg:grid hidden lg:grid-cols-3 gap-8">
        <div className="bg-zinc-900 p-5">
          {renderSection(
            "Movies",
            [...movies]
              .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
              .slice(0, 5),
            true
          )}
        </div>
        <div className="bg-zinc-900 p-5">
          {renderSection(
            "Series",
            [...series]
              .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
              .slice(0, 5)
          )}
        </div>
        <div className="bg-zinc-900 p-5">
          {renderSection(
            "Anime",
            [...anime]
              .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
              .slice(0, 5)
          )}
        </div>
      </div>
    </div>
  );
}

export default FlixFeatured;