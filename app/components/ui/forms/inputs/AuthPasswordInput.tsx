"use client";

import { IconButton, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, FieldValues } from "react-hook-form";

import { calculatePasswordStrength } from "@/features/auth/common/calculatePasswordStrength";

import { VisibilityIcon, VisibilityOffIcon } from "@/components/icons";
import { StyledInput } from "@/components/styled/StyledInput";
import { PasswordStrengthHint } from "@/components/ui/forms/inputs/PasswordStrengthHint";
import { AuthInputProps } from "@/components/ui/forms/inputs/types";

export const AuthPasswordInput = <T extends FieldValues>({
  control,
  name,
  label,
  autoComplete = "off",
  disabled = false
}: AuthInputProps<T>) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [strength, setStrength] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <StyledInput
            {...field}
            label={label}
            type={showPassword ? "text" : "password"}
            autoComplete={autoComplete}
            disabled={disabled}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
            onFocus={() => setShowPopup(password.length < 5)}
            onBlur={field.onBlur}
            value={field.value}
            onChange={e => {
              const value = e.target.value;
              field.onChange(value);
              setPassword(value);
              setStrength(calculatePasswordStrength(value).strength);
              setShowPopup(
                value.length > 0 &&
                  calculatePasswordStrength(value).strength < 100
              );
            }}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(prev => !prev)}
                    edge="end"
                    size="small"
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        )}
      />

      <PasswordStrengthHint
        password={password}
        strength={strength}
        visible={showPopup}
      />
    </div>
  );
};
