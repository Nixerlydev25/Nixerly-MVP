"use client";

import React, { useEffect } from "react";
import {
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
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

export default function JobsPage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");
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

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold font-title">Available Jobs</h1>
          <p className="mt-1 text-gray-500 font-subtitle">
            Showcase your skills and connect with businesses looking for talent
            like yours.
          </p>
        </div>
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:space-x-4">
          <div className="relative hidden md:block">
            <div className="flex items-center">
              <Input
                type="search"
                placeholder="Search for talent..."
                className="w-[300px] rounded-r-none border-r-0 focus:border-blue-600 "
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
              />
              <Button
                type="button"
                className="h-10 rounded-l-none px-4 flex items-center justify-center "
                onClick={() => updateSearchParam(searchValue)}
              >
                <Search className="h-4 w-4 text-white z-10" />
              </Button>
            </div>
            {searchParams.get("search") && (
              <X
                className="absolute right-[80px] top-2.5 h-4 w-4 text-muted-foreground cursor-pointer z-10"
                onClick={() => {
                  setSearchValue("");
                  updateSearchParam("");
                }}
              />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className={`rounded-none ${
                  viewMode === "grid" ? "bg-blue-600" : ""
                }`}
                onClick={() => handleViewModeChange("grid")}
              >
                <Grid3x3 className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className={`rounded-none ${
                  viewMode === "list" ? "bg-blue-600" : ""
                }`}
                onClick={() => handleViewModeChange("list")}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <FilterSidebar />
        </div>

        <div className="w-full lg:w-3/4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
              <h3 className="text-xl font-medium mb-2">Loading jobs...</h3>
            </div>
          ) : jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
              <h3 className="text-xl font-medium mb-2">No jobs found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters to find more jobs
              </p>
              <Button onClick={() => (window.location.href = "?")}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <>
              {/* <div className="flex justify-between items-center mb-4">
                <p className="text-muted-foreground">
                  Total <span className="font-medium">{totalJobs}</span> jobs
                </p>
              </div> */}

              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobs.map((job: Job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col">
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
