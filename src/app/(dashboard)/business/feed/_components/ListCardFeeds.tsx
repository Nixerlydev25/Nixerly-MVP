"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formateSkills } from "@/lib/utils";
import type { CardProps } from "@/types/feed/feed.types";
import { ROUTES } from "@/lib/routes";

import { TruncatedText } from "@/components/ui/truncated-text";
import {
  BookmarkIcon,
  StarIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ScrollText,
  FolderIcon,
  ExternalLinkIcon,
  AwardIcon,
  BriefcaseBusiness
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

function ListCardFeeds({
  id,
  title,
  avatar,
  skills,
  name,
  location,
  rating,
  jobsCompleted,
  certificates,
  portfolio,
  description,
  experience
}: CardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const hasDetailsToShow = certificates.length > 0 || portfolio.length > 0;

  return (
    <div key={id} className="flex flex-col mb-4 rounded-2xl hover:bg-gray-50 border border-gray-200">
      <div className="flex flex-1 items-start p-3 sm:p-4 gap-3 sm:gap-4">
        <div className="flex-1 block lg:flex relative">
          <div
            className="cursor-pointer flex flex-1"
            onClick={() => router.push(`${ROUTES.OTHER_WORKER_PROFILE}/${id}`)}
          >
            <div className="flex gap-3 sm:gap-4 w-full">
              <Image
                src={avatar || "/placeholder.svg"}
                width={100}
                height={100}
                alt={name}
                className="rounded-full w-12 h-12 sm:w-16 sm:h-16 object-cover flex-shrink-0"
              />

              {/* Mobile: Only name and title next to image */}
              <div className="flex-1 min-w-0 sm:hidden">
                <h3 className="text-[#0E121B] font-sans text-lg font-medium leading-tight">{name}</h3>
                <p className="text-sm text-[#0E121B] font-sans pt-1 not-italic font-normal leading-tight tracking-tight">
                  {title}
                </p>
              </div>

              {/* Desktop: All content next to image */}
              <div className="hidden sm:flex flex-1 min-w-0">
                <div className="flex-1">
                  <h3 className="text-[#0E121B] font-sans text-xl font-medium leading-none">{name}</h3>
                  <p className="text-sm text-[#0E121B] font-sans pt-2 not-italic font-normal leading-none tracking-tight">
                    {title}
                  </p>

                  <p className="font-sans text-sm text-gray-600 font-normal max-w-3xl leading-[1.5] line-clamp-2 pt-2">
                    {description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {skills.slice(0, showAllSkills ? skills.length : 2).map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="font-sans px-2 py-1 text-xs not-italic font-medium leading-5 text-gray-600"
                      >
                        {formateSkills(skill)}
                      </Badge>
                    ))}
                    {skills.length > 2 && (
                      <Badge
                        variant="outline"
                        className="font-sans px-2 py-1 text-xs not-italic font-medium leading-5 text-gray-600 cursor-pointer hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowAllSkills(!showAllSkills)
                        }}
                      >
                        {showAllSkills ? "Show Less" : `+${skills.length - 2} more`}
                      </Badge>
                    )}
                  </div>

                  <p className="mt-4 text-[#0E121B] font-sans text-xs md:text-sm not-italic font-normal leading-4 tracking-tight">
                    <Image
                      src="/locationblack.svg"
                      alt="location icon"
                      width={12}
                      height={12}
                      className="mr-1 inline-block"
                    />
                    {location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Show Details button positioned at bottom right on desktop */}
          <div className="hidden lg:flex lg:relative lg:bottom-auto lg:right-auto lg:ml-auto lg:flex-col lg:my-4 lg:sm:my-0 lg:items-end lg:gap-2">
            {hasDetailsToShow && (
              <button
                className="flex items-center gap-1 font-sans text-sm border-0 font-medium leading-4 text-gray-600 tracking-tight p-2"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <span className="inline-flex items-center gap-1 decoration-underline decoration-black underline decoration-[1.5px] underline-offset-4">
                      <span className="underline">Hide Details</span>
                      <ChevronUpIcon className="h-4 w-4" />
                    </span>
                  </>
                ) : (
                  <>
                    Show Details <ChevronDownIcon className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden px-3 pb-2">
        <div className="cursor-pointer" onClick={() => router.push(`${ROUTES.OTHER_WORKER_PROFILE}/${id}`)}>
          <p className="font-sans text-sm text-gray-600 font-normal max-w-3xl leading-[1.4] line-clamp-2 mb-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-1 mb-2">
            {skills.slice(0, showAllSkills ? skills.length : 2).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="font-sans px-2 py-1 text-xs not-italic font-medium leading-4 text-gray-600"
              >
                {formateSkills(skill)}
              </Badge>
            ))}
            {skills.length > 2 && (
              <Badge
                variant="outline"
                className="font-sans px-2 py-1 text-xs not-italic font-medium leading-4 text-gray-600 cursor-pointer hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowAllSkills(!showAllSkills)
                }}
              >
                {showAllSkills ? "Show Less" : `+${skills.length - 2} more`}
              </Badge>
            )}
          </div>

          <p className="text-[#0E121B] font-sans text-sm not-italic font-normal leading-tight tracking-tight">
            <Image src="/locationblack.svg" alt="location icon" width={12} height={12} className="mr-1 inline-block" />
            {location}
          </p>
        </div>
      </div>

      {/* Mobile Show Details button - positioned at bottom of card */}
      {hasDetailsToShow && (
        <div className="lg:hidden px-3 sm:px-4 pb-2 sm:pb-3 border-gray-100">
          <button
            className="w-full flex items-center justify-end gap-1 font-sans text-sm border-0 font-medium leading-4 text-gray-600 tracking-tight p-2 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <span className="inline-flex items-center">
                  <span className="">Hide Details</span>
                  <ChevronUpIcon className="h-4 w-4" />
                </span>
              </>
            ) : (
              <>
                Show Details <ChevronDownIcon className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}

      {isExpanded && (
        <div className="lg:ml-[70px] pb-3 sm:pb-4 text-gray-600 pt-2">
          <div>
            <div className="flex items-center gap-2 pb-2 px-3 sm:px-4">
              <BriefcaseBusiness className="h-4 w-4 sm:h-5 sm:w-5 text-[#0E121B]" />
              <h4 className="font-sans font-medium text-base sm:text-lg lg:text-xl leading-4 text-[#0E121B]">
                Work Experience
              </h4>
            </div>

            <div className="pt-2 px-4 sm:px-6">
              {experience.map((exp, index) => (
                <div key={index} className="mb-3 sm:mb-4">
                  <p className="text-[#0E121B] font-sans text-sm font-normal leading-tight sm:leading-[12px]">
                    {exp.title}
                  </p>
                  <div className="block md:flex gap-2 pt-2 sm:pt-3">
                    <p className="font-sans text-sm sm:text-base font-normal leading-tight sm:leading-3 text-gray-600">
                      {exp.company}
                    </p>
                    <p className="font-sans text-xs sm:text-sm font-medium leading-tight sm:leading-3 text-gray-600 pt-1 md:pt-0 capitalize">
                      {new Date(exp.startDate).getFullYear()} —{" "}
                      {exp.currentlyWorking || !exp.endDate
                        ? "Currently"
                        : `${new Date(exp.endDate).getDate()}-${new Date(exp.endDate).getMonth() + 1}-${new Date(exp.endDate).getFullYear()}`}
                    </p>
                  </div>
                  <p className="font-sans text-sm text-gray-600 font-normal max-w-3xl leading-[1.4] sm:leading-[1.5] line-clamp-2 pt-1 sm:pt-2">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 pt-3 sm:pt-4">
            {certificates.length > 0 && (
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 pb-2 px-3 sm:px-4">
                  <AwardIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0E121B]" />
                  <h4 className="font-sans font-medium text-base sm:text-lg lg:text-xl leading-4 text-[#0E121B]">
                    Certificates
                  </h4>
                  <span className="text-xs text-[#0E121B] px-[5px] py-0.5 bg-gray-300 rounded-full">
                    {certificates.length}
                  </span>
                </div>
                <ScrollArea className="h-[160px] sm:h-[180px] p-1 sm:p-2">
                  <div className="space-y-2">
                    {certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="group flex items-start gap-2 sm:gap-3 p-2 max-w-sm hover:bg-white rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        {cert.assets.length > 0 ? (
                          <div className="relative flex-shrink-0">
                            <Image
                              src={cert.assets[0].url || "/placeholder.svg"}
                              width={100}
                              height={100}
                              alt={cert.name}
                              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-md object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                            <ScrollText className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <p className="font-medium text-sm sm:text-base lg:text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                              {cert.name}
                            </p>
                            <ExternalLinkIcon className="h-3 w-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">{cert.issuingOrg}</p>
                          <p className="text-xs text-gray-600 my-1">
                            Issued: {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString("en-GB") : "N/A"} •
                            Expires: {cert.expiryDate ? new Date(cert.expiryDate).toLocaleDateString("en-GB") : "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {portfolio.length > 0 && (
              <div className="space-y-2 sm:space-y-3 mt-3 sm:mt-4 lg:mt-0">
                <div className="flex items-center gap-2 pb-2 px-3 sm:px-4">
                  <FolderIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0E121B]" />
                  <h4 className="font-sans font-medium text-base sm:text-lg lg:text-xl leading-4 text-[#0E121B]">
                    Portfolio
                  </h4>
                  <span className="text-xs text-[#0E121B] px-[5px] py-0.5 bg-gray-300 rounded-full">
                    {portfolio.length}
                  </span>
                </div>
                <ScrollArea className="h-[160px] sm:h-[180px] pr-1 sm:pr-2">
                  <div className="space-y-2">
                    {portfolio.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-start gap-2 sm:gap-3 p-2 max-w-sm hover:bg-white rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        {item.assets.length > 0 ? (
                          <div className="relative flex-shrink-0">
                            <Image
                              src={item.assets[0].url || "/placeholder.svg"}
                              width={100}
                              height={100}
                              alt={item.title}
                              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-md object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
                            <FolderIcon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <p className="font-medium text-sm sm:text-base lg:text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                              {item.title}
                            </p>
                            <ExternalLinkIcon className="h-3 w-3 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                          <p className="text-xs text-gray-600 my-1">
                            Started: {item.startDate ? new Date(item.startDate).toLocaleDateString("en-GB") : "N/A"} •
                            Completed: {item.endDate ? new Date(item.endDate).toLocaleDateString("en-GB") : "N/A"}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListCardFeeds;
