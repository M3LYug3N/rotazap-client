import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/useAuthStore";

export function useRoleRedirect() {
  const { user, isAuthReady } = useAuthStore();
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    if (!isAuthReady || !user) return;

    const normalizedPath = currentPath?.replace(/\/$/, "") || "";

    const isInfo =
      normalizedPath === "/info" || normalizedPath.startsWith("/info/");

    if (
      user.role === "pending" &&
      normalizedPath !== "/confirmation" &&
      !isInfo
    ) {
      router.replace("/confirmation");
    }

    if (user.role === "user" && normalizedPath === "/confirmation") {
      router.replace("/");
    }
  }, [user, isAuthReady, router, currentPath]);
}
