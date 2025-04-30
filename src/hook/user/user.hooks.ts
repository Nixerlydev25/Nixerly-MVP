import { QueryKeys } from "@/querykey";
import UserService from "@/services/user/user.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User, WorkerProfile } from "@/types/auth";
import { currentUserData } from "@/types/user/user.types";
import { queryClient } from "@/providers/query.provider";

// Define a type that handles both user and worker profile updates
export interface UserUpdateData extends Partial<User> {
  workerProfile?: Partial<WorkerProfile>;
}

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: [QueryKeys.UPDATE_USER],
    mutationFn: (data: UserUpdateData) => UserService.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] });
    },
    onError: (error: unknown) => {
      console.error("Error during updating user:", error);
      throw error;
    },
  });
};

export const useGetUser = () => {
  return useQuery({
    queryKey: [QueryKeys.USER],
    queryFn: UserService.getUser,
  });
};

export const useGetCurrentUser = () => {
  return useQuery<currentUserData>({
    queryKey: [QueryKeys.USER],
    queryFn: UserService.getCurrentUser,
  });
};