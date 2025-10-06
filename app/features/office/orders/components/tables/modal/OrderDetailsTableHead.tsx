import { TableHead } from "@mui/material";

import {
  StyledTableCellHead,
  StyledTableRowHead
} from "@/components/styled/tables/StylesTables";

import { ORDERS_DETAILS_TABLE_HEAD } from "@/data/table-header.data";

export const OrderDetailsTableHead = () => (
  <TableHead>
    <StyledTableRowHead>
      {ORDERS_DETAILS_TABLE_HEAD.map(({ key, label }) => (
        <StyledTableCellHead key={key}>{label}</StyledTableCellHead>
      ))}
    </StyledTableRowHead>
  </TableHead>
);
