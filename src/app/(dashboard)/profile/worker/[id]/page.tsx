"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  ChevronLeft,
  Eye,
  Flag,
  Globe,
  GraduationCap,
  MapPin,
  Share2,
} from "lucide-react";
import { useGetWorkerById } from "@/hook/worker/worker.hook";
import { useParams } from "next/navigation";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useRouter } from "next/navigation";
import { FreelancerProfileSkeleton } from "./components/worker-profile-skeleton";

export default function FreelancerProfile() {
  const { id } = useParams<{ id: string }>();
  const { data: worker, isLoading } = useGetWorkerById(id);
  const { openModal } = useModalStore();
  const router = useRouter();

  if (isLoading) {
    return (
      <FreelancerProfileSkeleton />
    );
  }

  if (!worker) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Worker not found
      </div>
    );
  }

  // Format skills for display
  const formattedSkills =
    worker.skills?.map((skill: string) => {
      return skill
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (l: string) => l.toUpperCase());
    }) || [];

  // Format full name
  const fullName = `${worker.user?.firstName || ""} ${
    worker.user?.lastName || ""
  }`.trim();

  console.log(worker);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back to search results */}
        <div
          onClick={() => router.back()}
          className="mb-6 inline-flex cursor-pointer items-center text-sm font-medium text-blue-600"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div className="space-y-8">
            {/* Profile header */}
            <div className="relative rounded-lg border bg-white p-6 shadow-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-50 opacity-70"></div>
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <div className="relative">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex-shrink-0">
                    <div 
                      className="relative cursor-pointer group"
                      onClick={() => openModal(ModalType.IMAGE_CAROUSEL, {
                        images: [{url: worker.profilePicture || "/placeholder.svg"}],
                        startIndex: 0
                      })}
                    >
                      <Image
                        src={worker.profilePicture || "/placeholder.svg"}
                        width={120}
                        height={120}
                        alt={fullName}
                        className="rounded-full object-cover w-28 h-28"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 rounded-full">
                        <Eye className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                          {fullName}
                        </h1>
                        <p className="text-lg text-gray-600">{worker.title}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1 h-4 w-4" />
                          {worker.city}, {worker.state}, {worker.country}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            openModal(ModalType.SHARE_MODAL, {
                              profileUrl: "example.com",
                              profileName: fullName,
                            })
                          }
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            openModal(ModalType.REPORT_WORKER_MODAL, {
                              targetId: id,
                              targetName: fullName,
                            });
                          }}
                        >
                          <Flag className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs section */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="experiences">Experiences</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-8">
                {/* About section */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold  border-b pb-2">
                    About
                  </h3>
                  <div className="whitespace-pre-line text-gray-700 py-2">
                    {worker.description}
                  </div>
                </div>

                {/* Skills section */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold border-b pb-2">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2 py-2">
                    {formattedSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-200 border p-2"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="space-y-3">
                  <h3 className="flex items-center text-xl font-semibold text-green-700 border-b pb-2">
                    <Globe className="mr-2 h-5 w-5 text-green-600" />
                    Languages
                  </h3>
                  <div className="grid grid-cols-2 gap-3 py-2 sm:grid-cols-3">
                    {worker.languages?.map((language) => (
                      <div key={language.id} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <div>
                          <span className="font-medium">
                            {language.language.charAt(0) +
                              language.language.slice(1).toLowerCase()}
                            :
                          </span>
                          <span className="ml-1 text-gray-600">
                            {language.proficiency.charAt(0) +
                              language.proficiency.slice(1).toLowerCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h3 className="flex items-center text-xl font-semibold text-cyan-700 border-b pb-2">
                    <GraduationCap className="mr-2 h-5 w-5 text-cyan-600" />
                    Education
                  </h3>
                  <div className="space-y-6 py-2">
                    {worker.education?.length ? (
                      worker.education.map((edu) => (
                        <div
                          key={edu.id}
                          className="border-l-2 border-cyan-200 pl-4 py-1"
                        >
                          <h4 className="font-medium">{edu.school}</h4>
                          <p className="text-gray-600">
                            {edu.degree} in {edu.fieldOfStudy}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(edu.startDate).toLocaleDateString()} -
                            {edu.currentlyStudying
                              ? " Present"
                              : edu.endDate
                              ? ` ${new Date(edu.endDate).toLocaleDateString()}`
                              : ""}
                          </p>
                          <p className="mt-2 text-gray-700">
                            {edu.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No Education</p>
                    )}
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-3 mt-8">
                  <h3 className="flex items-center text-xl font-semibold text-purple-700 border-b pb-2">
                    <Award className="mr-2 h-5 w-5 text-purple-600" />
                    Certifications
                  </h3>
                  <div className="space-y-6 py-2">
                    {worker.certificates?.length ? (
                      worker.certificates.map((certificate) => (
                        <div
                          key={certificate.id}
                          className="border-l-2 border-purple-200 pl-4 py-1"
                        >
                          <div className="flex gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">
                                  {certificate.name}
                                </h4>
                                <Badge variant="ghost">
                                  {certificate.certificateType.replace(
                                    /_/g,
                                    " "
                                  )}
                                </Badge>
                              </div>
                              <p className="text-gray-600">
                                {certificate.issuingOrg}
                              </p>
                              <p className="text-sm text-gray-500">
                                Issued:{" "}
                                {new Date(
                                  certificate.issueDate
                                ).toLocaleDateString()}
                                {certificate.expiryDate &&
                                  ` • Expires: ${new Date(
                                    certificate.expiryDate
                                  ).toLocaleDateString()}`}
                              </p>
                              {certificate.credentialUrl && (
                                <a
                                  href={certificate.credentialUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:underline"
                                >
                                  View Credential
                                </a>
                              )}
                            </div>
                            <div className="w-24 h-24 flex-shrink-0">
                              {certificate.assets?.length > 0 ? (
                                <div 
                                  className="relative cursor-pointer group"
                                  onClick={() => openModal(ModalType.IMAGE_CAROUSEL, {
                                    images: certificate.assets,
                                    startIndex: 0
                                  })}
                                >
                                  <img
                                    src={
                                      certificate.assets[0].url ||
                                      "/placeholder.svg?height=96&width=96"
                                    }
                                    alt={certificate.name}
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 rounded-md">
                                    <Eye className="h-6 w-6 text-white" />
                                    {certificate.assets.length > 1 && (
                                      <span className="text-white text-xs mt-1">1 more image</span>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 rounded-md flex items-center justify-center">
                                  <Award className="h-10 w-10 text-purple-500" />
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No Certifications</p>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Experiences Tab */}
              <TabsContent value="experiences" className="mt-6 space-y-8">
                {/* Experience section */}
                <div className="space-y-3">
                  <h3 className="flex items-center text-xl font-semibold border-b pb-2">
                    <Award className="mr-2 h-5 w-5 " />
                    Work Experience
                  </h3>
                  <div className="space-y-6 py-2">
                    {worker.experience?.length ? (
                      worker.experience.map((exp) => (
                        <div
                          key={exp.id}
                          className="border-l-2 border-amber-200 pl-4 py-1"
                        >
                          <h4 className="font-medium">{exp.title}</h4>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString()} -
                            {exp.currentlyWorking
                              ? " Present"
                              : exp.endDate
                              ? ` ${new Date(exp.endDate).toLocaleDateString()}`
                              : ""}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {exp.city}, {exp.state}, {exp.country}
                          </p>
                          <p className="mt-2 text-gray-700">
                            {exp.description}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No Experience</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Hire card */}
            <div className="sticky top-24 rounded-lg border bg-gradient-to-b from-white to-blue-50 p-6 shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-lg"></div>
              <div className="mb-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  ${worker.hourlyRate}
                </div>
                <div className="text-gray-600">per hour</div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium">
                    {worker.availability ? "Available" : "Unavailable"}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">
                    {worker.city}, {worker.state}
                  </span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200">
                Contact {worker.user?.firstName || "Worker"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
