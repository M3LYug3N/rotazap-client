import { TableBody } from "@mui/material";

import { OrderDetailsItem } from "@/features/office/orders/types";

import { OrderDetailsTableRow } from "./OrderDetailsTableRow";

interface OrderDetailsTableBodyProps {
  items?: OrderDetailsItem[];
  highlightArticle?: string;
}

export const OrderDetailsTableBody = ({
  items = [],
  highlightArticle = ""
}: OrderDetailsTableBodyProps) => (
  <TableBody>
    {items.map((item, idx) => (
      <OrderDetailsTableRow
        key={idx}
        item={item}
        highlightArticle={highlightArticle}
      />
    ))}
  </TableBody>
);
