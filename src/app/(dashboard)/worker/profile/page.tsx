"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Share2,
  StarIcon,
} from "lucide-react";
import { useGetCurrentWorkerProfileDetails } from "@/hook/user/user.hooks";
import type {
  WorkerUser,
  WorkerEducation,
  WorkerExperience,
  WorkerLanguage,
} from "@/types/worker.types";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useState } from "react";

// Helper function to safely cast WorkerProfile to ModalDataType
const toModalData = (data: unknown): Record<string, unknown> => {
  return data as Record<string, unknown>;
};

export default function FreelancerProfileSelfView() {
  const { openModal } = useModalStore();
  const { data: workerDetail, refetch } = useGetCurrentWorkerProfileDetails();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  
  if (!workerDetail) {
    return <div>Loading...</div>;
  }

  console.log({workerDetail})

  const { firstName, lastName, workerProfile } = workerDetail as WorkerUser;
  const fullName = `${firstName} ${lastName}`;

  // Use the state value if available, otherwise use the one from the API
  const currentProfilePicture = profilePicture || workerProfile.profilePicture;
  console.log({ currentProfilePicture });
  
  console.log(workerProfile.profilePicture, "profilePicture");
  const handleEditProfile = () => {
    openModal(ModalType.EDIT_PROFILE, toModalData(workerProfile));
  };

  const handleProfilePictureClick = () => {
    openModal(
      ModalType.CHANGE_PROFILE_PICTURE,
      toModalData({
        ...workerProfile,
        onProfilePictureChange: (newImageUrl: string) => {
          setProfilePicture(newImageUrl);
          refetch();
        },
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back to dashboard */}
        <Link
          href="/feed"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to dashboard
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main content */}
          <div className="space-y-8">
            {/* Profile header */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-6 shadow-sm border border-blue-100">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>

              <div className="flex flex-col gap-6 sm:flex-row">
                <div
                  className="flex-shrink-0 relative group cursor-pointer w-[120px] h-[120px]"
                  onClick={handleProfilePictureClick}
                >
                  <img
                    src={currentProfilePicture || "/placeholder.svg"}
                    alt={fullName}
                    className="rounded-full border-2 border-white shadow-sm object-cover w-full h-full"
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
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        size="sm"
                        onClick={handleEditProfile}
                      >
                        <FileEdit className="mr-2 h-4 w-4" />
                        Edit Profile
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
                        Available {workerProfile.availability ? "Now" : "Soon"}
                      </span>
                    </div>
                    <div className="flex items-center font-medium text-blue-600">
                      ${workerProfile.hourlyRate}/hr
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rest of the component remains the same */}
            {/* Tabs section */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start rounded-none">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="work">Work Experiences</TabsTrigger>
              </TabsList>

              <Separator className="mt-6" />

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8 pt-6">
                {/* About section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      About
                    </h2>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1"
                      onClick={handleEditProfile}
                    >
                      <PencilIcon className="h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                  <div className="border-b pb-6">
                    <div className="whitespace-pre-line text-gray-700">
                      {workerProfile.description}
                    </div>
                  </div>
                </section>

                {/* Skills section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      Skills
                    </h2>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1"
                      onClick={() =>
                        openModal(
                          ModalType.EDIT_SKILLS,
                          toModalData(workerProfile)
                        )
                      }
                    >
                      <PencilIcon className="h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                  <div className="border-b pb-6">
                    <div className="flex flex-wrap gap-2 lowercase">
                      {workerProfile.skills.map((skill: string) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-blue-50 text-blue-700 border-blue-200 p-2"
                        >
                          {skill.replace(/_/g, " ")}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Education & Certifications */}
                <div className="grid gap-8 md:grid-cols-2">
                  {/* Education */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold flex items-center">
                        <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
                        Education
                      </h2>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1"
                        onClick={() =>
                          openModal(
                            ModalType.EDIT_EDUCATION,
                            toModalData(workerProfile)
                          )
                        }
                      >
                        <PencilIcon className="h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                      <div className="space-y-4">
                        {workerProfile.education.length > 0 ? (
                          workerProfile.education.map(
                            (edu: WorkerEducation, index: number) => (
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
                            )
                          )
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            <GraduationCap className="mx-auto h-12 w-12 mb-4 opacity-50" />
                            <p>No education added yet</p>
                            <p className="text-sm mt-1">
                              Add your educational background to enhance your
                              profile
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>

                  {/* Certifications */}
                  <section>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold flex items-center">
                        <Award className="mr-2 h-5 w-5 text-purple-600" />
                        Certifications
                      </h2>
                      <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() =>
                          openModal(
                            ModalType.EDIT_CERTIFICATES,
                            { certificates: workerProfile.certificates }
                          )
                        }>
                        <PencilIcon className="h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                    <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                      {workerProfile.certificates.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-1">
                          {workerProfile.certificates.map((certificate) => (
                            <div
                              key={certificate.id}
                              className="relative rounded-lg border p-4 hover:bg-gray-50"
                            >
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{certificate.name}</h4>
                                  <Badge variant="outline">{certificate.certificateType.replace(/_/g, " ")}</Badge>
                                </div>
                                <p className="text-sm text-gray-500">{certificate.issuingOrg}</p>
                                <p className="text-sm text-gray-500">
                                  Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                                  {certificate.expiryDate && 
                                    ` • Expires: ${new Date(certificate.expiryDate).toLocaleDateString()}`
                                  }
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
                                {certificate.assets?.length > 0 && (
                                  <div className="mt-2 grid grid-cols-3 gap-2">
                                    {certificate.assets.map((asset, index) => (
                                      <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                                        <img
                                          src={asset.url}
                                          alt={`Certificate ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          <Award className="mx-auto h-12 w-12 mb-4 opacity-50" />
                          <p>No certificates added yet</p>
                          <p className="text-sm mt-1">
                            Add your professional certificates to enhance your profile
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                </div>

                {/* Languages */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-green-600" />
                      Languages
                    </h2>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1"
                      onClick={() =>
                        openModal(
                          ModalType.EDIT_LANGUAGES,
                          toModalData(workerProfile)
                        )
                      }
                    >
                      <PencilIcon className="h-3 w-3" />
                      Edit
                    </Button>
                  </div>
                  <div>
                    <div className="space-y-3">
                      {workerProfile.languages.map(
                        (language: WorkerLanguage) => (
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
                        )
                      )}
                    </div>
                  </div>
                </section>
              </TabsContent>

              {/* Work History Tab */}
              <TabsContent value="work" className="space-y-6 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Work History</h2>
                    <p className="text-sm text-gray-500">
                      Completed {workerProfile.completedJobs} jobs
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="gap-1"
                    onClick={() =>
                      openModal(
                        ModalType.EDIT_EXPERIENCE,
                        toModalData(workerProfile)
                      )
                    }
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit Experience
                  </Button>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  {workerProfile.experience.length > 0 ? (
                    workerProfile.experience.map(
                      (work: WorkerExperience, index: number) => (
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
                      )
                    )
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="mx-auto h-12 w-12 mb-4 opacity-50" />
                      <p>No work experience added yet</p>
                      <p className="text-sm mt-1">
                        Add your work history to showcase your professional
                        background
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile stats */}
            <div className="sticky top-24 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${workerProfile.hourlyRate}
                  </div>
                  <div className="text-gray-600">per hour</div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Availability</span>
                    <span
                      className={`font-medium ${
                        workerProfile.availability
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {workerProfile.availability
                        ? "Available Now"
                        : "Not Available"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium">
                      {new Date(workerProfile.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Jobs completed</span>
                    <span className="font-medium">
                      {workerProfile.completedJobs}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                  onClick={handleEditProfile}
                >
                  <FileEdit className="mr-2 h-4 w-4" />
                  Edit Full Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
