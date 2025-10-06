import { useEffect } from "react";

import axiosInstance from "@/libs/axios";

import { useAuthStore } from "@/store/useAuthStore";

export function useRoleChangeHandler() {
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const { data } = await axiosInstance.get("/auth/me"); // или /users/me
        setAuth(data.user);
      } catch (err) {
        console.error("Ошибка при обновлении пользователя:", err);
      }
    }, 5000); // опрашиваем каждые 5 секунд

    return () => clearInterval(interval);
  }, [setAuth]);
}
