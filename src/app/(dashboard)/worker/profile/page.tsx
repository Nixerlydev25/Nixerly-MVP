"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Award,
  ChevronLeft,
  Clock,
  FileEdit,
  Globe,
  GraduationCap,
  MapPin,
  PencilIcon,
  Share2,
  StarIcon,
  User,
  Briefcase,
  LinkIcon,
  Eye,
  Calendar,
  ExternalLink,
} from "lucide-react"
import { useGetCurrentWorkerProfileDetails } from "@/hook/user/user.hooks"
import type { WorkerUser, WorkerEducation, WorkerExperience, WorkerLanguage, Portfolio } from "@/types/worker.types"
import { useModalStore } from "@/store/modal.store"
import { ModalType } from "@/types/model"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import FreelancerProfileSkeleton from "./component/Skeleton"
import { cn } from "@/lib/utils"

type TabType = "overview" | "experience" | "education" | "skills" | "portfolio"

const sidebarItems = [
  {
    id: "overview" as TabType,
    label: "Overview",
    icon: User,
    description: "About and general information",
  },
  {
    id: "skills" as TabType,
    label: "Skills & Languages",
    icon: Award,
    description: "Technical skills and languages",
  },
  {
    id: "education" as TabType,
    label: "Education & Certificates",
    icon: GraduationCap,
    description: "Academic and professional credentials",
  },
  {
    id: "experience" as TabType,
    label: "Work Experience",
    icon: Briefcase,
    description: "Professional work history",
  },
  {
    id: "portfolio" as TabType,
    label: "Portfolio",
    icon: FileEdit,
    description: "Portfolio projects and work samples",
  },
]

// Helper function to safely cast WorkerProfile to ModalDataType
const toModalData = (data: unknown): Record<string, unknown> => {
  return data as Record<string, unknown>
}

export default function FreelancerProfileSelfView() {
  const [activeTab, setActiveTab] = useState<TabType>("overview")
  const { openModal } = useModalStore()
  const { data: workerDetail, refetch } = useGetCurrentWorkerProfileDetails()
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  if (!workerDetail) {
    return <FreelancerProfileSkeleton />
  }

  const { firstName, lastName, workerProfile } = workerDetail as WorkerUser
  console.log("Worker Profile Data:", workerProfile)
  console.log("Portfolio:", workerProfile.portfolio)

  const fullName = `${firstName} ${lastName}`

  // Use the state value if available, otherwise use the one from the API
  const currentProfilePicture = profilePicture || workerProfile.profilePicture

  const handleEditProfile = () => {
    openModal(ModalType.EDIT_PROFILE, toModalData(workerProfile))
  }

  const handleProfilePictureClick = () => {
    openModal(
      ModalType.CHANGE_PROFILE_PICTURE,
      toModalData({
        ...workerProfile,
        onProfilePictureChange: (newImageUrl: string) => {
          setProfilePicture(newImageUrl)
          refetch()
        },
      }),
    )
  }

  console.log(workerProfile.portfolio, "workerProfile.portfolio")

  const renderOverview = () => (
    <div className="space-y-8">
      {/* About section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">About</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={handleEditProfile}>
                  <PencilIcon className="h-3 w-3" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your about section</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <div className="whitespace-pre-line text-gray-700">{workerProfile.description}</div>
        </div>
      </section>

      {/* Availability and Rate */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Availability & Rate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-500" />
              <div>
                <p className="font-medium">Availability</p>
                <p className={`text-sm ${workerProfile.availability ? "text-green-600" : "text-amber-600"}`}>
                  {workerProfile.availability ? "Available Now" : "Not Available"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center gap-3">
              <StarIcon className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-medium">Hourly Rate</p>
                <p className="text-sm text-blue-600 font-semibold">${workerProfile.hourlyRate}/hr</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Statistics */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Profile Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <p className="font-medium">Member Since</p>
                <p className="text-sm text-gray-600">{new Date(workerProfile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center gap-3">
              <Briefcase className="h-8 w-8 text-purple-500" />
              <div>
                <p className="font-medium">Jobs Completed</p>
                <p className="text-sm text-gray-600">{workerProfile.completedJobs}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border">
            <div className="flex items-center gap-3">
              <StarIcon className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="font-medium">Success Rate</p>
                <p className="text-sm text-gray-600">100%</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )

  const renderSkills = () => (
    <div className="space-y-8">
      {/* Skills section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Skills</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 gap-1"
                  onClick={() => openModal(ModalType.EDIT_SKILLS, toModalData(workerProfile))}
                >
                  <PencilIcon className="h-3 w-3" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your skills</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <div className="flex flex-wrap gap-2">
            {workerProfile.skills.map((skill: string) => (
              <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 p-2">
                {skill.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Globe className="mr-2 h-5 w-5 text-green-600" />
            Languages
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 gap-1"
                  onClick={() => openModal(ModalType.EDIT_LANGUAGES, toModalData(workerProfile))}
                >
                  <PencilIcon className="h-3 w-3" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your languages</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <div className="space-y-3">
            {workerProfile.languages.map((language: WorkerLanguage) => (
              <div key={language.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">
                    {language.language.charAt(0) + language.language.slice(1).toLowerCase()}
                  </span>
                </div>
                <Badge variant="outline">
                  {language.proficiency.charAt(0) + language.proficiency.slice(1).toLowerCase()}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )

  const renderEducation = () => (
    <div className="space-y-8">
      {/* Education */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <GraduationCap className="mr-2 h-5 w-5 text-blue-600" />
            Education
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 gap-1"
                  onClick={() => openModal(ModalType.EDIT_EDUCATION, toModalData(workerProfile))}
                >
                  <PencilIcon className="h-3 w-3" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your education history</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="bg-white rounded-lg p-6 border">
          <div className="space-y-6">
            {workerProfile.education.length > 0 ? (
              workerProfile.education.map((edu: WorkerEducation, index: number) => (
                <div key={index} className={`${index > 0 ? "border-t pt-6" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{edu.school}</h4>
                      <p className="text-gray-600 font-medium">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(edu.startDate).getFullYear()} -{" "}
                        {edu.currentlyStudying ? "Present" : new Date(edu.endDate).getFullYear()}
                      </p>
                      {edu.description && <p className="mt-3 text-gray-700">{edu.description}</p>}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <GraduationCap className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="font-medium">No education added yet</p>
                <p className="text-sm mt-1">Add your educational background to enhance your profile</p>
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 gap-1"
                  onClick={() =>
                    openModal(ModalType.EDIT_CERTIFICATES, {
                      certificates: workerProfile.certificates,
                    })
                  }
                >
                  <PencilIcon className="h-3 w-3" />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your certifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="space-y-4">
          {workerProfile.certificates.length > 0 ? (
            workerProfile.certificates.map((certificate) => (
              <div key={certificate.id} className="bg-white rounded-lg p-6 border">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{certificate.name}</h4>
                        <Badge variant="outline">{certificate.certificateType.replace(/_/g, " ")}</Badge>
                      </div>
                      <p className="text-gray-600 font-medium">{certificate.issuingOrg}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                        {certificate.expiryDate &&
                          ` • Expires: ${new Date(certificate.expiryDate).toLocaleDateString()}`}
                      </p>
                      {certificate.credentialUrl && (
                        <a
                          href={certificate.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                        >
                          View Credential
                        </a>
                      )}
                    </div>
                  </div>
                  {certificate.assets?.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 mt-4">
                      {certificate.assets.map((asset, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                          <img
                            src={asset.url || "/placeholder.svg"}
                            alt={`Certificate ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg p-6 border">
              <div className="text-center py-8 text-gray-500">
                <Award className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="font-medium">No certificates added yet</p>
                <p className="text-sm mt-1">Add your professional certificates to enhance your profile</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )

  const renderExperience = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Work History</h2>
          <p className="text-sm text-gray-500">Completed {workerProfile.completedJobs} jobs</p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="gap-1"
                onClick={() => openModal(ModalType.EDIT_EXPERIENCE, toModalData(workerProfile))}
              >
                <PencilIcon className="h-4 w-4" />
                Edit Experience
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit your work experience</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="bg-white rounded-lg p-6 border">
        {workerProfile.experience.length > 0 ? (
          <div className="space-y-6">
            {workerProfile.experience.map((work: WorkerExperience, index: number) => (
              <div key={index} className={`${index > 0 ? "border-t pt-6" : ""}`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{work.title}</h3>
                    <p className="text-gray-600 font-medium">{work.company}</p>
                    <p className="text-sm text-gray-500">
                      {work.city}, {work.state}, {work.country}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(work.startDate).getFullYear()} -{" "}
                      {work.currentlyWorking ? "Present" : new Date(work.endDate).getFullYear()}
                    </p>
                  </div>
                </div>
                {work.description && <p className="mt-3 text-gray-700">{work.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Clock className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p className="font-medium">No work experience added yet</p>
            <p className="text-sm mt-1">Add your work history to showcase your professional background</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderPortfolio = () => {
    console.log("Rendering portfolio section, data:", workerProfile.portfolio)
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Portfolio Projects</h2>
            <p className="text-gray-600 mt-1">Showcase your best work and achievements</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 bg-white hover:bg-gray-50"
                  onClick={() => {
                    console.log("Opening modal with portfolio:", workerProfile.portfolio || [])
                    openModal(ModalType.EDIT_PORTFOLIO, { portfolio: workerProfile.portfolio || [] })
                  }}
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit Portfolio
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your portfolio projects</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workerProfile.portfolio && workerProfile.portfolio.length > 0 ? (
            workerProfile.portfolio.map((portfolio: Portfolio) => (
              <div
                key={portfolio.id}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
              >
                {/* Enhanced Image Section */}
                {portfolio.assets?.length > 0 && (
                  <div
                    className="relative aspect-[16/9] cursor-pointer overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
                    onClick={() => {
                      openModal(ModalType.IMAGE_CAROUSEL, {
                        images: portfolio.assets.map((asset) => ({
                          id: asset.id,
                          url: asset.url,
                        })),
                        startIndex: 0,
                      })
                    }}
                  >
                    <img
                      src={portfolio.assets[0].url || "/placeholder.svg"}
                      alt={portfolio.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Enhanced Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">View Project</span>
                          </div>
                          {portfolio.assets.length > 1 && (
                            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                              <span className="text-xs font-medium">+{portfolio.assets.length - 1}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Image Count Badge */}
                    {portfolio.assets.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-1.5 py-0.5 rounded-full">
                        {portfolio.assets.length} images
                      </div>
                    )}
                  </div>
                )}

                {/* Enhanced Content Section */}
                <div className="p-3 space-y-2">
                  {/* Header with improved typography */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                      {portfolio.title}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700 border-blue-100 text-xs px-1.5 py-0.5"
                      >
                        {portfolio.employerName}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(portfolio.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Description */}
                  <div className="relative">
                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{portfolio.description}</p>
                    {portfolio.description.length > 100 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-medium mt-1 transition-colors duration-200"
                        onClick={() => {
                          openModal(ModalType.IMAGE_CAROUSEL, {
                            images: portfolio.assets.map((asset) => ({
                              id: asset.id,
                              url: asset.url,
                            })),
                            startIndex: 0,
                          })
                        }}
                      >
                        Read More →
                      </Button>
                    )}
                  </div>

                  {/* Enhanced Links Section */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    {portfolio.employerWebsite && (
                      <a
                        href={portfolio.employerWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 group/link"
                      >
                        <div className="p-0.5 rounded-md bg-gray-100 group-hover/link:bg-blue-100 transition-colors duration-200">
                          <Globe className="h-3 w-3" />
                        </div>
                        <span>Client Website</span>
                        <ExternalLink className="h-2 w-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                      </a>
                    )}
                    {portfolio.projectUrl && (
                      <a
                        href={portfolio.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 group/link"
                      >
                        <div className="p-0.5 rounded-md bg-gray-100 group-hover/link:bg-blue-100 transition-colors duration-200">
                          <LinkIcon className="h-3 w-3" />
                        </div>
                        <span>View Project</span>
                        <ExternalLink className="h-2 w-2 opacity-0 group-hover/link:opacity-100 transition-opacity duration-200" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-2xl p-12 border-2 border-dashed border-gray-200 text-center">
                <div className="max-w-sm mx-auto space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <FileEdit className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No portfolio projects yet</h3>
                    <p className="text-gray-500 leading-relaxed">
                      Showcase your best work by adding portfolio projects. This helps potential clients understand your
                      capabilities and style.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      openModal(ModalType.EDIT_PORTFOLIO, { portfolio: workerProfile.portfolio || [] })
                    }}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    <FileEdit className="h-4 w-4 mr-2" />
                    Add Your First Project
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderContent = () => {
    console.log("Current active tab:", activeTab)
    switch (activeTab) {
      case "overview":
        return renderOverview()
      case "skills":
        return renderSkills()
      case "education":
        return renderEducation()
      case "experience":
        return renderExperience()
      case "portfolio":
        return renderPortfolio()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back to dashboard */}
        <Link href="/feed" className="mb-6 inline-flex items-center text-sm font-medium text-blue-600">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Feed
        </Link>

        {/* Profile Banner - Full Width at Top */}
        <div className="mb-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-6 shadow-sm border border-blue-100">
          <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>

          <div className="flex flex-col gap-6 sm:flex-row">
            <div
              className="flex-shrink-0 relative group cursor-pointer w-[120px] h-[120px]"
              onClick={handleProfilePictureClick}
            >
              <img
                src={currentProfilePicture || "/placeholder.svg"}
                alt={fullName}
                className="rounded-full border-2 border-white  object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 rounded-full flex items-center justify-center opacity-0 group-hover:bg-opacity-30 group-hover:opacity-100 transition-all duration-200">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="ghost" className="h-10 w-10 text-white">
                        <PencilIcon className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Change profile picture</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
                  </div>
                  <p className="text-lg text-gray-600">{workerProfile.title}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="mr-1 h-4 w-4" />
                    {`${workerProfile.city}, ${workerProfile.state}, ${workerProfile.country}`}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm" onClick={handleEditProfile}>
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-gray-500" />
                  <span>Available {workerProfile.availability ? "Now" : "Soon"}</span>
                </div>
                <div className="flex items-center font-medium text-blue-600">${workerProfile.hourlyRate}/hr</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar and Content Layout */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Simple Sidebar */}
          <div className="lg:col-span-1">
            <div className="border-r pr-6">
              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        console.log("Switching to tab:", item.id)
                        setActiveTab(item.id)
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors",
                        activeTab === item.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.label}</p>
                      </div>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="min-h-[600px]">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
