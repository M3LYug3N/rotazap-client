import styled from "@emotion/styled";
import { Drawer } from "@mui/material";

export const StyledDrawer = styled(Drawer)({
  top: "100px",
  "@media (max-width: 768px)": {
    top: "80px"
  },
  "& .MuiModal-backdrop": {
    top: "100px",
    "@media (max-width: 768px)": {
      top: "80px"
    }
  },
  "& .MuiDrawer-paper": {
    top: "100px",
    backgroundColor: "#1b2f52",
    overflow: "auto",
    maxHeight: "calc(100vh - 100px)",
    boxShadow: "0px 0px 0px 0px",
    "@media (max-width: 768px)": {
      top: "80px",
      maxHeight: "calc(100vh - 80px)"
    }
  },
  "& .MuiListItem-root": {
    padding: "0px 5px"
  }
});
