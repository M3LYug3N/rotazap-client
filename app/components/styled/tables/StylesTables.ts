import styled from "@emotion/styled";
import { TableCell, TableRow } from "@mui/material";

export const StyledTableCellHead = styled(TableCell)({
  height: 48,
  padding: "8px 16px",
  fontWeight: "700",
  textAlign: "center"
});

export const StyledTableCellBody = styled(TableCell)({
  textAlign: "center",
  padding: "8px 16px",
  height: 48
});

export const StyledTableRowHead = styled(TableRow)({
  backgroundColor: "#f5f5f5"
});

export const StyledTableRowBody = styled(TableRow)({});
