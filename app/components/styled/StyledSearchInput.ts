import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledSearchInput = styled(TextField)({
  "& .MuiOutlinedInput-input": {
    padding: "12.5px 16px",
    backgroundColor: "white",

    "@media (max-width: 1024px)": {
      padding: "12.5px"
    },
    "@media (max-width: 768px)": {
      padding: "8.5px"
    },
    "@media (max-width: 490px)": {}
  },

  /* Лишнее */
  "& .MuiInputLabel-root": {
    top: "-3px !important",

    "@media (max-width: 1024px)": {
      top: "-3px"
    },
    "@media (max-width: 768px)": {
      top: "-7px"
    },
    "@media (max-width: 490px)": {}
  },

  "& .MuiFormHelperText-root": {
    position: "absolute",
    top: "-20px",
    right: "-10px"
  }
});
