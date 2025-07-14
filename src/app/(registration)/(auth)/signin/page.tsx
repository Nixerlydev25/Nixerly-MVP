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
    <div className="flex mt-32">
      <section className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-2xl animate-fade-in">
          <Card className="shadow-nixerly-card hover-card-rise rounded-2xl">
            <CardHeader className="space-y-2 pb-6">
              {/* <div className="flex justify-center mb-2"> */}
              {/* <div className="bg-nixerly-blue p-3 rounded-full"> */}
              {/* <LogIn className="h-6 w-6 text-white" /> */}
              {/* </div>/ */}
              {/* </div> */}
              <CardTitle
                className="text-center text-black font-inter text-4xl font-bold leading-[normal]
  mt-10 "
              >
                Sign In
              </CardTitle>
              <CardDescription
                className=" text-center font-inter text-sm font-normal leading-5 tracking-tight text-nixerly-businesslabel
"
              >
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
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
        placeholder="ahmed234$#"
        className="font-inter text-sm font-normal leading-5 tracking-tight text-black  rounded-md border border-nixerly-bussinessborder p-5"
        {...field}
      />
      <span
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
      >
        {showPassword ?  <EyeOff size={16} className="text-[#172327]"/> : <Eye size={16} className="text-[#172327]" />}
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
                    className="text-lg font-medium  leading-6 w-full text-white  rounded-full  p-5  bg-nixerly-blue"
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
            </CardContent>
            <CardFooter className="flex flex-col">
              {/* <Separator className="my-4 bg-nixerly-lightblue" /> */}
              <p
                className="text-center text-sm  font-inter  font-normal leading-5 tracking-tight text-nixerly-businesslabel" 
              >
                Don&apos;t have an account?{" "}
                <Link
                  href={ROUTES.SIGNUP}
                  className="font-medium text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors font-inter text-sm leading-5
"
                  tabIndex={0}
                  aria-label="Sign up for an account"
                >
                  Sign Up
                </Link>
              </p>
              {/* <p className="mt-2 text-center text-xs text-nixerly-darkgray">
                By signing in, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline hover:text-nixerly-blue transition-colors"
                  tabIndex={0}
                  aria-label="Terms of Service"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline hover:text-nixerly-blue transition-colors"
                  tabIndex={0}
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </Link>
                .
              </p> */}
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
