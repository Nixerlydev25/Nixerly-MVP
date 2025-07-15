import { formatDistanceToNow } from 'date-fns';
// import { DollarSign, Clock, Building, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
// import { Button } from "@/components/ui/button";
import { type Job } from './types';
import { formatCurrency } from './utils';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";

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
    <div onClick={handleJobClick} className="border-b p-6 cursor-pointer hover:bg-gray-100 transition">
    <div className="flex gap-6">
      <div className="flex-shrink-0">
        {/* Replaced Avatar with img tag */}
        <Avatar className="h-16 w-16 rounded-sm">
          <AvatarImage
            src={job.businessProfile.profilePictureUrl || "/placeholder.svg"}
            alt={job.businessProfile.companyName}
          />
          <AvatarFallback className="text-lg">{job.businessProfile.companyName.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg leading-6">{job.title}</h3>
            {/* Removed company name, location, and posted time from here */}
          </div>
          {/* Removed status badge */}
        </div>
        <p className="text-sm font-normal leading-7 line-clamp-3 mb-3">{job.description}</p>
        {/* Removed Budget and Rate information */}
        <div className="flex flex-wrap gap-1 mb-3">
          {displaySkills.map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs text-nixerly-businesslabel border border-nixerly-bussinessborder">
              {skill.replace(/_/g, " ")}
            </Badge>
          ))}
          {extraSkillsCount > 0 && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="text-xs font-medium leading-2.5 text-nixerly-businesslabel border border-nixerly-bussinessborder">
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
        {/* New bottom information row */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Image src="/building.svg" alt="building" width={10} height={10}/>
            <span className="font-medium">{job.businessProfile.companyName}</span>
          </div>
          <div className="flex items-center gap-1">
          <Image src="/locationblack.svg" alt="calender" width={10} height={10}/>
            <span>
              {job.location.city}, {job.location.state}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/clanderblack.svg" alt="calender" width={10} height={10}/>
            <span>Posted {timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
