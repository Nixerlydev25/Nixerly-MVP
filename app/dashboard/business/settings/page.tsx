"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/dashboard-layout"
import { Lock, Building, Mail, CreditCard, Save, Trash2, Users } from "lucide-react"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    applications: true,
    messages: true,
    platformUpdates: true,
    marketing: false,
  })

  return (
    <DashboardLayout userType="business">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="team">Team Access</TabsTrigger>
            <TabsTrigger value="billing">Subscription & Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <div className="relative">
                      <Input
                        id="companyName"
                        placeholder="Acme Construction Ltd"
                        defaultValue="Acme Construction Ltd"
                      />
                      <Building className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="info@acmeconstruction.com"
                        defaultValue="info@acmeconstruction.com"
                      />
                      <Mail className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ga">Irish (Gaeilge)</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="europe-dublin">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="europe-dublin">Europe/Dublin (GMT+1)</SelectItem>
                      <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                      <SelectItem value="america-new_york">America/New York (GMT-5)</SelectItem>
                      <SelectItem value="america-los_angeles">America/Los Angeles (GMT-8)</SelectItem>
                      <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input id="current-password" type="password" />
                    <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input id="new-password" type="password" />
                      <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Input id="confirm-password" type="password" />
                      <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="login-alerts">Login Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts for unusual login activity</p>
                  </div>
                  <Switch id="login-alerts" defaultChecked />
                </div>
                <Separator className="my-4" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Automatically log out after period of inactivity</p>
                  </div>
                  <Select defaultValue="60">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border border-destructive/20 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-medium text-destructive">Delete Account</h4>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Manage which emails you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-applications">Job Applications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails when professionals apply to your job postings
                    </p>
                  </div>
                  <Switch
                    id="email-applications"
                    checked={emailNotifications.applications}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, applications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-messages">Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails when you get new messages from professionals
                    </p>
                  </div>
                  <Switch
                    id="email-messages"
                    checked={emailNotifications.messages}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, messages: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-platform-updates">Platform Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about important platform updates and changes
                    </p>
                  </div>
                  <Switch
                    id="email-platform-updates"
                    checked={emailNotifications.platformUpdates}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, platformUpdates: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-marketing">Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about platform features, tips, and industry news
                    </p>
                  </div>
                  <Switch
                    id="email-marketing"
                    checked={emailNotifications.marketing}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, marketing: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>In-App Notifications</CardTitle>
                <CardDescription>Manage notifications within the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-applications">Job Applications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when professionals apply to your job postings
                    </p>
                  </div>
                  <Switch id="app-applications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-messages">Messages</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications when you get new messages</p>
                  </div>
                  <Switch id="app-messages" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-profile-views">Profile Views</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when professionals view your company profile
                    </p>
                  </div>
                  <Switch id="app-profile-views" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="app-platform-updates">Platform Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about important platform updates and changes
                    </p>
                  </div>
                  <Switch id="app-platform-updates" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage access to your company account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium">Current Team Members</h3>
                    <p className="text-sm text-muted-foreground">People who can access your company account</p>
                  </div>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Invite Team Member
                  </Button>
                </div>

                <div className="space-y-4 mt-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">John Smith</h4>
                          <p className="text-sm text-muted-foreground">john@acmeconstruction.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>Admin</Badge>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Sarah Johnson</h4>
                          <p className="text-sm text-muted-foreground">sarah@acmeconstruction.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Member</Badge>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Roles</CardTitle>
                <CardDescription>Define what team members can do</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold">Admin</h4>
                      <p className="text-sm text-muted-foreground">Full access to all features and settings</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Permissions
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold">Member</h4>
                      <p className="text-sm text-muted-foreground">Limited access to features and settings</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Permissions
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold">Viewer</h4>
                      <p className="text-sm text-muted-foreground">View-only access to the account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit Permissions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription</CardTitle>
                <CardDescription>Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 bg-primary/5 border-primary">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">Premium Plan</h4>
                        <Badge>Current Plan</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">€99.99/month</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm font-medium">Unlimited job postings</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Access to all professionals</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Priority support</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Your subscription renews on May 15, 2025</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Available Plans</h4>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <h5 className="font-medium">Basic Plan</h5>
                      <p className="text-sm text-muted-foreground mb-2">€49.99/month</p>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• 5 active job postings</li>
                        <li>• Basic search filters</li>
                        <li>• Standard support</li>
                      </ul>
                      <Button variant="outline" className="w-full">
                        Select Plan
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4 border-primary bg-primary/5">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">Premium Plan</h5>
                        <Badge>Current</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">€99.99/month</p>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• Unlimited job postings</li>
                        <li>• Advanced search filters</li>
                        <li>• Priority support</li>
                        <li>• Featured company profile</li>
                      </ul>
                      <Button className="w-full">Current Plan</Button>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h5 className="font-medium">Enterprise Plan</h5>
                      <p className="text-sm text-muted-foreground mb-2">€199.99/month</p>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• All Premium features</li>
                        <li>• Dedicated account manager</li>
                        <li>• Custom branding</li>
                        <li>• API access</li>
                        <li>• Advanced analytics</li>
                      </ul>
                      <Button variant="outline" className="w-full">
                        Select Plan
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      Remove
                    </Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-muted-foreground">April 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€99.99</p>
                      <Badge variant="outline" className="text-green-500">
                        Paid
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border-b">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-muted-foreground">March 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€99.99</p>
                      <Badge variant="outline" className="text-green-500">
                        Paid
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">Premium Plan - Monthly</p>
                      <p className="text-sm text-muted-foreground">February 15, 2025</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">€99.99</p>
                      <Badge variant="outline" className="text-green-500">
                        Paid
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm">
                    View All Invoices
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
