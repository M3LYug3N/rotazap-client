import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useBasketSync = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = new BroadcastChannel("basket-sync");

    channel.onmessage = e => {
      if (e.data === "update") {
        queryClient.invalidateQueries({ queryKey: ["basket"] });
      }
    };

    return () => channel.close();
  }, [queryClient]);
};
