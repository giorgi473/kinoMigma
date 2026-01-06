import { movies } from "@/data/movies";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default async function MoviePage({ params }: PageProps) {
  const { id, slug } = await params;
  const movie = movies.find((m) => m.id === Number.parseInt(id));

  if (!movie) {
    notFound();
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Image
          src={movie.poster}
          alt={movie.title || "placeholder.png"}
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Scrollable content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">
            {movie.title}
          </h1>
          {/* დანარჩენი კონტენტი */}
        </div>
      </div>
    </>
  );
}
