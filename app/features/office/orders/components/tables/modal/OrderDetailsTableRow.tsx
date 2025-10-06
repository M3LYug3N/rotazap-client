import { TableCell } from "@mui/material";

import { HighlightMatch } from "@/features/office/orders/components/HighlightMatch";
import { OrderDetailsItem } from "@/features/office/orders/types";

import { StyledTableRowBody } from "@/components/styled/tables/StylesTables";

import { ORDERS_DETAILS_TABLE_HEAD } from "@/data/table-header.data";

import { formatNumber } from "@/utils/format-number";

interface OrderDetailsTableRowProps {
  item: OrderDetailsItem;
  highlightArticle?: string;
}

export const OrderDetailsTableRow = ({
  item,
  highlightArticle = ""
}: OrderDetailsTableRowProps) => {
  const extendedItem = {
    ...item
  };
  return (
    <StyledTableRowBody>
      {ORDERS_DETAILS_TABLE_HEAD.map(({ key }) => {
        const value = extendedItem[key as keyof typeof extendedItem];

        return (
          <TableCell key={key} align="center">
            {key === "article"
              ? HighlightMatch(String(value), highlightArticle)
              : key === "qty"
                ? Math.trunc(Number(value))
                : key === "price"
                  ? value != null && !isNaN(Number(value))
                    ? formatNumber(Number(value))
                    : "-"
                  : typeof value === "number"
                    ? formatNumber(value)
                    : String(value ?? "-")}
          </TableCell>
        );
      })}
    </StyledTableRowBody>
  );
};
