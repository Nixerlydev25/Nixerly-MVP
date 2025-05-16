'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChevronLeft,
  FileEdit,
  PencilIcon,
  PlusCircle,
  Settings,
  ShieldCheck,
  TrendingUp,
} from "lucide-react"
import { useGetCurrentWorkerProfileDetails } from "@/hook/user/user.hooks"
import { AboutSection, CertificationsSection, EducationSection, LanguagesSection, ProfileHeader } from './_component';
import ProfileCompleteness from './_component/ProfileCompleteness';
import ExperienceTab from './_component/ExperienceTab';

export default function FreelancerProfileSelfView() {
  const [isPublic, setIsPublic] = useState(true);

  const {data: workerDetail} = useGetCurrentWorkerProfileDetails();

  console.log({workerDetail})

  // Transform API data to match the UI structure
  const freelancer = {
    id: workerDetail?.id || "",
    name: `${workerDetail?.user?.firstName || ""} ${workerDetail?.user?.lastName || ""}`,
    title: workerDetail?.title || "",
    tagline: workerDetail?.description || "",
    rating: workerDetail?.avgRating || 0,
    hourlyRate: workerDetail?.hourlyRate || 0,
    totalEarned: workerDetail?.totalEarnings || 0,
    skills: workerDetail?.skills || [],
    jobsCompleted: workerDetail?.completedJobs || 0,
    successRate: 98, // Static data
    location: `${workerDetail?.city || ""}, ${workerDetail?.state || ""}`,
    memberSince: new Date(workerDetail?.user?.createdAt || "").toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    lastActive: "2 hours ago", // Static data
    responseTime: "< 1 hour", // Static data
    languages: workerDetail?.languages?.map((lang: any) => ({
      name: lang.language,
      proficiency: lang.proficiency
    })) || [],
    avatar: workerDetail?.profilePicture || "/placeholder.svg?height=200&width=200",
    bio: workerDetail?.description || "",
    education: workerDetail?.education?.map((edu: any) => ({
      institution: edu.school,
      degree: edu.degree,
      year: new Date(edu.endDate).getFullYear().toString()
    })) || [],
    certifications: [], // Static data
    workHistory: workerDetail?.experience?.map((exp: any) => ({
      title: exp.title,
      client: exp.company,
      completedDate: new Date(exp.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      rating: 5.0, // Static data
      hours: 160, // Static data
      description: exp.description
    })) || [],
    availability: workerDetail?.availability ? "Full-time (40+ hrs/week)" : "Not Available",
    preferredProjectLength: "3+ months", // Static data
    profileStats: {
      views: 342, // Static data
      viewsChange: "+28%", // Static data
      proposals: 15, // Static data
      proposalsChange: "+5%", // Static data
      invitations: 8, // Static data
      invitationsChange: "+33%", // Static data
      profileCompleteness: 95, // Static data
      searchAppearances: 178, // Static data
      searchAppearancesChange: "+12%", // Static data
    },
    earnings: {
      thisMonth: 4250, // Static data
      lastMonth: 3800, // Static data
      thisYear: 42500, // Static data
      pending: 1200, // Static data
    },
    activeProposals: 5, // Static data
    savedJobs: 12, // Static data
    activeContracts: 3, // Static data
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back to dashboard */}
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div className="space-y-8">
            <ProfileHeader freelancer={freelancer} />

            {/* Profile completeness */}
            <ProfileCompleteness freelancer={freelancer} />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="overview"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 transition-colors hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="work"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 transition-colors hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                >
                  Work History
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 text-gray-600 transition-colors hover:text-blue-600 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-8">
                {/* About section */}
                <AboutSection worker={freelancer} />

                {/* Skills section */}
                <Card>
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Skills</CardTitle>
                      <Button size="sm" variant="ghost" className="h-8 gap-1">
                        <PencilIcon className="h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className={`${
                            skill.includes('React')
                              ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                              : skill.includes('Node')
                              ? 'bg-green-50 text-green-700 border-green-200'
                              : skill.includes('Type')
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : skill.includes('Mongo')
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : skill.includes('AWS')
                              ? 'bg-orange-50 text-orange-700 border-orange-200'
                              : skill.includes('Docker')
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : skill.includes('Graph')
                              ? 'bg-pink-50 text-pink-700 border-pink-200'
                              : skill.includes('Express')
                              ? 'bg-gray-50 text-gray-700 border-gray-200'
                              : skill.includes('Next')
                              ? 'bg-black bg-opacity-5 text-gray-800 border-gray-300'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          } border`}
                        >
                          {skill}
                        </Badge>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full h-7 gap-1"
                      >
                        <PlusCircle className="h-3 w-3" />
                        Add Skill
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <EducationSection education={freelancer.education} />
                  <CertificationsSection
                    certifications={freelancer.certifications}
                  />
                </div>
                <LanguagesSection languages={freelancer.languages} />
              </TabsContent>

              {/* Work History Tab */}
              <TabsContent value="experience" className="mt-6 space-y-6">
                <ExperienceTab freelancer={freelancer} />
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="mt-6 space-y-6">
                <div className="text-2xl flex items-center justify-center">
                  Coming Soon
                </div>
                {/* <Card>
                  <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100/50 pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Client Reviews</CardTitle>
                        <CardDescription>
                          <div className="flex items-center">
                            <StarIcon className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">
                              {freelancer.rating}
                            </span>
                            <span className="ml-1 text-gray-500">
                              ({freelancer.jobsCompleted} reviews)
                            </span>
                          </div>
                        </CardDescription>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <UserIcon className="h-4 w-4" />
                        Request Testimonial
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {freelancer.reviews.map((review, index) => (
                        <div
                          key={index}
                          className={index > 0 ? 'border-t pt-6' : ''}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold">
                                {review.client}{' '}
                                <span className="font-normal text-gray-500">
                                  from {review.company}
                                </span>
                              </h3>
                              <div className="mt-1 flex items-center">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < Math.floor(review.rating)
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'fill-gray-200 text-gray-200'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8">
                              <ThumbsUp className="mr-1 h-4 w-4" />
                              Pin to Top
                            </Button>
                          </div>
                          <p className="mt-3 text-gray-700">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card> */}
              </TabsContent>
              {/* <TabsContent value="analytics" className="mt-6 space-y-6">
                <Card>
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 pb-3">
                    <CardTitle>Profile Performance</CardTitle>
                    <CardDescription>Last 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Profile Views</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">
                            {freelancer.profileStats.views}
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {freelancer.profileStats.viewsChange}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">
                          Search Appearances
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">
                            {freelancer.profileStats.searchAppearances}
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {freelancer.profileStats.searchAppearancesChange}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Proposals Sent</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">
                            {freelancer.profileStats.proposals}
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {freelancer.profileStats.proposalsChange}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">
                          Client Invitations
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold">
                            {freelancer.profileStats.invitations}
                          </p>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200"
                          >
                            {freelancer.profileStats.invitationsChange}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 h-64 w-full rounded-lg border bg-gray-50 p-4 flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="mx-auto h-10 w-10 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Profile views over time chart
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Detailed Analytics
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 pb-3">
                    <CardTitle>Earnings Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">This Month</p>
                        <p className="text-2xl font-bold">
                          ${freelancer.earnings.thisMonth.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {freelancer.earnings.thisMonth >
                          freelancer.earnings.lastMonth
                            ? '↑'
                            : '↓'}{' '}
                          $
                          {Math.abs(
                            freelancer.earnings.thisMonth -
                              freelancer.earnings.lastMonth
                          ).toLocaleString()}{' '}
                          vs last month
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Last Month</p>
                        <p className="text-2xl font-bold">
                          ${freelancer.earnings.lastMonth.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">This Year</p>
                        <p className="text-2xl font-bold">
                          ${freelancer.earnings.thisYear.toLocaleString()}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">
                          Pending Payments
                        </p>
                        <p className="text-2xl font-bold">
                          ${freelancer.earnings.pending.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 h-64 w-full rounded-lg border bg-gray-50 p-4 flex items-center justify-center">
                      <div className="text-center">
                        <LineChart className="mx-auto h-10 w-10 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Earnings over time chart
                        </p>
                        <Button size="sm" variant="outline" className="mt-2">
                          View Earnings Report
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile settings card */}
            <div className="sticky top-24 rounded-lg border bg-gradient-to-b from-white to-blue-50 p-6 shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-lg"></div>
              <div className="mb-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${freelancer.hourlyRate}
                </div>
                <div className="text-gray-600">per hour</div>
                <Button size="sm" variant="ghost" className="mt-1 h-8 gap-1">
                  <PencilIcon className="h-3 w-3" />
                  Edit Rate
                </Button>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">
                      {freelancer.availability}
                    </span>
                    <Button size="icon" variant="ghost" className="h-6 w-6">
                      <PencilIcon className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Profile Visibility</span>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={isPublic ? 'default' : 'outline'}
                      className="bg-green-500"
                    >
                      {isPublic ? 'Public' : 'Private'}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8"
                      onClick={() => setIsPublic(!isPublic)}
                    >
                      Toggle
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last active</span>
                  <span className="font-medium">{freelancer.lastActive}</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                size="lg"
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Full Profile
              </Button>
              <Button variant="outline" className="mt-3 w-full">
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </Button>
            </div>

            {/* Activity summary */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-3">
                <CardTitle className="text-base">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Proposals</span>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {freelancer.activeProposals}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active Contracts</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {freelancer.activeContracts}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Saved Jobs</span>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200"
                  >
                    {freelancer.savedJobs}
                  </Badge>
                </div>
                <Separator />
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Job Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Verification status */}
            <Card>
              <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 pb-3">
                <CardTitle className="text-base">Verification Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">ID Verification</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">Payment Method</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-gray-300" />
                    <span className="text-gray-700">Phone Verification</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-gray-50 text-gray-500 border-gray-200"
                  >
                    Not Verified
                  </Badge>
                </div>
                <Separator />
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Complete Verification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
