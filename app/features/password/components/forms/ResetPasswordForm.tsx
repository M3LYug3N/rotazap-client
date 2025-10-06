"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { resetPasswordSchema } from "@/features/password/common";
import { ResetPasswordInputs } from "@/features/password/types";

import { Button } from "@/components/ui/buttons/Button";
import { AuthPasswordInput } from "@/components/ui/forms/inputs/AuthPasswordInput";

import axios from "@/libs/axios";

import styles from "@/styles/pages/password/Password.module.css";

export const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<ResetPasswordInputs>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange"
  });

  const onSubmit = async (data: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      await axios.post("/users/reset-password", {
        token: searchParams.get("token"),
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      });
      toast.success("Пароль успешно изменен");
      router.push("/auth");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Произошла ошибка");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Сброс пароля</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <AuthPasswordInput
          control={control}
          name="newPassword"
          label="Новый пароль"
          type="password"
        />
        <AuthPasswordInput
          control={control}
          name="confirmPassword"
          label="Подтвердите новый пароль"
          type="password"
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          isDisabled={isSubmitting}
        >
          Установить новый пароль
        </Button>
      </form>
      <Link className="link" href="/auth">
        Вернуться назад
      </Link>
    </div>
  );
};
