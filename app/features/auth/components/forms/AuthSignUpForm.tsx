import { StepOne } from "@/features/auth/components/forms/stepper/StepOne";
import { StepThree } from "@/features/auth/components/forms/stepper/StepThree";
import { StepTwo } from "@/features/auth/components/forms/stepper/StepTwo";

import { useStepFormStore } from "@/store/useStepFormStore";

export const AuthSignUpForm = () => {
  const { step, data } = useStepFormStore();

  switch (step) {
    case 1:
      return <StepOne key="step-1" />;
    case 2:
      return <StepTwo key="step-2" />;
    case 3:
      return <StepThree key={`step-3-${JSON.stringify(data)}`} />;
    default:
      return null;
  }
};
