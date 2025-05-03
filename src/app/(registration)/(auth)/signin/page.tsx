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
    defaultValues: {
      email: "john.doe@example.com",
      password: "password123",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    SignIn({ ...values });
  };

  return (
    <div className="flex min-h-screen flex-col bg-nixerly-light-gradient bg-pattern">
      <section className="flex flex-1 items-center justify-center py-12 px-4">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="shadow-nixerly-card border-nixerly-lightblue hover-card-rise">
            <CardHeader className="space-y-2 pb-6">
              <div className="flex justify-center mb-2">
                <div className="bg-nixerly-blue p-3 rounded-full">
                  <LogIn className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="nixerly-heading text-2xl font-bold text-center text-nixerly-darkblue">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center text-nixerly-darkgray">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="text-nixerly-darkgray font-medium">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            type="email"
                            className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
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
                          <FormLabel className="text-nixerly-darkgray font-medium">
                            Password
                          </FormLabel>
                          <Link
                            href="/forgot-password"
                            className="text-sm text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                            tabIndex={0}
                            aria-label="Forgot password"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-nixerly-gradient hover:opacity-90 text-white font-semibold py-2.5 rounded-md shadow-nixerly-button transition-all duration-200 ease-in-out transform hover:translate-y-[-1px]"
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
              <Separator className="my-4 bg-nixerly-lightblue" />
              <p className="text-center text-sm text-nixerly-darkgray">
                Don&apos;t have an account?{" "}
                <Link
                  href={ROUTES.SIGNUP}
                  className="font-medium text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                  tabIndex={0}
                  aria-label="Sign up for an account"
                >
                  Sign up
                </Link>
              </p>
              <p className="mt-2 text-center text-xs text-nixerly-darkgray">
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
              </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
}
