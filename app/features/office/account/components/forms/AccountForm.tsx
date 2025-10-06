"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { updateUserSchema } from "@/features/office/account/common/schema";
import { UpdateUserInputs } from "@/features/office/account/types";

import { Button } from "@/components/ui/buttons/Button";
import { AuthInput } from "@/components/ui/forms/inputs/AuthInput";
import { AuthPhoneInput } from "@/components/ui/forms/inputs/AuthPhoneInput";

import { useAuthStore } from "@/store/useAuthStore";

import { showAuthError } from "@/common/showAuthError";

import styles from "@/styles/pages/office/account/Account.module.css";

export const AccountForm = () => {
  const user = useAuthStore(state => state.user);
  const fetchUser = useAuthStore(state => state.fetchUser);
  const updateUser = useAuthStore(state => state.updateUser);
  const [isModified, setIsModified] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting, isValid }
  } = useForm<UpdateUserInputs>({
    resolver: yupResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      phoneNumber: ""
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    if (!user) {
      fetchUser();
    } else {
      reset({
        username: user.username || "",
        email: user.email || "",
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || ""
      });
    }
  }, [user, reset, fetchUser]);

  useEffect(() => {
    if (user) {
      const original = {
        username: user.username || "",
        email: user.email || "",
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || ""
      };
      setIsModified(JSON.stringify(watchedValues) !== JSON.stringify(original));
    }
  }, [watchedValues, user]);

  const onSubmit = async (data: UpdateUserInputs) => {
    try {
      await updateUser(data);
      toast.success("Данные успешно обновлены!");
      reset(data);
      setIsModified(false);
    } catch (error) {
      showAuthError(error);
    }
  };

  if (!user) {
    return <p>Загрузка данных...</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formElementsContainer}>
        <AuthInput
          control={control}
          name="username"
          label="Имя пользователя"
          type="text"
        />
        <AuthInput
          control={control}
          name="email"
          label="Email"
          type="email"
          disabled
        />
      </div>
      <div className={styles.formElementsContainer}>
        <AuthInput
          control={control}
          name="fullName"
          label="Ф.И.О."
          type="text"
        />
        <AuthPhoneInput
          control={control}
          name="phoneNumber"
          label="Номер телефона"
          type="tel"
        />
      </div>
      <div>
        <Button
          isDisabled={!isModified || !isValid || isSubmitting}
          isLoading={isSubmitting}
          size="Small"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};
