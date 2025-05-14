import { QueryKeys } from "@/querykey";
import WorkerService from "@/services/worker/worker.service";
import { useQuery } from "@tanstack/react-query";
import { FeedsFilter } from "@/types/feed/feed.types";
import { WorkerListResponse } from "@/types/worker.types";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useGetWorkers = (enabled?: boolean) => {
  const searchParams = useSearchParams();

  // Process URL params and set defaults in the hook
  const filters = useMemo(() => {
    const params: FeedsFilter = { page: 1, limit: 15 };

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
            params[key] = numValue;
          }
          break;
        case "skills":
          if (!params.skills) params.skills = [];
          params.skills.push(value);
          break;
        default:
          // For other potential string fields like location, search, etc.
          if (value) {
            (params as any)[key] = value;
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
