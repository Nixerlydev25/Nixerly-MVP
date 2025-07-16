"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Building2,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Clock,
  MapPin,
  Plus,
  Search,
  MoreVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useListMyJobs, useToggleJobStatus } from "@/hook/jobs/jobs.hooks";
import { ROUTES } from "@/lib/routes";
import JobsSkeleton from "./_components/jobs-skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import Image from "next/image";
import { Separator } from "@radix-ui/react-select";

interface JobApplicant {
  id: string;
  // Add other applicant properties as needed
}

interface Job {
  id: string;
  title: string;
  status: string;
  employmentType: string;
  createdAt: string;
  totalApplications?: number;
  location: {
    city: string;
    state: string;
    country: string;
  };
  businessProfile?: {
    companyName: string;
    city: string;
    state: string;
  };
  applicants?: JobApplicant[];
}

export default function BusinessDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading } = useListMyJobs();
  const jobs = data?.jobs as Job[] | undefined;
  const [searchQuery, setSearchQuery] = useState("");
  const currentStatus = searchParams.get("status") || "ALL";
  const { mutate: toggleJobStatus, isPending } = useToggleJobStatus();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get("page") || "1";
    const currentSearch = params.get("search") || "";

    params.forEach((_, key) => params.delete(key));

    params.set("page", currentPage);
    if (currentSearch) params.set("search", currentSearch);

    if (value !== "ALL") {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  // Filter jobs based on search query only
  const filteredJobs = jobs?.filter((job: Job) => {
    return job.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleJobClick = (jobId: string) => {
    router.push(`${ROUTES.MY_JOBS}/${jobId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex justify-center items-center min-h-[400px]">
          <JobsSkeleton />
        </div>
      </div>
    );
  }

  let jobTypes="text-nixerly-businesslabel text-center font-inter text-base font-medium leading-6 not-italic tracking-tight"

  return (
    <div className="container mx-auto px-4 py-8 ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-black font-inter text-2xl font-semibold leading-8 not-italic">
            Job Dashboard
          </h1>
          <p className="font-inter text-base font-normal leading-none not-italic tracking-tight text-nixerly-businesslabe mt-1">
            Manage your job postings and applicants
          </p>
        </div>
        <Button
          className="text-white font-inter text-sm font-normal leading-5 not-italic tracking-tight rounded-full bg-nixerly-blue py-2 px-4"
          onClick={() => router.push(ROUTES.POST_A_JOB)}
        >
          <Image
            src="/emailwriting.svg"
            alt="post a job"
            width={16}
            height={16}
          />{" "}
          Post a New Job
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-10 bg-gradient-to-r from-[#E9F8FF8A] to-[rgba(212,241,255,0.52)] py-6 px-3 rounded-2xl">
        {/* first box */}
        <Card className="bg-nixerly-blue text-white min-h-20 rounded-xl ">
          <CardContent className="h-full py-4">
            <div className="flex items-center space-x-4 ">
              <div className="w-10 h-10 sm:w-14 sm:h-14  rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.18)] ">
                <Image
                  src="/usermessage.svg"
                  alt="image "
                  width={32}
                  height={32}
                />
              </div>

              <div>
                <p className="text-white font-inter text-2xl font-extrabold leading-[22px] not-italic">
                  {data?.jobStatusCounts?.open}
                </p>

                <p className="text-white font-inter text-sm pt-1 leading-[22px]  not-italic">Active Jobs</p>
              </div>
              {/* <Briefcase className="h-8 w-8 text-white" /> */}
            </div>
          </CardContent>
        </Card>
        {/* second box */}
        <Card className=" text-white bg-[#8152E7] min-h-20 rounded-xl">
           <CardContent className="h-full py-4 ">
            <div className="flex items-center space-x-4 h-full">
              <div className="w-10 h-10 sm:w-14 sm:h-14  rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.18)] ">
                <Image
                  src="/messagehand.svg"
                  alt="image "
                  width={32}
                  height={32}
                />
              </div>
              
              <div>
                 <p className="text-white font-inter text-2xl font-extrabold leading-[22px] not-italic">
                  {data?.pagination?.totalCount}
                </p>
                <p className="text-white font-inter text-sm pt-1 leading-[22px]  not-italic">Total Jobs</p>
               
              </div>
              {/* <Briefcase className="h-8 w-8 " /> */}
            </div>
          </CardContent>
        </Card>

        {/* third box */}
        <Card className=" bg-[#03B9D2] text-white min-h-20 rounded-xl">
          <CardContent className="h-full py-4">
            <div className="flex items-center space-x-4 h-full">
              <div className="w-10 h-10 sm:w-14 sm:h-14  rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.18)] ">
                <Image
                  src="/clock.svg"
                  alt="image "
                  width={32}
                  height={32}
                />
              </div>


              <div>
                <p className="text-white font-inter text-2xl font-extrabold leading-[22px] not-italic">14 days</p>
                <p className="text-white font-inter text-sm pt-1 leading-[22px]  not-italic">Avg. Time to Fill</p>
                
              </div>
              {/* <Clock className="h-8 w-8 " /> */}
            </div>
          </CardContent>
        </Card>
      </div>

{/* all jobs open close */}

      <div className="mb-6">
        <Tabs
          value={currentStatus}
          className="w-full"
          onValueChange={handleTabChange}
        >
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <TabsList className="mb-2 md:mb-0 ">
              <TabsTrigger className={jobTypes} value="ALL">All Jobs</TabsTrigger>
              <TabsTrigger className={jobTypes} value="OPEN">Open</TabsTrigger>
              <TabsTrigger  className={jobTypes} value="CLOSED">Closed</TabsTrigger>
            </TabsList>
            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search jobs..."
                className="pl-8 h-10 text-base border-nixerly-bussinessborder shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid">
            {filteredJobs && filteredJobs.length > 0 ? (
              <>
                {filteredJobs.map((job: Job) => (
                  <Card
                    key={job.id}
                    className="cursor-pointer  transition-shadow border-0 border-b border-nixerly-bussinessborder rounded-none  hover:bg-gray-50 my-2 "
                  >
                    <CardHeader>
                      <div className="flex flex-col md:flex-row justify-between">
                        <div
                          className="space-y-2"
                          onClick={() => handleJobClick(job.id)}
                        >
                          <div className="flex items-center gap-2   pb-2">
                            <CardTitle className=" text-base md:text-xl font-medium leading-5 text-[#0E121B]  ">{job.title}</CardTitle>
                            <Badge
                            className="rounded-full bg-nixerly-blue text-white mt-1 ml-2"
                              variant={
                                job.status === "open" ? "default" : "secondary"
                              }
                            >
                              {job.status.charAt(0).toUpperCase() +
                                job.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-2">
                                  <Image src="/buildingblack.svg" alt="clander"  width={14} height={14} className="h-3.5 w-3.5 text-[#383a3d]"/>
                              <span className="font-inter text-sm font-normal leading-5 tracking-[-0.084px] not-italic text-nixerly-businesslabel">{job.businessProfile?.companyName}</span>
                            </span>
                            {/* <span>•</span> */}
                            <span className="flex items-center gap-2">
                                 <Image src="/locationblack.svg" alt="clander"  width={14} height={14} className="h-3.5 w-3.5 text-[#383a3d]"/>
                              <span className="font-inter text-sm font-normal leading-5 tracking-[-0.084px] not-italic text-nixerly-businesslabel">
                                {job.location?.city}, {job.location?.state}
                              </span>
                            </span>
                            {/* <span>•</span> */}
                            <span className="flex items-center gap-2">
                              <Image src="/clanderblack.svg" alt="clander"  width={14} height={14} className="h-3.5 w-3.5 text-[#383a3d]"/>
                              <span className="font-inter text-sm font-normal leading-5 tracking-[-0.084px] not-italic text-nixerly-businesslabel">
                                Posted{" "}
                                {new Date(job.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </span>
                          </div>
                        
                        </div>
                        
                       

                        <div className="flex items-center gap-2 mt-8 ">

                          
                          <div className="  border bg-[#F6F8FA] p-1 px-2 rounded-full font-inter text-[11px] font-normal  uppercase not-italic text-nixerly-businesslabel">
                            {job.totalApplications || 0} applicant
                            {job.totalApplications !== 1 ? "s" : ""}
                          </div>
                          <Badge variant="outline" className="md:ml-2  border bg-[#F6F8FA] p-1 md:px-2 rounded-full font-inter text-[11px] font-normal  uppercase not-italic text-nixerly-businesslabel ">
                            {job.employmentType
                              .split("_")
                              .join(" ")
                              .toLowerCase()}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button  className="h-7 w-7 w p-0 ml-2  rounded-full bg-nixerly-blue border ">
                                <MoreVertical className="h-2 w-2" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    Close Job
                                  </DropdownMenuItem>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Close this job posting?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action will mark the job as closed
                                      and it will no longer be visible to
                                      potential applicants. You will still be
                                      able to view and contact existing
                                      applicants.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => toggleJobStatus(job.id)}
                                      disabled={isPending}
                                    >
                                      {job.status === "OPEN"
                                        ? "Close Job"
                                        : "Open Job"}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                   
                        
                    </CardHeader>
                  </Card>
                  
                ))}

                

                {(data?.pagination?.totalCount ?? 0) > 10 && (
                  <div className="flex flex-col items-center justify-center gap-4 mt-8 border-t pt-6">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handlePageChange(
                            (data?.pagination?.currentPage ?? 1) - 1
                          )
                        }
                        disabled={data?.pagination?.currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: data?.pagination?.totalPages ?? 0 },
                          (_, i) => i + 1
                        ).map((pageNum) => (
                          <Button
                            key={pageNum}
                            variant={
                              pageNum === (data?.pagination?.currentPage ?? 1)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handlePageChange(
                            (data?.pagination?.currentPage ?? 1) + 1
                          )
                        }
                        disabled={!data?.pagination?.hasMore}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Page {data?.pagination?.currentPage} of{" "}
                      {data?.pagination?.totalPages} •{" "}
                      {data?.pagination?.totalCount} total jobs
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium">No jobs found</h3>
                <p className="text-muted-foreground mt-1">
                  Try adjusting your search
                </p>
              </div>
            )}
          </div>

          <TabsContent value="ALL" className="mt-0">
            {/* Similar content but filtered for all jobs */}
          </TabsContent>

          <TabsContent value="OPEN" className="mt-0">
            {/* Similar content but filtered for open jobs */}
          </TabsContent>
          <TabsContent value="CLOSED" className="mt-0">
            {/* Similar content but filtered for closed jobs */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
