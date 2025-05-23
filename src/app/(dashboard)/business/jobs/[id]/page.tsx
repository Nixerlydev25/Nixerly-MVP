'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  //   Download,
  //   ExternalLink,
  Mail,
  Phone,
  Search,
  User,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetSingleJob, useGetJobApplicants } from '@/hook/jobs/jobs.hooks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import JobApplicantsPageSkeleton from './_components/job-applicants-skeleton';
import { useDebounce } from '@/hook/common/useDebounce';

// const ITEMS_PER_PAGE = 10;

export default function JobApplicantsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const currentPage = Number(searchParams.get('page')) || 1;

  const [, setSelectedApplicant] = useState<unknown | null>(null);
  const [, setShowContactInfo] = useState(false);

  const { data: job } = useGetSingleJob(id as string);
  const { data: applicantsData, isLoading } = useGetJobApplicants(id as string);

  console.log({applicantsData})

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      const cleanedSearch = debouncedSearch.replace(/\s+/g, ' ').trim();
      params.set('search', cleanedSearch.replace(/ /g, '+'));
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  // const totalPages = Math.ceil(
  //   (filteredApplicants?.length || 0) / ITEMS_PER_PAGE
  // );
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const paginatedApplicants = filteredApplicants?.slice(
  //   startIndex,
  //   startIndex + ITEMS_PER_PAGE
  // );

  const handleViewProposal = (applicant: unknown) => {
    setSelectedApplicant(applicant);
  };

  const handleContactClick = () => {
    setShowContactInfo(true);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <JobApplicantsPageSkeleton />
      </div>
    );
  }

  //   if (!job) {
  //     return (
  //       <div className="container mx-auto px-4 py-8">
  //         <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
  //           <p>Job not found or has been removed.</p>
  //           <Button asChild>
  //             <Link href="/business/dashboard">Back to Dashboard</Link>
  //           </Button>
  //         </div>
  //       </div>
  //     );
  //   }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/business/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">{job && job?.title}</h1>
            <p className="text-muted-foreground mt-1">
              {applicantsData?.applicants?.length || 0} applicant
              {applicantsData?.applicants?.length !== 1 ? 's' : ''}
            </p>
          </div>
          {/* <div className="flex gap-2">
            <Button>
              <ExternalLink className="mr-2 h-4 w-4" /> View Job Post
            </Button>
          </div> */}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Applicants
                </p>
                <p className="text-2xl font-bold">
                  {applicantsData?.stats.totalApplications || 0}
                </p>
              </div>
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Hourly Rate
                </p>
                <p className="text-2xl font-bold">
                  $
                  {applicantsData?.stats.averageHourlyRateProposed
                    ? applicantsData?.stats.averageHourlyRateProposed
                    : 0}
                </p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search applicants..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4">
          {applicantsData?.applicants &&
          applicantsData?.applicants.length > 0 ? (
            <>
              {applicantsData?.applicants.map((applicant) => (
                <Card key={applicant.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={applicant.avatar || ''}
                            alt={applicant.workerProfile.user.firstName + ' ' + applicant.workerProfile.user.lastName}
                          />
                          <AvatarFallback>
                            {applicant.workerProfile.user.firstName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h3 className="font-semibold">
                            {applicant.workerProfile.user.firstName + ' ' + applicant.workerProfile.user.lastName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{`$${applicant.proposedRate}/hr`}</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                Applied{' '}
                                {new Date(
                                  applicant.createdAt
                                ).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary">
                              {applicant.relevantExperience?.replace(/_/g, ' ')}
                            </Badge>
                            {applicant?.status && (
                              <Badge
                                variant={
                                  applicant?.status === 'shortlisted'
                                    ? 'default'
                                    : applicant?.status === 'rejected'
                                    ? 'destructive'
                                    : 'outline'
                                }
                              >
                                {applicant.status?.charAt(0).toUpperCase() +
                                  applicant.status?.slice(1)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => handleViewProposal(applicant)}
                            >
                              View Proposal
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                Proposal from {applicant.fullName}
                              </DialogTitle>
                              <DialogDescription>
                                Applied on{' '}
                                {new Date(
                                  applicant.appliedAt
                                ).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-6">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage
                                    src={applicant.avatar || ''}
                                    alt={applicant.fullName}
                                  />
                                  <AvatarFallback>
                                    {applicant.workerProfile.user.firstName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold">
                                    {applicant.workerProfile.user.firstName + ' ' + applicant.workerProfile.user.lastName}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {applicant.relevantExperience?.replace(
                                      /_/g,
                                      ' '
                                    )}{' '}
                                    Experience
                                  </p>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium mb-2">
                                  Payment Terms
                                </h4>
                                <div className="flex gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">Rate:</span>{' '}
                                    {applicant.paymentType === 'hourly'
                                      ? `$${applicant.proposedRate}/hr`
                                      : `$${applicant.fixedBudget} (Fixed)`}
                                  </div>
                                  <div>
                                    <span className="font-medium">
                                      Duration:
                                    </span>{' '}
                                    {applicant.estimatedDuration?.replace(
                                      /_/g,
                                      ' '
                                    )}
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              <div>
                                <h4 className="text-sm font-medium mb-2">
                                  Cover Letter
                                </h4>
                                <div className="text-sm whitespace-pre-line bg-muted p-4 rounded-md">
                                  {applicant.coverLetter}
                                </div>
                              </div>

                              {applicant.certifications && (
                                <>
                                  <Separator />
                                  <div>
                                    <h4 className="text-sm font-medium mb-2">
                                      Certifications & Licenses
                                    </h4>
                                    <div className="text-sm whitespace-pre-line bg-muted p-4 rounded-md">
                                      {applicant.certifications}
                                    </div>
                                  </div>
                                </>
                              )}

                              <Separator />

                              <div className="flex justify-between">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button onClick={handleContactClick}>
                                      Contact Applicant
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Contact Information
                                      </DialogTitle>
                                      <DialogDescription>
                                        Contact details for {applicant.fullName}
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Avatar className="h-16 w-16">
                                          <AvatarImage
                                            src={applicant.avatar || ''}
                                            alt={applicant.workerProfile.user.firstName + ' ' + applicant.workerProfile.user.lastName}
                                          />
                                          <AvatarFallback>
                                            {applicant.workerProfile.user.firstName.charAt(0)}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <h3 className="font-semibold text-lg">
                                            {applicant.workerProfile.user.firstName + ' ' + applicant.workerProfile.user.lastName}
                                          </h3>
                                          <p className="text-sm text-muted-foreground">
                                            {applicant.relevantExperience?.replace(
                                              /_/g,
                                              ' '
                                            )}{' '}
                                            Experience
                                          </p>
                                        </div>
                                      </div>

                                      <Separator />

                                      <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                          <Phone className="h-5 w-5 text-muted-foreground" />
                                          <div>
                                            <p className="font-medium">Phone</p>
                                            <p>{applicant.phone}</p>
                                            <div className="flex gap-2 mt-1">
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                              >
                                                <a
                                                  href={`tel:${applicant.phone}`}
                                                >
                                                  Call
                                                </a>
                                              </Button>
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                              >
                                                <a
                                                  href={`https://wa.me/${applicant?.phone?.replace(
                                                    /[^0-9]/g,
                                                    ''
                                                  )}`}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  WhatsApp
                                                </a>
                                              </Button>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                          <Mail className="h-5 w-5 text-muted-foreground" />
                                          <div>
                                            <p className="font-medium">Email</p>
                                            <p>{applicant.email}</p>
                                            <div className="mt-1">
                                              <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                              >
                                                <a
                                                  href={`mailto:${applicant.email}`}
                                                >
                                                  Send Email
                                                </a>
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>

                                <div className="flex gap-2">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="outline">
                                        Set Status{' '}
                                        <ChevronDown className="ml-2 h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem>
                                        <Check className="mr-2 h-4 w-4" />{' '}
                                        Shortlist
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Calendar className="mr-2 h-4 w-4" />{' '}
                                        Schedule Interview
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <X className="mr-2 h-4 w-4" /> Reject
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewProposal(applicant)}
                            >
                              View Proposal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleContactClick}>
                              Contact Applicant
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" /> Shortlist
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <X className="mr-2 h-4 w-4" /> Reject
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Pagination Controls */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {applicantsData?.pagination.totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    !applicantsData?.pagination.hasMore
                  }
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No applicants found</h3>
              <p className="text-muted-foreground mt-1">
                Try adjusting your search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
