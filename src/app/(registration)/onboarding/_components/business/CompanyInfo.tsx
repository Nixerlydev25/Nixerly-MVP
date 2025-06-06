"use client";

import { useFormContext } from "react-hook-form";
import { BusinessOnboardingSchema } from "@/schema/onboarding/business-onboarding.schema";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LocationSearch, LocationDetails } from "@/components/location-search";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BusinessData {
  employeeRanges: Array<{ value: string; label: string }>;
  industryOptions: Array<{ value: string; label: string }>;
}

import data from '@/data/onboarding/business.json' assert { type: "json" };

export function BusinessProfileForm() {
  const form = useFormContext<BusinessOnboardingSchema>();

  const handleLocationSelect = (location: LocationDetails) => {
    form.setValue("city", location.city, { shouldValidate: true });
    form.setValue("state", location.state, { shouldValidate: true });
    form.setValue("country", location.country, { shouldValidate: true });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
        <CardDescription>
          Enter your business information to complete your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your business..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                A brief description of your company and what you do.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(data as BusinessData).industryOptions.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employeeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Employees</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select employee range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(data as BusinessData).employeeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                defaultValue=""
              />
            </FormControl>
            <div className="space-y-1">
              {(form.formState.errors.city || form.formState.errors.country) && (
                <FormMessage>Location is required</FormMessage>
              )}
              {/* {form.formState.errors.state && (
                <FormMessage>{form.formState.errors.state.message}</FormMessage>
              )}
              {form.formState.errors.country && (
                <FormMessage>{form.formState.errors.country.message}</FormMessage>
              )} */}
            </div>
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="yearFounded"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year Founded</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="2010"
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === ""
                        ? undefined
                        : Number.parseInt(e.target.value, 10);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <CardFooter className="px-0 pt-6">
          <Button type="submit" className="ml-auto" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Go To Feed"}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
