"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { stepTwoSchema } from "@/features/auth/common/schema";
import { AuthRegisterForm } from "@/features/auth/types";

import { Button } from "@/components/ui/buttons/Button";
import { AuthInput } from "@/components/ui/forms/inputs/AuthInput";
import { AuthPhoneInput } from "@/components/ui/forms/inputs/AuthPhoneInput";

import { useStepFormStore } from "@/store/useStepFormStore";

export const StepTwo = () => {
  const { data, setData, setStep } = useStepFormStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting }
  } = useForm<Pick<AuthRegisterForm, "fullName" | "phoneNumber" | "address">>({
    defaultValues: {
      fullName: data.fullName || "",
      phoneNumber: data.phoneNumber || "+7-___-___-__-__",
      address: data.address || ""
    },
    resolver: yupResolver(stepTwoSchema),
    mode: "onChange"
  });

  const onSubmit = (
    values: Pick<AuthRegisterForm, "fullName" | "phoneNumber" | "address">
  ) => {
    setData(values);
    setStep(3);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <AuthInput control={control} name="fullName" label="Ф.И.О." type="text" />
      <AuthPhoneInput
        control={control}
        name="phoneNumber"
        label="Номер телефона"
        type="tel"
      />
      <AuthInput
        control={control}
        name="address"
        label="Адрес доставки"
        type="text"
      />

      <div className="flex justify-between gap-x-[30px]">
        <div className="basis-[40%]">
          <Button
            variant="SecondaryOutline"
            type="button"
            onClick={() => {
              const values = watch();
              setData(values); // сохраняем текущие значения
              setStep(1);
            }}
          >
            Назад
          </Button>
        </div>
        <div className="basis-[60%]">
          <div>
            <Button
              type="submit"
              isDisabled={!isValid || isSubmitting}
              isLoading={isSubmitting}
            >
              Вперед
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
