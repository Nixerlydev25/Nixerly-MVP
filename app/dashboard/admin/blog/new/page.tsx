"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"
import { ArrowLeft, Bold, Italic, List, ListOrdered, ImageIcon, LinkIcon, Code, Eye } from "lucide-react"

export default function NewBlogPost() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)
  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [activeTab, setActiveTab] = useState("editor")

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    setSlug(
      newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    )
  }

  // Insert formatting at cursor position in textarea
  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `*${selectedText}*`
        break
      case "list":
        formattedText = `\n- ${selectedText}`
        break
      case "ordered-list":
        formattedText = `\n1. ${selectedText}`
        break
      case "link":
        formattedText = `[${selectedText}](url)`
        break
      case "image":
        formattedText = `![alt text](image-url)`
        break
      case "code":
        formattedText = `\`${selectedText}\``
        break
      default:
        formattedText = selectedText
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)

    // Reset focus and cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length)
    }, 0)
  }

  return (
    <DashboardLayout userType="admin">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/dashboard/admin/blog">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">New Blog Post</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setActiveTab(activeTab === "editor" ? "preview" : "editor")}>
              {activeTab === "editor" ? (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </>
              ) : (
                <>
                  <Bold className="mr-2 h-4 w-4" />
                  Edit
                </>
              )}
            </Button>
            <Button>Publish</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter post title" value={title} onChange={handleTitleChange} />
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="editor">Editor</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="editor" className="space-y-4">
                      <div className="flex flex-wrap gap-1 border-b pb-2">
                        <Button variant="ghost" size="sm" onClick={() => insertFormatting("bold")}>
                          <Bold className="h-4 w-4" />
                          <span className="sr-only">Bold</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertFormatting("italic")}>
                          <Italic className="h-4 w-4" />
                          <span className="sr-only">Italic</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertFormatting("list")}>
                          <List className="h-4 w-4" />
                          <span className="sr-only">Bullet List</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertFormatting("ordered-list")}>
                          <ListOrdered className="h-4 w-4" />
                          <span className="sr-only">Numbered List</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertFormatting("link")}>
                          <LinkIcon className="h-4 w-4" />
                          <span className="sr-only">Link</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertFormatting("image")}>
                          <Image className="h-4 w-4" />
                          <span className="sr-only">Image</span>
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => insertFormatting("code")}>
                          <Code className="h-4 w-4" />
                          <span className="sr-only">Code</span>
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                          id="content"
                          placeholder="Write your post content here... (Markdown supported)"
                          className="min-h-[400px] font-mono"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="preview" className="border rounded-md p-4 min-h-[400px]">
                      {content ? (
                        <div className="prose max-w-none">
                          <h1>{title || "Post Title"}</h1>
                          <div>
                            {/* In a real app, you would render markdown here */}
                            {content.split("\n").map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground py-20">
                          <p>No content to preview</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your post for search engines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo-title">SEO Title</Label>
                    <Input
                      id="seo-title"
                      placeholder="SEO optimized title (optional)"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">{seoTitle.length} / 60 characters</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seo-description">Meta Description</Label>
                    <Textarea
                      id="seo-description"
                      placeholder="Brief description for search results"
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">{seoDescription.length} / 160 characters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">/blog/</span>
                      <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Brief summary of the post"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                        <SelectItem value="sustainability">Sustainability</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="industry">Industry News</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      placeholder="Enter tags separated by commas"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="published" className="cursor-pointer">
                      Published
                    </Label>
                    <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured" className="cursor-pointer">
                      Featured Post
                    </Label>
                    <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 h-[200px]">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
                    <Button variant="outline" size="sm">
                      Upload Image
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Recommended size: 1200 x 630 pixels</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
