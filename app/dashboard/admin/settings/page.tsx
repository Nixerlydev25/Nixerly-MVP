"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Info, Save } from "lucide-react"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Nixerly",
    siteDescription: "Construction professionals network and job marketplace",
    contactEmail: "admin@nixerly.com",
    supportEmail: "support@nixerly.com",
    maxFileSize: "10",
    defaultLanguage: "en",
    maintenanceMode: false,
  })

  const [userSettings, setUserSettings] = useState({
    requireEmailVerification: true,
    allowUserRegistration: true,
    autoApproveBusinessAccounts: false,
    autoApproveProfessionalAccounts: false,
    maxLoginAttempts: "5",
    sessionTimeout: "60",
    passwordMinLength: "8",
    requireStrongPasswords: true,
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@nixerly.com",
    smtpPassword: "••••••••••••",
    senderName: "Nixerly Notifications",
    senderEmail: "notifications@nixerly.com",
    enableEmailNotifications: true,
    emailFooterText: "© 2023 Nixerly. All rights reserved.",
  })

  const [securitySettings, setSecuritySettings] = useState({
    enableTwoFactor: true,
    requireAdminTwoFactor: true,
    ipRateLimiting: true,
    maxRequestsPerMinute: "60",
    enableCaptcha: true,
    captchaType: "recaptcha",
    enableAuditLog: true,
    auditLogRetentionDays: "90",
  })

  const handleGeneralSettingsChange = (field: string, value: string | boolean) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value,
    })
  }

  const handleUserSettingsChange = (field: string, value: string | boolean) => {
    setUserSettings({
      ...userSettings,
      [field]: value,
    })
  }

  const handleEmailSettingsChange = (field: string, value: string | boolean) => {
    setEmailSettings({
      ...emailSettings,
      [field]: value,
    })
  }

  const handleSecuritySettingsChange = (field: string, value: string | boolean) => {
    setSecuritySettings({
      ...securitySettings,
      [field]: value,
    })
  }

  const handleSaveSettings = (settingsType: string) => {
    // In a real application, this would save the settings to the backend
    console.log(`Saving ${settingsType} settings...`)

    // Show success message (in a real app, this would be a toast notification)
    alert(`${settingsType} settings saved successfully!`)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground">Configure and manage platform settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic platform settings and preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => handleGeneralSettingsChange("siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select
                    value={generalSettings.defaultLanguage}
                    onValueChange={(value) => handleGeneralSettingsChange("defaultLanguage", value)}
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => handleGeneralSettingsChange("siteDescription", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Maximum File Upload Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={generalSettings.maxFileSize}
                    onChange={(e) => handleGeneralSettingsChange("maxFileSize", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => handleGeneralSettingsChange("contactEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => handleGeneralSettingsChange("supportEmail", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, the site will display a maintenance message to all users.
                  </p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleGeneralSettingsChange("maintenanceMode", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("general")}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* User Management Settings Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management Settings</CardTitle>
              <CardDescription>Configure user registration, authentication, and account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Maximum Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={userSettings.maxLoginAttempts}
                    onChange={(e) => handleUserSettingsChange("maxLoginAttempts", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={userSettings.sessionTimeout}
                    onChange={(e) => handleUserSettingsChange("sessionTimeout", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={userSettings.passwordMinLength}
                    onChange={(e) => handleUserSettingsChange("passwordMinLength", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
                    <p className="text-sm text-muted-foreground">
                      Users must verify their email address before accessing the platform.
                    </p>
                  </div>
                  <Switch
                    id="requireEmailVerification"
                    checked={userSettings.requireEmailVerification}
                    onCheckedChange={(checked) => handleUserSettingsChange("requireEmailVerification", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowUserRegistration">Allow User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      When disabled, only administrators can create new user accounts.
                    </p>
                  </div>
                  <Switch
                    id="allowUserRegistration"
                    checked={userSettings.allowUserRegistration}
                    onCheckedChange={(checked) => handleUserSettingsChange("allowUserRegistration", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoApproveBusinessAccounts">Auto-approve Business Accounts</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve new business account registrations.
                    </p>
                  </div>
                  <Switch
                    id="autoApproveBusinessAccounts"
                    checked={userSettings.autoApproveBusinessAccounts}
                    onCheckedChange={(checked) => handleUserSettingsChange("autoApproveBusinessAccounts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoApproveProfessionalAccounts">Auto-approve Professional Accounts</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve new professional account registrations.
                    </p>
                  </div>
                  <Switch
                    id="autoApproveProfessionalAccounts"
                    checked={userSettings.autoApproveProfessionalAccounts}
                    onCheckedChange={(checked) => handleUserSettingsChange("autoApproveProfessionalAccounts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireStrongPasswords">Require Strong Passwords</Label>
                    <p className="text-sm text-muted-foreground">
                      Enforce password complexity requirements (uppercase, lowercase, numbers, symbols).
                    </p>
                  </div>
                  <Switch
                    id="requireStrongPasswords"
                    checked={userSettings.requireStrongPasswords}
                    onCheckedChange={(checked) => handleUserSettingsChange("requireStrongPasswords", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("user")}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Settings Tab */}
        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email server settings and notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={emailSettings.smtpServer}
                    onChange={(e) => handleEmailSettingsChange("smtpServer", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={emailSettings.smtpPort}
                    onChange={(e) => handleEmailSettingsChange("smtpPort", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={emailSettings.smtpUsername}
                    onChange={(e) => handleEmailSettingsChange("smtpUsername", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => handleEmailSettingsChange("smtpPassword", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input
                    id="senderName"
                    value={emailSettings.senderName}
                    onChange={(e) => handleEmailSettingsChange("senderName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input
                    id="senderEmail"
                    type="email"
                    value={emailSettings.senderEmail}
                    onChange={(e) => handleEmailSettingsChange("senderEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="emailFooterText">Email Footer Text</Label>
                  <Textarea
                    id="emailFooterText"
                    value={emailSettings.emailFooterText}
                    onChange={(e) => handleEmailSettingsChange("emailFooterText", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send automated email notifications for system events.</p>
                </div>
                <Switch
                  id="enableEmailNotifications"
                  checked={emailSettings.enableEmailNotifications}
                  onCheckedChange={(checked) => handleEmailSettingsChange("enableEmailNotifications", checked)}
                />
              </div>

              <div className="flex items-center p-2 rounded-md bg-blue-50 border border-blue-200">
                <Info className="h-4 w-4 text-blue-500 mr-2" />
                <p className="text-sm text-blue-700">You can test your email configuration by sending a test email.</p>
                <Button variant="outline" size="sm" className="ml-auto">
                  Send Test Email
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("email")}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security features and protection measures.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxRequestsPerMinute">Rate Limit (requests per minute)</Label>
                  <Input
                    id="maxRequestsPerMinute"
                    type="number"
                    value={securitySettings.maxRequestsPerMinute}
                    onChange={(e) => handleSecuritySettingsChange("maxRequestsPerMinute", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="captchaType">CAPTCHA Type</Label>
                  <Select
                    value={securitySettings.captchaType}
                    onValueChange={(value) => handleSecuritySettingsChange("captchaType", value)}
                    disabled={!securitySettings.enableCaptcha}
                  >
                    <SelectTrigger id="captchaType">
                      <SelectValue placeholder="Select CAPTCHA type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recaptcha">Google reCAPTCHA</SelectItem>
                      <SelectItem value="hcaptcha">hCaptcha</SelectItem>
                      <SelectItem value="turnstile">Cloudflare Turnstile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auditLogRetentionDays">Audit Log Retention (days)</Label>
                  <Input
                    id="auditLogRetentionDays"
                    type="number"
                    value={securitySettings.auditLogRetentionDays}
                    onChange={(e) => handleSecuritySettingsChange("auditLogRetentionDays", e.target.value)}
                    disabled={!securitySettings.enableAuditLog}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableTwoFactor">Enable Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to enable two-factor authentication for their accounts.
                    </p>
                  </div>
                  <Switch
                    id="enableTwoFactor"
                    checked={securitySettings.enableTwoFactor}
                    onCheckedChange={(checked) => handleSecuritySettingsChange("enableTwoFactor", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireAdminTwoFactor">Require 2FA for Administrators</Label>
                    <p className="text-sm text-muted-foreground">
                      Force all administrator accounts to use two-factor authentication.
                    </p>
                  </div>
                  <Switch
                    id="requireAdminTwoFactor"
                    checked={securitySettings.requireAdminTwoFactor}
                    onCheckedChange={(checked) => handleSecuritySettingsChange("requireAdminTwoFactor", checked)}
                    disabled={!securitySettings.enableTwoFactor}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ipRateLimiting">IP-based Rate Limiting</Label>
                    <p className="text-sm text-muted-foreground">
                      Limit the number of requests from a single IP address.
                    </p>
                  </div>
                  <Switch
                    id="ipRateLimiting"
                    checked={securitySettings.ipRateLimiting}
                    onCheckedChange={(checked) => handleSecuritySettingsChange("ipRateLimiting", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableCaptcha">Enable CAPTCHA</Label>
                    <p className="text-sm text-muted-foreground">
                      Protect forms with CAPTCHA to prevent automated submissions.
                    </p>
                  </div>
                  <Switch
                    id="enableCaptcha"
                    checked={securitySettings.enableCaptcha}
                    onCheckedChange={(checked) => handleSecuritySettingsChange("enableCaptcha", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableAuditLog">Enable Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Log all administrative actions for security and compliance.
                    </p>
                  </div>
                  <Switch
                    id="enableAuditLog"
                    checked={securitySettings.enableAuditLog}
                    onCheckedChange={(checked) => handleSecuritySettingsChange("enableAuditLog", checked)}
                  />
                </div>
              </div>

              <div className="flex items-center p-2 rounded-md bg-yellow-50 border border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                <p className="text-sm text-yellow-700">
                  Changing security settings may require users to re-authenticate.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSaveSettings("security")}>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
