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

export default function BusinessSignupForm() {
  const { mutateAsync: SignupBusiness, isPending } = useBusinessSignUp()

  const form = useForm<BusinessSignUpFormValues>({
    resolver: zodResolver(businessSignUpSchema),
    defaultValues: {
      firstName: "Naveed",
      lastName: "Ali",
      email: "test@gmail.com",
      password: "passpass",
      confirmPassword: "passpass",
      profileType: ProfileType.BUSINESS,
      acceptTerms: false
    }
  })

  const onSubmit = async (values: BusinessSignUpFormValues) => {
    SignupBusiness(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-nixerly-darkgray font-medium">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-nixerly-darkgray font-medium">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    className="focus-visible:ring-nixerly-blue border-nixerly-lightblue"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            <FormItem className="space-y-2">
              <FormLabel className="text-nixerly-darkgray font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
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
              <FormLabel className="text-nixerly-darkgray font-medium">Password</FormLabel>
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-nixerly-darkgray font-medium">Confirm Password</FormLabel>
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

        <FormField
          control={form.control}
          name="acceptTerms"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-nixerly-lightblue data-[state=checked]:bg-nixerly-blue data-[state=checked]:border-nixerly-blue"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none text-nixerly-darkgray"
                >
                  I agree to the{" "}
                  <Link 
                    href="/terms" 
                    className="text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                    tabIndex={0}
                    aria-label="Terms of Service"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link 
                    href="/privacy" 
                    className="text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                    tabIndex={0}
                    aria-label="Privacy Policy"
                  >
                    Privacy Policy
                  </Link>
                </label>
                <FormMessage />
              </div>
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
              Creating Business Account...
            </>
          ) : (
            "Create Business Account"
          )}
        </Button>
      </form>
    </Form>
  )
} 