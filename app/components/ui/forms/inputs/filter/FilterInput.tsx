import { Controller, FieldValues } from "react-hook-form";

import { StyledInput } from "@/components/styled/StyledInput";
import { FilterInputProps } from "@/components/ui/forms/inputs/filter/types";

export const FilterInput = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder = "",
  disabled = false,
  step,
  inputMode,
  onBlur // ➕ поддержка внешнего onBlur
}: FilterInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <StyledInput
        {...field}
        onBlur={e => {
          field.onBlur();
          onBlur?.(e);
        }}
        label={label}
        type={type}
        disabled={disabled}
        fullWidth
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          step,
          inputMode
        }}
      />
    )}
  />
);
