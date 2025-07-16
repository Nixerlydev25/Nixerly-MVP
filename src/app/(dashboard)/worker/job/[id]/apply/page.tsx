'use client';

import { useParams } from 'next/navigation';
import JobApplicationForm from './_component/job-application-form';
// import { useGetSingleJob } from "@/hooks/jobs/jobs.hooks"
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Building2,
  MapPin,
  User,
  Clock,
  Calendar,
  Briefcase,
  ChevronLeft,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import JobApplicationSkeleton from './_component/job-application-skeleton';
import { useGetSingleJob } from '@/hook/jobs/jobs.hooks';
import JobAlreadyApplied from './_component/job-already-applied';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from '@/components/ui/separator';

const applicationData = {
  applicationDate: '2023-05-15T10:30:00Z',
  applicationStatus: 'pending' as const,
};

export default function ApplyPage() {
  const { id } = useParams<{ id: string }>();
  const { data: jobDetails, isLoading } = useGetSingleJob(id);

  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <JobApplicationSkeleton />
      </div>
    );
  }
  
  if (!jobDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
          <p>Job not found or has been removed.</p>
          <Button asChild>
            <Link href="/jobs">Browse Jobs</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-6 py-8">
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild className="mb-4 rounded-full">
        <Link href={`/worker/job/${id}`}>
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>

      {/* Job Header - Upwork Style */}
     

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
        <div className="mb-8 border border-nixerly-bussinessborder p-5 rounded-2xl flex">     
          <div className='items-center flex justify-center'>  
        <Avatar className="h-12 w-12 border bg-muted rounded-lg">
          <AvatarImage src={jobDetails?.businessProfile?.profilePicture || "/placeholder.svg?height=64&width=64"} alt="Company logo" />
          <AvatarFallback>Logo</AvatarFallback>
        </Avatar>
        </div>  
        <div className='ml-4'>
        <h1 className="text-base font-bold leading-5 text-nixerly-blue">{jobDetails.title}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-2 text-muted-foreground">
          <span className="flex items-center gap-1 text-sm font-normal">
            <Image src="/locationblack.svg" alt="location" width={10} height={12}/>
            <span>
              {jobDetails.businessProfile?.city || ''},{' '}
              {jobDetails.businessProfile?.state || ''}
            </span> 
          </span>
          <span className="flex items-center gap-1 text-sm font-normal">
          <Image src="/calen.svg" alt="location" width={10} height={12}/>
            <span>
              Posted {new Date(jobDetails.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </span>
        </div>
        <Badge variant="outline" className="font-medium text-xs">
          <span className='text-xs font-medium'>
            {jobDetails?.employmentType ? jobDetails.employmentType.split('_').join(' ').replace(/^\w/, c => c.toUpperCase()) : 'Full-time'}
            </span>
          </Badge>
          </div>
      </div>
          {jobDetails.hasWorkerApplied ? (
            <JobAlreadyApplied
              jobId={id}
              jobTitle={jobDetails.title || 'Job Position'}
              applicationDate={applicationData.applicationDate}
              applicationStatus={applicationData.applicationStatus}
              onWithdrawApplication={async () => {
                // Implement withdrawal logic here
                console.log('Withdrawing application for job:', id);
                // You would typically call an API endpoint here
                return Promise.resolve();
              }}
            />
          ) : (
            <JobApplicationForm
              jobId={id}
              jobTitle={jobDetails.title || 'Job Position'}
              hourlyRateMin={jobDetails.hourlyRateMin}
              hourlyRateMax={jobDetails.hourlyRateMax}
            />
          )}
        </div>

        <div>
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardContent className="space-y-4 px-0">
                <h2 className="text-base font-bold text-nixerly-blue px-6">About this job</h2>
                <Separator/>
                <div className="space-y-3 text-sm px-6">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-base leading-5 text-nixerly-blue font-medium">Posted</p>
                      <p className="text-muted-foreground">
                        {new Date(jobDetails.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-base leading-5 text-nixerly-blue font-medium">Job Type</p>
                      <p className="text-muted-foreground">
                        {jobDetails?.employmentType ? jobDetails.employmentType.split('_').join(' ').replace(/^\w/, c => c.toUpperCase()) : 'Full-time'}
                      </p>
                    </div>
                  </div>

                  {(jobDetails.budget ||
                    (jobDetails.hourlyRateMin && jobDetails.hourlyRateMax)) && (
                    <div className="flex items-start gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-muted-foreground mt-0.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                        <path d="M12 18V6" />
                      </svg>
                      <div>
                        <p className="text-base leading-5 text-nixerly-blue font-medium">Budget</p>
                        <p className="text-muted-foreground">
                          {jobDetails.budget
                            ? `$${jobDetails.budget} (Fixed Price)`
                            : ''}
                          {jobDetails.hourlyRateMin && jobDetails.hourlyRateMax
                            ? `$${jobDetails.hourlyRateMin}-$${jobDetails.hourlyRateMax}/hr`
                            : ''}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-base leading-5 text-nixerly-blue font-medium">Start Date</p>
                      <p className="text-muted-foreground">
                        {jobDetails.startDate
                          ? new Date(jobDetails.startDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'Immediate'}
                      </p>
                    </div>
                  </div>
                </div>

                {jobDetails.skills && jobDetails.skills.length > 0 && (
                  <div className='px-6'>
                    <p className="font-medium mb-2">Skills and Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {jobDetails.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-blue-50 text-blue-700"
                        >
                          {skill.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <Separator/>
              </CardContent>
            </Card>

            {/* Company Card - Upwork Style */}
            <Card>
              <CardContent className="space-y-4 px-0 ">
                <h2 className="text-base font-bold px-6 text-nixerly-blue">About the client</h2>
                <Separator/>
                <div className="flex items-center gap-3 mb-4 px-6">
                <div className='items-center flex justify-center'>  
                 <Avatar className="h-12 w-12 border bg-muted rounded-lg">
                  <AvatarImage src={jobDetails?.businessProfile?.profilePicture || "/placeholder.svg?height=64&width=64"} alt="Company logo" />
                  <AvatarFallback>Logo</AvatarFallback>
                  </Avatar>
                  </div>  
                     <div className=''>
                    <h3 className="font-semibold text-nixerly-blue">
                      {jobDetails.businessProfile?.companyName ||
                        'Company Name'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {jobDetails.businessProfile?.city || ''},{' '}
                      {jobDetails.businessProfile?.state || ''}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm px-6">
                  <div className="flex items-center gap-3">
                  <Image src="/building.svg" alt="calender" width={20} height={20}/>
                    <div>
                      <p className="font-medium text-nixerly-blue">Industry</p>
                      <p className="text-muted-foreground">
                        {jobDetails.businessProfile?.industry || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                  <Image src="/user.svg" alt="calender" width={20} height={20}/>
                    <div>
                      <p className="font-medium text-nixerly-blue">Company Size</p>
                      <p className="text-muted-foreground">
                        {jobDetails.businessProfile?.employeeCount || 'Not specified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                  <Image src="/calen.svg" alt="calender" width={20} height={20}/>
                    <div>
                      <p className="font-medium text-nixerly-blue">Member Since</p>
                      <p className="text-muted-foreground">
                        {jobDetails.businessProfile?.yearFounded || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 px-6">
                  <p className="text-sm border border-nixerly-bussinessborder rounded-xl p-2 ">
                    {jobDetails.businessProfile?.description ||
                      'No company description available.'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Application Tips */}
            {!jobDetails.hasWorkerApplied && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4 text-nixerly-blue">Proposal Tips</h2>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Highlight your relevant trade experience</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Be clear about your availability to start</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Mention any certifications or licenses you hold</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Provide a competitive rate based on your skills</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Be specific about similar projects you&apos;ve completed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
