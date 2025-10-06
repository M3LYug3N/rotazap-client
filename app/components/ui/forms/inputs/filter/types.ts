import { FocusEvent } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export interface FilterInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: "small" | "medium";
  min?: number;
  max?: number;
  step?: number;
  inputMode?: "decimal" | "numeric";
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface FilterSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
}
