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

export default function LoginPage() {
  const { mutateAsync: SignIn, isPending } = useSignIn();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    // defaultValues: {
    //   email: "john.doe@example.com",
    //   password: "password123",
    // },
  });

  const onSubmit = async (values: SignInFormValues) => {
    SignIn({ ...values });
  };

  return (
    <div className="flex min-h-screen ">
      <section className="flex flex-1 items-center justify-center py-12 px-4">
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
                className="text-center text-nixerly-darkgray font-inter text-sm font-normal leading-5
"
              >
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5 w-[500px] mx-auto container"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">
                          E-mail Or phone number
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            className="  p-4 rounded-md border border-nixerly-border !bg-blue-50 text-black "
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
                      <FormItem className="space-y-2">
                        <div className="flex items-center justify-between">
                          <FormLabel
                            className="text-nixerly-darkgray font-inter text-sm font-medium leading-5
"
                          >
                            Password
                          </FormLabel>
                         
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="focus-visible:ring-nixerly-blue border-nixerly-lightblue rounded-md border border-nixerly-border p-4 !bg-blue-50  text-black"
                            {...field}
                          />
                        </FormControl>
                         <Link
                            href="/forgot-password"
                            className=" text-nixerly-darkgray font-inter text-sm text-right font-medium leading-5
"
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
                    className="w-full bg-nixerly-gradient hover:opacity-90 text-white  py-2.5 rounded-full font-open-sans text-base font-medium leading-7 shadow-nixerly-button transition-all duration-200 ease-in-out transform hover:translate-y-[-1px]"
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
                className="text-center text-sm text-nixerly-darkgray font-inter font-normal leading-5
"
              >
                Don&apos;t have an account?{" "}
                <Link
                  href={ROUTES.SIGNUP}
                  className="font-medium text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors font-inter text-sm leading-5
"
                  tabIndex={0}
                  aria-label="Sign up for an account"
                >
                  Sign up
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
