import { toast } from "react-toastify";

import { AxiosError } from "axios";

export interface ServerError {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

export const showAuthError = (error: any) => {
  const axiosError = error as AxiosError<ServerError>;

  const data = axiosError?.response?.data;
  const message = data?.message;

  if (message) {
    const errorMessage =
      typeof message === "string"
        ? message
        : Array.isArray(message)
          ? message.join(", ")
          : "Произошла ошибка на сервере.";

    toast.error(errorMessage);
    return;
  }

  toast.error(error.message || "Произошла ошибка.");
};
