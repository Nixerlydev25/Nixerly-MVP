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

import { CalendarDays } from 'lucide-react';


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
    <Card className=" max-w-2xl mx-auto container border border-nixerly-bussinessborder shadow-2xl shadow-nixerly-card hover-card-rise rounded-2xl ">


        <div className="flex items-start gap-4 px-6">
          {/* Number Badge */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12  border border-nixerly-bussinessborder rounded-full flex items-center justify-center">
              <span className="text-black font-semibold text-lg p-2">01</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-bold text-primary leading-tight">Complete Your Business Profile</h3>
            <p className="text-sm  text-nixerly-businesslabel leading-relaxed">
              Enter Your Business Information To Complete Your Profile
            </p>
          </div>
        </div>
      


      <div className="w-full border border-nixerly-bussinessborder "  />
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter text-sm font-normal leading-5 tracking-tight text-nixerly-businesslabel">Company Name</FormLabel>
              <FormControl>
                <Input
                 className="font-inter text-sm font-normal leading-5 tracking-tight text-black  rounded-md border border-nixerly-bussinessborder p-5 " placeholder="Acme Inc." {...field} 

      

                />
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
              <FormLabel className="font-inter text-sm font-normal leading-5 tracking-tight text-nixerly-businesslabel">Description</FormLabel>
              <FormControl>
                <Textarea
                 maxLength={100}
                  placeholder="Tell us about your business..."
                  className="min-h-[120px] font-inter text-sm font-normal leading-5 tracking-tight text-black  rounded-md border border-nixerly-bussinessborder p-5"
                  {...field}
                  
                />

                
              </FormControl>
              {/* <FormDescription className="font-inter text-sm font-medium leading-5 tracking-tight text-nixerly-businesslabel">
                A brief description of your company and what you do.
              </FormDescription> */}
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
                <FormLabel className="font-inter text-sm font-medium leading-5 tracking-tight text-nixerly-businesslabel">Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className=" w-full font-inter text-sm font-normal leading-5 tracking-tight text-black  rounded-md border border-nixerly-bussinessborder p-5">
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
                <FormLabel className="font-inter text-sm font-normal leading-5 tracking-tight text-nixerly-businesslabel">Number of Employees</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full font-inter text-sm font-normal leading-5 tracking-tight text-black  rounded-md border border-nixerly-bussinessborder p-5">
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
            <FormLabel className="font-inter text-sm font-normal leading-5 tracking-tight text-nixerly-businesslabel">Location</FormLabel>
            <FormControl>
              <LocationSearch
                onLocationSelect={handleLocationSelect}
                defaultValue=""
                className="font-inter text-sm font-normal leading-5 tracking-tight text-black  rounded-md border border-nixerly-bussinessborder p-5"
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
              <FormLabel className="font-inter text-sm font-normal leading-5 tracking-tight text-nixerly-businesslabel">Website</FormLabel>
              <FormControl>
                <Input placeholder="example.com" {...field} className="font-inter text-sm font-normal leading-5 tracking-tight focus:border-black  text-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-bussinessborder p-5" />
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
              <FormLabel className="font-inter text-sm font-normal leading-5 tracking-tight text-nixerly-businesslabel">Founded</FormLabel>
              <FormControl>
                <div className="relative ">
                <Input
                className="font-inter text-sm font-normal leading-5 tracking-tight focus:border-black  text-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-bussinessborder p-5"
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
   <CalendarDays className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
   </div>
              </FormControl>
              <FormMessage />
              
            </FormItem>
          )}
        />

        <CardFooter className="px-0 pt-4">
          <Button type="submit" className="ml-auto  text-lg font-medium  leading-6 bg-nixerly-blue text-white  rounded-full  p-5" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Saving..." : "Get Started"}
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
 