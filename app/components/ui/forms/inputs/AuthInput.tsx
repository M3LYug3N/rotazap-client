import { FocusEvent } from "react";
import { Controller, FieldValues } from "react-hook-form";

import { StyledInput } from "@/components/styled/StyledInput";
import { AuthInputProps } from "@/components/ui/forms/inputs/types";

export const AuthInput = <T extends FieldValues>({
  control,
  name,
  label,
  type,
  autoComplete = "off",
  disabled = false
}: AuthInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <StyledInput
        {...field}
        type={type}
        label={label}
        autoComplete={autoComplete}
        disabled={disabled}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        fullWidth
        InputLabelProps={{ shrink: true }}
        inputProps={{
          readOnly: true,
          onFocus: (e: FocusEvent<HTMLInputElement>) => {
            e.currentTarget.readOnly = false;
          }
        }}
      />
    )}
  />
);
