import { useEffect, useState } from "react";

import axiosInstance from "@/libs/axios";

import { useAuthStore } from "@/store/useAuthStore";

export function useTokenRefresh() {
  const { logout } = useAuthStore();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        try {
          console.log("Попытка обновления токена...");
          const response = await axiosInstance.post("/auth/login/access-token");
          console.log("Токен обновлён:", response.data);
          setRetryCount(0); // Сбрасываем счетчик после успешного обновления
        } catch (error) {
          console.error("Ошибка при обновлении токена:", error);

          if (retryCount >= 3) {
            console.log(
              "Превышено количество попыток обновления токена, выполняем логаут..."
            );
            logout();
          } else {
            console.log("Повторная попытка обновления токена...");
            setRetryCount(prev => prev + 1);
          }
        }
      },
      1 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [logout, retryCount]);
}
