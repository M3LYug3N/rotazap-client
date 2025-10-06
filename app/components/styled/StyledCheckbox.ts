import styled from "@emotion/styled";
import { Checkbox } from "@mui/material";

export const StyledCheckbox = styled(Checkbox, {
  shouldForwardProp: prop => prop !== "$scale"
})<{ $scale?: number }>(({ $scale = 1 }) => ({
  padding: "2px",
  transform: `scale(${$scale})`,

  "&.Mui-checked": {
    color: "#e77c58"
  },

  "&.Mui-checked .MuiSvgIcon-root": {
    backgroundColor: "transparent",
    borderRadius: 0
  },

  "&.Mui-focusVisible": {
    outline: "none",
    boxShadow: "none"
  },

  "&:focus-visible": {
    outline: "none",
    boxShadow: "none"
  },

  "& .MuiTouchRipple-root": {
    display: "none" // убирает ripple-анимацию, если не нужна
  },

  "&:hover": {
    backgroundColor: "rgba(27, 47, 82, 0.08)", // мягкий фон
    borderRadius: 4,
    cursor: "pointer"
  }
}));
