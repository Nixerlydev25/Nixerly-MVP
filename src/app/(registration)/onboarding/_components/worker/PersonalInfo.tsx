"use client"

import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation"
import type { WorkerOnboardingSchema } from "@/schema/onboarding/worker-onboarding.schema"
import { Textarea } from "@/components/ui/textarea"
import { useUpdateWorkerProfile } from "@/hook/user/user.hooks"
import type { LocationDetails } from "@/components/location-search"
import { LocationSearch } from "@/components/location-search"
import { OnboardingStepWorkerProfileB } from "@/types/onboarding"
import { ChevronRight } from "lucide-react"
import { PhoneInputComponent } from "@/components/common/phone-input"
import { ProgressIndicator } from "../progress-indicator"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useEffect, useState } from "react";

export const PersonalInfo = () => {
  const { goToNextStep } = useOnboardingNavigation()
  const {
    control,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<WorkerOnboardingSchema>()
  const { mutateAsync: updateWorker, isPending } = useUpdateWorkerProfile()
  const formData = watch()
  const [hasStartedFilling, setHasStartedFilling] = useState(false);

  const employmentTypeOptions = [
    { value: "SELF_EMPLOYED", label: "Self Employed" },
    { value: "PAYEE", label: "PAYEE" },
  ]

  const handleLocationSelect = (locationDetails: LocationDetails) => {
    setValue("city", locationDetails.city)
    setValue("state", locationDetails.state)
    setValue("country", locationDetails.country)
  }

  const handleContinue = async () => {
    const fieldsToValidate = [
      "title",
      "description",
      "city",
      "state",
      "country",
      "phoneNumber",
      "employmentType",
    ] as const

    const isValid = await trigger(fieldsToValidate)
    if (isValid) {
      const { title, description, city, state, country, phoneNumber, employmentType } = formData
      const workerProfileData = {
        title,
        description,
        city,
        state,
        country,
        phoneNumber,
        employmentType,
        onboardingStep: OnboardingStepWorkerProfileB.SKILLS_HOURLY_RATE_INFO,
      }
      await updateWorker(workerProfileData)
      goToNextStep()
    }
  }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name && !hasStartedFilling) {
        setHasStartedFilling(true)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, hasStartedFilling])

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Progress Indicator */}
      <ProgressIndicator currentStep={1} totalSteps={4} hasStartedFilling={hasStartedFilling} />

      <Card className="shadow-nixerly-card border border-gray-300 text-nixerly-businesslabel bg-white rounded-lg animate-fade-in py-0 gap-0">
        {/* Step Header */}
        <div className="gap-5 flex border-b border-gray-300 px-6 py-4">
        <div className="flex items-center justify-center h-10 w-10  md:w-14 md:h-14 border border-gray-300 rounded-full">
            <span className="text-lg sm:text-base font-medium">01</span>
          </div>
          <div className="">
            <h2 className="text-lg font-bold my-1 text-nixerly-blue">Add Your Personal Information</h2>
            <p className="text-base font-medium">Please Provide The Following Information To Get Started</p>
          </div>
        </div>

        <div className="space-y-6 px-6 py-4">
          <FormField
            control={control}
            name="employmentType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-inter text-base font-medium leading-5 tracking-tight text-nixerly-businesslabel">Employment Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full font-inter text-sm font-normal leading-5 tracking-tight focus:border-black  text-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-bussinessborder p-5">
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employmentTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <FormDescription>Select your employment type</FormDescription>
                <FormMessage className="text-nixerly-coral mt-1" /> */}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base text-nixerly-businesslabel font-medium">Phone Number</FormLabel>
                <FormControl>
                  <PhoneInputComponent
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.phoneNumber?.message}
                    required
                    className="w-full"
                  />
                </FormControl>
                {/* <FormDescription>Enter your contact phone number</FormDescription>
                <FormMessage className="text-nixerly-coral mt-1" /> */}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base text-nixerly-businesslabel font-medium">Enter Professional Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g. Senior Plumber, Master Electrician"
                    {...field}
                    className="font-inter text-base font-normal leading-5 tracking-tight focus:border-black  text-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-bussinessborder p-5"
                  />
                </FormControl>
                {/* <FormDescription>Enter your professional title that best describes your role</FormDescription>
                <FormMessage className="text-nixerly-coral mt-1" /> */}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base text-nixerly-businesslabel font-medium">Location</FormLabel>
                <FormControl>
                  <LocationSearch
                    onLocationSelect={handleLocationSelect}
                    defaultValue={field.value}
                    className="w-full font-inter text-sm font-normal leading-5 tracking-tight focus:border-black  text-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-bussinessborder p-5"
                  />
                </FormControl>
                {/* <FormDescription>Search and select your location</FormDescription> */}
                {(errors.city || errors.country) && (
                  <p className="text-nixerly-coral mt-1 text-sm">Location is required</p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base text-nixerly-businesslabel font-medium leading-5">Professional Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your expertise, and services you offer..."
                    className="min-h-[120px] resize-none font-inter text-sm font-normal leading-5 tracking-tight focus:border-black  text-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-bussinessborder p-5"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center mt-1 relative ">
                  {/* <FormDescription>
                    Provide a detailed description of your professional background and services
                  </FormDescription> */}
                  <span className="text-xs absolute right-4 bottom-4">Max 1000</span>
                </div>
                <FormMessage className="text-nixerly-coral mt-1" />
              </FormItem>
            )}
          />
   </div>
          <div className="flex justify-end px-6 py-4 border-t border-gray-300">
            <Button
              type="button"
              onClick={handleContinue}
              disabled={isPending}
              className="bg-nixerly-blue text-white px-8 py-3 h-12 text-base font-medium shadow-nixerly-button transition-all rounded-full duration-200 cursor-pointer"
            >
              {isPending ? "Saving..." : "Next"}
            </Button>
          </div>
     
      </Card>
    </div>
  )
}
