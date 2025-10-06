"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { stepThreeSchema } from "@/features/auth/common/schema";
import { AuthRegisterForm } from "@/features/auth/types";

import { Button } from "@/components/ui/buttons/Button";
import { AuthCheckbox } from "@/components/ui/forms/inputs/AuthCheckbox";
import { AuthInput } from "@/components/ui/forms/inputs/AuthInput";
import { AuthSelect } from "@/components/ui/forms/inputs/AuthSelect";

import axiosInstance from "@/libs/axios";

import { useAuthStore } from "@/store/useAuthStore";
import { useStepFormStore } from "@/store/useStepFormStore";

import { showAuthError } from "@/common/showAuthError";

export const StepThree = () => {
  const { data, setData, setStep, reset } = useStepFormStore();
  const setAuth = useAuthStore(state => state.setAuth);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting }
  } = useForm<
    Pick<
      AuthRegisterForm,
      "organizationName" | "legalForm" | "activity" | "consent" | "confirmation"
    >
  >({
    defaultValues: {
      organizationName: data.organizationName || "",
      legalForm: data.legalForm || "",
      activity: data.activity || "",
      consent: data.consent || false,
      confirmation: data.confirmation || false
    },
    resolver: yupResolver(stepThreeSchema) as any,
    mode: "onChange"
  });

  const onSubmit = async (
    values: Pick<
      AuthRegisterForm,
      "organizationName" | "legalForm" | "activity" | "consent" | "confirmation"
    >
  ) => {
    try {
      const fullFormData: AuthRegisterForm = {
        ...data,
        ...values
      } as AuthRegisterForm;

      const response = await axiosInstance.post("/auth/register", fullFormData);
      setAuth(response.data.user);
      toast.success("Регистрация прошла успешно!");
      reset();
      router.push("/confirmation");
    } catch (error) {
      showAuthError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <AuthInput
        control={control}
        name="organizationName"
        label="Название организации"
        type="text"
      />
      <AuthSelect
        control={control}
        name="legalForm"
        label="Организационно-правовая форма"
        options={["Юридическое лицо", "Индивидуальный предприниматель"]}
      />
      <AuthSelect
        control={control}
        name="activity"
        label="Вид деятельности"
        options={["Интернет-магазин", "СТО", "Розничный магазин", "Другое"]}
      />
      <div className="ml-[10px] flex flex-col justify-between gap-y-[6px]">
        <AuthCheckbox
          control={control}
          name="consent"
          label="Согласие на обработку перс. данных *"
        />
        <AuthCheckbox
          control={control}
          name="confirmation"
          label="Подтверждение регистрации *"
        />
      </div>

      <div className="flex justify-between gap-x-[30px]">
        <div className="basis-[40%]">
          <Button
            variant="SecondaryOutline"
            type="button"
            onClick={() => {
              const values = watch();
              setData(values);
              setStep(2);
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
              Регистрация
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
