import axiosInstance from "@/libs/axios";

import { useAuthStore } from "@/store/useAuthStore";

export const setupAxiosInterceptors = () => {
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401) {
        const { logout } = useAuthStore.getState();
        console.log("Получен статус 401, выполняем логаут...");
        logout();
      }
      return Promise.reject(error);
    }
  );
};
