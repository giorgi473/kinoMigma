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

const filterCategories = {
  ფილმები: [
    { id: "action", label: "ბოევიკები" },
    { id: "comedy", label: "კომედია" },
    { id: "drama", label: "დრამა" },
    { id: "thriller", label: "თრილერი" },
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
  ],
  წელი: [
    { id: "year-2024", label: "2024" },
    { id: "year-2023", label: "2023" },
    { id: "year-2022", label: "2022" },
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

function FilterMoviesTags() {
  const [activeTags, setActiveTags] = useState<FilterTag[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string;
  }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingMin, setRatingMin] = useState("");
  const [ratingMax, setRatingMax] = useState("");
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);

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
    // მხოლოდ რიცხვები დაშვებული
    const numbersOnly = value.replace(/[^0-9]/g, "");

    // თუ ცარიელია
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

    // ავტომატურად დავამატოთ წერტილი
    let formatted = "";
    if (numbersOnly.length === 1) {
      formatted = numbersOnly;
    } else if (numbersOnly.length === 2) {
      // თუ პირველი ციფრი 1-ზე მეტია, არ დავუშვათ
      if (numbersOnly[0] !== "1" && numbersOnly[0] !== "0") {
        formatted = `${numbersOnly[0]}.${numbersOnly[1]}`;
      } else {
        formatted = `${numbersOnly[0]}.${numbersOnly[1]}`;
      }
    } else if (numbersOnly.length === 3) {
      // თუ 100 ან მეტია
      if (numbersOnly === "100") {
        formatted = "10.0";
      } else {
        formatted = `${numbersOnly[0]}.${numbersOnly[1]}`;
      }
    } else {
      formatted = `${numbersOnly[0]}.${numbersOnly[1]}`;
    }

    // 10-ზე მეტი არ უნდა იყოს
    const numValue = parseFloat(formatted);
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
        tags.filter((tag) => tag.category !== "რეიტინგი"),
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
        tags.filter((tag) => tag.category !== "რეიტინგი"),
      );
      setSelectedFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters.რეიტინგი;
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
  };

  const getFilteredOptions = (category: string) => {
    if ((category !== "ჟანრი" && category !== "ქვეყანა") || !searchQuery) {
      return filterCategories[category as keyof typeof filterCategories];
    }

    return filterCategories[category as keyof typeof filterCategories].filter(
      (option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
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
      `}</style>

      {/* ფილტრების ღილაკები */}
      <div className="flex items-center gap-24 px-6 py-5 overflow-x-auto custom-scrollbar bg-zinc-900 rounded-t-md">
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

        {/* რეიტინგის ფილტრი */}
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
          className="bg-yellow-500 hover:bg-yellow-600 select-none cursor-pointer text-white font-semibold rounded-md px-16 py-2 text-sm whitespace-nowrap ml-auto focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          გაფილტრე
        </Button>
      </div>

      {/* აქტიური ფილტრები */}
      {activeTags.length > 0 && (
        <div className="flex items-center gap-3 px-6 py-2 bg-zinc-800 border-b border-zinc-800 overflow-x-auto custom-scrollbar">
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
