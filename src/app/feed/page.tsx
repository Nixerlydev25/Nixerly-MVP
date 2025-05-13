"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  BookmarkIcon,
  BriefcaseIcon,
  StarIcon,
  UserIcon,
} from "lucide-react"
import FiltersFeeds from "./_components/FiltersFeeds"

// Sample data for freelancers
const freelancers = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Full Stack Developer",
    rating: 4.9,
    hourlyRate: 45,
    skills: ["React", "Node.js", "MongoDB"],
    jobsCompleted: 127,
    successRate: 98,
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Sarah Williams",
    title: "UI/UX Designer",
    rating: 4.8,
    hourlyRate: 55,
    skills: ["Figma", "Adobe XD", "Sketch"],
    jobsCompleted: 93,
    successRate: 100,
    location: "New York, NY",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Mobile App Developer",
    rating: 4.7,
    hourlyRate: 50,
    skills: ["React Native", "Flutter", "Swift"],
    jobsCompleted: 78,
    successRate: 95,
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    title: "Content Writer",
    rating: 4.9,
    hourlyRate: 35,
    skills: ["SEO", "Copywriting", "Blog Writing"],
    jobsCompleted: 215,
    successRate: 99,
    location: "Chicago, IL",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "David Kim",
    title: "Data Scientist",
    rating: 4.6,
    hourlyRate: 65,
    skills: ["Python", "Machine Learning", "SQL"],
    jobsCompleted: 42,
    successRate: 97,
    location: "Seattle, WA",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Lisa Thompson",
    title: "Graphic Designer",
    rating: 4.8,
    hourlyRate: 40,
    skills: ["Photoshop", "Illustrator", "InDesign"],
    jobsCompleted: 156,
    successRate: 98,
    location: "Portland, OR",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Dashboard() {
  
  const [viewMode, setViewMode] = useState<"card" | "list">("card")

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      

      <div className="container px-4 py-6 md:py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">Find Top Talent</h1>
          <p className="mt-1 text-gray-600">Browse profiles of skilled professionals ready to work on your projects</p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <FiltersFeeds />

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and View Options - Desktop */}
            <div className="mb-6 hidden items-center justify-between lg:flex">
              <div>
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">145</span> results
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-md border bg-white p-1">
                  <Button
                    variant={viewMode === "card" ? "default" : "ghost"}
                    size="sm"
                    className="h-8 px-3"
                    onClick={() => setViewMode("card")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <rect width="7" height="7" x="3" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="3" rx="1" />
                      <rect width="7" height="7" x="14" y="14" rx="1" />
                      <rect width="7" height="7" x="3" y="14" rx="1" />
                    </svg>
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className="h-8 px-3"
                    onClick={() => setViewMode("list")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <line x1="8" x2="21" y1="6" y2="6" />
                      <line x1="8" x2="21" y1="12" y2="12" />
                      <line x1="8" x2="21" y1="18" y2="18" />
                      <line x1="3" x2="3.01" y1="6" y2="6" />
                      <line x1="3" x2="3.01" y1="12" y2="12" />
                      <line x1="3" x2="3.01" y1="18" y2="18" />
                    </svg>
                    List
                  </Button>
                </div>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="hourly-asc">Hourly Rate: Low to High</SelectItem>
                    <SelectItem value="hourly-desc">Hourly Rate: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Freelancer Cards/List */}
            {viewMode === "card" ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {freelancers.map((freelancer) => (
                  <Card key={freelancer.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <Image
                            src={freelancer.avatar || "/placeholder.svg"}
                            width={60}
                            height={60}
                            alt={freelancer.name}
                            className="rounded-full"
                          />
                          <div>
                            <h3 className="font-semibold">{freelancer.name}</h3>
                            <p className="text-sm text-gray-600">{freelancer.title}</p>
                            <div className="mt-1 flex items-center">
                              <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{freelancer.rating}</span>
                              <span className="ml-2 text-xs text-gray-500">({freelancer.jobsCompleted} jobs)</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600">
                          <BookmarkIcon className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium text-gray-600">Hourly Rate:</span>
                          <span className="ml-1 text-lg font-bold text-blue-600">${freelancer.hourlyRate}</span>
                          <span className="text-sm text-gray-600">/hr</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-600">Success Rate:</span>
                          <span className="ml-1 font-medium text-green-600">{freelancer.successRate}%</span>
                        </div>
                      </div>
                      <p className="mb-3 text-sm text-gray-600">
                        <UserIcon className="mr-1 inline-block h-4 w-4" />
                        {freelancer.location}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {freelancer.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t bg-gray-50 p-4">
                      <Button variant="outline" className="w-[48%]">
                        View Profile
                      </Button>
                      <Button className="w-[48%]">Contact</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {freelancers.map((freelancer) => (
                  <div key={freelancer.id} className="flex flex-col rounded-lg border bg-white shadow-sm sm:flex-row">
                    <div className="flex flex-1 items-start p-4">
                      <Image
                        src={freelancer.avatar || "/placeholder.svg"}
                        width={60}
                        height={60}
                        alt={freelancer.name}
                        className="mr-4 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{freelancer.name}</h3>
                            <p className="text-sm text-gray-600">{freelancer.title}</p>
                            <div className="mt-1 flex items-center">
                              <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{freelancer.rating}</span>
                              <span className="ml-2 text-xs text-gray-500">({freelancer.jobsCompleted} jobs)</span>
                            </div>
                          </div>
                          <div className="hidden sm:block">
                            <span className="text-sm font-medium text-gray-600">Success Rate:</span>
                            <span className="ml-1 font-medium text-green-600">{freelancer.successRate}%</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {freelancer.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-600">
                          <UserIcon className="mr-1 inline-block h-4 w-4" />
                          {freelancer.location}
                        </p>
                      </div>
                      <div className="ml-4 hidden flex-col items-end justify-between md:flex">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600">
                          <BookmarkIcon className="h-5 w-5" />
                        </Button>
                        <div className="mt-auto text-right">
                          <div className="text-lg font-bold text-blue-600">${freelancer.hourlyRate}</div>
                          <div className="text-sm text-gray-600">per hour</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex border-t bg-gray-50 p-3 sm:w-[180px] sm:flex-col sm:justify-center sm:border-l sm:border-t-0">
                      <div className="mr-3 block sm:hidden">
                        <div className="text-lg font-bold text-blue-600">${freelancer.hourlyRate}</div>
                        <div className="text-sm text-gray-600">per hour</div>
                      </div>
                      <div className="flex flex-1 flex-col gap-2">
                        <Button className="w-full">Contact</Button>
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination className="mt-8">
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
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t bg-gray-50">
        <div className="container px-4 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">For Clients</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    How to Hire
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Talent Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Project Catalog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">For Talent</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    How to Find Work
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Direct Contracts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Find Freelance Jobs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Help & Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Leadership
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-blue-600">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">WorkHub</span>
            </div>
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} WorkHub Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Terms
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Privacy
              </Link>
              <Link href="#" className="text-gray-600 hover:text-blue-600">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
