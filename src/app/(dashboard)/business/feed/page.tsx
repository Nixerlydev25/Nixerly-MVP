"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GridIcon from "@/components/Icons/GridIcon";
import ListIcon from "@/components/Icons/ListIcon";
import { useGetWorkers } from "@/hook/worker/worker.hook";
import { WorkerProfileResponse } from "@/types/worker.types";
import SkeletonFeed from "./_components/SkeletonFeed";
import FiltersFeeds from "./_components/FiltersFeeds";
import CardFeeds from "./_components/GridCardFeeds";
import ListCardFeeds from "./_components/ListCardFeeds";
import FeedsPagination from "./_components/FeedsPagination";
import { ROUTES } from "@/lib/routes";

enum SortOption {
  RATING = "rating",
  PRICE_LOW_TO_HIGH = "price_low_to_high",
  PRICE_HIGH_TO_LOW = "price_high_to_low",
}

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<"card" | "list">("list");
  const searchParams = useSearchParams();
  const router = useRouter();

  // Hook now handles all filter processing and provides currentPage
  const { data: freelancers, isLoading, currentPage } = useGetWorkers();
  console.log(freelancers);
  const handleWorkerClick = (workerId: string) => {
    router.push(`${ROUTES.OTHER_WORKER_PROFILE}/${workerId}`);
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("sort", value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      {isLoading ? (
        <SkeletonFeed />
      ) : (
        <div className="flex min-h-screen flex-col py-10">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Find Top Talent
              </h1>
              <p className="mt-1 text-gray-600">
                Browse profiles of skilled professionals ready to work on your
                projects
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
              <FiltersFeeds viewMode={viewMode} setViewMode={setViewMode} />
              <div className="flex-1">
                <div className="mb-6 hidden items-center justify-between lg:flex">
                  <div>
                    <p className="text-sm text-gray-600">
                      Showing{" "}
                      <span className="font-medium">
                        {freelancers?.totalCount}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-md border bg-white p-1">
                      <Button
                        variant={viewMode === "card" ? "default" : "ghost"}
                        size="sm"
                        className={`h-8 px-3 ${
                          viewMode === "card" ? "bg-blue-600" : ""
                        }`}
                        onClick={() => setViewMode("card")}
                      >
                        <GridIcon />
                        Grid
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        className={`h-8 px-3 ${
                          viewMode === "list" ? "bg-blue-600" : ""
                        }`}
                        onClick={() => setViewMode("list")}
                      >
                        <ListIcon />
                        List
                      </Button>
                    </div>
                    <Select
                      defaultValue={
                        searchParams.get("sort") || SortOption.RATING
                      }
                      onValueChange={handleSortChange}
                    >
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={SortOption.RATING}>
                          Rating
                        </SelectItem>
                        <SelectItem value={SortOption.PRICE_LOW_TO_HIGH}>
                          Hourly Rate: Low to High
                        </SelectItem>
                        <SelectItem value={SortOption.PRICE_HIGH_TO_LOW}>
                          Hourly Rate: High to Low
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {viewMode === "card" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {freelancers?.data.map(
                      (freelancer: WorkerProfileResponse) => (
                        <div
                          key={freelancer.id}
                          onClick={() => handleWorkerClick(freelancer.id)}
                          className="cursor-pointer"
                        >
                          <CardFeeds
                            id={freelancer.id}
                            title={freelancer.title}
                            avatar={""}
                            successRate={100}
                            skills={freelancer.skills}
                            rating={freelancer.avgRating}
                            name={`${freelancer.user.firstName} ${freelancer.user.lastName}`}
                            location={`${freelancer.city}, ${freelancer.country}`}
                            jobsCompleted={freelancer.completedJobs}
                            hourlyRate={freelancer.hourlyRate}
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div>
                    {freelancers?.data.map(
                      (freelancer: WorkerProfileResponse) => (
                        <div
                          key={freelancer.id}
                          onClick={() => handleWorkerClick(freelancer.id)}
                          className="cursor-pointer"
                        >
                          <ListCardFeeds
                            id={freelancer.id}
                            title={freelancer.title}
                            avatar={""}
                            successRate={100}
                            skills={freelancer.skills}
                            rating={freelancer.avgRating}
                            name={`${freelancer.user.firstName} ${freelancer.user.lastName}`}
                            location={`${freelancer.city}, ${freelancer.country}`}
                            jobsCompleted={freelancer.completedJobs}
                            hourlyRate={freelancer.hourlyRate}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
                <FeedsPagination
                  currentPage={currentPage}
                  totalPages={freelancers?.totalPages || 1}
                  onPageChange={(page) => {
                    const params = new URLSearchParams(
                      Array.from(searchParams.entries())
                    );
                    params.set("page", page.toString());
                    router.replace(`?${params.toString()}`, { scroll: false });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
