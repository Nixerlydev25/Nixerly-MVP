import { useQuery, UseQueryResult } from "@tanstack/react-query";
import BusinessService from "@/services/business/business.service";
import { TBusinessDetails } from "@/types/auth";

export const useGetBusinessById = (id: string) => {
  return useQuery({
    queryKey: ["business", id],
    queryFn: () => BusinessService.getBusinessById(id),
    enabled: !!id,
  }) as UseQueryResult<TBusinessDetails, Error>;
};
