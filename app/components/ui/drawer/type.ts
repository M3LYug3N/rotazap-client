import { ComponentType } from "react";

export interface MenuItem {
  id: number;
  title: string;
  path: string;
  icon: ComponentType<{
    className?: string;
    fontSize?: "small" | "medium" | "large";
  }>;
  target?: string;
}
