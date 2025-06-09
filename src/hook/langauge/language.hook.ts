import { useMutation } from "@tanstack/react-query";
import LanguagesService from "@/services/language/languages.service";
import { QueryKeys } from "@/querykey";
import { AxiosError } from "axios";
import { queryClient } from "@/providers/query.provider";

export const useCreateLanguage = () => {
  return useMutation({
    mutationKey: [QueryKeys.CREATE_LANGUAGES],
    mutationFn: LanguagesService.createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CREATE_LANGUAGES] });
    },
    onError: (error) => {
      console.error('Error creating language:', error);
      throw error;
    },
  });
};

export const useUpdateAllLanguages = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_LANGUAGES],
    mutationFn: LanguagesService.updateAllLanguages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.WORKER_PROFILE_DETAILS] });
    },
    onError: (error) => {
      console.error('Error updating languages:', error);
      throw error;
    },
  });
};