"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil, Eye, Trash2, Plus, Search, ArrowUpDown } from "lucide-react"

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Future of Construction Technology",
    slug: "future-construction-technology",
    excerpt: "Exploring emerging technologies that are transforming the construction industry...",
    author: "Admin User",
    category: "Technology",
    tags: ["innovation", "technology", "future"],
    published: true,
    featured: true,
    date: "April 15, 2025",
    views: 1245,
  },
  {
    id: 2,
    title: "Safety Innovations in Modern Construction",
    slug: "safety-innovations-construction",
    excerpt: "New approaches to workplace safety that are reducing accidents and improving outcomes...",
    author: "Admin User",
    category: "Safety",
    tags: ["safety", "innovation", "workplace"],
    published: true,
    featured: false,
    date: "April 10, 2025",
    views: 982,
  },
  {
    id: 3,
    title: "Sustainable Building Practices",
    slug: "sustainable-building-practices",
    excerpt: "How the construction industry is adapting to environmental challenges with sustainable practices...",
    author: "Admin User",
    category: "Sustainability",
    tags: ["green", "environment", "sustainable"],
    published: false,
    featured: false,
    date: "April 5, 2025",
    views: 0,
  },
  {
    id: 4,
    title: "The Skills Gap in Construction",
    slug: "skills-gap-construction",
    excerpt: "Addressing the growing skills shortage in the construction industry...",
    author: "Admin User",
    category: "Education",
    tags: ["skills", "training", "workforce"],
    published: true,
    featured: false,
    date: "March 28, 2025",
    views: 756,
  },
  {
    id: 5,
    title: "Digital Transformation in Construction Management",
    slug: "digital-transformation-construction",
    excerpt: "How digital tools are revolutionizing project management in construction...",
    author: "Admin User",
    category: "Technology",
    tags: ["digital", "management", "software"],
    published: true,
    featured: true,
    date: "March 20, 2025",
    views: 1102,
  },
]

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter posts based on search term and filters
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && post.published) ||
      (statusFilter === "draft" && !post.published)

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Blog Management</h2>
        <Button asChild>
          <Link href="/dashboard/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage your website's blog content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search posts..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:flex-row">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="category" className="whitespace-nowrap">
                      Category:
                    </Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger id="category" className="w-[180px]">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="status" className="whitespace-nowrap">
                      Status:
                    </Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status" className="w-[180px]">
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[400px]">
                        <div className="flex items-center space-x-1">
                          <span>Title</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <div className="font-medium">{post.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[350px]">{post.excerpt}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.featured && (
                              <Badge className="bg-amber-500 hover:bg-amber-600 text-xs">Featured</Badge>
                            )}
                          </div>
                        </TableCell>
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
                          {post.published ? post.views.toLocaleString() : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/dashboard/admin/blog/edit/${post.id}`}>
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/blog/${post.slug}`} target="_blank">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Link>
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
                    {filteredPosts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No posts found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Analytics</CardTitle>
            <CardDescription>Performance metrics for your blog content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-md border p-4">
                <h4 className="text-sm font-medium mb-2">Total Posts</h4>
                <p className="text-2xl font-bold">{blogPosts.length}</p>
                <p className="text-xs text-muted-foreground">
                  {blogPosts.filter((post) => post.published).length} published,{" "}
                  {blogPosts.filter((post) => !post.published).length} drafts
                </p>
              </div>
              <div className="rounded-md border p-4">
                <h4 className="text-sm font-medium mb-2">Total Views</h4>
                <p className="text-2xl font-bold">
                  {blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Across all published posts</p>
              </div>
              <div className="rounded-md border p-4">
                <h4 className="text-sm font-medium mb-2">Top Category</h4>
                <p className="text-2xl font-bold">Technology</p>
                <p className="text-xs text-muted-foreground">2 posts, 2,347 views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
