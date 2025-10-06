"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { HomeTemplate } from "@/features/home/components/HomeTemplate";

export function ProtectedMainPage() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) {
      router.replace("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HomeTemplate />;
}
