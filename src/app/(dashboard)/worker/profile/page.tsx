"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  Clock,
  FileEdit,
  Globe,
  GraduationCap,
  MapPin,
  PencilIcon,
  PlusCircle,
  // Settings,
  Share2,
  StarIcon,
} from "lucide-react";
import { useGetCurrentWorkerProfileDetails } from "@/hook/user/user.hooks";
import { WorkerProfileResponse } from "@/types/worker.types";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";

export default function FreelancerProfileSelfView() {
  const { openModal } = useModalStore();
  const { data: workerDetail } = useGetCurrentWorkerProfileDetails();

  if (!workerDetail) {
    return <div>Loading...</div>;
  }

  const { workerProfile, firstName, lastName } =
    workerDetail as WorkerProfileResponse;
  const fullName = `${firstName} ${lastName}`;

  const handleEditProfile = () => {
    openModal(ModalType.EDIT_PROFILE, workerProfile);
  };

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
            {/* Profile header with edit controls */}
            <div className="relative rounded-lg border bg-white p-6 shadow-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-50 opacity-70"></div>
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <div className="relative">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex-shrink-0 relative group">
                    <Image
                      src={workerProfile.profilePicture || "/placeholder.svg"}
                      width={120}
                      height={120}
                      alt={fullName}
                      className="rounded-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 rounded-full flex items-center justify-center opacity-0 group-hover:bg-opacity-30 group-hover:opacity-100 transition-all duration-200">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-10 w-10 text-white"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-2xl font-bold text-gray-900">
                            {fullName}
                          </h1>
                        </div>
                        <p className="text-lg text-gray-600">
                          {workerProfile.title}
                        </p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1 h-4 w-4" />
                          {`${workerProfile.city}, ${workerProfile.state}, ${workerProfile.country}`}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Share2 className="h-4 w-4" />
                          Share
                        </Button>
                      </div>
                    </div>
           
                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <StarIcon className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">
                          {workerProfile.avgRating.toFixed(1)}
                        </span>
                        <span className="ml-1 text-gray-500">
                          ({workerProfile.completedJobs} reviews)
                        </span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        {workerProfile.completedJobs > 0 ? "100%" : "0%"} Job
                        Success
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-gray-500" />
                        <span>
                          Available{" "}
                          {workerProfile.availability ? "Now" : "Soon"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs section */}
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
                  Work Experiences
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                {/* About section */}
                <Card className="pt-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 py-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>About</CardTitle>
                      <Button size="sm" variant="ghost" className="h-8 gap-1">
                        <PencilIcon className="h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-line text-gray-700">
                      {workerProfile.description}
                    </div>
                  </CardContent>
                </Card>

                {/* Skills section */}
                <Card className="pt-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100/50 py-3">
                    <div className="flex items-center justify-between">
                      <CardTitle>Skills</CardTitle>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 gap-1"
                        onClick={() => openModal(ModalType.EDIT_SKILLS, workerProfile)}
                      >
                        <PencilIcon className="h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {workerProfile.skills.map((skill: string) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 border-blue-200"
                        >
                          {skill.replace(/_/g, " ")}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education & Certifications */}
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Education */}
                  <Card className="pt-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100/50 py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <GraduationCap className="mr-2 h-5 w-5 text-cyan-600" />
                          Education
                        </CardTitle>
                        <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={() => openModal(ModalType.EDIT_EDUCATION, workerProfile)}>
                          <PencilIcon className="h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {workerProfile.education.map((edu, index: number) => (
                          <div
                            key={index}
                            className={index > 0 ? "border-t pt-4" : ""}
                          >
                            <h4 className="font-medium">{edu.school}</h4>
                            <p className="text-gray-600">
                              {edu.degree} in {edu.fieldOfStudy}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(edu.startDate).getFullYear()} -{" "}
                              {edu.currentlyStudying
                                ? "Present"
                                : new Date(edu.endDate).getFullYear()}
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                              {edu.description}
                            </p>
                          </div>
                        ))}
                        {/* <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 gap-1"
                        >
                          <PlusCircle className="h-4 w-4" />
                          Add Education
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card className="pt-0 overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center">
                          <Award className="mr-2 h-5 w-5 text-purple-600" />
                          Certifications
                        </CardTitle>
                        <Button size="sm" variant="ghost" className="h-8 gap-1">
                          <PencilIcon className="h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-center py-8 text-gray-500">
                          <Award className="mx-auto h-12 w-12 mb-4" />
                          <p>Certifications coming soon!</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Languages */}
                <Card className="pt-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 py-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-green-600" />
                        Languages
                      </CardTitle>
                      <Button size="sm" variant="ghost" className="h-8 gap-1">
                        <PencilIcon className="h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {workerProfile.languages.map((language) => (
                        <div
                          key={language.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <span className="font-medium">
                              {language.language.charAt(0) +
                                language.language.slice(1).toLowerCase()}
                              :
                            </span>
                            <span className="ml-2 text-gray-600">
                              {language.proficiency.charAt(0) +
                                language.proficiency.slice(1).toLowerCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 gap-1"
                      >
                        <PlusCircle className="h-4 w-4" />
                        Add Language
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Work History Tab */}
              <TabsContent value="work" className="space-y-6">
                <Card className="pt-0 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/50 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Work History</CardTitle>
                        <CardDescription>
                          Completed {workerProfile.completedJobs} jobs
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="gap-1"
                          onClick={() => openModal(ModalType.EDIT_EXPERIENCE, workerProfile)}
                        >
                          <PencilIcon className="h-4 w-4" />
                          Edit Experience
                        </Button>
                        {/* <Button size="sm" variant="outline" className="gap-1">
                          <PlusCircle className="h-4 w-4" />
                          Add Portfolio Item
                        </Button> */}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {workerProfile.experience.map((work, index) => (
                        <div
                          key={index}
                          className={index > 0 ? "border-t pt-6" : ""}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {work.title}
                              </h3>
                              <p className="text-gray-600">{work.company}</p>
                              <p className="text-sm text-gray-500">
                                {work.city}, {work.state}, {work.country}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  {new Date(work.startDate).getFullYear()} -{" "}
                                  {work.currentlyWorking
                                    ? "Present"
                                    : new Date(work.endDate).getFullYear()}
                                </p>
                              </div>
                              <Button size="sm" variant="ghost" className="h-8">
                                <PencilIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="mt-3 text-gray-700">
                            {work.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile settings card */}
            <div className="sticky top-24 rounded-lg border bg-gradient-to-b from-white to-blue-50 p-6 shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-lg"></div>
              <div className="mb-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${workerProfile.hourlyRate}
                </div>
                <div className="text-gray-600">per hour</div>
                {/* <Button size="sm" variant="ghost" className="mt-1 h-8 gap-1">
                  <PencilIcon className="h-3 w-3" />
                  Edit Rate
                </Button> */}
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">
                      {workerProfile.availability
                        ? "Available Now"
                        : "Not Available"}
                    </span>
                    {/* <Button size="icon" variant="ghost" className="h-6 w-6">
                      <PencilIcon className="h-3 w-3" />
                    </Button> */}
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium">
                    {new Date(workerDetail.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                size="lg"
                onClick={handleEditProfile}
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Edit Full Profile
              </Button>
              {/* <Button variant="outline" className="mt-3 w-full">
                <Settings className="mr-2 h-4 w-4" />
                Profile Settings
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
