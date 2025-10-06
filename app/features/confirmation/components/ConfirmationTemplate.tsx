"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/buttons/Button";

import { useAuth } from "@/hooks/useAuth";
import { useRoleChangeHandler } from "@/hooks/useRoleChangeHandler";

import { useAuthStore } from "@/store/useAuthStore";

export const ConfirmationTemplate = () => {
  const { logoutMutation } = useAuth();
  const { user } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/auth");
      }
    });
  };

  // Логика обработки смены роли
  useRoleChangeHandler();

  // Автоматический редирект при смене роли с "pending"
  useEffect(() => {
    if (user?.role !== "pending") {
      setTimeout(() => router.push("/"), 1500);
    }
  }, [user?.role, router]);

  return (
    <section className="py-10">
      <div className="container">
        <div className="mx-auto flex w-full max-w-[840px] flex-col items-center px-4">
          {/* Заголовок */}
          <h1 className="mb-6 text-center text-2xl leading-snug font-bold md:text-3xl">
            Добро пожаловать в интернет-магазин{" "}
            <span className="text-peach">ROTAZAP</span>
          </h1>

          {/* Текст */}
          <div className="mb-6 w-full space-y-3 text-justify text-base leading-relaxed text-neutral-800">
            <p>
              Благодарим за регистрацию на нашем сайте! Ваш аккаунт находится на
              стадии активации.
            </p>
            <p>
              После завершения процесса активации Вы сможете полноценно
              пользоваться возможностями нашего интернет-магазина. Мы
              сотрудничаем исключительно с клиентами, заключившими договор.
              Активация аккаунта будет завершена после выполнения всех условий,
              указанных в договоре.
            </p>
            <p>
              Ознакомиться с условиями Вы можете{" "}
              <a
                href="info/wholesale"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                здесь
              </a>
              .
            </p>
          </div>
          <Button onClick={handleLogout}>На страницу авторизации</Button>
          <p className="mt-[30px] text-center text-sm">
            Дополнительную информацию вы можете получить у нашего менеджера:{" "}
            <a href="tel:+74997689933" className="link">
              +7(499)678-99-33
            </a>{" "}
            /{" "}
            <a href="mailto:info@rotazap.ru" className="link">
              info@rotazap.ru
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};
