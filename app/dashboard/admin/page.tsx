"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Building, User, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Eye, Trash2 } from "lucide-react"

export default function AdminDashboard() {
  // Sample platform statistics
  const stats = {
    totalUsers: 1245,
    professionals: 876,
    businesses: 369,
    activeJobs: 128,
    pendingVerifications: 42,
    reportedProfiles: 8,
  }

  // Sample recent users
  const recentUsers = [
    {
      id: 1,
      name: "Michael O'Connor",
      email: "michael@example.com",
      type: "Professional",
      joined: "April 15, 2025",
      status: "Active",
      verified: true,
    },
    {
      id: 2,
      name: "Dublin Construction Ltd",
      email: "info@dublinconst.com",
      type: "Business",
      joined: "April 14, 2025",
      status: "Active",
      verified: true,
    },
    {
      id: 3,
      name: "Sarah Murphy",
      email: "sarah@example.com",
      type: "Professional",
      joined: "April 13, 2025",
      status: "Pending",
      verified: false,
    },
    {
      id: 4,
      name: "Cork Builders Group",
      email: "info@corkbuilders.com",
      type: "Business",
      joined: "April 12, 2025",
      status: "Active",
      verified: true,
    },
  ]

  // Sample verification requests
  const verificationRequests = [
    {
      id: 1,
      name: "David Kelly",
      type: "Professional",
      documentType: "Safety Certification",
      submitted: "April 15, 2025",
      status: "Pending",
    },
    {
      id: 2,
      name: "Galway Development",
      type: "Business",
      documentType: "Business Registration",
      submitted: "April 14, 2025",
      status: "Pending",
    },
    {
      id: 3,
      name: "Emma Walsh",
      type: "Professional",
      documentType: "Professional License",
      submitted: "April 13, 2025",
      status: "Pending",
    },
  ]

  // Sample reported content
  const reportedContent = [
    {
      id: 1,
      contentType: "Profile",
      reportedUser: "John Smith",
      reason: "Inappropriate content",
      reportedBy: "Multiple users",
      date: "April 15, 2025",
      status: "Pending",
    },
    {
      id: 2,
      contentType: "Job Posting",
      reportedUser: "XYZ Construction",
      reason: "Misleading information",
      reportedBy: "User ID: 12345",
      date: "April 14, 2025",
      status: "Pending",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/admin/settings">Platform Settings</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.professionals} professionals, {stats.businesses} businesses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeJobs}</div>
            <p className="text-xs text-muted-foreground">Currently active job postings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
            <p className="text-xs text-muted-foreground">Awaiting admin review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="verifications">Verifications</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Recently registered users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-start space-x-4 rounded-md border p-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {user.type === "Professional" ? (
                        <User className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Building className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{user.name}</p>
                        <Badge variant={user.status === "Active" ? "default" : "outline"}>{user.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">Type: {user.type}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">Joined: {user.joined}</span>
                        </div>
                        <div className="flex items-center">
                          {user.verified ? (
                            <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                          ) : (
                            <AlertTriangle className="mr-1 h-3 w-3 text-amber-500" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {user.verified ? "Verified" : "Unverified"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
              <CardDescription>Verification requests awaiting admin review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationRequests.map((request) => (
                  <div key={request.id} className="flex items-start space-x-4 rounded-md border p-4">
                    <Shield className="mt-px h-5 w-5 text-primary" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{request.name}</p>
                        <Badge variant="outline">{request.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.documentType}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">Type: {request.type}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">Submitted: {request.submitted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200"
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Verifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reported Content</CardTitle>
              <CardDescription>Content reported by users for review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedContent.map((report) => (
                  <div key={report.id} className="flex items-start space-x-4 rounded-md border p-4">
                    <AlertTriangle className="mt-px h-5 w-5 text-amber-500" />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {report.contentType}: {report.reportedUser}
                        </p>
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                          {report.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Reason: {report.reason}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">Reported by: {report.reportedBy}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-muted-foreground">Date: {report.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
                {reportedContent.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No Reported Content</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      There is currently no content reported by users.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Blog Management</CardTitle>
                <CardDescription>Create and manage blog posts for the website</CardDescription>
              </div>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          title: "The Future of Construction Technology",
                          author: "Admin User",
                          category: "Technology",
                          published: true,
                          date: "April 15, 2025",
                        },
                        {
                          id: 2,
                          title: "Safety Innovations in Modern Construction",
                          author: "Admin User",
                          category: "Safety",
                          published: true,
                          date: "April 10, 2025",
                        },
                        {
                          id: 3,
                          title: "Sustainable Building Practices",
                          author: "Admin User",
                          category: "Sustainability",
                          published: false,
                          date: "April 5, 2025",
                        },
                      ].map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell>{post.author}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{post.category}</Badge>
                          </TableCell>
                          <TableCell>
                            {post.published ? (
                              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                                Published
                              </Badge>
                            ) : (
                              <Badge variant="outline">Draft</Badge>
                            )}
                          </TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Analytics</CardTitle>
              <CardDescription>Key metrics and performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">User Growth</h3>
                  <div className="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">User growth chart will be displayed here</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Job Postings & Applications</h3>
                  <div className="h-[200px] w-full bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Job metrics chart will be displayed here</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-md border p-4">
                    <h4 className="text-sm font-medium mb-2">User Retention</h4>
                    <p className="text-2xl font-bold">78%</p>
                    <p className="text-xs text-muted-foreground">30-day retention rate</p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="text-sm font-medium mb-2">Avg. Time to Hire</h4>
                    <p className="text-2xl font-bold">8.5 days</p>
                    <p className="text-xs text-muted-foreground">From job posting to hiring</p>
                  </div>
                  <div className="rounded-md border p-4">
                    <h4 className="text-sm font-medium mb-2">Match Success Rate</h4>
                    <p className="text-2xl font-bold">65%</p>
                    <p className="text-xs text-muted-foreground">Successful job matches</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
