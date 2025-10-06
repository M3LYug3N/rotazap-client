import { UseMutationResult, useMutation } from "@tanstack/react-query";

import axiosInstance from "@/libs/axios";

import { useAuthStore } from "@/store/useAuthStore";

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
    address: string;
  };
}

export function useAuth() {
  const { setAuth, logout } = useAuthStore();

  // Логин
  const loginMutation: UseMutationResult<AuthResponse, Error, LoginData> =
    useMutation({
      mutationFn: async (data: LoginData) => {
        const response = await axiosInstance.post<AuthResponse>(
          "/auth/login",
          data
        );
        return response.data;
      },
      onSuccess: async data => {
        const { user } = data;
        setAuth(user);

        try {
          const meResponse = await axiosInstance.get("/auth/me"); // Синхронизация данных
          setAuth(meResponse.data.user);
        } catch {
          logout(); // Логаут при ошибке синхронизации
        }
      }
    });

  // Логаут
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post("/auth/logout"); // Сервер удаляет куки
      window.location.reload();
    },
    onSuccess: () => {
      logout();
    }
  });

  return { loginMutation, logoutMutation };
}
