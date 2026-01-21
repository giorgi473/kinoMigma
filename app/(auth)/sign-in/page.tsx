"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "სახელი ან მეილი აუცილებელია" })
    .email({ message: "შეიყვანეთ სწორი მეილი" })
    .or(z.string().min(3, { message: "სახელი უნდა იყოს მინიმუმ 3 სიმბოლო" })),
  password: z
    .string()
    .min(6, { message: "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო" }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: SignInFormValues) {
    console.log(data);
    // Handle sign-in logic here
  }

  function onRegister() {
    return router.push("/sign-up");
  }

  return (
    <>
      <Link href={"/sign-up"}>
        <div className="fixed mt-5 ml-5 bg-zinc-700/30 p-3 rounded-md">
          <ChevronLeft size={18} />
        </div>
      </Link>
      <div className="min-h-screen flex justify-end">
        <div className="w-full max-w-2xl">
          <div className="bg-zinc-950 min-h-screen flex flex-col justify-center">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8 select-none">
              <div className="relative w-22 h-20">
                <Image src="/logo/Logo.svg" alt="logo" fill />
              </div>
              <h1 className="text-3xl font-bold text-white">Movix.Ge</h1>
              <p className="text-zinc-500 -mt-1">ავტორიზაცია</p>
            </div>

            {/* Form */}
            <div className="p-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                              type="text"
                              placeholder="სახელი ან მეილი"
                              className={cn(
                                "w-full bg-zinc-800/80 text-white rounded-lg pl-12 pr-4 py-5 outline-none transition-all",
                                form.formState.errors.email
                                  ? ""
                                  : "focus:ring-2 focus:ring-yellow-500",
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-yellow-300 text-sm mt-1 pl-1" />
                      </FormItem>
                    )}
                  />

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
                                  : "focus:ring-2 focus:ring-yellow-500",
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
                  {/* Sign In Button */}
                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg py-5 h-auto transition-all"
                  >
                    <LogIn className="mt-1" /> ავტორიზაცია
                  </Button>
                  {/* register */}
                  <Button
                    type="button"
                    onClick={onRegister}
                    variant={"secondary"}
                    className="w-full bg-zinc-800 text-white font-semibold rounded-lg py-5 h-auto border-zinc-700 transition-all"
                  >
                    <UserRoundPlus className="mt-0.5" /> რეგისტრაცია
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
