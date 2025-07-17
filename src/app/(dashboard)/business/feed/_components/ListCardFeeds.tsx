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
}: CardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDetailsToShow = certificates.length > 0 || portfolio.length > 0;

  return (
    <div key={id} className="flex flex-col border-b hover:bg-gray-50">
      <div className="flex flex-1 items-start p-4">
        <div className="flex-1 block lg:flex ">
          <div
            className="cursor-pointer flex"
            onClick={() => router.push(`${ROUTES.OTHER_WORKER_PROFILE}/${id}`)}
          >
            <Image
              src={avatar || "/placeholder.svg"}
              width={100}
              height={100}
              alt={name}
              className="mr-4 rounded-full w-16 h-16 object-cover"
            />
            <div>
              <div>
                <h3 className="text-[#0E121B] font-sans text-xl font-medium leading-none ">
                  {name}
                </h3>
                <p className="text-sm text-[#0E121B] font-sans pt-2 not-italic font-normal leading-none tracking-tight">
                  {title}
                </p>
                {/* <div className="mt-1 flex items-center">
                  <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{rating}</span>
                  <span className="ml-2 text-xs text-gray-500">({jobsCompleted} jobs)</span>
                </div> */}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.slice(0, 4).map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="font-sans p-1 text-xs not-italic font-medium leading-5 text-nixerly-businesslabel  "
                  >
                    {formateSkills(skill)}
                  </Badge>
                ))}
              </div>
              <p className="mt-4 text-[#0E121B] font-sans text-base not-italic font-normal leading-[17.56px] tracking-tight">
                <Image
                  src="/locationblack.svg"
                  alt="location icon"
                  width={12}
                  height={12}
                  className="mr-1 inline-block "
                />
                {location}
              </p>
            </div>
          </div>

          <div className="ml-auto flex flex-col items-center my-4 sm:my-0 lg:items-end gap-2 ">
            {/* <Button variant="ghost" size="icon" className="text-gray-400">
              <BookmarkIcon className="h-5 w-5" />
            </Button> */}

            {hasDetailsToShow && (
              <button
                className="flex items-center gap-1 font-sans text-sm  border-0   font-medium leading-4 text-nixerly-businesslabel tracking-tight "
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <span className="inline-flex items-center gap-1 decoration-underline decoration-black underline decoration-[1.5px] underline-offset-4">
                      <span className="underline ">Hide Details</span>
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

      {isExpanded && (
        <div className="px-4 pb-4 text-nixerly-bussinessborder mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2  gap-6 pt-4">
            {certificates.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 px-4">
                  <AwardIcon className="h-5 w-5 text-[#0E121B]" />{" "}
                  {/* Replaced Image with Lucide Icon */}
                  <h4 className="font-sans font-medium text-lg sm:text-xl leading-4 text-[#0E121B]">
                    Certificates
                  </h4>
                  <span className="text-xs text-[#0E121B] px-[5px] py-0.5 bg-gray-300 rounded-full">
                    {certificates.length}
                  </span>
                </div>
                <ScrollArea className="h-[180px] p-2">
                  <div className="space-y-2">
                    {certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="group flex items-start gap-3 p-2 max-w-sm hover:bg-white rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        {cert.assets.length > 0 ? (
                          <div className="relative flex-shrink-0">
                            <Image
                              src={
                                cert.assets[0].url ||
                                "/placeholder.svg?height=100&width=100"
                              }
                              width={100}
                              height={100}
                              alt={cert.name}
                              className="rounded-md object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                            <ScrollText className="h-4 w-4 text-blue-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                              {cert.name}
                            </p>
                            <ExternalLinkIcon className="h-3 w-3 text-nixerly-businesslabel opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {cert.issuingOrg}
                          </p>
                          <p className="text-xs text-nixerly-businesslabel my-1">
                            Issued:{" "}
                            {cert.issueDate
                              ? new Date(cert.issueDate).toLocaleDateString(
                                  "en-GB"
                                )
                              : "N/A"}{" "}
                            • Expires:{" "}
                            {cert.expiryDate
                              ? new Date(cert.expiryDate).toLocaleDateString(
                                  "en-GB"
                                )
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {portfolio.length > 0 && (
              <div className="space-y-3 mt-4 lg:mt-0">
                <div className="flex items-center gap-2 pb-2 px-4">
                  <FolderIcon className="h-5 w-5 text-[#0E121B]" />{" "}
                  {/* Replaced Image with Lucide Icon */}
                  <h4 className="font-sans font-medium text-lg sm:text-xl leading-4 text-[#0E121B]">
                    Portfolio
                  </h4>
                  <span className="text-xs text-[#0E121B] px-[5px] py-0.5 bg-gray-300 rounded-full">
                    {portfolio.length}
                  </span>
                </div>
                <ScrollArea className="h-[180px] pr-2">
                  <div className="space-y-2">
                    {portfolio.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-start gap-3 p-2 max-w-sm hover:bg-white rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        {item.assets.length > 0 ? (
                          <div className="relative flex-shrink-0">
                            <Image
                              src={
                                item.assets[0].url ||
                                "/placeholder.svg?height=100&width=100"
                              }
                              width={100}
                              height={100}
                              alt={item.title}
                              className="rounded-md object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
                            <FolderIcon className="h-4 w-4 text-purple-600" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                              {item.title}
                            </p>
                            <ExternalLinkIcon className="h-3 w-3 text-nixerly-businesslabel opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </div>
                          <p className="text-xs text-nixerly-businesslabel my-1">
                            Issued:{" "}
                            {item.startDate
                              ? new Date(item.startDate).toLocaleDateString(
                                  "en-GB"
                                )
                              : "N/A"}{" "}
                            • Expires:{" "}
                            {item.endDate
                              ? new Date(item.endDate).toLocaleDateString(
                                  "en-GB"
                                )
                              : "N/A"}
                          </p>
                          <TruncatedText
                            text={item.description}
                            maxLength={20} // Adjust this value as needed
                            className="text-sm text-nixerly-businesslabel mt-1"
                          />
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
