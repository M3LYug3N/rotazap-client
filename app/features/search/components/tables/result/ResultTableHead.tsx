import { TableHead } from "@mui/material";

import {
  StyledTableCellHead,
  StyledTableRowHead
} from "@/components/styled/tables/StylesTables";

import { SEARCH_TABLE_HEAD } from "@/data/table-header.data";

export const ResultTableHead = () => (
  <TableHead>
    <StyledTableRowHead>
      {SEARCH_TABLE_HEAD.map(column => (
        <StyledTableCellHead key={column.id}>
          {column.label}
        </StyledTableCellHead>
      ))}
    </StyledTableRowHead>
  </TableHead>
);
