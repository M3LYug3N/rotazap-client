import { Tooltip } from "@mui/material";
import { ReactElement } from "react";

interface TooltipComponentProps {
  title: string;
  children: ReactElement;
}

export const TooltipComponent = ({
  children,
  title
}: TooltipComponentProps) => (
  <Tooltip placement="top" arrow enterDelay={0} leaveDelay={0} title={title}>
    {children}
  </Tooltip>
);
