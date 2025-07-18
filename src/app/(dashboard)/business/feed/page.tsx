"use client";

import { useState, useEffect } from "react";
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
import { SearchIcon, X, UserX, Megaphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import JobBanner from "./_components/JobBanner";

enum SortOption {
  RATING = "rating",
  PRICE_LOW_TO_HIGH = "price_low_to_high",
  PRICE_HIGH_TO_LOW = "price_high_to_low",
}

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<"card" | "list">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("businessFeedViewMode");
      return saved === "card" || saved === "list" ? saved : "list";
    }
    return "list";
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
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

  const updateSearchParam = (value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("search", value);
    if (!params.has("page")) {
      params.set("page", "1");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const { data: freelancers, isLoading, currentPage } = useGetWorkers();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("sort", value);
    if (!params.has("page")) {
      params.set("page", "1");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };


  const handleViewModeChange = (mode: "card" | "list") => {
    setViewMode(mode);
    localStorage.setItem("businessFeedViewMode", mode);
  };

  console.log({ freelancers })

  return (
    <div>
      {isLoading ? (
        <SkeletonFeed />
      ) : (
        <div className="flex min-h-screen flex-col py-10">
          <div className="container mx-auto px-4">
            <JobBanner />
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-6">


              <div>
                <h1 className="text-black text-xl font-semibold leading-8 font-inter">
                  Find Talent
                </h1>
                <p className="mt-1 text-nixerly-businesslabel font-sans text-base not-italic font-normal leading-none tracking-tight">Browse profiles of skilled professionals ready to work on your
                  projects
                </p>
              </div>
              <div className="hidden items-center justify-between lg:flex gap-2">
                <div className="relative hidden md:block">

                  <div className="relative w-[300px]">
                    <Button
                      type="button"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent p-0 ring-0 focus:ring-0 outline-none border-none "
                      onClick={() => updateSearchParam(searchValue)}
                    >
                      <SearchIcon className="h-10 w-10 text-[#99A0AE] " />
                    </Button>

                    <Input
                      type="search"
                      placeholder="Search for talent..."
                      className="pl-11 w-full h-10 font-sans text-sm not-italic font-normal leading-5 tracking-tight text-[#99A0AE] outline-none focus:ring-0 focus:outline-none focus:border-transparent"
                      value={searchValue}
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyDown}
                    />
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
                <div className="flex items-center gap-4">
                  <Select
                    defaultValue={searchParams.get("sort") || SortOption.RATING}
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="w-[220px] font-sans text-sm not-italic font-normal leading-5 tracking-tight text-[#99A0AE]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="text-[#99A0AE]" value={SortOption.RATING}>Rating</SelectItem>
                      <SelectItem value={SortOption.PRICE_LOW_TO_HIGH}>
                        Hourly Rate: Low to High
                      </SelectItem>
                      <SelectItem value={SortOption.PRICE_HIGH_TO_LOW}>
                        Hourly Rate: High to Low
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "card" ? "default" : "ghost"}
                      size="sm"
                      className={`rounded-none hover:bg-transparent ${viewMode === "card" ? "bg-nixerly-blue" : ""
                        }`}
                      onClick={() => handleViewModeChange("card")}
                    >
                      <GridIcon />
                      Grid
                    </Button>
                    <Separator orientation="vertical" className="h-8" />
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      className={`rounded-none hover:bg-transparent ${viewMode === "list" ? "bg-nixerly-blue" : ""
                        }`}
                      onClick={() => handleViewModeChange("list")}
                    >
                      <ListIcon />
                      List
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="mb-8 " />

            <div className="flex flex-col gap-6 lg:flex-row">
            <div className="w-full lg:w-1/4">
                <FiltersFeeds viewMode={viewMode} setViewMode={setViewMode} />
              </div>
              <div className="w-full lg:w-3/4">
                {!freelancers?.data?.length ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <UserX className="h-16 w-16 mb-4" />
                    <h3 className="text-lg font-medium">No talent found</h3>
                    <p className="text-sm">
                      Please adjust your search criteria to find matching talent
                    </p>
                  </div>
                ) : viewMode === "card" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {freelancers?.data.map(
                      (freelancer: WorkerProfileResponse) => (
                        <div key={freelancer.id} className="cursor-pointer">
                          <CardFeeds
                            id={freelancer.id}
                            name={`${freelancer.user.firstName} ${freelancer.user.lastName}`}
                            title={freelancer.title}
                            avatar={freelancer.profilePicture}
                            rating={freelancer.avgRating}
                            jobsCompleted={freelancer.completedJobs}
                            hourlyRate={freelancer.hourlyRate}
                            location={`${freelancer.city}, ${freelancer.country}`}
                            skills={freelancer.skills}
                            certificates={freelancer.certificates}
                            portfolio={freelancer.portfolio}
                          />
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div>
                    {freelancers?.data.map(
                      (freelancer: WorkerProfileResponse) => (
                        <div key={freelancer.id} className="cursor-pointer">
                          <ListCardFeeds
                            id={freelancer.id}
                            title={freelancer.title}
                            avatar={freelancer.profilePicture}
                            skills={freelancer.skills}
                            rating={freelancer.avgRating}
                            name={`${freelancer.user.firstName} ${freelancer.user.lastName}`}
                            location={`${freelancer.city}, ${freelancer.country}`}
                            jobsCompleted={freelancer.completedJobs}
                            hourlyRate={freelancer.hourlyRate}
                            certificates={freelancer.certificates}
                            portfolio={freelancer.portfolio}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
                {freelancers?.totalPages && freelancers?.totalPages > 1 && (
                  <FeedsPagination
                    currentPage={currentPage}
                    totalPages={freelancers?.totalPages || 1}
                    onPageChange={(page) => {
                      const params = new URLSearchParams(
                        Array.from(searchParams.entries())
                      );
                      params.set("page", page.toString());
                      router.replace(`?${params.toString()}`, {
                        scroll: false,
                      });
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
