"use client";

import { useRouter } from "next/navigation";

export const BackLink = () => {
  const router = useRouter();

  return (
    <button className="link my-[-20px] w-[130px]" onClick={() => router.back()}>
      Вернуться назад
    </button>
  );
};
