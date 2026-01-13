"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserRoundPlus,
  ChevronLeft,
} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const signUpSchema = z
  .object({
    name: z.string().min(3, { message: "სახელი უნდა იყოს მინიმუმ 3 სიმბოლო" }),
    email: z
      .string()
      .min(1, { message: "ელ.ფოსტა აუცილებელია" })
      .email({ message: "შეიყვანეთ სწორი მეილი" }),
    birthYear: z.string().min(1, { message: "აირჩიეთ დაბადების წელი" }),
    gender: z.string().min(1, { message: "აირჩიეთ სქესი" }),
    password: z
      .string()
      .min(6, { message: "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო" }),
    confirmPassword: z
      .string()
      .min(6, { message: "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "პაროლები არ ემთხვევა",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      birthYear: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: SignUpFormValues) {
    console.log(data);
    // Handle registration logic here
  }

  // Generate years from 2026 down to 1940
  const years = Array.from({ length: 36 }, (_, i) => 2026 - i);

  const genders = [
    { value: "male", label: "მამრობითი" },
    { value: "female", label: "მდედრობითი" },
  ];

  return (
    <>
      <Link href={"/sign-in"}>
        <div className="fixed mt-5 ml-5 bg-zinc-700/30 p-3 rounded-md">
          <ChevronLeft size={18} />
        </div>
      </Link>
      <div className="min-h-screen flex justify-end">
        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 5px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #27272a;
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
        <div className="w-full max-w-2xl">
          <div className="bg-zinc-950 min-h-screen flex flex-col justify-center">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8 select-none">
              <div className="relative w-22 h-20">
                <Image src="/logo/Logo.svg" alt="logo" fill />
              </div>
              <h1 className="text-3xl font-bold text-white">Movix.Ge</h1>
              <p className="text-zinc-500 -mt-1">რეგისტრაცია</p>
            </div>

            {/* Form */}
            <div className="p-8">
              <Form {...form}>
                <div className="space-y-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              {...field}
                              type="text"
                              placeholder="სახელი ან მეილი"
                              className={cn(
                                "w-full bg-zinc-800/80 text-white rounded-lg pl-12 pr-4 py-5 outline-none transition-all",
                                form.formState.errors.name
                                  ? ""
                                  : "focus:ring-2 focus:ring-yellow-500"
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-yellow-300 text-sm mt-1 pl-1" />
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              {...field}
                              type="email"
                              placeholder="ელ.ფოსტა"
                              className={cn(
                                "w-full bg-zinc-800/80 text-white rounded-lg pl-12 pr-4 py-5 outline-none transition-all",
                                form.formState.errors.email
                                  ? ""
                                  : "focus:ring-2 focus:ring-yellow-500"
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-yellow-300 text-sm mt-1 pl-1" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {/* Birth Year Field */}
                    <FormField
                      control={form.control}
                      name="birthYear"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <button
                                  type="button"
                                  className={cn(
                                    "w-full bg-zinc-800 text-white rounded-lg px-4 py-5 outline-none transition-all flex items-center justify-between",
                                    !field.value && "text-gray-400",
                                    form.formState.errors.birthYear
                                      ? ""
                                      : "hover:bg-zinc-700"
                                  )}
                                >
                                  <span>{field.value || "დაბ. წელი"}</span>
                                  <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="p-0 bg-zinc-800 border-zinc-700 rounded-lg mt-2"
                              align="start"
                              style={{
                                width: "var(--radix-popover-trigger-width)",
                              }}
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 max-h-60 overflow-y-auto p-2 gap-1 custom-scrollbar">
                                {years.map((year) => (
                                  <button
                                    key={year}
                                    type="button"
                                    onClick={() => {
                                      field.onChange(year.toString());
                                    }}
                                    className={cn(
                                      "p-2.5 text-center rounded-md hover:bg-zinc-700 transition-colors text-sm",
                                      field.value === year.toString()
                                        ? "bg-yellow-500 text-black font-semibold hover:bg-yellow-600"
                                        : "text-gray-300"
                                    )}
                                  >
                                    {year}
                                  </button>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />

                    {/* Gender Field */}
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <button
                                  type="button"
                                  className={cn(
                                    "w-full bg-zinc-800 text-white rounded-lg px-4 py-5 outline-none transition-all flex items-center justify-between",
                                    !field.value && "text-gray-400",
                                    form.formState.errors.gender
                                      ? ""
                                      : "hover:bg-zinc-700"
                                  )}
                                >
                                  <span className="text-xs sm:text-base">
                                    {field.value
                                      ? genders.find(
                                          (g) => g.value === field.value
                                        )?.label
                                      : "სქესი"}
                                  </span>
                                  <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="p-2 bg-zinc-800 border-zinc-700 rounded-lg mt-2"
                              align="start"
                              style={{
                                width: "var(--radix-popover-trigger-width)",
                              }}
                            >
                              <div className="flex flex-col gap-1">
                                {genders.map((gender) => (
                                  <button
                                    key={gender.value}
                                    type="button"
                                    onClick={() => {
                                      field.onChange(gender.value);
                                    }}
                                    className={cn(
                                      "p-3 text-center rounded-md hover:bg-zinc-700 transition-colors",
                                      field.value === gender.value
                                        ? "bg-yellow-500 text-black font-semibold hover:bg-yellow-600"
                                        : "text-gray-300"
                                    )}
                                  >
                                    {gender.label}
                                  </button>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="პაროლი"
                              className={cn(
                                "w-full bg-zinc-800/80 text-white rounded-lg pl-12 pr-12 py-5 outline-none transition-all",
                                form.formState.errors.password
                                  ? ""
                                  : "focus:ring-2 focus:ring-yellow-500"
                              )}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-white transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-yellow-300 text-sm mt-1 pl-1" />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              {...field}
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="გაიმეორეთ პაროლი"
                              className={cn(
                                "w-full bg-zinc-800/80 text-white rounded-lg pl-12 pr-12 py-5 outline-none transition-all",
                                form.formState.errors.confirmPassword
                                  ? ""
                                  : "focus:ring-2 focus:ring-yellow-500"
                              )}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer hover:text-white transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-yellow-300 text-sm mt-1 pl-1" />
                      </FormItem>
                    )}
                  />

                  {/* Register Button */}
                  <Button
                    type="button"
                    onClick={form.handleSubmit(onSubmit)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg py-5 h-auto transition-all flex items-center justify-center gap-2"
                  >
                    <UserRoundPlus className="w-5 h-5" />
                    რეგისტრაცია
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
