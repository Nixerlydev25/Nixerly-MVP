import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Building2,
  MapPin,
  DollarSign,
  Clock,
  CalendarDays,
  Mail,
  Phone,
  Globe,
  Briefcase,
} from 'lucide-react';

interface ApplicationDetailsProps {
  application: any; // Replace with proper type when available
}

export function ApplicationDetails({ application }: ApplicationDetailsProps) {
  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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

  function formatDuration(duration: string) {
    return duration
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  return (
    <div className="mt-6 space-y-8">
      {/* Application Status */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Application Status</h3>
        <div className="flex items-center gap-4">
          <Badge className={getStatusColor(application.status)}>
            {application.status}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Last updated: {formatDate(application.updatedAt)}
          </span>
        </div>
      </div>

      <Separator />

      {/* Job Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Job Details</h3>
        <div className="grid gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">{application.job.title}</h4>
              <p className="text-sm text-muted-foreground">
                {application.job.businessProfile.companyName}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {application.job.location.city}, {application.job.location.state}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                ${application.job.hourlyRateMin} - ${application.job.hourlyRateMax}
                /hr
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {formatDuration(application.duration)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Available from:{' '}
                {formatDate(application.workerStartDateAvailability)}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Job Description</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {application.job.description}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Company Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Company Information</h3>
        <div className="grid gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {application.job.businessProfile.companyName}
            </span>
          </div>
          {application.job.businessProfile.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a
                href={application.job.businessProfile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {application.job.businessProfile.website}
              </a>
            </div>
          )}
          {application.job.businessProfile.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a
                href={`mailto:${application.job.businessProfile.email}`}
                className="text-sm text-primary hover:underline"
              >
                {application.job.businessProfile.email}
              </a>
            </div>
          )}
          {application.job.businessProfile.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a
                href={`tel:${application.job.businessProfile.phone}`}
                className="text-sm text-primary hover:underline"
              >
                {application.job.businessProfile.phone}
              </a>
            </div>
          )}
        </div>
      </div>

      <Separator />

      {/* Application Details */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Your Application</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Cover Letter</h4>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm whitespace-pre-line">
                {application.coverLetter}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Applied on: {formatDate(application.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}