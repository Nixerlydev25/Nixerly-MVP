import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import UserService from '@/services/user/user.service';
import { User } from '@/types/auth';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  fetchUser: () => Promise<void>;
  revalidateUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      fetchUser: async () => {
        try {
          set({ isLoading: true, error: null });
          const user = await UserService.getUser();
          set({ user, isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch user'
          });
        }
      },
      revalidateUser: async () => {
        set({ user: null }); // Clear existing user data
        try {
          set({ isLoading: true, error: null });
          const user = await UserService.getUser();
          set({ user, isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to fetch user'
          });
        }
      }
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: UserState) => ({ user: state.user }),
    }
  )
); 