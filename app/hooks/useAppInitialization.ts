import { useInitializeAuth } from "@/hooks/useInitializeAuth";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";
import { useRoleWatcher } from "@/hooks/useRoleWatcher";
import { useTokenRefresh } from "@/hooks/useTokenRefresh";

export function useAppInitialization() {
  useInitializeAuth();
  useTokenRefresh();
  useRoleWatcher();
  useRoleRedirect();
}
