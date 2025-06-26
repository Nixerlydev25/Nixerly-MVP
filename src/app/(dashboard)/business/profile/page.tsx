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

type TabType = "general" | "contact" | "stats" | "jobs";

const sidebarItems = [
  {
    id: "general" as TabType,
    label: "General Details",
    icon: User,
    description: "Basic company information",
  },
  {
    id: "contact" as TabType,
    label: "Contact Information",
    icon: Mail,
    description: "Contact details and website",
  },
  {
    id: "stats" as TabType,
    label: "Statistics",
    icon: BarChart3,
    description: "Company metrics and data",
  },
  {
    id: "jobs" as TabType,
    label: "Job Postings",
    icon: Briefcase,
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
    <div className="space-y-8">
      {/* About Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">About</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    openModal(ModalType.EDIT_BUSINESS_ABOUT, {
                      description:
                        businessProfileData?.businessProfile.description,
                    })
                  }
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your business description</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-muted-foreground">
          {businessProfileData?.businessProfile.description}
        </p>
      </section>

      {/* Company Images */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Company Images</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() =>
                    openModal(ModalType.MANAGE_COMPANY_IMAGES, {
                      assets:
                        businessProfileData?.businessProfile?.assets || [],
                    })
                  }
                >
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Manage Images
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upload and manage your company images</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                      className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
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
                  className="relative aspect-square overflow-hidden rounded-md group cursor-pointer bg-black/10 flex items-center justify-center"
                >
                  <div className="text-center">
                    <Eye className="h-6 w-6 mx-auto text-muted-foreground" />
                    <span className="text-sm mt-2 block text-muted-foreground">
                      +{businessProfileData.businessProfile.assets.length - 5}{" "}
                      more
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
                  className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
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
            <p className="col-span-2 md:col-span-3 text-center text-muted-foreground py-8">
              No company images uploaded yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );

  const renderContactInfo = () => (
    <div className="space-y-8">
      <div className="rounded-lg border bg-card p-6 ">
        <h2 className="mb-6 text-xl font-semibold">Contact Information</h2>
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Email Address</p>
                <p className="text-sm text-muted-foreground">
                  {businessProfileData?.email}
                </p>
              </div>
            </div>

            {businessProfileData?.businessProfile.website && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Website</p>
                  <a
                    href={businessProfileData?.businessProfile.website}
                    className="text-sm text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {businessProfileData?.businessProfile.website}
                  </a>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Phone Number</p>
                <p className="text-sm text-muted-foreground">
                  Contact for phone number
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted-foreground">
                  {businessProfileData?.businessProfile.city},{" "}
                  {businessProfileData?.businessProfile.state},{" "}
                  {businessProfileData?.businessProfile.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold">Business Owner</h2>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="font-medium">
              {businessProfileData?.firstName} {businessProfileData?.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              {businessProfileData?.role
                ? businessProfileData.role.charAt(0) +
                  businessProfileData.role.slice(1).toLowerCase()
                : "Owner"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">
                {businessProfileData?.businessProfile.employeeCount}
              </p>
              <p className="text-sm text-muted-foreground">Employees</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">
                {new Date().getFullYear() -
                  (businessProfileData?.businessProfile.yearFounded || 0)}
              </p>
              <p className="text-sm text-muted-foreground">Years Active</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3">
            <Briefcase className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">
                {businessProfileData?.businessProfile.postedJobs}
              </p>
              <p className="text-sm text-muted-foreground">Jobs Posted</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">
                {new Date(
                  businessProfileData?.businessProfile?.createdAt ?? ""
                ).toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-muted-foreground">Member Since</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <h2 className="mb-6 text-xl font-semibold">Company Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Industry</h3>
            <p className="text-muted-foreground">
              {businessProfileData?.businessProfile.industry}
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Founded</h3>
            <p className="text-muted-foreground">
              {businessProfileData?.businessProfile.yearFounded}
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Company Size</h3>
            <p className="text-muted-foreground">
              {businessProfileData?.businessProfile.employeeCount} employees
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Location</h3>
            <p className="text-muted-foreground">
              {businessProfileData?.businessProfile.city},{" "}
              {businessProfileData?.businessProfile.state},{" "}
              {businessProfileData?.businessProfile.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobs = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Job Postings</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => router.push("/business/post-a-job")}>
                <Pencil className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new job posting</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {(jobs?.jobs?.length ?? 0) > 0 ? (
        <>
          <div className="space-y-4">
            {jobs?.jobs?.map((job) => (
              <div
                key={job.id}
                className="rounded-lg border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{job.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Posted {job.createdAt}
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
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/business/jobs/${job.id}`)}
                  >
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
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
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-6 shadow-sm border border-blue-100">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl border-4 border-white bg-white shadow-sm md:h-32 md:w-32">
            {businessProfileData?.businessProfile?.profilePicture ? (
              <img
                src={
                  businessProfileData?.businessProfile?.profilePicture ||
                  "/placeholder.svg"
                }
                alt={businessProfileData?.businessProfile.companyName || ""}
                className="object-cover w-full h-full"
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
                        profilePicture:
                          businessProfileData?.businessProfile?.profilePicture,
                      })
                    }
                    className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-primary-foreground shadow-sm"
                    aria-label="Change profile picture"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Update your company profile picture</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex-1">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h1 className="text-3xl font-bold">
                  {businessProfileData?.businessProfile.companyName}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {businessProfileData?.businessProfile.city},{" "}
                      {businessProfileData?.businessProfile.state},{" "}
                      {businessProfileData?.businessProfile.country}
                    </span>
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-4 w-4" />
                    <span>{businessProfileData?.businessProfile.industry}</span>
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Est. {businessProfileData?.businessProfile.yearFounded}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() =>
                          openModal(
                            ModalType.EDIT_BUSINESS_PROFILE,
                            businessProfileData?.businessProfile as unknown as {
                              [key: string]: unknown;
                            }
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
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar and Content Layout */}
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Simple Sidebar */}
        <div className="lg:col-span-1">
          <div className="border-r pr-6">
            <nav className="space-y-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors",
                      activeTab === item.id
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
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
