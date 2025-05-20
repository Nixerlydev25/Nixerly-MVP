import { formatDistanceToNow } from "date-fns";
import { Building2, DollarSign, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { type Job } from "./types";
import { formatCurrency } from "./utils";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

interface JobListItemProps {
  job: Job;
}

export function JobListItem({ job }: JobListItemProps) {
  const createdAt = new Date(job.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });

  const displaySkills = job.skills.slice(0, 5);
  const extraSkillsCount = job.skills.length - 5;

  const router = useRouter();

  const handleJobClick = () => {
    router.push(`${ROUTES.WORKER_JOB}/${job.id}`);
  };

  return (
    <div
      onClick={handleJobClick}
      className="border-b p-10 cursor-pointer hover:bg-gray-100 transition"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Building2 className="h-3 w-3 mr-1" />
                <span>{job.businessProfile.companyName}</span>
                <span className="mx-1">•</span>
                <span>
                  {job.businessProfile.city}, {job.businessProfile.state}
                </span>
                <span className="mx-1">•</span>
                <span>Posted {timeAgo}</span>
              </div>
            </div>
            <Badge
              variant={job.status === "OPEN" ? "default" : "secondary"}
              className="mt-2 md:mt-0"
            >
              {job.status}
            </Badge>
          </div>

          <p className="text-sm line-clamp-2 mb-3">{job.description}</p>

          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center bg-muted px-2 py-1 rounded-md">
              <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-xs font-medium">
                Budget: {formatCurrency(job.budget)}
              </span>
            </div>
            <div className="flex items-center bg-muted px-2 py-1 rounded-md">
              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-xs font-medium">
                Rate: {formatCurrency(job.hourlyRateMin)} - {formatCurrency(job.hourlyRateMax)}/hr
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {displaySkills.map((skill) => (
              <Badge key={skill} variant="outline" className="text-xs">
                {skill.replace(/_/g, " ")}
              </Badge>
            ))}
            {extraSkillsCount > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="text-xs">
                      +{extraSkillsCount} more
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col gap-1">
                      {job.skills.slice(5).map((skill) => (
                        <span key={skill}>{skill.replace(/_/g, " ")}</span>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {/* <div className="flex md:flex-col gap-2 justify-end items-end">
          <Button className="w-full md:w-auto bg-blue-600">
            Apply Now
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            View Details
          </Button>
        </div> */}
      </div>
    </div>
  );
}