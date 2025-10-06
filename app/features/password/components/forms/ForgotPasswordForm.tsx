"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { forgotPasswordSchema } from "@/features/password/common";
import { ForgotPasswordInputs } from "@/features/password/types";

import { Button } from "@/components/ui/buttons/Button";
import { AuthInput } from "@/components/ui/forms/inputs/AuthInput";

import axiosInstance from "@/libs/axios";

import styles from "@/styles/pages/password/Password.module.css";

export const ForgotPasswordForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = useForm<ForgotPasswordInputs>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onChange"
  });

  const onSubmit = async (data: ForgotPasswordInputs) => {
    try {
      await axiosInstance.post("/users/forgot-password", {
        email: data.email
      });
      // Фиксированное сообщение об успехе
      toast.success("Ссылка для восстановления пароля отправлена на email!");

      setTimeout(() => {
        router.push("/auth");
      }, 1500);
    } catch (error: any) {
      // Обработка ошибок сервера
      if (error.response?.data?.message) {
        setError("email", {
          type: "server",
          message: error.response.data.message
        });
      } else {
        toast.error("Произошла ошибка при отправке ссылки.");
      }
    }
  };

  return (
    <section>
      <div className={styles.container}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            control={control}
            name="email"
            label="Email"
            type="email"
          />
          <Button
            type="submit"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
          >
            {isSubmitting ? null : "Отправить ссылку"}
          </Button>
        </form>
        <Link className="link" href="/auth">
          Вернуться назад
        </Link>
      </div>
    </section>
  );
};
