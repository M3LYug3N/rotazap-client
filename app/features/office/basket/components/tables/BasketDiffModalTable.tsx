import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from "@mui/material";

import { BasketDiffModalTableProps } from "@/features/office/basket/types/basket-diff.type";

import {
  StyledTableCellBody,
  StyledTableCellHead,
  StyledTableRowBody,
  StyledTableRowHead
} from "@/components/styled/tables/StylesTables";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

import { BASKET_DIFF_TABLE_HEAD } from "@/data/table-header.data";

import { formatNumber } from "@/utils/format-number";

export const BasketDiffModalTable = ({
  changes
}: BasketDiffModalTableProps) => (
  <TableContainer component={Paper}>
    <Table className="w-full border-collapse text-sm">
      <TableHead>
        <StyledTableRowHead>
          {BASKET_DIFF_TABLE_HEAD.map(itemHead => (
            <StyledTableCellHead key={itemHead.id}>
              {itemHead.label}
            </StyledTableCellHead>
          ))}
        </StyledTableRowHead>
      </TableHead>
      <TableBody>
        {changes.map(item => (
          <StyledTableRowBody key={`${item.skuId}-${item.supplierId}`}>
            <StyledTableCellBody>{item.brand}</StyledTableCellBody>
            <StyledTableCellBody>{item.article}</StyledTableCellBody>
            <TooltipComponent title={item.descr}>
              <StyledTableCellBody
                sx={{
                  maxWidth: "180px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  cursor: "pointer"
                }}
              >
                {item.descr}
              </StyledTableCellBody>
            </TooltipComponent>
            <StyledTableCellBody
              sx={{
                color: "red"
              }}
            >
              {item.oldPrice !== undefined
                ? `${formatNumber(item.oldPrice)} ₽`
                : "—"}
            </StyledTableCellBody>
            <StyledTableCellBody
              sx={{
                color: "green",
                fontWeight: "bold"
              }}
            >
              {item.newPrice !== undefined
                ? `${formatNumber(item.newPrice)} ₽`
                : "—"}
            </StyledTableCellBody>
            <StyledTableCellBody
              sx={{
                color: "red"
              }}
            >
              {item.oldQty !== undefined ? `${item.oldQty} шт.` : "—"}
            </StyledTableCellBody>
            <StyledTableCellBody
              sx={{
                color: "green",
                fontWeight: "bold"
              }}
            >
              {item.newQty !== undefined ? `${item.newQty} шт.` : "—"}
            </StyledTableCellBody>
          </StyledTableRowBody>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
