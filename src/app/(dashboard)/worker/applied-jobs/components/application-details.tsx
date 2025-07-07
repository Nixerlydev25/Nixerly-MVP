import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  MapPin,
  CalendarDays,
  DollarSign,
  Briefcase,
  Clock,
  Users,
  FileText,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ApplicationDetailsProps } from '@/types/application/application.type';

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function formatEmploymentType(type: string) {
  return type
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatDuration(duration: string) {
  return duration
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'accepted':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'withdrawn':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
}

function ApplicationDetails({ application }: ApplicationDetailsProps) {
  return (
    <ScrollArea className="h-full pb-26">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{application.job.title}</h2>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">
                  {application.job.businessProfile.companyName}
                </span>
              </div>
            </div>
            <Badge
              className={getStatusColor(application.status)}
              variant="outline"
            >
              {application.status}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>
                {application.job.location.city},{' '}
                {application.job.location.state},{' '}
                {application.job.location.country}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              <span>Applied {formatDate(application.createdAt)}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Job Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Job Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Hourly Rate</p>
                  <p className="text-sm text-muted-foreground">
                    ${application.job.hourlyRateMin} - $
                    {application.job.hourlyRateMax}/hr
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Employment Type</p>
                  <p className="text-sm text-muted-foreground">
                    {formatEmploymentType(application.job.employmentType)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDuration(application.duration)}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Positions Available</p>
                  <p className="text-sm text-muted-foreground">
                    {application.job.numberOfPositions}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Available Start Date</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(application.workerStartDateAvailability)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Job Type</p>
                  <p className="text-sm text-muted-foreground">
                    {application.job.jobType}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Job Description */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Job Description</h3>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm whitespace-pre-line">
              {application.job.description}
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Requirements</h3>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm whitespace-pre-line">
              {application.job.requirements}
            </p>
          </div>
        </div>

        <Separator />

        {/* Your Application */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Your Application</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Cover Letter</h4>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm whitespace-pre-line">
                  {application.coverLetter}
                </p>
              </div>
            </div>
            {application.proposedRate > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Proposed Rate</h4>
                <p className="text-sm text-muted-foreground">
                  ${application.proposedRate}/hr
                </p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Application Timeline */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Application Timeline</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Application Submitted</span>
              <span className="text-muted-foreground">
                {formatDateTime(application.createdAt)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Last Updated</span>
              <span className="text-muted-foreground">
                {formatDateTime(application.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export { ApplicationDetails };
