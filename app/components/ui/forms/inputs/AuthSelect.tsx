import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem
} from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";

import { StyledSelect } from "@/components/styled/StyledSelect";
import { AuthSelectProps } from "@/components/ui/forms/inputs/types";

export const AuthSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  disabled = false
}: AuthSelectProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <FormControl fullWidth error={!!fieldState.error} disabled={disabled}>
        <InputLabel shrink>{label}</InputLabel>
        <StyledSelect
          {...field}
          value={field.value ?? ""}
          displayEmpty
          fullWidth
          inputProps={{
            "aria-label": label,
            sx: {
              padding: "12.5px 16px",
              "@media (max-width:1024px)": {
                padding: "12.5px"
              },
              "@media (max-width:768px)": {
                padding: "8.5px"
              }
            }
          }}
        >
          <MenuItem value="" disabled>
            Выберите...
          </MenuItem>
          {options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </StyledSelect>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    )}
  />
);
