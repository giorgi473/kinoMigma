"use client";

import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterTag {
  id: string;
  label: string;
  category: string;
}

export interface MovieFilters {
  genre?: string;
  country?: string;
  yearMin?: string;
  yearMax?: string;
  ratingMin?: string;
  ratingMax?: string;
  movies?: string;
}

interface FilterMoviesTagsProps {
  onFiltersChange: (filters: MovieFilters) => void;
}

const filterCategories = {
  ფილმები: [
    { id: "all", label: "ყველა" },
    { id: "movie", label: "ფილმი" },
    { id: "series", label: "სერიალი" },
    { id: "trailer", label: "თრეილერი" },
  ],
  ჟანრი: [
    { id: "animated", label: "ანიმაციური" },
    { id: "biographical", label: "ბიოგრაფიული" },
    { id: "detective", label: "დეტექტივი" },
    { id: "documentary", label: "დოკუმენტური" },
    { id: "drama-genre", label: "დრამა" },
    { id: "erotic", label: "ეროტიკული" },
    { id: "historical", label: "ისტორიული" },
    { id: "musical", label: "მიუზიკლი" },
    { id: "thriller-genre", label: "თრილერი" },
    { id: "action", label: "მძაფრ-სიუჟეტიანი" },
    { id: "adventure", label: "სათავგადასავლო" },
    { id: "comedy", label: "კომედია" },
    { id: "fantasy", label: "ფანტასტიკა" },
    { id: "horror", label: "საშინელებათა" },
    { id: "romance", label: "მელოდრამა" },
    { id: "sci-fi", label: "ფანტასტიკა" },
    { id: "western", label: "ვესტერნი" },
    { id: "crime", label: "კრიმინალური" },
    { id: "mystery", label: "საიდუმლო" },
    { id: "war", label: "საომარი" },
    { id: "sport", label: "სპორტული" },
    { id: "family", label: "ოჯახური" },
  ],
  ქვეყანა: [
    { id: "australia", label: "ავსტრალია" },
    { id: "afghanistan", label: "ავღანეთი" },
    { id: "england", label: "ინგლისი" },
    { id: "usa", label: "აშშ" },
    { id: "france", label: "საფრანგეთი" },
    { id: "germany", label: "გერმანია" },
    { id: "italy", label: "იტალია" },
    { id: "spain", label: "ესპანეთი" },
    { id: "japan", label: "იაპონია" },
    { id: "china", label: "ჩინეთი" },
  ],
};

function FilterMoviesTags({ onFiltersChange }: FilterMoviesTagsProps) {
  const [activeTags, setActiveTags] = useState<FilterTag[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string;
  }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingMin, setRatingMin] = useState("");
  const [ratingMax, setRatingMax] = useState("");
  const [yearMin, setYearMin] = useState("");
  const [yearMax, setYearMax] = useState("");
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);

  const handleFilterChange = (category: string, value: string) => {
    const option = filterCategories[
      category as keyof typeof filterCategories
    ].find((opt) => opt.id === value);

    if (!option) return;

    setActiveTags((tags) => tags.filter((tag) => tag.category !== category));

    setActiveTags((tags) => [
      ...tags,
      { id: option.id, label: option.label, category },
    ]);

    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleRatingInputChange = (value: string, isMin: boolean) => {
    const numbersOnly = value.replace(/[^0-9]/g, "");

    if (!numbersOnly) {
      if (isMin) {
        setRatingMin("");
        handleRatingChange("", ratingMax);
      } else {
        setRatingMax("");
        handleRatingChange(ratingMin, "");
      }
      return;
    }

    let formatted = "";
    if (numbersOnly.length === 1) {
      formatted = numbersOnly;
    } else if (numbersOnly.length === 2) {
      if (numbersOnly[0] !== "1" && numbersOnly[0] !== "0") {
        formatted = `${numbersOnly[0]}.${numbersOnly[1]}`;
      } else {
        formatted = `${numbersOnly[0]}.${numbersOnly[1]}`;
      }
    } else if (numbersOnly.length === 3) {
      if (numbersOnly === "100") {
        formatted = "10.0";
      } else {
        formatted = `${numbersOnly[0]}.${numbersOnly[1]}`;
      }
    } else {
      formatted = `${numbersOnly[0]}.${numbersOnly[1]}`;
    }

    const numValue = Number.parseFloat(formatted);
    if (numValue > 10) return;

    if (isMin) {
      setRatingMin(formatted);
      handleRatingChange(formatted, ratingMax);
    } else {
      setRatingMax(formatted);
      handleRatingChange(ratingMin, formatted);
    }
  };

  const handleRatingChange = (min: string, max: string) => {
    if (min || max) {
      setActiveTags((tags) =>
        tags.filter((tag) => tag.category !== "რეიტინგი")
      );

      const label = `${min || "0"} - ${max || "10"}`;
      setActiveTags((tags) => [
        ...tags,
        { id: "rating-range", label, category: "რეიტინგი" },
      ]);

      setSelectedFilters((prev) => ({
        ...prev,
        რეიტინგი: `${min}-${max}`,
      }));
    } else {
      setActiveTags((tags) =>
        tags.filter((tag) => tag.category !== "რეიტინგი")
      );
      setSelectedFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters.რეიტინგი;
        return newFilters;
      });
    }
  };

  const handleYearInputChange = (value: string, isMin: boolean) => {
    const numbersOnly = value.replace(/[^0-9]/g, "");

    if (!numbersOnly) {
      if (isMin) {
        setYearMin("");
        handleYearChange("", yearMax);
      } else {
        setYearMax("");
        handleYearChange(yearMin, "");
      }
      return;
    }

    const formatted = numbersOnly.slice(0, 4);

    if (isMin) {
      setYearMin(formatted);
      handleYearChange(formatted, yearMax);
    } else {
      setYearMax(formatted);
      handleYearChange(yearMin, formatted);
    }
  };

  const handleYearChange = (min: string, max: string) => {
    if (min || max) {
      setActiveTags((tags) => tags.filter((tag) => tag.category !== "წელი"));

      const label = `${min || "1900"} - ${max || "2025"}`;
      setActiveTags((tags) => [
        ...tags,
        { id: "year-range", label, category: "წელი" },
      ]);

      setSelectedFilters((prev) => ({
        ...prev,
        წელი: `${min}-${max}`,
      }));
    } else {
      setActiveTags((tags) => tags.filter((tag) => tag.category !== "წელი"));
      setSelectedFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters.წელი;
        return newFilters;
      });
    }
  };

  const removeTag = (id: string, category: string) => {
    setActiveTags((prev) => prev.filter((tag) => tag.id !== id));

    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[category];
      return newFilters;
    });

    if (category === "რეიტინგი") {
      setRatingMin("");
      setRatingMax("");
    }

    if (category === "წელი") {
      setYearMin("");
      setYearMax("");
    }
  };

  const getFilteredOptions = (category: string) => {
    if ((category !== "ჟანრი" && category !== "ქვეყანა") || !searchQuery) {
      return filterCategories[category as keyof typeof filterCategories];
    }

    return filterCategories[category as keyof typeof filterCategories].filter(
      (option) => option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const applyFilters = () => {
    const filters: MovieFilters = {};

    if (selectedFilters.ფილმები && selectedFilters.ფილმები !== "all") {
      filters.movies = selectedFilters.ფილმები;
    }

    if (selectedFilters.ჟანრი) {
      filters.genre = selectedFilters.ჟანრი;
    }

    if (selectedFilters.ქვეყანა) {
      filters.country = selectedFilters.ქვეყანა;
    }

    if (yearMin) {
      filters.yearMin = yearMin;
    }

    if (yearMax) {
      filters.yearMax = yearMax;
    }

    if (ratingMin) {
      filters.ratingMin = ratingMin;
    }

    if (ratingMax) {
      filters.ratingMax = ratingMax;
    }

    onFiltersChange(filters);
    setIsMobileModalOpen(false);
  };

  const resetFilters = () => {
    setActiveTags([]);
    setSelectedFilters({});
    setSearchQuery("");
    setRatingMin("");
    setRatingMax("");
    setYearMin("");
    setYearMax("");
  };

  return (
    <div className="w-full">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f6be2f;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #face2f;
        }

        .mobile-scroll-hidden::-webkit-scrollbar {
          display: none;
        }
        .mobile-scroll-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Mobile Filter Button */}
      <div className="md:hidden">
        <Button
          onClick={() => setIsMobileModalOpen(true)}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md py-7 text-base"
        >
          გაფილტვრა
        </Button>
      </div>

      {/* Mobile Modal */}
      {isMobileModalOpen && (
        <div className="md:hidden fixed inset-0 bg-black z-50">
          <div className="h-full flex flex-col bg-black">
            {/* Main Menu */}
            {!mobileSubMenu && (
              <>
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 my-6">
                  <h2 className="text-white text-2xl font-semibold">
                    გაფილტრე
                  </h2>
                  <button
                    onClick={() => setIsMobileModalOpen(false)}
                    className="bg-yellow-500 rounded-md p-2 hover:bg-yellow-600 transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="flex-1 overflow-y-auto px-6 space-y-5 pb-32">
                  {/* ფილმები */}
                  <button
                    onClick={() => setMobileSubMenu("ფილმები")}
                    className="w-full bg-zinc-900 rounded-lg px-4 py-5 flex items-center justify-between text-white text-lg font-medium"
                  >
                    <span>ფილმები</span>
                    <div className="flex items-center text-zinc-400 gap-1">
                      ფილმები
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>

                  {/* ჟანრი */}
                  <button
                    onClick={() => setMobileSubMenu("ჟანრი")}
                    className="w-full bg-zinc-900 rounded-lg px-4 py-5 flex items-center justify-between text-white text-lg font-medium"
                  >
                    <span>ჟანრი</span>
                    <div className="flex items-center text-zinc-400 gap-1">
                      ჟანრი
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>

                  {/* რეიტინგი */}
                  <button
                    onClick={() => setMobileSubMenu("რეიტინგი")}
                    className="w-full bg-zinc-900 rounded-lg px-4 py-5 flex items-center justify-between text-white text-lg font-medium"
                  >
                    <span>რეიტინგი</span>
                    <div className="flex items-center text-zinc-400 gap-1">
                      რეიტინგი
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>

                  {/* ქვეყანა */}
                  <button
                    onClick={() => setMobileSubMenu("ქვეყანა")}
                    className="w-full bg-zinc-900 rounded-lg px-4 py-5 flex items-center justify-between text-white text-lg font-medium"
                  >
                    <span>ქვეყანა</span>
                    <div className="flex items-center text-zinc-400 gap-1">
                      ქვეყანა
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>

                  {/* წელი */}
                  <button
                    onClick={() => setMobileSubMenu("წელი")}
                    className="w-full bg-zinc-900 rounded-lg px-4 py-5 flex items-center justify-between text-white text-lg font-medium"
                  >
                    <span>წელი</span>
                    <div className="flex items-center text-zinc-400 gap-1">
                      წელი
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>
                  {/* Modal Footer - Fixed at bottom */}
                  <div className="flex gap-3 bg-black border-zinc-800 mt-10">
                    <Button
                      onClick={applyFilters}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg px-12 py-7 text-base"
                    >
                      მოძებნა
                    </Button>
                    <Button
                      onClick={resetFilters}
                      className="flex-1 bg-zinc-900 hover:bg-zinc-700 text-white font-semibold rounded-lg px-1 py-7 text-base"
                    >
                      დახურვა
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Sub Menu - ფილმები */}
            {mobileSubMenu === "ფილმები" && (
              <>
                <div className="flex items-center justify-center p-6 relative my-6">
                  <button
                    onClick={() => setMobileSubMenu(null)}
                    className="absolute left-6 bg-zinc-800 rounded-xl p-2 hover:bg-zinc-700 transition-colors"
                  >
                    <ChevronDown className="h-6 w-6 text-white rotate-90" />
                  </button>
                  <h2 className="text-white text-2xl font-semibold">
                    აირჩიეთ ფილმები
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto pb-24">
                  <div className="bg-zinc-900 rounded-lg mx-6 p-1 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
                    {filterCategories.ფილმები.map((option) => {
                      const isSelected = selectedFilters.ფილმები === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            handleFilterChange("ფილმები", option.id);
                          }}
                          className="w-full flex items-center gap-3 text-gray-400 py-4 px-4 hover:bg-zinc-800 transition-colors"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-yellow-500"
                                : "border-zinc-600"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            )}
                          </div>
                          <span className="text-base">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  <div className="p-6 my-6">
                    <Button
                      onClick={() => setMobileSubMenu(null)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-6 text-lg"
                    >
                      არჩევა
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Sub Menu - ჟანრი */}
            {mobileSubMenu === "ჟანრი" && (
              <>
                <div className="flex items-center justify-center p-6 relative my-6">
                  <button
                    onClick={() => setMobileSubMenu(null)}
                    className="absolute left-6 bg-zinc-800 rounded-xl p-2 hover:bg-zinc-700 transition-colors"
                  >
                    <ChevronDown className="h-6 w-6 text-white rotate-90" />
                  </button>
                  <h2 className="text-white text-2xl font-semibold">
                    აირჩიეთ ჟანრი
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto pb-24">
                  <div className="bg-zinc-900 rounded-md mx-6 p-1 max-h-[calc(70vh-250px)] overflow-y-auto custom-scrollbar">
                    {filterCategories.ჟანრი.map((option) => {
                      const isSelected = selectedFilters.ჟანრი === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            handleFilterChange("ჟანრი", option.id);
                          }}
                          className="w-full flex items-center gap-3 text-gray-400 py-4 px-4 hover:bg-zinc-800 transition-colors"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-yellow-500"
                                : "border-zinc-600"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            )}
                          </div>
                          <span className="text-base">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-6 mt-5">
                    <Button
                      onClick={() => setMobileSubMenu(null)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl py-6 text-lg"
                    >
                      არჩევა
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Sub Menu - რეიტინგი */}
            {mobileSubMenu === "რეიტინგი" && (
              <>
                <div className="flex items-center justify-center p-6 relative my-6">
                  <button
                    onClick={() => setMobileSubMenu(null)}
                    className="absolute left-6 bg-zinc-800 rounded-xl p-2 hover:bg-zinc-700 transition-colors"
                  >
                    <ChevronDown className="h-6 w-6 text-white rotate-90" />
                  </button>
                  <h2 className="text-white text-2xl font-semibold">
                    აირჩიეთ რეიტინგი
                  </h2>
                </div>
                <div className="flex-1 px-6 pb-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="2.9"
                      value={ratingMin}
                      onChange={(e) =>
                        handleRatingInputChange(e.target.value, true)
                      }
                      className="flex-1 bg-zinc-800 text-white px-4 w-3 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <span className="text-gray-400">•</span>
                    <input
                      type="text"
                      placeholder="10.0"
                      value={ratingMax}
                      onChange={(e) =>
                        handleRatingInputChange(e.target.value, false)
                      }
                      className="flex-1 bg-zinc-800 text-white px-4 w-3 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Sub Menu - ქვეყანა */}
            {mobileSubMenu === "ქვეყანა" && (
              <>
                <div className="flex items-center justify-center p-6 relative">
                  <button
                    onClick={() => setMobileSubMenu(null)}
                    className="absolute left-6 bg-zinc-800 rounded-xl p-2 hover:bg-zinc-700 transition-colors"
                  >
                    <ChevronDown className="h-6 w-6 text-white rotate-90" />
                  </button>
                  <h2 className="text-white text-2xl font-semibold">
                    აირჩიეთ ქვეყანა
                  </h2>
                </div>
                <div className="flex-1 overflow-y-auto pb-24">
                  <div className="bg-zinc-900 rounded-3xl mx-6 p-1 max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
                    {filterCategories.ქვეყანა.map((option) => {
                      const isSelected = selectedFilters.ქვეყანა === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => {
                            handleFilterChange("ქვეყანა", option.id);
                          }}
                          className="w-full flex items-center gap-3 text-gray-400 py-4 px-4 hover:bg-zinc-800 transition-colors"
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-yellow-500"
                                : "border-zinc-600"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            )}
                          </div>
                          <span className="text-base">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="p-6 bg-black">
                  <Button
                    onClick={() => setMobileSubMenu(null)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl py-6 text-lg"
                  >
                    არჩევა
                  </Button>
                </div>
              </>
            )}

            {/* Sub Menu - წელი */}
            {mobileSubMenu === "წელი" && (
              <>
                <div className="flex items-center gap-4 p-6">
                  <button
                    onClick={() => setMobileSubMenu(null)}
                    className="bg-zinc-800 rounded-xl p-2 hover:bg-zinc-700 transition-colors"
                  >
                    <ChevronDown className="h-6 w-6 text-white rotate-90" />
                  </button>
                  <h2 className="text-white text-2xl font-semibold">წელი</h2>
                </div>
                <div className="flex-1 px-6 pb-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="1990"
                      value={yearMin}
                      onChange={(e) =>
                        handleYearInputChange(e.target.value, true)
                      }
                      maxLength={4}
                      className="flex-1 bg-zinc-800 text-white px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <span className="text-gray-400">•</span>
                    <input
                      type="text"
                      placeholder="2025"
                      value={yearMax}
                      onChange={(e) =>
                        handleYearInputChange(e.target.value, false)
                      }
                      maxLength={4}
                      className="flex-1 bg-zinc-800 text-white px-4 py-3 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop Filter (Original) */}
      <div className="hidden md:flex items-center gap-18 2xl:gap-24 px-6 py-5 overflow-x-auto mobile-scroll-hidden bg-zinc-900 rounded-t-md">
        {Object.entries(filterCategories).map(([category, options]) => (
          <DropdownMenu key={category}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="bordernone"
                className={`px-4 py-2 text-sm whitespace-nowrap focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                  selectedFilters[category] ? "text-white" : "text-white"
                }`}
              >
                {category}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-900 border-zinc-800 rounded-none border-none rounded-b-md">
              <div
                className={
                  category === "ჟანრი" || category === "ქვეყანა"
                    ? "max-h-60 overflow-y-auto custom-scrollbar"
                    : ""
                }
              >
                {(category === "ჟანრი" || category === "ქვეყანა") && (
                  <div className="px-2 py-2 sticky top-0 bg-zinc-900 z-10 select-none">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={
                          category === "ჟანრი"
                            ? "ჩაწერე ჟანრი"
                            : "ჩაწერე ქვეყანა"
                        }
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        className="w-36 bg-zinc-800 text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
                      />
                    </div>
                  </div>
                )}
                <DropdownMenuRadioGroup
                  value={selectedFilters[category] || ""}
                  onValueChange={(value) => handleFilterChange(category, value)}
                >
                  {getFilteredOptions(category).map((option) => {
                    const isSelected = selectedFilters[category] === option.id;
                    return (
                      <DropdownMenuRadioItem
                        key={option.id}
                        value={option.id}
                        className={`select-none hover:bg-zinc-800 cursor-pointer py-2 px-3 [&>span]:hidden ${
                          isSelected ? "text-gray-400" : "text-gray-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-8 flex items-center justify-center ${
                              isSelected ? "border-yellow-500" : "border-black"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            )}
                          </div>
                          <span>{option.label}</span>
                        </div>
                      </DropdownMenuRadioItem>
                    );
                  })}
                </DropdownMenuRadioGroup>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}

        <DropdownMenu
          open={isYearDropdownOpen}
          onOpenChange={setIsYearDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="bordernone"
              className="px-4 py-2 text-sm whitespace-nowrap text-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              წელი
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 border-zinc-800 rounded-none border-none rounded-b-md px-3 pt-4 pb-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="1990"
                  value={yearMin}
                  onChange={(e) => handleYearInputChange(e.target.value, true)}
                  onClick={(e) => e.stopPropagation()}
                  maxLength={4}
                  className="w-16 bg-zinc-800 text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
                />
                <span className="text-gray-400">•</span>
                <input
                  type="text"
                  placeholder="2025"
                  value={yearMax}
                  onChange={(e) => handleYearInputChange(e.target.value, false)}
                  onClick={(e) => e.stopPropagation()}
                  maxLength={4}
                  className="w-16 bg-zinc-800 text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu
          open={isRatingDropdownOpen}
          onOpenChange={setIsRatingDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="bordernone"
              className="px-4 py-2 text-sm whitespace-nowrap text-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              რეიტინგი
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 border-zinc-800 rounded-none border-none rounded-b-md px-3 pt-4 pb-3">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="2.9"
                  value={ratingMin}
                  onChange={(e) =>
                    handleRatingInputChange(e.target.value, true)
                  }
                  onClick={(e) => e.stopPropagation()}
                  className="w-14 bg-zinc-800 text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
                />
                <span className="text-gray-400">•</span>
                <input
                  type="text"
                  placeholder="10.0"
                  value={ratingMax}
                  onChange={(e) =>
                    handleRatingInputChange(e.target.value, false)
                  }
                  onClick={(e) => e.stopPropagation()}
                  className="w-14 bg-zinc-800 text-white px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-zinc-700"
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="default"
          onClick={applyFilters}
          className="bg-yellow-500 hover:bg-yellow-600 select-none cursor-pointer text-white font-semibold rounded-md px-16 py-2 text-sm whitespace-nowrap ml-auto focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          გაფილტრე
        </Button>
      </div>

      {activeTags.length > 0 && (
        <div className="flex items-center gap-3 px-6 py-2 bg-zinc-800 border-b border-zinc-800 overflow-x-auto mobile-scroll-hidden">
          <div className="flex items-center gap-2">
            {activeTags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 bg-zinc-800 text-white py-2 rounded-full text-sm whitespace-nowrap"
              >
                <span className="flex items-center gap-2 bg-zinc-900 pl-4 pr-2 py-2 rounded-full">
                  {tag.label}
                  <button
                    onClick={() => removeTag(tag.id, tag.category)}
                    className=" bg-zinc-600 rounded-full p-2 hover:text-yellow-500 transition-colors focus:outline-none"
                    aria-label={`Remove ${tag.label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterMoviesTags;
