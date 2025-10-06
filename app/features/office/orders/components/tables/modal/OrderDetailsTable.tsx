import { Paper, Table, TableContainer } from "@mui/material";

import { OrderDetailsTableBody } from "@/features/office/orders/components/tables/modal/OrderDetailsTableBody";
import { OrderDetailsTableHead } from "@/features/office/orders/components/tables/modal/OrderDetailsTableHead";
import { OrderDetailsItem } from "@/features/office/orders/types";

export const OrderDetailsTable = ({
  items = [],
  highlightArticle = ""
}: {
  items?: OrderDetailsItem[];
  highlightArticle?: string;
}) => (
  <TableContainer
    component={Paper}
    sx={{
      boxShadow: "none",
      maxHeight: 400,
      overflowY: "auto"
    }}
  >
    <Table stickyHeader>
      <OrderDetailsTableHead />
      <OrderDetailsTableBody
        items={items}
        highlightArticle={highlightArticle}
      />
    </Table>
  </TableContainer>
);
