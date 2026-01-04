"use client";

import { usePathname } from "next/navigation";
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

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="flex mb-3 2xl:hidden overflow-x-auto bg-zinc-900 px-4 py-3 hide-scrollbar">
      <div className="flex gap-6 min-w-max">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-gray-500 transition-colors whitespace-nowrap",
                isActive && "bg-black text-accent"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
