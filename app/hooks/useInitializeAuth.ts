import { useEffect } from "react";

import axiosInstance from "@/libs/axios";

import { useAuthStore } from "@/store/useAuthStore";

export function useInitializeAuth() {
  const { setAuth, logout, user, setAuthReady, isAuthReady } = useAuthStore();

  useEffect(() => {
    // Если данные уже готовы, ничего не делаем
    if (isAuthReady) return;

    // Выполняем запрос для проверки токена
    axiosInstance
      .get("/auth/me")
      .then(response => {
        const { user } = response.data;
        setAuth(user); // Устанавливаем данные пользователя
      })
      .catch(() => {
        logout(); // Выходим при ошибке
      })
      .finally(() => {
        setAuthReady(true); // Ставим флаг готовности
      });
  }, [setAuth, logout, user, setAuthReady, isAuthReady]);
}
