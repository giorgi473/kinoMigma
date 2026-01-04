import HeroSection from "@/components/HeroSection";
import { MovieCarousel } from "@/components/MovieCarousel";

function home() {
  return (
    <div>
      <HeroSection />
      <div className="px-4 py-12">
        <MovieCarousel title="ახალი ფილმები" category="newest" />
      </div>
    </div>
  );
}

export default home;
