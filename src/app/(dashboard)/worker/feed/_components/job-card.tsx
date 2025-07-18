import { formatDistanceToNow } from "date-fns";
import { DollarSign, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type Job } from "./types";
import { formatCurrency } from "./utils";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const createdAt = new Date(job.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
  const router = useRouter();

  // Limit skills to first 3 for display
  const displaySkills = job.skills.slice(0, 3);
  const extraSkillsCount = job.skills.length - 3;

  const handleJobClick = () => {
    router.push(`${ROUTES.WORKER_JOB}/${job.id}`);
  };

  return (
    <Card
      className="h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleJobClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 rounded-sm">
            <AvatarImage
              src={job.businessProfile.profilePictureUrl}
              alt={job.businessProfile.companyName}
            />
            <AvatarFallback className="text-lg">
              {job.businessProfile.companyName.charAt(0)}
            </AvatarFallback>
          </Avatar> 
          <div className="flex-grow">
            <div className="flex justify-between items-start gap-2">
              <CardTitle className="text-lg line-clamp-2">
                {job.title}
              </CardTitle>
              <Badge variant={job.status === "OPEN" ? "default" : "secondary"}>
                {job.status}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1 flex-wrap gap-x-2">
              <span className="font-medium">
                {job.businessProfile.companyName}
              </span>
              <span>•</span>
              <span>
                {job.location.city}, {job.location.state}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm line-clamp-3 mb-4">{job.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {formatCurrency(job.budget)}
              </p>
              <p className="text-xs text-muted-foreground">Budget</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">
                {formatCurrency(job.hourlyRateMin)} -{" "}
                {formatCurrency(job.hourlyRateMax)}
              </p>
              <p className="text-xs text-muted-foreground">Hourly Rate</p>
            </div>
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
                    {job.skills.slice(3).map((skill) => (
                      <span key={skill}>{skill.replace(/_/g, " ")}</span>
                    ))}
                  </div> <span className="font-medium">{job.businessProfile.companyName}</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-4">Posted {timeAgo}</CardFooter>
    </Card>
  );
}
