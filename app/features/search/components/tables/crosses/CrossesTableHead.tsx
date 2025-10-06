import { TableHead } from "@mui/material";

import {
  StyledTableCellHead,
  StyledTableRowHead
} from "@/components/styled/tables/StylesTables";

import { SEARCH_RESULT_TABLE_HEAD } from "@/data/table-header.data";

export const CrossesTableHead = () => (
  <TableHead>
    <StyledTableRowHead>
      {SEARCH_RESULT_TABLE_HEAD.map(itemHead => (
        <StyledTableCellHead key={itemHead.id}>
          {itemHead.label}
        </StyledTableCellHead>
      ))}
    </StyledTableRowHead>
  </TableHead>
);
