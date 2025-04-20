"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertTriangle,
  BellRing,
  CreditCard,
  Download,
  Key,
  Lock,
  Mail,
  User,
  Briefcase,
  LogOut,
  Shield,
  EyeOff,
  Globe,
  Smartphone,
  Save,
  BookOpen,
  CheckCircle2,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  streetAddress: z.string().min(1, {
    message: "Street address is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  stateProvince: z.string().min(1, {
    message: "State or province is required.",
  }),
  postalCode: z.string().min(1, {
    message: "Postal code is required.",
  }),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  name: "John Doe",
  email: "john.doe@example.com",
  streetAddress: "123 Main Street",
  city: "Dublin",
  stateProvince: "Dublin",
  postalCode: "D01 AB12",
  country: "Ireland",
}

export default function SettingsPage() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    console.log(data)
  }

  return (
    <DashboardLayout userType="professional">
      <div className="flex-1 p-6 md:p-8 pt-6 bg-blue-50">
        {/* Settings Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 p-6 text-white shadow-xl mb-6 animate-fade-in">
          <div className="absolute inset-0 bg-[url('/collaborative-construction-planning.png')] opacity-15 mix-blend-overlay bg-pattern"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
                <p className="mt-1 text-white">Manage your account preferences and profile information</p>
              </div>
              <Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                <User className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="bg-white p-1 shadow-md border border-blue-200 rounded-xl">
            <TabsTrigger value="account" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">
              Privacy
            </TabsTrigger>
            <TabsTrigger value="billing" className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300">
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Account Information</CardTitle>
                <CardDescription className="text-blue-700">
                  Update your account information and personal details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800">Name</FormLabel>
                          <FormControl>
                            <Input className="border-blue-200 focus:border-blue-400" placeholder="Your name" {...field} />
                          </FormControl>
                          <FormDescription className="text-blue-700">
                            This is your public display name.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-800">Email</FormLabel>
                          <FormControl>
                            <Input className="border-blue-200 focus:border-blue-400" placeholder="Email address" {...field} />
                          </FormControl>
                          <FormDescription className="text-blue-700">
                            We'll use this email to contact you about your account.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="space-y-4">
                      <h3 className="text-md font-medium text-blue-800">Address Information</h3>
                      <Separator className="bg-blue-100" />
                      
                      <FormField
                        control={form.control}
                        name="streetAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-blue-800">Street Address</FormLabel>
                            <FormControl>
                              <Input className="border-blue-200 focus:border-blue-400" placeholder="Enter street address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">City</FormLabel>
                              <FormControl>
                                <Input className="border-blue-200 focus:border-blue-400" placeholder="Enter city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="stateProvince"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">State/Province</FormLabel>
                              <FormControl>
                                <Input className="border-blue-200 focus:border-blue-400" placeholder="Enter state or province" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">Postal Code</FormLabel>
                              <FormControl>
                                <Input className="border-blue-200 focus:border-blue-400" placeholder="Enter postal code" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-blue-800">Country</FormLabel>
                              <FormControl>
                                <Input className="border-blue-200 focus:border-blue-400" placeholder="Enter country" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Change Password</CardTitle>
                <CardDescription className="text-blue-700">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-blue-800">Current Password</Label>
                    <Input id="current-password" type="password" className="border-blue-200 focus:border-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-blue-800">New Password</Label>
                    <Input id="new-password" type="password" className="border-blue-200 focus:border-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-blue-800">Confirm Password</Label>
                    <Input id="confirm-password" type="password" className="border-blue-200 focus:border-blue-400" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <Key className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Danger Zone</CardTitle>
                <CardDescription className="text-blue-700">
                  Permanently delete your account and data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-red-200 bg-red-50 p-4">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-red-800">Delete Account</h3>
                      <div className="mt-1 text-sm text-red-700">
                        <p>
                          Once you delete your account, there is no going back. All your data will be permanently removed
                          from our servers.
                        </p>
                      </div>
                      <div className="mt-4">
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Notification Preferences</CardTitle>
                <CardDescription className="text-blue-700">
                  Choose which notifications you receive and how they're delivered
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-md font-medium text-blue-800">Email Notifications</h3>
                  <Separator className="bg-blue-100" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-blue-800">Job Recommendations</Label>
                        <p className="text-sm text-blue-700">
                          Receive daily job suggestions based on your profile
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-blue-800">Application Updates</Label>
                        <p className="text-sm text-blue-700">
                          Get notified when there are updates on your job applications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-blue-800">Employer Messages</Label>
                        <p className="text-sm text-blue-700">
                          Receive notifications when employers send you messages
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium text-blue-800">Push Notifications</h3>
                  <Separator className="bg-blue-100" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-blue-800">In-App Notifications</Label>
                        <p className="text-sm text-blue-700">Receive notifications within the application</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-blue-800">Browser Notifications</Label>
                        <p className="text-sm text-blue-700">
                          Allow desktop notifications even when the browser is closed
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-md font-medium text-blue-800">Marketing Communications</h3>
                  <Separator className="bg-blue-100" />
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-blue-800">Newsletter</Label>
                        <p className="text-sm text-blue-700">
                          Receive our monthly newsletter with industry insights
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base text-blue-800">Special Offers</Label>
                        <p className="text-sm text-blue-700">
                          Get notified about special offers and promotions
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <BellRing className="mr-2 h-4 w-4" />
                  Save Notification Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Profile Visibility</CardTitle>
                <CardDescription className="text-blue-700">
                  Control who can see your profile and contact you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-blue-800">Profile Visibility</Label>
                  <Select defaultValue="employers">
                    <SelectTrigger className="w-full border-blue-200 focus:border-blue-400">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public (Anyone can view)</SelectItem>
                      <SelectItem value="employers">Employers Only</SelectItem>
                      <SelectItem value="connections">Connections Only</SelectItem>
                      <SelectItem value="private">Private (Only you)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-blue-700 mt-2">
                    This controls who can view your full profile information
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-blue-800">Resume Visibility</Label>
                      <p className="text-sm text-blue-700">
                        Make your resume visible to employers searching for candidates
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-blue-800">Contact Information</Label>
                      <p className="text-sm text-blue-700">
                        Show your contact information to employers who view your profile
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-blue-800">Online Status</Label>
                      <p className="text-sm text-blue-700">Show when you're active on the platform</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-blue-800">Who Can Contact Me</Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full border-blue-200 focus:border-blue-400">
                      <SelectValue placeholder="Select contact option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Employers</SelectItem>
                      <SelectItem value="verified">Verified Employers Only</SelectItem>
                      <SelectItem value="connections">My Connections Only</SelectItem>
                      <SelectItem value="none">No One (Disable messages)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-blue-700 mt-2">
                    This controls who can send you direct messages
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <Shield className="mr-2 h-4 w-4" />
                  Save Privacy Settings
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Data & Privacy</CardTitle>
                <CardDescription className="text-blue-700">
                  Manage your personal data and privacy options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-blue-800">Data Analytics</Label>
                      <p className="text-sm text-blue-700">
                        Allow us to use your data to improve our service
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-blue-800">Cookies</Label>
                      <p className="text-sm text-blue-700">
                        Allow cookies to personalize your experience
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base text-blue-800">Activity Tracking</Label>
                      <p className="text-sm text-blue-700">
                        Track your activity to provide better job recommendations
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="rounded-md border border-blue-200 bg-blue-50 p-4 mt-4">
                  <div className="flex">
                    <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-blue-800">Privacy Policy</p>
                      <p className="text-sm text-blue-700">
                        Read our <a href="#" className="text-blue-600 hover:underline">privacy policy</a> to understand how we handle your data.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Download className="mr-2 h-4 w-4" />
                  Download My Data
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <EyeOff className="mr-2 h-4 w-4" />
                  Manage Cookies
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6 animate-fade-in">
            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Subscription</CardTitle>
                <CardDescription className="text-blue-700">
                  Manage your subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">Free Plan</h3>
                      <div className="mt-1 text-sm text-blue-700">
                        <p>You are currently on the free plan.</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Apply to up to 10 jobs per month</li>
                          <li>Basic profile visibility</li>
                          <li>Standard support</li>
                        </ul>
                      </div>
                      <div className="mt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                          Upgrade to Pro
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Payment Methods</CardTitle>
                <CardDescription className="text-blue-700">
                  Add and manage your payment methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-700">No payment methods added yet.</p>
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-blue-800">Billing History</CardTitle>
                <CardDescription className="text-blue-700">
                  View your past invoices and billing history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-center">
                  <p className="text-blue-700">No billing history available.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
