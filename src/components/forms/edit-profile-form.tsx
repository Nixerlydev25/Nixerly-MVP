"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { LocationSearch, LocationDetails } from "@/components/location-search";
import { useState } from "react";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .optional(),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  hourlyRate: z.union([
    z.number().min(14).max(100).int(),
    z.string().refine((val) => {
      if (val === "") return true;
      const num = Number(val);
      return Number.isInteger(num) && num >= 14 && num <= 100;
    }, "Hourly rate must be between €14 and €100"),
  ]).optional(),
  availability: z.boolean().optional(),
});

interface EditProfileFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<z.infer<typeof formSchema>>;
}

export function EditProfileForm({
  onSubmit,
  defaultValues,
}: EditProfileFormProps) {
  const [, setLocation] = useState<LocationDetails | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      city: "",
      state: "",
      country: "",
      hourlyRate: "",
      availability: true,
    },
  });

  const handleLocationSelect = (locationDetails: LocationDetails) => {
    setLocation(locationDetails);
    form.setValue("city", locationDetails.city);
    form.setValue("state", locationDetails.state);
    form.setValue("country", locationDetails.country);
  };

  return (
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="px-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your professional title"
                    {...field}
                    className="bg-gray-50 border-gray-200 rounded-lg px-3 py-2 text-sm focus:bg-white focus:border-blue-500 transition-colors mb-5"
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
                <FormLabel className="text-sm font-medium text-gray-700">About Us</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself"
                    className="min-h-[100px] bg-gray-50 border-gray-200 rounded-lg px-3 py-2 text-sm focus:bg-white focus:border-blue-500 transition-colors  mb-5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hourlyRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Hourly</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter your hourly rate"
                    className="bg-gray-50 border-gray-200 rounded-lg px-3 py-2 text-sm focus:bg-white focus:border-blue-500 transition-colors mb-5"
                    value={field.value === 0 ? "" : field.value}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value === "" || /^\d+$/.test(value)) {
                        field.onChange(value === "" ? "" : Number(value))
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <FormLabel className="text-sm font-medium text-gray-700">Location</FormLabel>
            <LocationSearch
              onLocationSelect={handleLocationSelect}
              defaultValue={`${form.getValues("city")}, ${form.getValues("state")}, ${form.getValues("country")}`}
              className="bg-gray-50 border-gray-200 rounded-lg px-3 py-2 text-sm focus:bg-white focus:border-blue-500 transition-colors mb-5"
            />
            <FormDescription className="text-xs text-gray-500">Search and select your location</FormDescription>
          </div>

          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-blue-600"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium text-gray-700 cursor-pointer">
                    I am Currently Available for Work
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          </div>
        <Separator/>
          <div className="flex justify-end space-x-3 p-4">
            <Button
              type="button"
              variant="outline"
              className="border rounded-full bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-nixerly-blue text-white rounded-full"
            >
              Save Changes
            </Button>
          </div>
        </form>
    </Form>
  );
}
