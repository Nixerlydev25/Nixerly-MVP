"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Calendar,
  Clock,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
  Briefcase,
  Eye,
  Flag,
  Camera,
  X,
} from "lucide-react";
import Image from "next/image";
import { BusinessProfileSkeleton } from "@/app/(dashboard)/business/profile/_components/skeleton";
import { useGetBusinessById } from "@/hook/business/business.hook";
import { useParams } from "next/navigation";
import { TJob } from "@/types/auth";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useState } from "react";

export default function BusinessProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: businessProfileData, isLoading } = useGetBusinessById(id);
  const { openModal } = useModalStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const businessProfile = businessProfileData as typeof businessProfileData & {
    profilePicture?: { url?: string };
    assets?: { id: string; url: string }[];
  };

  console.log('businessProfileData:', businessProfileData);

  if (isLoading && !businessProfileData) {
    return <BusinessProfileSkeleton />;
  }

  const maxVisible = 4;
  const images = businessProfile.assets || [];
  const showMore = images.length > maxVisible;
  const visibleImages = showMore ? images.slice(0, maxVisible) : images;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative bg-[#1E64D3] overflow-hidden rounded-xl border custom-gradient-right h-52">
        <div className="flex flex-col gap-3 md:flex-row md:items-center p-4 text-white">
          <div className="relative h-24 w-24 overflow-hidden rounded-xl shadow-sm md:h-32 md:w-32 mt-6">
            {businessProfile?.profilePicture?.url ? (
              <Image
                src={businessProfile.profilePicture.url}
                alt={businessProfile?.companyName || ""}
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt={businessProfile?.companyName || ""}
                width={128}
                height={128}
                className="object-cover"
              />
            )}
          </div>
          <div>
              {/* Camera icon button at bottom right */}
              <button
              className="absolute bottom-7 left-29  rounded-full bg-white p-2 text-nixerly-businesslabel"
              aria-label="Change profile picture"
            >
              {/* Import and use Camera icon as in worker profile */}
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h1 className="text-3xl medium leading-10 text-white-white">
                  {businessProfileData?.companyName}
                </h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Image src="/mapPin.svg" alt="location" width={14} height={14} />
                    <span>
                      {businessProfileData?.city},{" "}
                      {businessProfileData?.state},{" "}
                      {businessProfileData?.country}
                    </span>
                  </span>

                  {/* <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Est. {businessProfileData?.yearFounded}</span>
                      </span> */}
                </div>
                <div>
                  <span className="flex items-center gap-1">
                    <Image src="/buildwhite.svg" alt="build" width={16} height={16} />
                    <span>{businessProfileData?.industry}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="text-nixerly-businesslabel rounded-full border-none"
                  onClick={() => {
                    openModal(ModalType.REPORT_BUSINESS_MODAL, {
                      targetId: id,
                      targetName: businessProfileData?.companyName,
                    });
                  }}
                >
                  <Image src="/flag.svg" alt="flag.svg" width={14} height={14} />
                  {/* <span className="sr-only">Report business</span> */}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-3 pt-10">
        {/* Main Content */}
        <div className="space-y-8 md:col-span-2 pb">
          {/* About */}
          <section className="border rounded-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold p-4 text-nixerly-blue">About Us</h2>
            </div>
            {/* <Separator /> */}
            <p className="px-4 py-6">
              {businessProfileData?.description}
            </p>
          </section>

          {/* <Separator /> */}

          {/* Tabs for different sections */}
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3 pb-10">
              <TabsTrigger value="services" className="text-base font-medium leading-5">Services</TabsTrigger>
              <TabsTrigger value="jobs" className="text-base font-medium leading-5">Job Postings</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base font-medium leading-5">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="services" className="border rounded-2xl">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-base font-semibold text-nixerly-blue leading-5">Services Offered</h3>
              </div>
              <Separator />
              <div className="space-y-4 p-4 mx-auto w-full flex flex-col justify-center items-center text-center min-h-[50vh]">
                <Image src="/comingSoon.svg" alt="coon" width={128} height={128} />
                <h3 className="text-2xl font-medium leading-6">Reviews Coming Soon</h3>
                <p className="text-base font-normal leading-6 text-nixerly-businesslabel">
                  Services Details will be <br /> added very soon
                </p>
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="border rounded-2xl">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-base font-semibold text-nixerly-blue leading-5">Recent Job Postings</h3>
              </div>
              <Separator />
              {(businessProfileData?.jobs?.length ?? 0) > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {businessProfileData?.jobs.map((job: TJob) => (
                    <div key={job.id} className=" p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Posted 2 days ago
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="outline">
                                {job.employmentType}
                              </Badge>
                              <Badge variant="outline">
                                ${job.hourlyRateMin}-{job.hourlyRateMax}/hr
                              </Badge>
                              <Badge variant="outline">
                                {businessProfileData.city},{" "}
                                {businessProfileData.state}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No job postings yet.</p>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="border rounded-2xl">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-base font-semibold text-nixerly-blue leading-5">Customer Reviews</h3>
              </div>
              <Separator />
              <div className="space-y-4 p-4 mx-auto w-full flex flex-col justify-center items-center text-center min-h-[50vh]">
                <Image src="/comingSoon.svg" alt="coon" width={128} height={128} />
                <h3 className="text-2xl font-medium leading-6">Reviews Coming Soon</h3>
                <p className="text-base font-normal leading-6 text-nixerly-businesslabel">
                  Services Details will be <br /> added very soon
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* right side */}

        <div className="space-y-6 md:order-2">
          <div className="rounded-3xl border bg-card">
            <h2 className="text-base font-bold text-nixerly-blue leading-5 p-4">Business Information</h2>
            <Separator />
            <div className="space-y-4 ">
              <div className="grid grid-cols-2 gap-4 p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-nixerly-blue leading-5">Company Size</p>
                    <p className="text-xs font-normal leading-4">
                      {businessProfileData?.employeeCount} employees
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-nixerly-blue leading-5">Year Founded</p>
                    <p className="text-xs font-normal leading-4">
                      {businessProfileData?.yearFounded}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-nixerly-blue leading-5">Jobs Posted</p>
                    <p className="text-xs font-normal leading-4">
                      {businessProfileData?.postedJobs} jobs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-nixerly-blue leading-5">Member Since</p>
                    <p className="text-xs font-normal leading-4">
                      {new Date(
                        businessProfileData?.createdAt ?? ""
                      ).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-0 p-0" />

              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-medium">Business Owner</h3>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={businessProfile?.profilePicture?.url || "/placeholder.svg?height=48&width=48"}
                      alt={`${businessProfileData?.user?.firstName} ${businessProfileData?.user?.lastName}`}
                    />
                    <AvatarFallback>
                      {`${businessProfileData?.user?.firstName?.charAt(0) ?? ""}${businessProfileData?.user?.lastName?.charAt(0) ?? ""}`}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {businessProfileData?.user?.firstName}{" "}
                      {businessProfileData?.user?.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {businessProfileData?.user?.defaultProfile
                        ? businessProfileData.user.defaultProfile.charAt(0) +
                        businessProfileData.user.defaultProfile
                          .slice(1)
                          .toLowerCase()
                        : "Owner"}{" "}
                      Owner
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* contact Information */}

          <div className="rounded-3xl border bg-card">
            <h3 className="text-base font-bold leading-5 text-nixerly-blue p-4">Contact Information</h3>
            <Separator />
            <div className="space-y-2 text-sm p-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{businessProfileData?.user?.email}</span>
              </div>
              {businessProfileData?.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={businessProfileData?.website}
                    className="text-primary hover:underline"
                  >
                    {businessProfileData?.website}
                  </a>
                </div>
              )}
              {/* <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>Contact for phone number</span>
              </div> */}
            </div>
          </div>

          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Company Images</h2>
            <div className="grid grid-cols-2 gap-3">
              {visibleImages.map((asset, idx) => (
                <div
                  key={asset.id}
                  className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
                >
                  <Image
                    src={asset.url}
                    alt="Company asset"
                    fill
                    className="object-cover"
                  />
                  {/* Eye icon for preview */}
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => {
                      setSelectedImage(asset.url);
                      setModalOpen(true);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="View image"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setSelectedImage(asset.url);
                        setModalOpen(true);
                      }
                    }}
                  >
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  {/* Show +N more overlay on the last visible image if there are more */}
                  {showMore && idx === maxVisible - 1 && (
                    <div
                      className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        setSelectedImage(null); // null means show gallery
                        setModalOpen(true);
                      }}
                    >
                      <span className="text-white text-lg font-bold">
                        +{images.length - maxVisible} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Modal for image preview or gallery */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur">
              <div className="relative rounded-lg shadow-lg max-w-full max-h-full flex flex-col items-center">
                <button
                  className="absolute top-2 right-2 text-gray-700 hover:text-black bg-gray-100 rounded-full p-1"
                  onClick={() => {
                    setModalOpen(false);
                    setSelectedImage(null);
                  }}
                  aria-label="Close image preview"
                >
                  <X className="h-6 w-6" />
                </button>
                {selectedImage ? (
                  // Single image preview
                  <div className="flex items-center justify-center max-w-[80vw] max-h-[80vh]">
                    <Image
                      src={selectedImage}
                      alt="Preview"
                      width={600}
                      height={600}
                      className="object-contain max-w-full max-h-[70vh] rounded-lg"
                    />
                  </div>
                ) : (
                  // Gallery view
                  <div className="grid grid-cols-2 gap-3 p-4 max-w-[90vw] max-h-[80vh] overflow-y-auto">
                    {images.map((asset) => (
                      <div
                        key={asset.id}
                        className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
                        onClick={() => setSelectedImage(asset.url)}
                      >
                        <Image
                          src={asset.url}
                          alt="Company asset"
                          width={200}
                          height={200}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
