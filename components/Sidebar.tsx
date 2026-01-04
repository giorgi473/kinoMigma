"use client";

import { useState } from "react";
import { Home, Film, Tv, Clock, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: Home, label: "მთავარი", href: "/" },
  { icon: Film, label: "ფილმები", href: "/movies" },
  { icon: Tv, label: "სერიალები", href: "/series" },
  { icon: Clock, label: "ახალი", href: "/new" },
  { icon: Star, label: "ანიმაციური", href: "/popular" },
  { icon: Users, label: "ჟანრები", href: "/genres" },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("/");
  const router = useRouter();

  return (
    <aside className="w-28 h-screen hidden 2xl:flex items-center justify-center border-r border-border bg-zinc-900 py-4 px-2 shrink-0">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.href}
              className={cn(
                "w-full flex-col text-gray-500 rounded-lg flex items-center justify-center gap-2 h-auto cursor-pointer py-4 px-2",
                activeItem === item.href && "bg-black text-accent"
              )}
              onClick={() => {
                setActiveItem(item.href);
                router.push(item.href);
              }}
            >
              <Icon className="h-6 w-6" />
              <span className="text-md font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
