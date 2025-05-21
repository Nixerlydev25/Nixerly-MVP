import { useMutation } from "@tanstack/react-query";
import LanguagesService from "@/services/language/languages.service";
import { QueryKeys } from "@/querykey";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { queryClient } from "@/providers/query.provider";

export const useCreateLanguage = () => {
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

export const useUpdateAllLanguages = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_LANGUAGES],
    mutationFn: LanguagesService.updateAllLanguages,
    onSuccess: () => {
      toast.success("Languages updated successfully");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKER_PROFILE_DETAILS] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });
};