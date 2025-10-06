import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import axiosInstance from "@/libs/axios";

import { AuthState, User } from "@/store/types";

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      isAuthReady: false, // Инициализация

      setAuth: user => {
        set({ user, isAuthenticated: true, isAuthReady: true });

        // Синхронизация роли с cookie
        Cookies.set("userRole", user.role || "guest", { expires: 30 });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, isAuthReady: true });

        // Удаляем cookie при выходе
        Cookies.remove("userRole");
      },

      setAuthReady: ready => {
        set({ isAuthReady: ready });
      },

      fetchUser: async () => {
        try {
          const response = await axiosInstance.get("/users/profile"); // Запрос к вашему API
          const user: User = response.data;

          set({ user, isAuthenticated: true, isAuthReady: true });
        } catch (error) {
          console.error("Ошибка при загрузке пользователя:", error);

          // Если ошибка, сбрасываем состояние
          set({ user: null, isAuthenticated: false, isAuthReady: true });
        }
      },

      // Новый метод для обновления данных пользователя
      updateUser: async (updatedData: Partial<User>) => {
        try {
          const response = await axiosInstance.put(
            "/users/profile",
            updatedData
          ); // Запрос к вашему API
          const updatedUser: User = response.data;

          // Обновляем состояние с данными из ответа
          set({ user: updatedUser, isAuthenticated: true, isAuthReady: true });

          console.log("Профиль успешно обновлен:", updatedUser);
        } catch (error) {
          console.error("Ошибка при обновлении профиля:", error);
          throw error;
        }
      }
    }),
    {
      name: "auth-storage",
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
      onRehydrateStorage: () => state => {
        if (state?.setAuth) {
          state.setAuthReady(true);
        }
      }
    }
  )
);
