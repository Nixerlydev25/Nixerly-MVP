import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { professionalSignUpSchema, type ProfessionalSignUpFormValues } from "@/schema/auth/auth.schema"
import { useProfessionalSignUp } from "@/hook/auth/auth.hook"
import { ProfileType } from "@/types/user/user.types"

export default function ProfessionalSignupForm() {
  const { mutateAsync: SignupProfessional, isPending } = useProfessionalSignUp()

  const form = useForm<ProfessionalSignUpFormValues>({
    resolver: zodResolver(professionalSignUpSchema),
    defaultValues: {
      // firstName: "John",
      // lastName: "Doe",
      // email: "john.doe@example.com",
      // password: "password123",
      // confirmPassword: "password123",
      profileType: ProfileType.WORKER,
      // acceptTerms: false,
    }
  })

  const onSubmit = async (values: ProfessionalSignUpFormValues) => {
    console.log(values)
    SignupProfessional(values)
  }

  console.log(form.formState.errors,"errrors")
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-[500px] mx-auto container">
        <div className="grid gap-4 ">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-2 ">
                <FormLabel className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className="focus-visible:ring-nixerly-blue border-nixerly-lightblue rounded-md border border-nixerly-border p-4 !bg-blue-50  text-black"
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
                <FormLabel className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">Last Name</FormLabel>
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
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="focus-visible:ring-nixerly-blue border-nixerly-lightblue rounded-md border border-nixerly-border p-4 !bg-blue-50  text-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">


   <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="focus-visible:ring-nixerly-blue border-nixerly-lightblue rounded-md border border-nixerly-border p-4 !bg-blue-50  text-black"
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
              <FormLabel className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 ">Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="focus-visible:ring-nixerly-blue border-nixerly-lightblue rounded-md border border-nixerly-border p-4 !bg-blue-50  text-black"
                  {...field}
                />
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
            <FormItem className="flex items-center space-x-2 ">
              <FormControl>
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-nixerly-lightblue data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white transition-all duration-200 ease-in-out cursor-pointer"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label
                  htmlFor="terms"
                  className="text-nixerly-darkgray font-inter text-sm font-medium leading-5 "
                >
                  I agree to the{" "}
                  <Link 
                    href="/terms" 
                    className="text-nixerly-blue hover:text-nixerly-darkblue hover:underline transition-colors"
                    tabIndex={0}
                    aria-label="Terms of Service"
                  >
                    Terms of Conditions
                  </Link>{" "}
                 
                </label>
                <FormMessage />
              </div>
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
              Creating Account...
            </>
          ) : (
            "Create Professional Account"
          )}
        </Button>
      </form>
    </Form>
  )
}