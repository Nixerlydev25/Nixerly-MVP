import { formatDistanceToNow } from 'date-fns';
import { DollarSign, Clock } from 'lucide-react';
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
      className="border-b p-6 cursor-pointer hover:bg-gray-100 transition"
    >
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <Avatar className="h-16 w-16 rounded-sm">
            <AvatarImage src={job.businessProfile.profilePictureUrl} alt={job.businessProfile.companyName} />
            <AvatarFallback className="text-lg">{job.businessProfile.companyName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground flex-wrap gap-x-2">
                <span className="font-medium">{job.businessProfile.companyName}</span>
                <span>•</span>
                <span>
                  {job.location.city}, {job.location.state}
                </span>
                <span>•</span>
                <span>Posted {timeAgo}</span>
              </div>
            </div>
            <Badge
              variant={job.status === 'OPEN' ? 'default' : 'secondary'}
              className={`mt-2 md:mt-0 ${
                job.status === 'OPEN' ? 'bg-blue-500' : 'bg-gray-500'
              }`}
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
                Rate: {formatCurrency(job.hourlyRateMin)} -{' '}
                {formatCurrency(job.hourlyRateMax)}/hr
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {displaySkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                {skill.replace(/_/g, ' ')}
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
                        <span key={skill}>{skill.replace(/_/g, ' ')}</span>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
