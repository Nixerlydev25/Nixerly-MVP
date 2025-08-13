"use client";

import React, { useEffect } from "react";
import {
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  UserX,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FilterSidebar } from "./_components/filter-sidebar";
import { JobCard } from "./_components/job-card";
import { JobListItem } from "./_components/job-list-item";
import { type Job } from "./_components/types";
import { useGetAllJobs } from "@/hook/jobs/jobs.hooks";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import FeedSkeleton from "./_components/FeedSkeleton";
import Image from "next/image";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function JobsPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = React.useState(initialSearch);

  useEffect(() => {
    const savedViewMode = localStorage.getItem("jobsViewMode");
    if (savedViewMode === "grid" || savedViewMode === "list") {
      setViewMode(savedViewMode);
    }
  }, []);

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    localStorage.setItem("jobsViewMode", mode);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (!params.has("page")) {
      params.set("page", "1");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateSearchParam(searchValue);
    }
  };

  function updateSearchParam(value: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    let query = params
      .toString()
      .replace(/(^|&)skills=[^&]*/g, "")
      .replace(/(^|&)search=[^&]*/g, "");
    const skills = searchParams.get("skills");
    // Ensure page parameter is present
    if (!query.includes("page=")) {
      if (query && !query.endsWith("&")) query += "&";
      query += "page=1";
    }
    if (skills) {
      if (query && !query.endsWith("&")) query += "&";
      query += `skills=${skills}`;
    }
    if (value) {
      if (query && !query.endsWith("&")) query += "&";
      query += `search=${value}`;
    }
    router.push(query ? `?${query}` : "?page=1");
  }

  React.useEffect(() => {
    setSearchValue(initialSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSearch]);

  const { data: jobsData, isLoading } = useGetAllJobs();

  const jobs = jobsData?.jobs || [];
  const totalJobs = jobsData?.pagination?.totalCount || 0;
  const totalPages = jobsData?.pagination?.totalPages || 1;
  const currentPage = jobsData?.pagination?.currentPage || 1;
  const hasMore = jobsData?.pagination?.hasMore || false;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return <FeedSkeleton />;
  }

  console.log(jobsData,"jobsData")

  return (
    <div>
      <div className="flex min-h-screen flex-col py-10">
        <div className="container mx-auto px-0 lg:px-4">
          {/* Mobile Layout */}
          <div className="block lg:hidden">
          <h1 className="text-2xl font-bold font-title mb-2">Available Jobs</h1>
             <p className="text-gray-600 font-sans text-sm leading-relaxed mb-4">
                  Showcase your skills and connect with businesses looking for talent like yours.
                </p>
            {/* Mobile Top Controls */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  className="w-full max-w-full p-0 h-[90dvh] sm:h-auto sm:max-h-[80vh] sm:p-6 rounded-t-2xl"
                >
                  <div className="p-4 sm:p-0">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex rounded-lg overflow-hidden">
                <Button
                  variant="default"
                  className="rounded-none hover:bg-transparent px-3 py-2 bg-blue-600 text-white"
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>
            </div>

            {/* Mobile Description */}
            <div className="border border-gray-300 rounded-2xl p-4 mb-8">
              <div className="mb-4">
                <p className="text-gray-600 font-sans text-sm leading-relaxed">
                  Browse profiles of skilled businesses ready to work on your projects 
                </p>
              </div>

              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search for jobs..."
                  className="pl-10 pr-4 h-10.5 border border-gray-200 rounded-lg"
                  value={searchValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold font-title">Available Jobs</h1>
                <p className="mt-1 text-gray-500 font-subtitle">
                  Showcase your skills and connect with businesses looking for talent like yours.
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-4">
                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      className={`rounded-none hover:bg-transparent ${viewMode === "grid" ? "bg-nixerly-blue" : ""}`}
                      onClick={() => handleViewModeChange("grid")}
                    >
                      <Image src="/grid.svg" alt="grid" width={15} height={15} className={viewMode === "grid" ? "invert" : ""}/>
                      Grid
                    </Button>
                    <Separator orientation="vertical" className="h-8" />
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className={`rounded-none hover:bg-transparent ${viewMode === "list" ? "bg-nixerly-blue" : ""}`}  
                      onClick={() => handleViewModeChange("list")}
                    >
                      <List className={`h-4 w-4 mr-2 ${viewMode === "list" ? "text-white" : ""}`} />
                      List
                </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="mb-8" />

            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="w-full lg:w-1/4">
                <div className="flex gap-3 space-y-4 pb-5">
                  <div className="relative w-full">
                    <div className="relative w-full">
                      <Button
                        type="button"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent p-0 ring-0 focus:ring-0 outline-none border-none"
                        onClick={() => updateSearchParam(searchValue)}
                      >
                        <Search className="h-10 w-10 text-[#99A0AE]" />
                      </Button>
                      <Input
                        type="search"
                        placeholder="Search for jobs..."
                        className="pl-11 w-full h-10 font-sans text-sm not-italic font-normal leading-5 tracking-tight text-[#99A0AE] outline-none focus:ring-0 focus:outline-none focus:border-transparent"
                        value={searchValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                      />
                    </div>
                  </div>
                </div>
                <FilterSidebar />
              </div>

              <div className="w-full lg:w-3/4">
                {jobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <UserX className="h-16 w-16 mb-4" />
                    <h3 className="text-lg font-medium">No jobs found</h3>
                    <p className="text-sm">Try adjusting your filters to find more jobs</p>
                    <Button onClick={() => (window.location.href = "?")} className="mt-4">
                      Clear all filters
                    </Button>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {jobs.map((job: Job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                ) : (
                  <div>
                    <h1 className="text-nixerly-blue text-xl font-semibold leading-8 font-inter">Available Jobs</h1>
                    {jobs.map((job: Job) => (
                      <JobListItem key={job.id} job={job} />
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex flex-col items-center justify-center gap-4 mt-8 border-t pt-6">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                          (pageNum) => (
                            <Button
                              key={pageNum}
                              variant={
                                pageNum === currentPage ? "default" : "outline"
                              }
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </Button>
                          )
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!hasMore}
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages} • {totalJobs} total jobs
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="block lg:hidden">
            <div className="w-full">
              {jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <UserX className="h-16 w-16 mb-4" />
                  <h3 className="text-lg font-medium">No jobs found</h3>
                  <p className="text-sm">Try adjusting your filters to find more jobs</p>
                  <Button onClick={() => (window.location.href = "?")} className="mt-4">
                    Clear all filters
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  {jobs.map((job: Job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div>
                  <h1 className="text-nixerly-blue text-xl font-semibold leading-8 font-inter mb-4">Available Jobs</h1>
                  {jobs.map((job: Job) => (
                    <JobListItem key={job.id} job={job} />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex flex-col items-center justify-center gap-4 mt-8 border-t pt-6">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </Button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (pageNum) => (
                          <Button
                            key={pageNum}
                            variant={
                              pageNum === currentPage ? "default" : "outline"
                            }
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!hasMore}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages} • {totalJobs} total jobs
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
