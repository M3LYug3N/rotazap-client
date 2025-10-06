import clsx from "clsx";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";

import styles from "@/styles/components/ui/buttons/Button.module.css";

export type ButtonVariant =
  | "Primary"
  | "PrimaryOutline"
  | "Secondary"
  | "SecondaryOutline";

export type ButtonSize = "Small" | "Medium" | "Large";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  variant = "Primary",
  size = "Medium",
  isDisabled = false,
  isLoading = false,
  children,
  ...props
}) => {
  // Генерация классов на основе пропсов
  const buttonClass = clsx(
    styles.button,
    styles[`button${variant}`],
    styles[`button${size}`],
    {
      [styles["buttonDisabled"]]: isDisabled || isLoading,
      [styles["buttonLoading"]]: isLoading,
      [styles["buttonTransform"]]: !isDisabled && !isLoading
    }
  );

  return (
    <button
      className={buttonClass}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading ? <span className={styles.spinner} /> : children}
    </button>
  );
};
