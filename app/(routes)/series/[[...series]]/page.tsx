import Image from "next/image";
import { AlertTriangle, Clock, Heart, Plus, Bell, User } from "lucide-react";
import { series } from "@/data/series";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    series?: string[];
  }>;
}

export default async function SeriesPage({ params }: PageProps) {
  const { series: seriesParams } = await params;

  // series array should be [id, slug] format
  if (!seriesParams || seriesParams.length === 0) {
    notFound();
  }

  const seriesId = Number.parseInt(seriesParams[0]);

  const seriesItem = series.find((s) => s.id === seriesId);

  if (!seriesItem) {
    notFound();
  }

  return (
    <>
      {/* Fixed Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Image
          src={seriesItem.poster || "/placeholder.svg"}
          alt={seriesItem.title}
          fill
          className="object-cover hidden lg:flex"
          priority
          quality={75}
          sizes="100vw"
          unoptimized
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 min-h-screen mt-0 lg:mt-10 bg-linear-to-b from-transparent via-zinc-800/95 to-zinc-950">
        <div className="w-full px-0 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 pt-0 lg:pt-4 pb-4">
            {/* Left side - Series Poster */}
            <div className="lg:w-70 lg:shrink-0">
              <div className="relative w-full aspect-2/3 overflow-hidden shadow-2xl hidden lg:flex">
                <Image
                  src={seriesItem.poster || "/placeholder.svg"}
                  alt={seriesItem.title}
                  fill
                  className="object-cover"
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 280px"
                  priority
                  unoptimized
                  loading="eager"
                />
              </div>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 hidden lg:block px-6 transition-colors">
                სერიალის ორიგინალი
              </button>
            </div>

            {/* Right side - Video Player */}
            <div className="flex-1">
              <div
                className="relative w-full overflow-hidden mb-6"
                style={{ height: "468.5px" }}
              >
                <div className="absolute top-0 right-4 text-white font-bold text-xl z-10 pt-2">
                  KINOFLIX
                </div>

                <video
                  className="w-full h-full object-cover"
                  controls
                  poster={seriesItem.poster}
                  preload="metadata"
                >
                  <source src={seriesItem.video} type="video/mp4" />
                  თქვენი ბრაუზერი არ უჭერს მხარს ვიდეოს.
                </video>
              </div>
            </div>
          </div>

          {/* Series Details */}
          <div className="flex items-start justify-between px-4 lg:px-0">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-white">
                {seriesItem.title}
              </h1>
              <p className="text-gray-300">
                Stranger Things / {seriesItem.strangerThings}
              </p>
              <p className="text-yellow-400 font-semibold">
                ⭐ {seriesItem.rating}
              </p>
              <p className="text-gray-400">{seriesItem.genres}</p>
              <p className="text-gray-300 font-medium">
                {seriesItem.georgianTitle}
              </p>
              <p className="text-gray-400">{seriesItem.year}</p>
              <p className="text-gray-300 mt-2 max-w-3xl">
                {seriesItem.description}
              </p>
            </div>
            {/* right side icons */}
            <div className="flex flex-col gap-12 items-center justify-between">
              {/* Icon buttons row */}
              <div className="flex items-center gap-6">
                <button className="cursor-pointer">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </button>
                <button className="cursor-pointer">
                  <Clock className="w-6 h-6 text-white" />
                </button>
                <button className="cursor-pointer">
                  <Heart className="w-6 h-6 text-white" />
                </button>
                <button className="cursor-pointer">
                  <Plus className="w-6 h-6 text-white" />
                </button>
                <button className="cursor-pointer">
                  <Bell className="w-6 h-6 text-white" />
                </button>
              </div>
              {/* Rating display */}
              <div className="flex items-center gap-3">
                {/* Star ratings */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4].map((star) => (
                    <svg
                      key={star}
                      className="w-5 h-5 fill-yellow-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <svg className="w-5 h-5 fill-gray-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>

                {/* Rating badge */}
                <span className="text-white font-bold text-xs bg-red-500 rounded-full p-2">
                  4.7
                </span>

                {/* User icon and count */}
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-white" />
                  <span className="text-white font-bold text-xs">165</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
