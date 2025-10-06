"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { changePasswordSchema } from "@/features/office/account/common/schema";
import {
  ChangePasswordInputs,
  ChangePasswordProps
} from "@/features/office/account/types";

import { Button } from "@/components/ui/buttons/Button";
import { AuthPasswordInput } from "@/components/ui/forms/inputs/AuthPasswordInput";

import axios from "@/libs/axios";

import styles from "@/styles/pages/office/account/Account.module.css";

export const ChangePasswordForm = ({
  onPasswordChangeSuccess
}: ChangePasswordProps) => {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting, isValid }
  } = useForm<ChangePasswordInputs>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
    mode: "onChange"
  });

  const onSubmit = async (data: ChangePasswordInputs) => {
    try {
      const payload = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      };

      const endpoint = "/users/change-password";

      await axios.put(endpoint, payload);

      toast.success("Пароль успешно изменен");
      reset();
      if (onPasswordChangeSuccess) onPasswordChangeSuccess();
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError("currentPassword", {
          type: "server",
          message: err.response.data.message
        });
      } else {
        toast.error("Произошла ошибка при изменении пароля.");
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={styles.sectionTitle}>Смена пароля</h2>
      <div className={styles.formElementsContainer}>
        <AuthPasswordInput
          control={control}
          name="currentPassword"
          label="Текущий пароль"
          type="password"
        />
        <AuthPasswordInput
          control={control}
          name="newPassword"
          label="Новый пароль"
          type="password"
        />
        <AuthPasswordInput
          control={control}
          name="confirmPassword"
          label="Подтверждение"
          type="password"
        />
      </div>
      <Button
        type="submit"
        isLoading={isSubmitting}
        isDisabled={isSubmitting || !isValid}
        size="Small"
      >
        Сменить пароль
      </Button>
    </form>
  );
};
