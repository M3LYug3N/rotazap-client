import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { socket } from "@/libs/socketInstance";

// Используем экземпляр Singleton WebSocket
import { useAuthStore } from "@/store/useAuthStore";

export function useRoleWatcher() {
  const { user, setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      /* console.log(
        "Пользователь не авторизован, пропускаем подключение WebSocket."
      ); */
      return; // Если пользователь не авторизован, ничего не делаем
    }

    if (!socket.connected) {
      console.log("WebSocket не был подключен, подключаем...");
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("WebSocket connected:", socket.id);

      // Отправляем событие для проверки роли
      socket.emit("checkRole", { userId: user.id });
    });

    // Слушаем событие обновления роли
    socket.on(`roleUpdate:${user.id}`, role => {
      console.log("Role updated:", role);

      // Обновляем роль в состоянии Zustand
      setAuth({
        ...user,
        role
      });
    });

    socket.on("connect_error", error => {
      console.error("Socket.IO connection error:", error);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO connection closed:", socket.id);
    });

    return () => {
      console.log("Чистим слушателей события для WebSocket...");
      socket.off("connect");
      socket.off(`roleUpdate:${user.id}`);
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, [user, setAuth, router]);
}
