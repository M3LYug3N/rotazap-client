import { StyledCheckbox } from "@/components/styled/StyledCheckbox";

type BaseCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "small" | "large";
  indeterminate?: boolean;
};

export const CheckboxComponent = ({
  checked,
  onChange,
  disabled = false,
  size = "large",
  indeterminate = false
}: BaseCheckboxProps) => {
  const scale = size === "small" ? 0.715 : 1;

  return (
    <StyledCheckbox
      checked={checked}
      indeterminate={indeterminate}
      onChange={(_, checked) => onChange(checked)}
      disabled={disabled}
      $scale={scale}
    />
  );
};
