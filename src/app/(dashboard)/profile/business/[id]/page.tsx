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
} from "lucide-react";
import Image from "next/image";
import { BusinessProfileSkeleton } from "@/app/(dashboard)/business/profile/_components/skeleton";
import { useGetBusinessById } from "@/hook/business/business.hook";
import { useParams } from "next/navigation";
import { TJob } from "@/types/auth";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";

export default function BusinessProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { data: businessProfileData, isLoading } = useGetBusinessById(id);
  const { openModal } = useModalStore();

  if (isLoading && !businessProfileData) {
    return <BusinessProfileSkeleton />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-8 md:col-span-2">
          <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
              <div className="relative h-24 w-24 overflow-hidden rounded-xl border-4 border-white bg-white shadow-sm md:h-32 md:w-32">
                {businessProfileData?.logoUrl ? (
                  <Image
                    src={businessProfileData?.logoUrl || "/placeholder.svg"}
                    alt={businessProfileData?.companyName || ""}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt={businessProfileData?.companyName || ""}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h1 className="text-3xl font-bold">
                      {businessProfileData?.companyName}
                    </h1>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {businessProfileData?.city},{" "}
                          {businessProfileData?.state},{" "}
                          {businessProfileData?.country}
                        </span>
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>{businessProfileData?.industry}</span>
                      </span>
                      <span className="hidden md:inline">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Est. {businessProfileData?.yearFounded}</span>
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Licensed Plumber
                      </Badge>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                        Certified Contractor
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                        Insured Business
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        openModal(ModalType.REPORT_BUSINESS_MODAL, {
                          targetId: id,
                          targetName: businessProfileData?.companyName,
                        });
                      }}
                    >
                      <Flag className="h-5 w-5" />
                      <span className="sr-only">Report business</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* About */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">About</h2>
            </div>
            <p className="text-muted-foreground">
              {businessProfileData?.description}
            </p>
          </section>

          <Separator />

          {/* Tabs for different sections */}
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="jobs">Job Postings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="services" className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Services Offered</h3>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Plumbing Installation</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete installation services for residential and
                    commercial properties, including pipes, fixtures, and
                    appliances.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Leak Repairs</h4>
                  <p className="text-sm text-muted-foreground">
                    Fast and reliable leak detection and repair services to
                    prevent water damage and conserve water.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Bathroom Remodeling</h4>
                  <p className="text-sm text-muted-foreground">
                    Complete bathroom renovation services, from fixture
                    replacement to full remodels.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Emergency Services</h4>
                  <p className="text-sm text-muted-foreground">
                    24/7 emergency plumbing services for urgent issues like
                    burst pipes and major leaks.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="jobs" className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Recent Job Postings</h3>
              </div>

              {(businessProfileData?.jobs?.length ?? 0) > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {businessProfileData?.jobs.map((job: TJob) => (
                    <div key={job.id} className="rounded-lg border p-4">
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

            <TabsContent value="reviews" className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
              </div>
              <div className="rounded-lg border p-6 text-center">
                <p className="text-muted-foreground">No reviews yet.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reviews from your customers will appear here once they&apos;re
                  submitted.
                </p>
              </div>
            </TabsContent>
          </Tabs>
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
                      {businessProfileData?.employeeCount} employees
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Year Founded</p>
                    <p className="text-sm text-muted-foreground">
                      {businessProfileData?.yearFounded}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Jobs Posted</p>
                    <p className="text-sm text-muted-foreground">
                      {businessProfileData?.postedJobs} jobs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Member Since</p>
                    <p className="text-sm text-muted-foreground">
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

              <Separator className="my-4" />

              <div>
                <h3 className="mb-3 font-medium">Contact Information</h3>
                <div className="space-y-2 text-sm">
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
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="/placeholder.svg?height=48&width=48"
                      alt={`${businessProfileData?.user?.firstName} ${businessProfileData?.user?.lastName}`}
                    />
                    <AvatarFallback>{`${businessProfileData?.user?.firstName?.charAt(
                      0
                    )}${businessProfileData?.user?.lastName?.charAt(
                      0
                    )}`}</AvatarFallback>
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
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Company Images</h2>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-md group cursor-pointer"
                >
                  <Image
                    src={`/placeholder.svg?height=150&width=150&text=Image ${index}`}
                    alt={`Company image ${index}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
