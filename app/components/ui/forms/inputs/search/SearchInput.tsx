"use client";

import { InputAdornment } from "@mui/material";

import { SearchInputProps } from "@/features/search/types";

import { CloseIcon } from "@/components/icons";
import { StyledSearchInput } from "@/components/styled/StyledSearchInput";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

export const SearchInput = ({
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onClear
}: SearchInputProps) => (
  <StyledSearchInput
    id={name}
    name={name}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    onKeyDown={onKeyDown}
    fullWidth
    InputProps={{
      endAdornment: value && onClear && (
        <InputAdornment position="end">
          <TooltipComponent title="Очистить">
            <CloseIcon className="closeButton" onClick={onClear} />
          </TooltipComponent>
        </InputAdornment>
      )
    }}
  />
);
