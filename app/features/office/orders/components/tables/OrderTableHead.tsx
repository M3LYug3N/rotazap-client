import { TableCell, TableHead, TableRow } from "@mui/material";

import { ORDERS_TABLE_HEAD } from "@/data/table-header.data";

export const OrderTableHead = () => (
  <TableHead>
    <TableRow>
      {ORDERS_TABLE_HEAD.map(({ key, label, width }) => (
        <TableCell
          key={key}
          sx={{
            height: 48,
            padding: "8px",
            fontWeight: "bold",
            backgroundColor: "#f5f5f5",
            whiteSpace: "nowrap",
            textAlign: "center",
            width
          }}
        >
          {label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);
