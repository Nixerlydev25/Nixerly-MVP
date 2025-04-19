"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "@/components/dashboard-layout"
import { Lock, User, Mail, CreditCard, Save, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState({
    jobAlerts: true,
    applicationUpdates: true,
    messages: true,
    marketing: false,
  })

  const [pushNotifications, setPushNotifications] = useState({
    jobAlerts: false,
    applicationUpdates: true,
    messages: true,
    marketing: false,
  })

  return (
    <DashboardLayout userType="professional">
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
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
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
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <Input id="username" placeholder="johndoe" defaultValue="johndoe" />
                      <User className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        defaultValue="john.doe@example.com"
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="profile-visibility">Profile Visibility</Label>
                    <Select defaultValue="public">
                      <SelectTrigger id="profile-visibility" className="w-[180px]">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="contacts">Contacts Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Control who can see your profile and contact you about opportunities.
                  </p>
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
                    <Label htmlFor="email-job-alerts">Job Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new job opportunities matching your profile
                    </p>
                  </div>
                  <Switch
                    id="email-job-alerts"
                    checked={emailNotifications.jobAlerts}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, jobAlerts: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-application-updates">Application Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails when there are updates to your job applications
                    </p>
                  </div>
                  <Switch
                    id="email-application-updates"
                    checked={emailNotifications.applicationUpdates}
                    onCheckedChange={(checked) =>
                      setEmailNotifications({ ...emailNotifications, applicationUpdates: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-messages">Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails when you get new messages from employers
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
                    <Label htmlFor="email-marketing">Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about platform updates, tips, and industry news
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
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Manage notifications on your devices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-job-alerts">Job Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications about new job opportunities
                    </p>
                  </div>
                  <Switch
                    id="push-job-alerts"
                    checked={pushNotifications.jobAlerts}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, jobAlerts: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-application-updates">Application Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications when there are updates to your job applications
                    </p>
                  </div>
                  <Switch
                    id="push-application-updates"
                    checked={pushNotifications.applicationUpdates}
                    onCheckedChange={(checked) =>
                      setPushNotifications({ ...pushNotifications, applicationUpdates: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-messages">Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications when you get new messages
                    </p>
                  </div>
                  <Switch
                    id="push-messages"
                    checked={pushNotifications.messages}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, messages: checked })}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="push-marketing">Marketing</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications about platform updates and news
                    </p>
                  </div>
                  <Switch
                    id="push-marketing"
                    checked={pushNotifications.marketing}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, marketing: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your data and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Profile Visibility</Label>
                    <p className="text-sm text-muted-foreground">Control who can see your profile on Nixerly</p>
                  </div>
                  <Select defaultValue="public">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="contacts">Contacts Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="search-visibility">Search Engine Visibility</Label>
                    <p className="text-sm text-muted-foreground">Allow search engines to index your profile</p>
                  </div>
                  <Switch id="search-visibility" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-sharing">Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">Allow us to use your data to improve our services</p>
                  </div>
                  <Switch id="data-sharing" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login History</Label>
                    <p className="text-sm text-muted-foreground">View and manage your recent login sessions</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View History
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Connected Devices</Label>
                    <p className="text-sm text-muted-foreground">Manage devices connected to your account</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage Devices
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data & Privacy</CardTitle>
                <CardDescription>Manage your personal data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Download Your Data</Label>
                    <p className="text-sm text-muted-foreground">Get a copy of all the data we have about you</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Request Data
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Delete Your Data</Label>
                    <p className="text-sm text-muted-foreground">Request deletion of your personal data</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                    Request Deletion
                  </Button>
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
                <div className="rounded-lg border p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-medium">Free Plan</h4>
                      <p className="text-sm text-muted-foreground">Basic access to job listings and profile creation</p>
                    </div>
                    <Button>Upgrade Plan</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Available Plans</h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <h5 className="font-medium">Pro Plan</h5>
                      <p className="text-sm text-muted-foreground mb-2">€9.99/month</p>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• Priority application submissions</li>
                        <li>• Enhanced profile visibility</li>
                        <li>• Access to salary insights</li>
                        <li>• Direct messaging with employers</li>
                      </ul>
                      <Button variant="outline" className="w-full">
                        Select Plan
                      </Button>
                    </div>
                    <div className="rounded-lg border p-4 border-primary bg-primary/5">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">Premium Plan</h5>
                        <Badge>Best Value</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">€19.99/month</p>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• All Pro Plan features</li>
                        <li>• Featured profile placement</li>
                        <li>• Career coaching session (monthly)</li>
                        <li>• Resume review by industry experts</li>
                        <li>• Early access to exclusive jobs</li>
                      </ul>
                      <Button className="w-full">Select Plan</Button>
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
                  <div className="flex items-center justify-between p-4">
                    <div className="grid gap-1">
                      <p className="font-medium">No billing history</p>
                      <p className="text-sm text-muted-foreground">
                        Your billing history will appear here once you subscribe to a paid plan.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
