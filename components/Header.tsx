"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  Bell,
  Menu,
  X,
  Home,
  Film,
  Tv,
  Clock,
  Star,
  Users,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "მთავარი გვერდი", href: "/" },
    { icon: Film, label: "ფილმები", href: "/movies" },
    { icon: Tv, label: "სერიალები", href: "/series" },
    { icon: Star, label: "ანიმაციები", href: "/popular" },
    { icon: Clock, label: "ანიმე", href: "/new" },
    { icon: Mail, label: "კონტაქტი", href: "/contact" },
    { icon: Users, label: "მსახიობები", href: "/genres" },
  ];

  return (
    <>
      <header
        className="z-50 bg-black w-full border-b"
        style={{ backgroundColor: "red!" }}
      >
        <div className="container mx-auto px-4">
          {/* მთავარი ხედი */}
          <div className="flex items-center justify-between h-16 relative">
            {/* მარცხნივ: Hamburger / დესკტოპზე სახელი */}
            <div className="flex items-center z-20">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>

              <h1 className="hidden md:block text-lg lg:text-xl font-bold whitespace-nowrap">
                KINO<span className="text-primary">MIGMA</span>.COM
              </h1>
            </div>

            {/* მობილურზე ლოგო ცენტრში */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
              <Image
                src="/logo/Logo.png"
                alt="KINOMIGMA.COM"
                width={160}
                height={40}
                priority
                className="h-8 w-auto object-contain"
              />
            </div>

            {/* მარჯვნივ */}
            <div className="flex items-center gap-2 md:gap-4 ml-auto z-20">
              {!searchOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}

              <div className="hidden md:flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="ძებნა..."
                    className="pl-10 pr-4 py-2 w-64 lg:w-80 bg-secondary border-border"
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>KU</AvatarFallback>
                    </Avatar>
                    <span className="text-sm hidden lg:inline">
                      KINOMIGMA User
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>პროფილი</DropdownMenuItem>
                  <DropdownMenuItem>გამოსვლა</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* საძიებო overlay მობილურზე */}
          {searchOpen && (
            <div className="md:hidden fixed inset-x-0 top-0 h-16 bg-background border-b z-30 flex items-center px-4">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <Image
                  src="/logo.png"
                  alt="KINOMIGMA.COM"
                  width={140}
                  height={36}
                  className="h-7 w-auto object-contain opacity-30"
                />
              </div>

              <div className="relative flex-1 max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="search"
                  placeholder="ძებნა..."
                  className="pl-10 pr-10 w-full bg-secondary border-border"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* მობილური საიტბარი (drawer) */}
      <div
        className={`fixed inset-0 z-50 flex md:hidden ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* ფონის დაბნელება */}
        <div
          className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ease-in-out ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* საიტბარი */}
        <div
          className={`relative w-80 max-w-full bg-zinc-900 border-r shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* ზედა ნაწილი: ლოგო + X */}
          <div className="flex items-center justify-between p-4">
            <Image
              src="/logo/Logo.png"
              alt="KINOMIGMA"
              width={50}
              height={50}
              className="h-8 w-auto"
            />
            <button
              className="bg-black p-2 rounded-md text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* მენიუ პუნქტები */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                  pathname === item.href
                    ? "bg-zinc-800 border-r-4 border-primary"
                    : "text-gray-500"
                }`}
              >
                <item.icon className="h-5 w-5 text-gray-500" />
                <span className="text-lg">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* ქვედა ნაწილი: სოციალური ქსელები */}
          <div className="border-t p-6 space-y-3">
            <button className="flex w-full items-center gap-3 bg-zinc-800 rounded-md">
              <div className="p-2 flex items-center justify-center">
                <Image
                  src="/vector/discord.png"
                  alt="Discord"
                  width={18}
                  height={18}
                />
              </div>
              <span className="flex-1 text-center text-zinc-400">Discord</span>
            </button>
            <button className="flex w-full items-center gap-3 bg-zinc-800 rounded-md">
              <div className="p-2 flex items-center justify-center">
                <Image
                  src="/vector/facebook.png"
                  alt="Facebook"
                  width={20}
                  height={20}
                />
              </div>
              <span className="flex-1 text-center text-zinc-400">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

