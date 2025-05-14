import { QueryKeys } from "@/querykey";
import WorkerService from "@/services/worker/worker.service";
import { useQuery } from "@tanstack/react-query";
import { FeedsFilter } from "@/types/feed/feed.types";
import { WorkerListResponse } from "@/types/worker.types";



export const useGetWorkers = (filters: FeedsFilter = {}, enabled?: boolean) => {
  return useQuery<WorkerListResponse>({
    queryKey: [QueryKeys.GET_SKILLS, filters],
    queryFn: () => WorkerService.getWorkers(filters),
    enabled: enabled
  });
};