"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Calendar,
  Clock,
  Edit,
  FileText,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Users,
  Briefcase,
  Camera,
  Eye,
  ChevronRight,
  ChevronLeft,
  ImagePlus,
  User,
  BarChart3,
} from "lucide-react";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useGetCurrentBusinessProfileDetails } from "@/hook/user/user.hooks";
import { BusinessProfileSkeleton } from "./_components/skeleton";
import { useRouter, useSearchParams } from "next/navigation";
import { useListMyJobs } from "@/hook/jobs/jobs.hooks";
import { ChangeBusinessProfilePictureModal } from "@/components/modals/change-business-profile-picture-modal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type TabType = "general" | "contact" | "stats" | "jobs";

const sidebarItems = [
  {
    id: "general" as TabType,
    label: "General Details",
    icon: "/infoBusiness.svg",
    description: "Basic company information",
  },
  {
    id: "contact" as TabType,
    label: "Contact Information",
    icon: "/contactInfo.svg",
    description: "Contact details and website",
  },
  {
    id: "stats" as TabType,
    label: "Statistics",
    icon: "/static.svg",
    description: "Company metrics and data",
  },
  {
    id: "jobs" as TabType,
    label: "Job Postings",
    icon: "/jobPost.svg",
    description: "Manage job listings",
  },
];

export default function BusinessProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = (searchParams.get("tab") as TabType) || "general";

  const { data: businessProfileData, isLoading } =
    useGetCurrentBusinessProfileDetails();

  const { data: jobs, isLoading: isJobsLoading } = useListMyJobs();

  const { openModal } = useModalStore();

  const handleTabChange = (tab: TabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading && !businessProfileData && isJobsLoading) {
    return <BusinessProfileSkeleton />;
  }

  const renderGeneralDetails = () => (
    <div className="space-y-6">
    {/* About Section */}
    <Card>
      <CardHeader className="px-0">
        <div className="flex items-center justify-between px-6 pb-4">
          <CardTitle className="text-lg font-semibold text-nixerly-blue">About Us</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    openModal(ModalType.EDIT_BUSINESS_ABOUT, {
                      description: businessProfileData?.businessProfile.description,
                    })
                  }
                  className="text-nixerly-businesslabel border-nixerly-bussinessborder hover:bg-gray-50 rounded-full"
                >
                 <Image src="/editPara.svg" alt="image" width={14} height={14} />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your business description</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator/>
      </CardHeader>
      <CardContent>
        <p className="text-nixerly-businesslabel leading-relaxed">
          {businessProfileData?.businessProfile.description}
        </p>
      </CardContent>
    </Card>

    {/* Company Images */}
    <Card className="">
      <CardHeader className="px-0">
        <div className="flex items-center justify-between px-6 pb-4">
          <CardTitle className="text-lg font-semibold text-nixerly-blue">Company Images</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    openModal(ModalType.MANAGE_COMPANY_IMAGES, {
                      assets: businessProfileData?.businessProfile?.assets || [],
                    })
                  }
                  className="text-nixerly-businesslabel rounded-full border-nixerly-bussinessborder"
                >
                  <Image src="/editImage.svg" alt="image" width={14} height={14} />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload and manage your company images</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator/>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {businessProfileData?.businessProfile?.assets?.length ? (
            businessProfileData.businessProfile.assets.length > 6 ? (
              <>
                {businessProfileData.businessProfile.assets
                  .slice(0, 5)
                  .map((asset, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        openModal(ModalType.IMAGE_CAROUSEL, {
                          images: businessProfileData.businessProfile.assets,
                          startIndex: index,
                        })
                      }
                      className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer shadow-sm border border-gray-200"
                    >
                      <img
                        src={asset.url || "/placeholder.svg"}
                        alt={`Company image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  ))}
                <div
                  onClick={() =>
                    openModal(ModalType.IMAGE_CAROUSEL, {
                      images: businessProfileData.businessProfile.assets,
                      startIndex: 0,
                    })
                  }
                  className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm"
                >
                  <div className="text-center">
                    <Eye className="h-6 w-6 mx-auto text-gray-500" />
                    <span className="text-sm mt-2 block text-gray-500">
                      +{businessProfileData.businessProfile.assets.length - 5} more
                    </span>
                  </div>
                </div>
              </>
            ) : (
              businessProfileData.businessProfile.assets.map((asset, index) => (
                <div
                  key={index}
                  onClick={() =>
                    openModal(ModalType.IMAGE_CAROUSEL, {
                      images: businessProfileData.businessProfile.assets,
                      startIndex: index,
                    })
                  }
                  className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer shadow-sm border border-gray-200"
                >
                  <img
                    src={asset.url || "/placeholder.svg"}
                    alt={`Company image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                </div>
              ))
            )
          ) : (
            <p className="col-span-2 md:col-span-4 text-center text-gray-500 py-12">
              No company images uploaded yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-6">
    {/* Contact Information Section */}
    <Card className="border-nixerly-businessborder">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl font-semibold text-nixerly-blue">Contact Information</CardTitle>
        <Button variant="outline" size="sm" className="text-muted-foreground hover:text-foreground border border-nixerly-bussinessborder rounded-full p-4">
          <Image src="/editPara.svg" alt="hello" width={14} height={14}/>
          Edit
        </Button>
      </CardHeader>
      <Separator/>
      <CardContent className="space-y-4">
        {/* Email Address */}
        <div>
          <label className="text-sm font-medium text-nixerly-businesslabel mb-2 block">Email Address</label>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-nixerly-bussinessborder">
            <span className="text-sm text-muted-foreground">{businessProfileData?.email || "test@gmail.com"}</span>
          </div>
        </div>

        {/* Website */}
        {businessProfileData?.businessProfile.website && (
          <div>
            <label className="text-sm font-medium text-nixerly-businesslabel mb-2 block">Website</label>
            <div className="flex items-center gap-3 p-3 rounded-lg border border-nixerly-bussinessborder">
              <a
                href={businessProfileData.businessProfile.website}
                className="text-sm text-muted-foreground hover:underline truncate"
                target="_blank"
                rel="noopener noreferrer"
              >
                {businessProfileData.businessProfile.website}
              </a>
            </div>
          </div>
        )}

        {/* Phone Number */}
        <div>
          <label className="text-sm font-medium text-nixerly-businesslabel mb-2 block">Phone Number</label>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-nixerly-bussinessborder">
            <span className="text-sm text-muted-foreground">Contact for phone number</span>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium text-nixerly-businesslabel mb-2 block">Location</label>
          <div className="flex items-center gap-3 p-3 rounded-lg border border-nixerly-bussinessborder">
            <span className="text-sm text-muted-foreground">
              {businessProfileData?.businessProfile.city}, {businessProfileData?.businessProfile.state},{" "}
              {businessProfileData?.businessProfile.country}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Business Owner Section */}
    <Card className="border-nixerly-businessborder">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-nixerly-blue">Business Owner</CardTitle>
        <Button variant="outline" size="sm" className="text-muted-foreground hover:text-foreground border border-nixerly-bussinessborder rounded-full p-4">
          <Image src="/editPara.svg" alt="hello" width={14} height={14}/>
          Edit
        </Button>
      </CardHeader>
      <Separator/>
      <CardContent>
        <div>
          <label className="text-sm font-medium text-nixerly-businesslabel mb-2 block">Business Owner</label>
          <div className="flex items-center gap-4 p-3 rounded-lg border border-nixerly-bussinessborder">
            <div>
              <p className="text-sm text-muted-foreground">
                {businessProfileData?.firstName} {businessProfileData?.lastName}
              </p>
              <p className="text-lg text-muted-foreground ">
                {businessProfileData?.role
                  ? businessProfileData.role.charAt(0) + businessProfileData.role.slice(1).toLowerCase()
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  );

  const renderStats = () => (
    <div className="space-y-8">
    {/* Stats Cards with Blue Container */}
    <div className="bg-nixerly-blue rounded-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#996CFF] rounded-lg">
                <Image src="/employe.svg" alt="employe" width={22} height={16}/>
              </div>
              <div className="space-y-2.5">
                <p className="text-2xl font-bold leading-10">
                  {businessProfileData?.businessProfile.employeeCount}
                </p>
                <p className="text-base font-medium leading-4 text-muted-foreground">Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#FEC960] rounded-lg">
              <Image src="/calender.svg" alt="employe" width={22} height={16}/>
              </div>
              <div className="space-y-2.5">
                <p className="text-2xl font-bold leading-10">
                  {new Date().getFullYear() - (businessProfileData?.businessProfile.yearFounded || 0)}
                </p>
                <p className="text-base font-medium leading-4 text-muted-foreground">Years Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#55C8FF] rounded-lg">
              <Image src="/jobs.svg" alt="employe" width={22} height={16}/>
              </div>
              <div className="space-y-2.5">
                <p className="text-2xl font-bold leading-10">{businessProfileData?.businessProfile.postedJobs}</p>
                <p className="text-base font-medium leading-4 text-muted-foreground">Jobs Posted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#56A2F2] rounded-lg">
              <Image src="/clock.svg" alt="employe" width={22} height={16}/>
              </div>
              <div className="space-y-2.5">
                <p className="text-2xl font-bold leading-10">
                  {new Date(businessProfileData?.businessProfile?.createdAt ?? "").toLocaleDateString(undefined, {
                    year: "numeric",
                  })}
                </p>
                <p className="text-base font-medium leading-4 text-muted-foreground">Member Since</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    {/* Company Overview Section */}
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-nixerly-blue">Company Overview</CardTitle>
      </CardHeader>
      <Separator/>
      <CardContent className="pt-0 py-0">
        <div className="">
          <p className="font-medium text-lg leading-7 mb-4">Company Overview</p>
        <div className="flex justify-between px-5">
            <h3 className="text-lg font-normal text-muted-foreground mb-2">Industry</h3>
            <p className="text-lg font-medium capitalize">{businessProfileData?.businessProfile.industry}</p>
          </div>
          <div  className="flex justify-between px-5">
            <h3 className="text-lg font-normal text-muted-foreground mb-2">Founded</h3>
            <p className="text-blue-600 text-lg font-medium ">{businessProfileData?.businessProfile.yearFounded}</p>
          </div>

          <div  className="flex justify-between px-5">
            <h3 className="text-lg normal text-muted-foreground mb-2">Company Size</h3>
            <p className="text-lg font-medium">{businessProfileData?.businessProfile.employeeCount} employees</p>
          </div>

          <div  className="flex justify-between px-5">
            <h3 className="text-lg font-normal text-muted-foreground mb-2">Location</h3>
            <p className="text-lg font-medium">
              {businessProfileData?.businessProfile.city}, {businessProfileData?.businessProfile.country}
            </p>
          </div>
        </div>
      </CardContent>
      <Separator/>
    </Card>
  </div>
  );

  const renderJobs = () => (
    <div className="space-y-8 ">
      <Card>
        <CardContent className="px-0">
          <div className="flex items-center justify-between p-5">
            <h2 className="text-xl font-semibold lead-5 text-nixerly-blue">Job Postings</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="rounded-full" onClick={() => router.push("/business/post-a-job")}> 
                    <Image src="/editPara.svg" alt="edit" width={14} height={14}/>
                    Post New Job
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Create a new job posting</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Separator/>

          {(jobs?.jobs?.length ?? 0) > 0 ? (
            <>
              <div className="space-y-4">
                {jobs?.jobs?.map((job) => (
                  <div
                    key={job.id}
                    className="p-6"
                  >
                    <div className="flex items-start justify-between pb-5">
                      <div className="flex items-start gap-4">
                        <div>
                          <h4 className="font-medium text-base leading-5 tracking-wide">{job.title}</h4>
                          <p className="text-[9px] text-muted-foreground mb-3 tracking-wide">
                            POSTED {job.createdAt}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{job.jobType}</Badge>
                            {job.jobType === "SALARY" && (
                              <Badge variant="outline">{job.salary}€/year</Badge>
                            )}
                            {job.jobType === "CONTRACT" && (
                              <Badge variant="outline">{job.budget}€</Badge>
                            )}
                            {job.jobType === "HOURLY" && (
                              <Badge variant="outline">
                                {job.hourlyRateMin}€-{job.hourlyRateMax}€/hr
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm font-normal leading-4 mt-3">{job.description}</p>
                        </div>
                      </div>
                      <button
                      className=" flex items-center cursor-pointer"
                        onClick={() => router.push(`/business/jobs/${job.id}`)}
                      >
                      <span className="border-b whitespace-nowrap">View Details</span>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                    <Separator/>
                  </div>
                ))}
              </div>

              {(jobs?.pagination?.totalCount ?? 0) > 10 && (
                <div className="flex flex-col items-center justify-center gap-4 mt-8 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handlePageChange((jobs?.pagination?.currentPage ?? 1) - 1)
                      }
                      disabled={jobs?.pagination?.currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from(
                        { length: jobs?.pagination?.totalPages ?? 0 },
                        (_, i) => i + 1
                      ).map((pageNum) => (
                        <Button
                          key={pageNum}
                          variant={
                            pageNum === (jobs?.pagination?.currentPage ?? 1)
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handlePageChange((jobs?.pagination?.currentPage ?? 1) + 1)
                      }
                      disabled={!jobs?.pagination?.hasMore}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Page {jobs?.pagination?.currentPage} of{" "}
                    {jobs?.pagination?.totalPages} • {jobs?.pagination?.totalCount}{" "}
                    total jobs
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No job postings yet</p>
              <p className="text-muted-foreground mb-4">
                Start by creating your first job posting to attract talent.
              </p>
              <Button onClick={() => router.push("/business/post-a-job")}> 
                <Pencil className="mr-2 h-4 w-4" />
                Post Your First Job
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralDetails();
      case "contact":
        return renderContactInfo();
      case "stats":
        return renderStats();
      case "jobs":
        return renderJobs();
      default:
        return renderGeneralDetails();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ChangeBusinessProfilePictureModal />

      {/* Profile Banner - Full Width at Top */}
      <div className="mx-auto pb-10">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-semibold text-[#525866] leading-8">My Profile</h1>
          <p className="text-gray-600">Welcome back, {businessProfileData?.businessProfile?.companyName}!</p>
        </div>

        {/* Profile Card */}
        <div
          className="relative bg-[#1E64D31A] overflow-hidden rounded-xl border custom-gradient-right"
        >
          {/* Overlay if any */}
          <div className="absolute top-4 right-4 z-20">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="border border-nixerly-bussinessborder rounded-full"
                    onClick={() =>
                      openModal(
                        ModalType.EDIT_BUSINESS_PROFILE,
                        businessProfileData?.businessProfile as unknown as {
                          [key: string]: unknown
                        },
                      )
                    }
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit your business profile details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="relative p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              {/* Left side - Profile info */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
                {/* Profile Picture */}
                <div className="relative h-24 w-24 overflow-visible md:h-32 md:w-32">
                  {businessProfileData?.businessProfile?.profilePicture ? (
                    <img
                      src={businessProfileData?.businessProfile?.profilePicture || "/placeholder.svg"}
                      alt={businessProfileData?.businessProfile.companyName || ""}
                      className="h-full w-full object-cover rounded-full border-1 border-blue-400"
                    />
                  ) : (
                    <img
                      src="/placeholder.svg?height=128&width=128"
                      alt={businessProfileData?.businessProfile.companyName || ""}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() =>
                            openModal(ModalType.CHANGE_BUSINESS_PROFILE_PICTURE, {
                              profilePicture: businessProfileData?.businessProfile?.profilePicture,
                            })
                          }
                          className="absolute bottom-0 right-0 rounded-full bg-white p-2 text-nixerly-businesslabel shadow-lg border border-nixerly-blue"
                          aria-label="Change profile picture"
                        >
                          <Camera className="h-5 w-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Update your company profile picture</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Company Details */}
                <div className="flex-1">
                  <h2 className="text-3xl font-medium text-nixerly-blue leading-5 tracking-wide ">
                    {businessProfileData?.businessProfile.companyName}
                  </h2>
                  <div className="mt-2 flex flex-col flex-wrapr text-base font-medium text-nixerly-blue leading-5 tracking-wide">
                    <span className="flex items-center gap-1">
                      <span className="text-base font-medium">
                        {businessProfileData?.businessProfile.city}, {businessProfileData?.businessProfile.state},{" "}
                        {businessProfileData?.businessProfile.country}
                      </span>
                    </span>
                    <span className="text-base font-medium">
                      <span>{businessProfileData?.businessProfile.industry}</span>
                    </span>
                    {/* <span className="flex items-center gap-1">
                      <span>Est. {businessProfileData?.businessProfile.yearFounded}</span>
                    </span> */}
                  </div>
                </div>

              {/* Right side - Edit Button */}
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Sidebar and Content Layout */}
    <div className="grid gap-8 lg:grid-cols-4">
      {/* Simple Sidebar */}
      <div className="lg:col-span-1 bg-[#F5F7FA] rounded-xl">
        <div className="px-8">
          <nav className="space-y-1">
            <p className="text-nixerly-businesslabel px-3 py-6 text-base font-medium">Profile Details</p>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors",
                    isActive
                      ? "bg-white text-nixerly-blue"
                      : "hover:bg-white text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "h-8 w-8 flex items-center justify-center rounded-md transition-colors",
                      isActive ? "bg-nixerly-blue text-white border-nixerly-blue" : "bg-white"
                    )}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={18}
                      height={18}
                      className={isActive ? "filter invert brightness-0" : ""}
                    />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.label}</p>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="min-h-[600px]">{renderContent()}</div>
      </div>
    </div>
  </div>
  );
}
