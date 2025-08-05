"use client";

import type React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { LogIn, Loader2 } from "lucide-react";
import { useSignIn } from "@/hook/auth/auth.hook";
import { signInSchema, type SignInFormValues } from "@/schema/auth/auth.schema";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react";

export default function LoginPage() {
  const { mutateAsync: SignIn, isPending } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);


  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      // email: "john.doe@example.com",
      // password: "password123",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    SignIn({ ...values });
  };

  return (
    <div className="flex min-h-screen relative">
      <div className="absolute top-8 right-8 z-50">
        <Link href={'/'}>
        <Image
          src="/NixerlyLogo.svg"
          alt="Nixerly Logo"
          width={120}
          height={32}
          priority
          />
          </Link>
      </div>
      {/* Left side - Promotional Content */}
      <section className="hidden lg:flex flex-3 relative overflow-hidden m-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">

        <Image
          src="/signin.jpg"
          alt="Construction Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-nixerly-blue to-nixerly-blue/95" />
        <div className="relative z-10 flex items-center justify-center p-8">
          <div className="max-w-xl text-white">
            <h2 className="text-6xl font-bold mb-8 drop-shadow-lg [text-shadow:_2px_2px_10px_rgb(0_0_0_/_40%)]">
              Welcome Back to Nixerly
            </h2>
            <p className="text-2xl mb-8 leading-relaxed drop-shadow-md [text-shadow:_1px_1px_5px_rgb(0_0_0_/_30%)]">
              Connect with the best in the construction industry. Find opportunities and grow your network.
            </p>
          </div>
        </div>
      </section>

      {/* Right side - Sign In Form */}
      <section className="flex flex-2 items-center justify-center p-8">
        <div className="w-full max-w-md">

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
              <p className="mt-2 text-sm text-gray-600">
                Enter your credentials to access your account
              </p>
            </div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5 max-w-[500px] mx-auto container"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="font-inter text-sm font-normal leading-5 tracking-tight text-nixerly-businesslabel">
                          E-mail Or phone number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            className="  font-inter text-sm font-normal leading-5 tracking-tight text-black  rounded-md border border-nixerly-bussinessborder p-5"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="">
                        <div className="flex items-center justify-between">
                          <FormLabel
                            className="font-inter text-sm font-normal leading-5 tracking-tight text-nixerly-businesslabel">
                            Password
                          </FormLabel>
                        </div>
                        <FormControl className="flex  justify-between">
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className="font-inter text-sm font-normal leading-5 tracking-tight text-black  rounded-md border border-nixerly-bussinessborder p-5"
                              {...field}
                            />
                            <span
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
                            >
                              {showPassword ? <EyeOff size={16} className="text-[#172327]" /> : <Eye size={16} className="text-[#172327]" />}
                            </span>
                          </div>

                        </FormControl>

                        <Link
                          href="/forgot-password"
                          className="   pt-2 font-inter text-sm text-right font-medium leading-5
font-inter  tracking-tight text-[#172327]"
                          tabIndex={0}
                          aria-label="Forgot password"
                        >
                          Forgot password?
                        </Link>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="text-lg font-medium leading-6 w-full text-white rounded-xl p-5  bg-nixerly-blue"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Form>
              <p className="mt-8 text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href={ROUTES.SIGNUP}
                  className="font-medium text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                  tabIndex={0}
                  aria-label="Sign up for an account"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
