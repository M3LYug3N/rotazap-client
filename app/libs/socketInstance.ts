import { Socket, io } from "socket.io-client";

const socket: Socket = io(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}`, {
  withCredentials: true,
  transports: ["websocket"],
  autoConnect: false // Отключаем автоматическое подключение
});

export { socket };
