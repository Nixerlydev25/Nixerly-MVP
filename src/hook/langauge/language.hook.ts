import { useMutation, useQueryClient } from "@tanstack/react-query";
import LanguagesService from "@/services/language/languages.service";
import { QueryKeys } from "@/querykey";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useCreateLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QueryKeys.CREATE_LANGUAGES],
    mutationFn: LanguagesService.createLanguage,
    onSuccess: () => {
      toast.success("Language created successfully");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CREATE_LANGUAGES] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CREATE_LANGUAGES] });
    },
  });
};
