import { useQuery } from "@tanstack/react-query";
import BusinessService from "@/services/business/business.service";

export const useGetBusinessById = (id: string) => {
  return useQuery({
    queryKey: ["business", id],
    queryFn: () => BusinessService.getBusinessById(id),
    enabled: !!id,
  });
};
