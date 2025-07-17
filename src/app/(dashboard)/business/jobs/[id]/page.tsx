"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  Phone,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  useGetSingleJob,
  useGetJobApplicants,
  useToggleJobStatus,
} from "@/hook/jobs/jobs.hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import JobApplicantsPageSkeleton from "./_components/job-applicants-skeleton";
import { useDebounce } from "@/hook/common/useDebounce";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ROUTES } from "@/lib/routes";
import { ModalType } from "@/types/model";
import { useModalStore } from "@/store/modal.store";
import Image from "next/image";

// const ITEMS_PER_PAGE = 10;

export default function JobApplicantsPage() {
  const { openModal } = useModalStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearch = useDebounce(searchQuery, 500);
  const currentPage = Number(searchParams.get("page")) || 1;

  const [, setSelectedApplicant] = useState<unknown | null>(null);
  const [, setShowContactInfo] = useState(false);

  const { data: job } = useGetSingleJob(id as string);
  const { data: applicantsData, isLoading } = useGetJobApplicants(id as string);
  const { mutate: toggleJobStatus, isPending } = useToggleJobStatus();
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      const cleanedSearch = debouncedSearch.replace(/\s+/g, " ").trim();
      params.set("search", cleanedSearch.replace(/ /g, "+"));
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
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
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-4 border border-nixerly-bussinessborder rounded-full bg-white text-nixerly-businesslabel text-sm font-medium leading-5 tracking-tight font-inter px-4 py-2 hover:text-white "
        >
          <Link href={`${ROUTES.MY_JOBS}`}>
            <ArrowLeft className=" h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8 ">
          <div className="MAIN">
            <div className="flex items-start gap-4 ">
              {/* Number Badge */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12  border border-nixerly-bussinessborder rounded-full flex items-center justify-center">
                  <Image
                    src="/successstars.svg"
                    alt="user success stars"
                    width="25"
                    height="25"
                  ></Image>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <h1 className="text-nixerly-blue text-xl font-bold leading-5 tracking-tight capitalize font-inter">
                  {job && job?.title}
                </h1>

                <p className=" mt-2  text-sm font-normal leading-5 tracking-tight capitalize font-inter text-nixerly-businesslabel">
                  {applicantsData?.applicants?.length || 0} applicant
                  {applicantsData?.applicants?.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div></div>
          </div>

          <div className="flex gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="text-white text-sm font-medium leading-5 tracking-tight font-inter border bg-[#FF5656] border-nixerly-bussinessborder rounded-full hover:bg-red-500 ">
                  {job?.status === "OPEN" ? "Close Job" : "Open Job"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Close this job posting?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will mark the job as closed and it will no
                    longer be visible to potential applicants. You will still be
                    able to view and contact existing applicants.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => toggleJobStatus(id as string)}
                    disabled={isPending}
                  >
                    {job?.status === "OPEN" ? "Close Job" : "Open Job"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* total application box */}

      <Separator className="text-nixerly-bussinessborder" />
      <div className=" mb-8 mt-3 max-w-sm">
        <Card className="bg-nixerly-blue  ">
          <CardContent className="p-4 ">
            <div className="items-center flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16  rounded-full flex items-center justify-center  bg-[rgba(255,255,255,0.18)]">
                  <Image
                    src="/usermessage.svg"
                    alt="user message"
                    width={30}
                    height={30}
                  ></Image>
                </div>
              </div>

              <div>
                <p className="text-2xl font-bold text-white">
                  {applicantsData?.stats.totalApplications || 0}
                </p>
                <p className="text-sm font-medium text-white ">
                  Total Applicants
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Details Section */}
      <div className="mb-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-nixerly-blue  mb-4  leading-5 tracking-tight  font-inter">
              Job Details
            </h2>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-2">
                <div>
                  {/* <h3 className="text-lg font-medium text-muted-foreground mb-2">
                    Description
                  </h3> */}
                  <p className="text-nixerly-businesslabel text-sm font-normal leading-5 tracking-tight max-w-2xl text-left ">
                    {job?.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-nixerly-blue  mt-4 mb-5  leading-5 tracking-tight  font-inter">
                    Employment Type
                  </h2>
                  <Badge
                    variant="outline"
                    className="text-nixerly-businesslabel text-sm font-normal leading-5 tracking-tight capitalize "
                  >
                    {job?.employmentType?.replace("_", " ")}
                  </Badge>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-nixerly-blue  mt-4 mb-5  leading-5 tracking-tight  font-inter">
                    Job Type & Budget
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className="text-nixerly-businesslabel text-sm font-normal leading-5 tracking-tight capitalize"
                    >
                      {job?.jobType}
                    </Badge>
                    {job?.hourlyRateMin && job?.hourlyRateMax && (
                      <Badge variant="outline">
                        {job.hourlyRateMin}€ - {job.hourlyRateMax}€/hr
                      </Badge>
                    )}
                    {job?.salary && (
                      <Badge variant="outline">{job.salary}€/year</Badge>
                    )}
                    {job?.budget && (
                      <Badge variant="outline">{job.budget}€</Badge>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-nixerly-blue  mt-4 mb-5  leading-5 tracking-tight  font-inter">
                    Positions Available
                  </h2>
                  <p className=" text-nixerly-businesslabel text-sm font-normal leading-5 tracking-tight capitalize">
                    {job?.numberOfPositions} position
                    {job?.numberOfPositions !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-medium text-nixerly-blue  mt-4 mb-5  leading-5 tracking-tight  font-inter">
                    Requirements
                  </h2>
                  <div className=" text-nixerly-businesslabel text-sm font-normal leading-5 tracking-tight max-w-2xl text-left ">
                    {job?.requirements}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-nixerly-blue  mt-4 mb-5 leading-5 tracking-tight  font-inter">
                    Required Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {job?.skills?.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-nixerly-businesslabel text-sm font-normal leading-5 tracking-tight "
                      >
                        {skill
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-medium text-nixerly-blue  mt-4 mb-5  leading-5 tracking-tight  font-inter ">
                    Timeline
                  </h2>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-[#525866]" />
                    <span className="text-nixerly-businesslabel text-sm font-normal leading-5 tracking-tight capitalize">
                      Posted{" "}
                      {new Date(job?.createdAt || "").toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  {job?.startDate && (
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Clock className="h-4 w-4 text-[#525866]" />
                      <span className="text-nixerly-businesslabel text-sm font-normal leading-5 tracking-tight capitalize">
                        Start Date:{" "}
                        {new Date(job.startDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-8">
          <p className="text-base font-normal leading-4 tracking-wide font-inter text-nixerly-businesslabel pr-2 ">
            Search Applicants
          </p>
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search applicants..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 ">
          {applicantsData?.applicants &&
          applicantsData?.applicants.length > 0 ? (
            <>
              {applicantsData?.applicants.map((applicant) => (
                <Card key={applicant.id} className="bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 ">
                      <div className="flex gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={applicant.workerProfile.profilePicture || ""}
                            alt={
                              applicant.workerProfile.user.firstName +
                              " " +
                              applicant.workerProfile.user.lastName
                            }
                          />
                          <AvatarFallback>
                            {applicant.workerProfile.user.firstName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                         {/* <div className="flex-shrink-0">
                <div className="w-16 h-16  rounded-full flex items-center justify-center  bg-nixerly-blue">
                  <Image
                    src="/usermessage.svg"
                    alt="user message"
                    width={30}
                    height={30}
                  ></Image>
                </div>
              </div> */}
                        <div className="space-y-4 ">
                          <h3 className=" text-lg md:text-2xl font-bold leading-[22px] font-inter text-nixerly-blue">
                            {applicant.workerProfile.user.firstName +
                              " " +
                              applicant.workerProfile.user.lastName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-[#525866]" />
                              <span className="text-xs font-medium leading-4 font-inter">
                                {job?.jobType === "HOURLY"
                                  ? `${job?.hourlyRateMin}€-${job?.hourlyRateMax}€/hr`
                                  : job?.jobType === "CONTRACT"
                                  ? `${job?.budget}€ (Fixed)`
                                  : `${job?.salary}€/year`}
                              </span>
                            </span>
                            {/* <span>•</span> */}
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-[#525866]" />
                              <span className="text-xs font-medium leading-4 font-inter">
                                Applied{" "}
                                {new Date(
                                  applicant.createdAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {applicant?.status && (
                              <Badge
                                className="text-sm text-nixerly-businesslabel font-medium leading-4 font-inter bg-white rounded-sm px-2"
                                variant={
                                  applicant?.status === "shortlisted"
                                    ? "default"
                                    : applicant?.status === "rejected"
                                    ? "destructive"
                                    : "outline"
                                }
                              >
                                {applicant.status?.charAt(0).toUpperCase() +
                                  applicant.status?.slice(1)}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-2 items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="text-sm font-medium leading-5 tracking-tight font-inter rounded-full border-nixerly-border text-nixerly-businesslabel "
                              variant="outline"
                              onClick={() => handleViewProposal(applicant)}
                            >
                              View Proposal
                              <ChevronRight className="text-nixerly-businesslabel " />
                            </Button>
                          </DialogTrigger>


{/* view proposal dialog */}



                          <DialogContent className="  max-w-2xl  sm:max-w-3xl  max-h-[90vh] overflow-y-auto ">
                            <DialogHeader className="border-b ">
                              <DialogTitle >
                                {/* Proposal from{" "} */}
                                {applicant.workerProfile.user.firstName +
                                  " " +
                                  applicant.workerProfile.user.lastName}
                              </DialogTitle>
                              <DialogDescription>
                                Applied on{" "}
                                {new Date(
                                  applicant.appliedAt
                                ).toLocaleDateString()}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-6 p-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage
                                    src={
                                      applicant.workerProfile.profilePicture ||
                                      ""
                                    }
                                    alt={
                                      applicant.workerProfile.user.firstName +
                                      " " +
                                      applicant.workerProfile.user.lastName
                                    }
                                  />
                                  <AvatarFallback>
                                    {applicant.workerProfile.user.firstName.charAt(
                                      0
                                    )}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold">
                                    {applicant.workerProfile.user.firstName +
                                      " " +
                                      applicant.workerProfile.user.lastName}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {applicant.relevantExperience?.replace(
                                      /_/g,
                                      " "
                                    )}{" "}
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
                                    <span className="font-medium">Rate:</span>{" "}
                                    {job?.jobType === "HOURLY"
                                      ? `$${job?.hourlyRateMin}-${job?.hourlyRateMax}/hr`
                                      : job?.jobType === "CONTRACT"
                                      ? `$${job?.budget} (Fixed)`
                                      : `$${job?.salary}/year`}
                                  </div>
                                  <div>
                                    <span className="font-medium">
                                      Duration:
                                    </span>{" "}
                                    {applicant.estimatedDuration?.replace(
                                      /_/g,
                                      " "
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



{/* contact modal */}





                              <Separator />
                              

                              <div className="flex justify-between">
                                <Button
                                  onClick={() => {
                                    openModal(ModalType.CONTACT_MODAL, {
                                      applicant,
                                    });
                                  }}
                                >
                                  Contact Applicant
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
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
                  Page {currentPage} of{" "}
                  {applicantsData?.pagination.totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!applicantsData?.pagination.hasMore}
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
