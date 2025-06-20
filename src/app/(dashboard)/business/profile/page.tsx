"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useGetCurrentBusinessProfileDetails } from "@/hook/user/user.hooks";
import { BusinessProfileSkeleton } from "./_components/business-profile-skeleton";
import { useRouter } from "next/navigation";
import { useListMyJobs } from "@/hook/jobs/jobs.hooks";
import { ChangeBusinessProfilePictureModal } from "@/components/modals/change-business-profile-picture-modal";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function BusinessProfilePage() {
  const { data: businessProfileData, isLoading } =
    useGetCurrentBusinessProfileDetails();

  const { data: jobs, isLoading: isJobsLoading } = useListMyJobs();

  const { openModal } = useModalStore();
  const router = useRouter();

  const handlePageChange = async (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading && !businessProfileData && isJobsLoading) {
    return <BusinessProfileSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ChangeBusinessProfilePictureModal />
      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}

        <div className="space-y-8 md:col-span-2">
          <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border">
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
                            profilePicture: businessProfileData?.businessProfile?.profilePicture
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
                        <span>
                          {businessProfileData?.businessProfile.industry}
                        </span>
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          Est.{" "}
                          {businessProfileData?.businessProfile.yearFounded}
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
          {/* About */}
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

          <Separator />

          {/* Tabs for different sections */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Recent Job Postings</h3>
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
                  <div key={job.id} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Posted {job.createdAt}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge variant="outline">{job.jobType}</Badge>
                            {job.jobType === "SALARY" && (
                              <Badge variant="outline">
                                {job.salary}€/year
                              </Badge>
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
                        variant="link"
                        size="sm"
                        onClick={() => router.push(`/business/jobs/${job.id}`)}
                      >
                        View Details
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
                        handlePageChange(
                          (jobs?.pagination?.currentPage ?? 1) - 1
                        )
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
                        handlePageChange(
                          (jobs?.pagination?.currentPage ?? 1) + 1
                        )
                      }
                      disabled={!jobs?.pagination?.hasMore}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Page {jobs?.pagination?.currentPage} of{" "}
                    {jobs?.pagination?.totalPages} •{" "}
                    {jobs?.pagination?.totalCount} total jobs
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">No job postings yet.</p>
          )}
        </div>

        <div className="space-y-6 md:order-2">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Business Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Company Size</p>
                    <p className="text-sm text-muted-foreground">
                      {businessProfileData?.businessProfile.employeeCount}{" "}
                      employees
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Year Founded</p>
                    <p className="text-sm text-muted-foreground">
                      {businessProfileData?.businessProfile.yearFounded}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Jobs Posted</p>
                    <p className="text-sm text-muted-foreground">
                      {businessProfileData?.businessProfile.postedJobs} jobs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(
                        businessProfileData?.businessProfile?.createdAt ?? ""
                      ).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="mb-3 font-medium">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{businessProfileData?.email}</span>
                  </div>
                  {businessProfileData?.businessProfile.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={businessProfileData?.businessProfile.website}
                        className="text-primary hover:underline"
                      >
                        {businessProfileData?.businessProfile.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>Contact for phone number</span>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">Business Owner</h3>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium">
                      {businessProfileData?.firstName}{" "}
                      {businessProfileData?.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {businessProfileData?.role
                        ? businessProfileData.role.charAt(0) +
                          businessProfileData.role.slice(1).toLowerCase()
                        : "Owner"}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Company Images</h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => openModal(ModalType.MANAGE_COMPANY_IMAGES, {
                      assets: businessProfileData?.businessProfile?.assets || []
                    })}>
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
            <div className="grid grid-cols-2 gap-3">
              {businessProfileData?.businessProfile?.assets?.length ? (
                businessProfileData.businessProfile.assets.length > 4 ? (
                  <>
                    {businessProfileData.businessProfile.assets.slice(0, 3).map((asset, index) => (
                      <div
                        key={index}
                        onClick={() => openModal(ModalType.IMAGE_CAROUSEL, {
                          images: businessProfileData.businessProfile.assets,
                          startIndex: index
                        })}
                        className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
                      >
                        <img
                          src={asset.url}
                          alt={`Company image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    ))}
                    <div 
                      onClick={() => openModal(ModalType.IMAGE_CAROUSEL, {
                        images: businessProfileData.businessProfile.assets,
                        startIndex: 0
                      })}
                      className="relative aspect-square overflow-hidden rounded-md group cursor-pointer bg-black/10 flex items-center justify-center"
                    >
                      <div className="text-center">
                        <Eye className="h-6 w-6 mx-auto text-muted-foreground" />
                        <span className="text-sm mt-2 block text-muted-foreground">
                          +{businessProfileData.businessProfile.assets.length - 3} more
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  businessProfileData.businessProfile.assets.map((asset, index) => (
                    <div
                      key={index}
                      onClick={() => openModal(ModalType.IMAGE_CAROUSEL, {
                        images: businessProfileData.businessProfile.assets,
                        startIndex: index
                      })}
                      className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
                    >
                      <img
                        src={asset.url}
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
                <p className="col-span-2 text-center text-muted-foreground">
                  No company images uploaded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
