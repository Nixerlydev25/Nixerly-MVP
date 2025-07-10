import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { businessSignUpSchema, type BusinessSignUpFormValues } from "@/schema/auth/auth.schema"
import { useBusinessSignUp } from "@/hook/auth/auth.hook"
import { ProfileType } from "@/types/user/user.types"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

export default function BusinessSignupForm() {
  const { mutateAsync: SignupBusiness, isPending } = useBusinessSignUp()
    const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<BusinessSignUpFormValues>({
    resolver: zodResolver(businessSignUpSchema),
    defaultValues: {
      // firstName: "Naveed",
      // lastName: "Ali",
      // email: "test@gmail.com",
      // password: "passpass",
      // confirmPassword: "passpass",
      profileType: ProfileType.BUSINESS,
      // acceptTerms: false
    }
  })

  const onSubmit = async (values: BusinessSignUpFormValues) => {
    SignupBusiness(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 ">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-nixerly-darkgray font-medium">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="focus:border-black  text-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-border p-5 !bg-[#E9F3FF] "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem> 
            )}
          />

          {/* <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-nixerly-darkgray font-medium">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    className="focus-visible:ring-nixerly-blue border-nixerly-lightblue rounded-md border border-nixerly-border p-4 !bg-blue-50  text-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>

        {/* <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-nixerly-darkgray font-medium">Company Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Acme Construction Ltd"
                  className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">E-mail Or phone number</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="focus:border-black  text-black focus-visible:ring-nixerly-blue rounded-md border border-nixerly-border p-5 !bg-[#E9F3FF] "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="password"   
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-nixerly-darkgray font-inter text-sm font-medium leading-5">Password</FormLabel>
              <FormControl>
                    <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter password"
          className="w-full pr-12 rounded-md border border-nixerly-border p-5 text-black focus:border-black focus-visible:ring-nixerly-blue !bg-[#E9F3FF]"
          {...field}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
        >
          {showPassword ? <EyeOff size={16} className="text-black" /> : <Eye size={16} className="text-black" />}
        </span>
      </div>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-nixerly-darkgray font-inter text-sm font-medium leading-5">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative ">
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          className="w-full pr-12 rounded-md border border-nixerly-border p-5 text-black focus:border-black focus-visible:ring-nixerly-blue !bg-[#E9F3FF]"
          {...field}
        />
        <span
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground"
        >
          {showConfirmPassword ? <EyeOff size={16} className="text-black" /> : <Eye size={16} className="text-black" />}
        </span>
      </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-nixerly-lightblue data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white transition-all duration-200 ease-in-out cursor-pointer"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label
                  htmlFor="terms"
                  className="text-nixerly-darkgray font-inter text-sm font-medium leading-5"
                >
                  I agree to the{" "}
                  <Link 
                    href="/terms" 
                    className="text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                    tabIndex={0}
                    aria-label="Terms of Service"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  
                 
                </label>
                <FormMessage />
              </div> 
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-nixerly-gradient hover:opacity-90 hover:translate-y-[-1px] text-white  py-2.5 rounded-full font-open-sans text-base font-medium leading-7 shadow-nixerly-button transition-all duration-200 ease-in-out transform "
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  )
} 