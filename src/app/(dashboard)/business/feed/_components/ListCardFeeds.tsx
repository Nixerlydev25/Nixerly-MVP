import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formateSkills } from "@/lib/utils";
import { CardProps } from "@/types/feed/feed.types";
import { ROUTES } from "@/lib/routes";
import { BookmarkIcon, StarIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function ListCardFeeds({
  id,
  title,
  avatar,
  skills,
  name,
  location,
}: CardProps) {
  const router = useRouter();
  return (
    <div
      key={id}
      className="flex flex-col border-b sm:flex-row hover:bg-gray-100 py-4"
    >
      <div className="flex flex-1 items-start p-4" onClick={()=>router.push(`${ROUTES.OTHER_WORKER_PROFILE}/${id}`)} >
        <Image
          src={avatar || "/placeholder.svg"}
          width={100}
          height={100}
          alt={name}
          className="mr-4 rounded-full w-16 h-16 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-gray-600">{title}</p>
              {/* <div className="mt-1 flex items-center">
                <StarIcon className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({jobsCompleted} jobs)
                </span>
              </div> */}
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.slice(0, 4).map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
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
            className="text-gray-400"
          >
            <BookmarkIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ListCardFeeds;
