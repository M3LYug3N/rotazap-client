import { ComponentType } from "react";

export interface MenuItemConfig {
  id: number;
  href: string;
  title: string;
  icon: ComponentType<{
    className?: string;
    fontSize?: "small" | "medium" | "large";
  }>;
  disabled?: boolean;
  render?: boolean;
}

export type Anchor = "left";
