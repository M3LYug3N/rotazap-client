import { Control, FieldValues, Path } from "react-hook-form";

/* Auth Inputs */
export interface AuthInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  type: string;
  label: string;
  autoComplete?: string;
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (...args: any[]) => void;
}

export interface AuthSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: string[];
  disabled?: boolean;
}

export interface AuthCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  disabled?: boolean;
}

export interface PasswordStrengthHintProps {
  password: string;
  strength: number;
  visible: boolean;
}
