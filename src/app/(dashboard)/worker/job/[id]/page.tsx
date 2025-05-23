'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetSingleJob } from '@/hook/jobs/jobs.hooks';
import { ROUTES } from '@/lib/routes';
import {
  Briefcase,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Flag,
  Heart,
  MapPin,
  Share2,
  PenToolIcon as Tool,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function JobPostDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: jobDetails } = useGetSingleJob(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Job Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted">
                  <Image
                    src="/placeholder.svg?height=64&width=64"
                    alt="Company logo"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    {jobDetails?.title || 'Job Title'}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      <span>
                        {jobDetails?.businessProfile?.companyName ||
                          'Company Name'}
                      </span>
                    </span>
                    <span className="hidden md:inline">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {jobDetails?.businessProfile?.city || ''},{' '}
                        {jobDetails?.businessProfile?.state || ''}
                      </span>
                    </span>
                    <span className="hidden md:inline">•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Posted{' '}
                        {jobDetails
                          ? new Date(jobDetails.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : ''}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex gap-2">
                <Button size="icon" variant="outline">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Save job</span>
                </Button>
                <Button size="icon" variant="outline">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share job</span>
                </Button>
                <Button size="icon" variant="outline">
                  <Flag className="h-5 w-5" />
                  <span className="sr-only">Report job</span>
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Badge
                className="flex items-center gap-1 text-sm"
                variant="outline"
              >
                <Clock className="h-3.5 w-3.5" />
                {jobDetails?.employmentType ? jobDetails.employmentType.split('_').join(' ').replace(/^\w/, c => c.toUpperCase()) : 'Full-time'}
              </Badge>
            </div>
            <div className="flex md:hidden gap-2">
              <Button size="icon" variant="outline">
                <Heart className="h-5 w-5" />
                <span className="sr-only">Save job</span>
              </Button>
              <Button size="icon" variant="outline">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share job</span>
              </Button>
              <Button size="icon" variant="outline">
                <Flag className="h-5 w-5" />
                <span className="sr-only">Report job</span>
              </Button>
            </div>
          </div>

          {/* Job Details Tabs */}
          <div className="space-y-8">
            {/* Description Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">
                Job Description
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>{jobDetails?.description || 'No description available.'}</p>
              </div>
            </div>

            {/* Requirements Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">
                Job Requirements
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <h3 className="text-base font-medium text-foreground mb-2">
                  Requirements:
                </h3>
                <div className="whitespace-pre-line">
                  {jobDetails?.requirements || 'No requirements specified.'}
                </div>
              </div>
            </div>

            {/* Company Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">
                About {jobDetails?.businessProfile?.companyName || 'Company'}
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                  {jobDetails?.businessProfile?.description ||
                    'No company description available.'}
                </p>
                <div className="mt-4">
                  <p>
                    <strong>Industry:</strong>{' '}
                    {jobDetails?.businessProfile?.industry || 'Not specified'}
                  </p>
                  <p>
                    <strong>Location:</strong>{' '}
                    {jobDetails?.businessProfile?.city || ''},{' '}
                    {jobDetails?.businessProfile?.state || ''},{' '}
                    {jobDetails?.businessProfile?.country || ''}
                  </p>
                  <p>
                    <strong>Employee Count:</strong>{' '}
                    {jobDetails?.businessProfile?.employeeCount ||
                      'Not specified'}
                  </p>
                  <p>
                    <strong>Year Founded:</strong>{' '}
                    {jobDetails?.businessProfile?.yearFounded ||
                      'Not specified'}
                  </p>
                  {jobDetails?.businessProfile?.website && (
                    <p>
                      <strong>Website:</strong>{' '}
                      {jobDetails?.businessProfile?.website}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Jobs */}
          {/* <div className="space-y-4">
            <h2 className="text-xl font-semibold">Similar Jobs</h2>
            <div className="grid gap-4">
              {[1, 2, 3].map((job) => (
                <Card key={job}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          alt="Company logo"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">
                          <Link href="#" className="hover:underline">
                            {job === 1
                              ? "Journeyman Plumber for Commercial Project"
                              : job === 2
                              ? "Apprentice Plumber - Training Provided"
                              : "Plumbing Maintenance Technician"}
                          </Link>
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" />
                            <span>
                              {job === 1
                                ? "ABC Plumbing"
                                : job === 2
                                ? "City Plumbers Inc."
                                : "Maintenance Masters"}
                            </span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>
                              {job === 1
                                ? "Los Angeles, CA"
                                : job === 2
                                ? "San Diego, CA"
                                : "Oceanside, CA"}
                            </span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <DollarSign className="h-3 w-3" />
                            {job === 1
                              ? "$40-50/hr"
                              : job === 2
                              ? "$20-25/hr"
                              : "$30-35/hr"}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="flex items-center gap-1"
                          >
                            <Clock className="h-3 w-3" />
                            {job === 1
                              ? "Full-time"
                              : job === 2
                              ? "Full-time"
                              : "Part-time"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div> */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                {/* <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Job Details</h3>
                  <Badge variant="secondary">Verified</Badge>
                </div> */}
                {/* <Separator /> */}
                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {jobDetails?.budget ? `$${jobDetails.budget}` : ''}
                        {jobDetails?.hourlyRateMin && jobDetails?.hourlyRateMax
                          ? ` ($${jobDetails.hourlyRateMin}-$${jobDetails.hourlyRateMax}/hr)`
                          : ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Based on experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {jobDetails?.employmentType ? jobDetails.employmentType.split('_').join(' ').replace(/^\w/, c => c.toUpperCase()) : 'Full-time'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {jobDetails?.jobType || '.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Start date</p>
                      <p className="text-sm text-muted-foreground">
                        {jobDetails?.startDate
                          ? new Date(jobDetails.startDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'Immediate'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Professionals</p>
                      <p className="text-sm text-muted-foreground">
                        {jobDetails?.numberOfWorkersRequired ||
                          jobDetails?.numberOfPositions ||
                          1}{' '}
                        Required
                      </p>
                    </div>
                  </div>
                  {jobDetails?.skills && jobDetails.skills.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {jobDetails.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700"
                          >
                            <Tool className="h-3.5 w-3.5" />
                            {skill.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <Button
                className="w-full bg-blue-700 text-white hover:bg-blue-800"
                onClick={() =>
                  router.push(`${ROUTES.WORKER_JOB}/${jobDetails?.id}/apply`)
                }
              >
                Apply Now
              </Button>
              {/* <Button variant="outline" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Employer
              </Button> */}
            </CardContent>
          </Card>

          {/* Employer Card */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Company logo"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <Link
                    href={`${ROUTES.OTHER_BUSINESS_PROFILE}/${jobDetails?.businessProfile?.id}`}
                  >
                    <h3 className="font-semibold">
                      {jobDetails?.businessProfile?.companyName ||
                        'Company Name'}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Member since{' '}
                    {jobDetails?.businessProfile?.yearFounded || 'N/A'}
                  </p>
                </div>
              </div>
              {/* <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Response rate</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Average response time</span>
                  <span className="font-medium">2 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Jobs posted</span>
                  <span className="font-medium">27</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Hire rate</span>
                  <span className="font-medium">87%</span>
                </div>
              </div> */}
              {/* <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-muted-foreground">
                  (124 reviews)
                </span>
              </div> */}
            </CardContent>
          </Card>

          {/* Job Location */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Job Location</h3>
              <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Map location"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {jobDetails?.businessProfile?.city || ''},{' '}
                {jobDetails?.businessProfile?.state || ''},{' '}
                {jobDetails?.businessProfile?.country || ''}
                <br />
                Exact address provided after application
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
