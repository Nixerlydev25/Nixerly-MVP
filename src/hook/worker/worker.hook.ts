import { QueryKeys } from "@/querykey";
import WorkerService from "@/services/worker/worker.service";
import { useQuery } from "@tanstack/react-query";
import { FeedsFilter } from "@/types/feed/feed.types";
import { WorkerListResponse, WorkerProfileResponse } from "@/types/worker.types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useGetWorkers = (enabled?: boolean) => {
  const searchParams = useSearchParams();

  // Process URL params and set defaults in the hook
  const filters = useMemo(() => {
    const params: FeedsFilter & Record<string, string | number | string[]> = { page: 1, limit: 15 };

    searchParams.forEach((value, key) => {
      switch (key) {
        case "page":
        case "limit":
        case "minHourlyRate":
        case "maxHourlyRate":
        case "minTotalEarnings":
        case "maxTotalEarnings":
        case "minAvgRating":
        case "maxAvgRating":
          const numValue = Number(value);
          if (!isNaN(numValue)) {
            (params as any)[key] = numValue;
          }
          break;
        case "skills":
          if (!params.skills) params.skills = [];
          params.skills.push(value);
          break;
        case "sort":
          (params as any)[key] = value;
          break;
        default:
          // For other potential string fields like location, search, etc.
          if (value) {
            params[key] = value;
          }
          break;
      }
    });

    return params;
  }, [searchParams]);

  // Extract current page from filters
  const currentPage = useMemo(() => {
    return filters.page || 1;
  }, [filters.page]);

  const query = useQuery<WorkerListResponse>({
    queryKey: [QueryKeys.GET_SKILLS, filters],
    queryFn: () => WorkerService.getWorkers(filters),
    enabled: enabled,
  });

  return {
    ...query,
    currentPage,
    filters,
  };
};

export const useGetWorkerById = (id: string) => {
  return useQuery<WorkerProfileResponse>({
    queryKey: [QueryKeys.GET_WORKER_BY_ID, id],
    queryFn: () => WorkerService.getWorkerById(id),
    enabled: !!id,
  });
};