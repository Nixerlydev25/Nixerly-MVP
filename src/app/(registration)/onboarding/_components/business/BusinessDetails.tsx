// "use client";

// import { useFormContext } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
//   FormDescription,
// } from "@/components/ui/form";
// import { useBusinessOnboardingNavigation } from "@/hook/onboarding/useBusinessOnboardingNavigation";
// import { BusinessOnboardingSchema } from "@/schema/onboarding/business-onboarding.schema";
// import { useUpdateUser } from "@/hook/user/user.hooks";

// export function BusinessDetails() {
//   const { control, trigger, watch } = useFormContext<BusinessOnboardingSchema>();
//   const { nextStep, prevStep } = useBusinessOnboardingNavigation();
//   const { mutateAsync: updateUser } = useUpdateUser();
//   const currentYear = new Date().getFullYear();
//   const formData = watch();

//   const handleContinue = async () => {
//     const fieldsToValidate = [
//       "location",
//       "website",
//       "employeeCount",
//       "yearFounded"
//     ] as const;

//     const isValid = await trigger(fieldsToValidate);
//     if (isValid) {
//       await updateUser({
//         businessProfile: {
//           location: formData.location,
//           website: formData.website || undefined,
//           employeeCount: formData.employeeCount,
//           yearFounded: formData.yearFounded
//         }
//       });
//       nextStep();
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Business Details</h2>
//         <p className="text-muted-foreground">
//           Tell us more about your business operations
//         </p>
//       </div>

//       <FormField
//         control={control}
//         name="location"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Business Location</FormLabel>
//             <FormControl>
//               <Input placeholder="City, State, Country" {...field} />
//             </FormControl>
//             <FormDescription>
//               Enter the primary location of your business
//             </FormDescription>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <FormField
//         control={control}
//         name="website"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Website URL</FormLabel>
//             <FormControl>
//               <Input
//                 placeholder="https://your-company.com"
//                 type="url"
//                 {...field}
//               />
//             </FormControl>
//             <FormDescription>
//               Your company website (optional)
//             </FormDescription>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FormField
//           control={control}
//           name="employeeCount"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Number of Employees</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="10"
//                   type="number"
//                   min={1}
//                   {...field}
//                   onChange={(e) => {
//                     const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
//                     field.onChange(value === "" ? undefined : value);
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={control}
//           name="yearFounded"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Year Founded</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder={`${currentYear}`}
//                   type="number"
//                   min={1900}
//                   max={currentYear}
//                   {...field}
//                   onChange={(e) => {
//                     const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
//                     field.onChange(value === "" ? undefined : value);
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       </div>

//       <div className="flex justify-between pt-4">
//         <Button type="button" variant="outline" onClick={prevStep}>
//           Previous Step
//         </Button>
//         <Button type="button" onClick={handleContinue}>
//           Next Step
//         </Button>
//       </div>
//     </div>
//   );
// } 