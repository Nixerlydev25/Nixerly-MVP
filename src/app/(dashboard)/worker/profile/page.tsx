"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
  Camera,
  Star,
  Building,
} from "lucide-react"
import { useGetCurrentWorkerProfileDetails } from "@/hook/user/user.hooks"
import type { WorkerUser, WorkerEducation, WorkerExperience, WorkerLanguage, Portfolio } from "@/types/worker.types"
import { useModalStore } from "@/store/modal.store"
import { ModalType } from "@/types/model"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import FreelancerProfileSkeleton from "./component/Skeleton"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"

type TabType = "overview" | "experience" | "education" | "skills" | "portfolio"

const sidebarItems = [
  {
    id: "overview" as TabType,
    label: "Overview",
    icon: "/infoBusiness.svg",
    description: "About and general information",
  },
  {
    id: "skills" as TabType,
    label: "Skills & Languages",
    icon: "/skillset.svg",
    description: "Technical skills and languages",
  },
  {
    id: "education" as TabType,
    label: "Education & Certificates",
    icon: "/education.svg",
    description: "Academic and professional credentials",
  },
  {
    id: "experience" as TabType,
    label: "Work Experience",
    icon: "/suitcase.svg",
    description: "Professional work history",
  },
  {
    id: "portfolio" as TabType,
    label: "Portfolio",
    icon: "/person.svg",
    description: "Portfolio projects and work samples",
  },
]

// Helper function to safely cast WorkerProfile to ModalDataType
const toModalData = (data: unknown): Record<string, unknown> => {
  return data as Record<string, unknown>
}

export default function FreelancerProfileSelfView() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = (searchParams.get("tab") as TabType) || "overview"
  const { openModal } = useModalStore()
  const { data: workerDetail, refetch } = useGetCurrentWorkerProfileDetails()
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setIsImageModalOpen(true)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
    setIsImageModalOpen(false)
  }

  // Mock functions - replace with your actual functions
  const openModals = (modalType: any, data: any) => {
    console.log("Opening modal:", modalType, data)
  }

  const handleTabChange = (tab: TabType) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", tab)
    router.push(`?${params.toString()}`)
  }

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
    <div className="space-y-6">
      {/* Top stats section with light blue background */}
      <div className="bg-[#55C8FF40] rounded-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Availability */}
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-3 px-4 py-7">
              <div className="w-10 h-10 bg-[#1E64D3] rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-nixerly-businesslabel mb-1">Availability</p>
                <p className={`text-sm ${workerProfile.availability ? "text-nixerly-businesslabel" : ""}`}>
                  {workerProfile.availability ? "Available Now" : "Not Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-3 px-4 py-7">
              <div className="w-10 h-10 bg-[#1E64D3] rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-nixerly-businesslabel mb-1">Member Since</p>
                <p className="text-sm text-nixerly-businesslabel">{new Date(workerProfile.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Hourly Rate */}
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-3 px-4 py-7">
              <div className="w-10 h-10 bg-[#FEC960] rounded-full flex items-center justify-center">
                <Star className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-nixerly-businesslabel mb-1">Hourly Rate</p>
                <p className="text-sm  text-nixerly-businesslabel">${workerProfile.hourlyRate}/hr</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us section */}
      <section className="border rounded-2xl">
        <div className="flex items-center justify-between mb-4 p-4">
          <h2 className="text-xl font-semibold text-blue-600">About Us</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1 text-nixerly-businesslabel rounded-full hover:text-nixerly-businesslabel"
                  onClick={handleEditProfile}
                >
                  <Image src="/editPara.svg" alt="edit" width={16} height={16} />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your about section</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator />s
        <div className="rounded-lg px-4 pt-4 pb-10">
          <div className="whitespace-pre-line text-nixerly-businesslabel">{workerProfile.description}</div>
        </div>
      </section>
    </div>
  )

  const renderSkills = () => (
    <div className="space-y-8">
      {/* Skills section */}
      <section className="border rounded-2xl">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold text-nixerly-blue">Skills</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1 border rounded-full px-4"
                  onClick={() => openModal(ModalType.EDIT_SKILLS, toModalData(workerProfile))}
                >
                  <Image src="/editPara.svg" alt="hello" width={16} height={16} />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your skills</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator />
        <div className="p-4">
          <div className="flex flex-wrap gap-2">
            {workerProfile.skills.map((skill: string) => (
              <Badge key={skill} variant="outline" className="px-3 py-1 hover:bg-[#1e64d3] hover:text-white">
                {skill.replace(/_/g, " ")}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="border rounded-2xl">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold text-nixerly-blue flex items-center">
            Languages
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1 px-4 rounded-full"
                  onClick={() => openModal(ModalType.EDIT_LANGUAGES, toModalData(workerProfile))}
                >
                  <Image src="/editPara.svg" alt="hello" width={16} height={16} />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your languages</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator />
        <div className="p-4">
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
      <section className="border rounded-2xl" >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold flex items-center text-nixerly-blue">
            Education
          </h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-4 gap-2 border rounded-full"
                  onClick={() => openModal(ModalType.EDIT_EDUCATION, toModalData(workerProfile))}
                >
                  <Image src="/editPara.svg" alt="edit" width={16} height={16} />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your education history</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator />
        <div className="p-4">
          <div className="space-y-6">
            {workerProfile.education.length > 0 ? (
              workerProfile.education.map((edu: WorkerEducation, index: number) => (
                <div key={index} className={`${index > 0 ? "pt-6" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-2xl">{edu.school}</h4>
                      <p className="text-sm font-medium text-nixerly-businesslabel">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                      {edu.description && <p className="text-sm text-nixerly-businesslabel">{edu.description}</p>}
                      <p className="text-sm text-shadow-nixerly-businesslabel mt-1 flex gap-2">
                        <Image src="/calen.svg" alt="calen" width={12} height={12} />
                        {new Date(edu.startDate).getFullYear()} -{" "}
                        {edu.currentlyStudying ? "Present" : new Date(edu.endDate).getFullYear()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-nixerly-businesslabel">
                <GraduationCap className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="font-medium">No education added yet</p>
                <p className="text-sm mt-1">Add your educational background to enhance your profile</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border rounded-2xl">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-xl font-semibold flex items-center text-nixerly-blue">Certifications</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1 px-4 border rounded-full bg-transparent"
                  onClick={() =>
                    openModal(ModalType.EDIT_CERTIFICATES, {
                      certificates: workerProfile.certificates,
                    })
                  }
                >
                  <Image src="/editPara.svg" alt="edit" width={16} height={16} />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your certifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator />
        <div className="space-y-4 p-4">
          {workerProfile.certificates.length > 0 ? (
            <div className="flex flex-col">
              {workerProfile.certificates.slice(0, 4).map((certificate) => (
                <Card key={certificate.id} className="h-full border-none">
                  <CardContent className="flex gap-20 h-full">
                    {/* Text content on the left */}
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm leading-tight">{certificate.name}</h4>
                        {certificate.credentialUrl && (
                          <a href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer" className="">
                            <Image src="/link.svg" alt="credential link" width={16} height={16} />
                          </a>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {certificate.certificateType.replace(/_/g, " ")}
                      </Badge>
                      <p className="text-nixerly-businesslabel font-medium text-sm">{certificate.issuingOrg}</p>
                      <p className="text-xs text-nixerly-businesslabel">
                        Issued: {new Date(certificate.issueDate).toLocaleDateString()}
                        {certificate.expiryDate && ` • Expires: ${new Date(certificate.expiryDate).toLocaleDateString()}`}
                      </p>
                      <p className="text-xs text-nixerly-businesslabel">has successfully completed</p>
                    </div>

                    {/* Images on the right side */}
                    {certificate.assets?.length > 0 && (
                      <div className="flex gap-2 items-start">
                        {certificate.assets.slice(0, 4).map((asset, index) => (
                          <div
                            key={index}
                            className="relative flex-shrink-0 aspect-square overflow-hidden group cursor-pointer w-40 h-24"
                            onClick={() => openImageModal(asset.url || "/placeholder.svg")}
                          >
                            <img
                              src={asset.url || "/placeholder.svg"}
                              alt={`Certificate ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                            {/* Eye icon overlay */}
                            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                              <Eye className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-4">
              <div className="text-center py-8 text-nixerly-blue">
                <Award className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="font-medium">No certificates added yet</p>
                <p className="text-sm mt-1">Add your professional certificates to enhance your profile</p>
              </div>
            </div>
          )}
        </div>
        {/* Image Modal */}
        {isImageModalOpen && selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur" onClick={closeImageModal}>
            <div
              className="relative max-w-4xl max-h-[60vh] p-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeImageModal}
                className="absolute -top-2 -right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Certificate preview"
                className="max-w-full max-h-full object-contain rounded-lg h-[60vh]"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  )

  const renderExperience = () => (
    <div className="border rounded-2xl">
      <div className="flex items-center justify-between p-4">
        <div>
          <h2 className="text-xl font-semibold text-nixerly-blue">Work History</h2>
          {/* <Badge variant="secondary" className="text-nixerly-businesslabel bg-nixerly-businesslabel/10">
            Completed {workerProfile.completedJobs} jobs
          </Badge> */}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="gap-1 border rounded-full px-4"
                onClick={() => openModal(ModalType.EDIT_EXPERIENCE, toModalData(workerProfile))}
              >
                <Image src="/editPara.svg" alt="hello" width={16} height={16} />
                Edit
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit your work experience</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Separator />
      <div className="space-y-4">
        {workerProfile.experience.length > 0 ? (
          <div className="space-y-6 p-4">
            {workerProfile.experience.map((work: WorkerExperience, index: number) => (
              <div key={index} className={`${index > 0 ? "border-t pt-4" : ""}`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{work.title}</h3>
                    <p className="text-nixerly-businesslabel font-medium text-xs">{work.company}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Image src="/locationblack.svg" alt="location" width={12} height={12} />
                        <p className="text-sm text-nixerly-businesslabel">
                          {work.city}, {work.state}, {work.country}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 pb-1">
                        <Image src="/calen.svg" alt="location" width={12} height={12} />
                        <p className="text-sm text-nixerly-businesslabel mt-1">
                          {new Date(work.startDate).getFullYear()} -{" "}
                          {work.currentlyWorking ? "Present" : new Date(work.endDate).getFullYear()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {work.description && <p className="text-xs text-nixerly-businesslabel">{work.description}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-nixerly-businesslabel">
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
      <div className="border rounded-2xl ">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-2xl font-bold text-nixerly-blue">Portfolio Projects</h2>
            <p className="text-nixerly-businesslabel mt-1">Showcase your best work and achievements</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 px-4 rounded-full"
                  onClick={() => {
                    console.log("Opening modal with portfolio:", workerProfile.portfolio || [])
                    openModal(ModalType.EDIT_PORTFOLIO, { portfolio: workerProfile.portfolio || [] })
                  }}
                >
                  <Image src="/editPara.svg" alt="edit" width={16} height={16} />
                  Edit
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit your portfolio projects</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
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
                  <Badge
                        variant="outline"
                        className="text-blue-700 bg-[#1E64D31A] text-xs px-5 py-0.5"
                      >
                        {portfolio.employerName}
                      </Badge>
                    <h3 className="text-xl font-medium text-nixerly-businesslabel leading-tight transition-colors duration-200 line-clamp-1">
                      {portfolio.title}
                    </h3>
                    <div className="items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1 text-xs text-nixerly-businesslabel">
                        <Image src="/calen.svg" alt="calender" width={12} height={12}/>
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
                    <p className="text-xs text-nixerly-businesslabel leading-relaxed line-clamp-2">{portfolio.description}</p>
                    {/* {portfolio.description.length > 100 && (
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
                    )} */}
                  </div>

                  {/* Enhanced Links Section */}
                  <div className="flex items-center gap-2 border-gray-100">
                    {portfolio.employerWebsite && (
                      <a
                        href={portfolio.employerWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-nixerly-businesslabel hover:text-blue-600 transition-colors duration-200 group/link"
                      >
                        <div className="p-0.5 rounded-md bg-gray-100 group-hover/link:bg-blue-100 transition-colors duration-200">
                        <Image src="/gloab.svg" alt="world" width={12} height={12}/>
                        </div>
                        <span>Client Website</span>
                      </a>
                    )}
                    {portfolio.projectUrl && (
                      <a
                        href={portfolio.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-nixerly-businesslabel hover:text-blue-600 transition-colors duration-200 group/link"
                      >
                        <div className="p-0.5 rounded-md bg-gray-100 group-hover/link:bg-blue-100 transition-colors duration-200">
                          <Image src="/redirect.svg" alt="link" width={12} height={12}/>
                        </div>
                        <span>View Project</span>
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
                    <FileEdit className="h-8 w-8 text-nixerly-businesslabel" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-nixerly-businesslabel mb-2">No portfolio projects yet</h3>
                    <p className="text-nixerly-businesslabel leading-relaxed">
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
    <div className="min-h-screen">
      <div className="mx-auto px-6 pt-6">
        {/* Back to dashboard */}
        <Link href="/feed" className="mb-6 inline-flex items-center text-sm font-medium border rounded-full px-4 py-2">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Link>

        {/* Profile Card */}
        <div
          className="relative bg-[#1E64D3] overflow-hidden rounded-xl border custom-gradient-right h-52"
        >
          <div className="flex flex-col gap-6 sm:flex-row items-center p-4">
            <div className="relative h-24 w-24 overflow-visible md:h-32 md:w-32 ml-6" onClick={handleProfilePictureClick}>
              <img
                src={currentProfilePicture || "/placeholder.svg?height=128&width=128"}
                alt={fullName}
                width={128}
                height={128}
                className="h-full w-full object-cover mt-5 rounded-full"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="absolute bottom-0 right-0 rounded-full bg-white p-2 text-nixerly-businesslabel border border-nixerly-blue"
                      aria-label="Change profile picture"
                    >
                      <Camera className="h-5 w-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Update your profile picture</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mt-5">
                    <h1 className="text-2xl font-bold text-white">{fullName}</h1>
                  </div>
                  <p className="text-lg text-white">{workerProfile.title}</p>
                  <div className="mt-2 flex items-center text-sm text-white">
                    <MapPin className="mr-1 h-4 w-4 text-white" />
                    {`${workerProfile.city}, ${workerProfile.state}, ${workerProfile.country}`}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" className="rounded-full border-none">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" className="rounded-full border-none" size="sm" onClick={handleEditProfile}>
                    <Image src="/editPara.svg" alt="helo" width={16} height={16} />
                    Edit Profile
                  </Button>
                </div>
              </div>
              {/* 
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                <div className="flex items-center text-white">
                  <Clock className="mr-1 h-4 w-4 text-white" />
                  <span>Available {workerProfile.availability ? "Now" : "Soon"}</span>
                </div>
                <div className="flex items-center font-medium text-white">${workerProfile.hourlyRate}/hr</div>
              </div> */}
            </div>
          </div>
        </div>
        {/* Sidebar and Content Layout */}
        <div className="grid gap-8 lg:grid-cols-4 mt-10">
          {/* Simple Sidebar */}
          <div className="lg:col-span-1 bg-[#F5F7FA] rounded-t-2xl">
            <div className="px-8">
              <nav className="space-y-1">
                <p className="text-nixerly-businesslabel px-3 py-6 text-base font-medium">Profile Details</p>
                {sidebarItems.map((item) => {
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
                      {isActive && (
                        <Image src="/arrowLine.svg" alt="arrowLine" width={20} height={20} className="ml-auto" />
                      )}
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
    </div>
  )
}
