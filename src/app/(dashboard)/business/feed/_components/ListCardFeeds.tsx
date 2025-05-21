import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formateSkills } from "@/lib/utils";
import { CardProps } from "@/types/feed/feed.types";
import { BookmarkIcon, StarIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

function ListCardFeeds({
  id,
  title,
  avatar,
  successRate,
  skills,
  rating,
  name,
  location,
  jobsCompleted,
  hourlyRate,
}: CardProps) {
  return (
    <div
      key={id}
      className="flex flex-col border-b sm:flex-row hover:bg-gray-100 py-4"
    >
      <div className="flex flex-1 items-start p-4">
        <Image
          src={avatar || "/placeholder.svg"}
          width={60}
          height={60}
          alt={name}
          className="mr-4 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-gray-600">{title}</p>
              <div className="mt-1 flex items-center">
                <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({jobsCompleted} jobs)
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-medium text-gray-600">
                Success Rate:
              </span>
              <span className="ml-1 font-medium text-green-600">
                {successRate}%
              </span>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-blue-50 text-blue-700"
              >
                {formateSkills(skill)}
              </Badge>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            <UserIcon className="mr-1 inline-block h-4 w-4" />
            {location}
          </p>
        </div>
        <div className="ml-4 hidden flex-col items-end justify-between md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-blue-600"
          >
            <BookmarkIcon className="h-5 w-5" />
          </Button>
          <div className="mt-auto text-right">
            <div className="text-lg font-bold text-blue-600">${hourlyRate}</div>
            <div className="text-sm text-gray-600">per hour</div>
          </div>
        </div>
      </div>
      {/* <div className="flex border-t bg-gray-50 p-3 sm:w-[180px] sm:flex-col sm:justify-center sm:border-l sm:border-t-0">
        <div className="mr-3 block sm:hidden">
          <div className="text-lg font-bold text-blue-600">${hourlyRate}</div>
          <div className="text-sm text-gray-600">per hour</div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <Button className="w-full bg-blue-600">Contact</Button>
          <Button variant="outline" className="w-full">
            View Profile
          </Button>
        </div>
      </div> */}
    </div>
  );
}

export default ListCardFeeds;
