"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Building,
  MoreHorizontal,
  CheckCircle,
  AlertTriangle,
  Search,
  UserPlus,
  Download,
  Upload,
  UsersIcon,
  UserCheck,
  UserX,
  Filter,
} from "lucide-react"

// Sample user data
const users = [
  {
    id: "USR001",
    name: "Michael O'Connor",
    email: "michael@example.com",
    type: "Professional",
    role: "Project Manager",
    joined: "April 15, 2025",
    status: "Active",
    verified: true,
    lastActive: "Today",
  },
  {
    id: "USR002",
    name: "Dublin Construction Ltd",
    email: "info@dublinconst.com",
    type: "Business",
    role: "Company",
    joined: "April 14, 2025",
    status: "Active",
    verified: true,
    lastActive: "Yesterday",
  },
  {
    id: "USR003",
    name: "Sarah Murphy",
    email: "sarah@example.com",
    type: "Professional",
    role: "Electrician",
    joined: "April 13, 2025",
    status: "Pending",
    verified: false,
    lastActive: "3 days ago",
  },
  {
    id: "USR004",
    name: "Cork Builders Group",
    email: "info@corkbuilders.com",
    type: "Business",
    role: "Company",
    joined: "April 12, 2025",
    status: "Active",
    verified: true,
    lastActive: "Today",
  },
  {
    id: "USR005",
    name: "James Kelly",
    email: "james@example.com",
    type: "Professional",
    role: "Plumber",
    joined: "April 10, 2025",
    status: "Active",
    verified: true,
    lastActive: "Today",
  },
  {
    id: "USR006",
    name: "Galway Development",
    email: "contact@galwaydev.com",
    type: "Business",
    role: "Company",
    joined: "April 8, 2025",
    status: "Inactive",
    verified: true,
    lastActive: "2 weeks ago",
  },
  {
    id: "USR007",
    name: "Emma Walsh",
    email: "emma@example.com",
    type: "Professional",
    role: "Architect",
    joined: "April 5, 2025",
    status: "Active",
    verified: true,
    lastActive: "Yesterday",
  },
  {
    id: "USR008",
    name: "Limerick Contractors",
    email: "info@limerickcontractors.com",
    type: "Business",
    role: "Company",
    joined: "April 3, 2025",
    status: "Active",
    verified: false,
    lastActive: "5 days ago",
  },
  {
    id: "USR009",
    name: "Patrick Byrne",
    email: "patrick@example.com",
    type: "Professional",
    role: "Site Manager",
    joined: "March 28, 2025",
    status: "Suspended",
    verified: true,
    lastActive: "1 month ago",
  },
  {
    id: "USR010",
    name: "Waterford Building Solutions",
    email: "contact@waterfordbuild.com",
    type: "Business",
    role: "Company",
    joined: "March 25, 2025",
    status: "Active",
    verified: true,
    lastActive: "Today",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")

  // Filter users based on search term and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = userTypeFilter === "all" || user.type.toLowerCase() === userTypeFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesVerification =
      verificationFilter === "all" ||
      (verificationFilter === "verified" && user.verified) ||
      (verificationFilter === "unverified" && !user.verified)

    return matchesSearch && matchesType && matchesStatus && matchesVerification
  })

  // User statistics
  const userStats = {
    total: users.length,
    professionals: users.filter((user) => user.type === "Professional").length,
    businesses: users.filter((user) => user.type === "Business").length,
    active: users.filter((user) => user.status === "Active").length,
    pending: users.filter((user) => user.status === "Pending").length,
    inactive: users.filter((user) => user.status === "Inactive").length,
    suspended: users.filter((user) => user.status === "Suspended").length,
    verified: users.filter((user) => user.verified).length,
    unverified: users.filter((user) => !user.verified).length,
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">
              {userStats.professionals} professionals, {userStats.businesses} businesses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.active}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((userStats.active / userStats.total) * 100)}% of total users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending/Inactive</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.pending + userStats.inactive}</div>
            <p className="text-xs text-muted-foreground">
              {userStats.pending} pending, {userStats.inactive} inactive
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((userStats.verified / userStats.total) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              {userStats.verified} verified, {userStats.unverified} unverified
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-users">All Users</TabsTrigger>
          <TabsTrigger value="professionals">Professionals</TabsTrigger>
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>

        <TabsContent value="all-users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage all users registered on the platform. View, edit, or update user accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <div className="relative w-full">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search users..."
                        className="w-full pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5">
                      <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue placeholder="User Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue placeholder="Verification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="verified">Verified</SelectItem>
                          <SelectItem value="unverified">Unverified</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filters</span>
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                                {user.type === "Professional" ? (
                                  <User className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <Building className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium">{user.name}</span>
                                <span className="text-xs text-muted-foreground">{user.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs">{user.id}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.type === "Professional"
                                  ? "bg-blue-50 text-blue-700 hover:bg-blue-50"
                                  : "bg-purple-50 text-purple-700 hover:bg-purple-50"
                              }
                            >
                              {user.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={user.status === "Active" ? "default" : "outline"}
                              className={
                                user.status === "Active"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : user.status === "Pending"
                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                    : user.status === "Suspended"
                                      ? "bg-red-100 text-red-700 hover:bg-red-100"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {user.verified ? (
                                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                              ) : (
                                <AlertTriangle className="mr-1 h-4 w-4 text-amber-500" />
                              )}
                              <span className="text-xs text-muted-foreground">
                                {user.verified ? "Verified" : "Unverified"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit user</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View activity</DropdownMenuItem>
                                <DropdownMenuItem>Reset password</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status === "Active" ? (
                                  <DropdownMenuItem className="text-amber-600">Suspend user</DropdownMenuItem>
                                ) : user.status === "Suspended" ? (
                                  <DropdownMenuItem className="text-green-600">Reactivate user</DropdownMenuItem>
                                ) : null}
                                <DropdownMenuItem className="text-red-600">Delete user</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredUsers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="h-24 text-center">
                            No users found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex-1 text-sm text-muted-foreground">
                    Showing <strong>1</strong> to <strong>{filteredUsers.length}</strong> of{" "}
                    <strong>{filteredUsers.length}</strong> users
                  </div>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professionals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Professional Users</CardTitle>
              <CardDescription>Manage professional users registered on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">Professional Users Tab Content</h3>
                <p className="text-muted-foreground">
                  This tab would display a filtered view of professional users with specific fields relevant to
                  professionals.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="businesses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Business Users</CardTitle>
              <CardDescription>Manage business accounts registered on the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">Business Users Tab Content</h3>
                <p className="text-muted-foreground">
                  This tab would display a filtered view of business users with specific fields relevant to businesses.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recently Added Users</CardTitle>
              <CardDescription>View and manage users who recently joined the platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">Recent Users Tab Content</h3>
                <p className="text-muted-foreground">
                  This tab would display users sorted by join date, showing the most recent registrations first.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
