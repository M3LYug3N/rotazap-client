"use client";

import { Paper, Table, TableContainer } from "@mui/material";
import { useState } from "react";

import { OrderDetailsInfo } from "@/features/office/orders/components/OrderIDetailsInfo";
import { OrderTableHead } from "@/features/office/orders/components/tables/OrderTableHead";
import { OrdersTableBody } from "@/features/office/orders/components/tables/OrdersTableBody";
import { OrderDetailsTable } from "@/features/office/orders/components/tables/modal/OrderDetailsTable";
import {
  OrderTableItem,
  OrdersTableProps
} from "@/features/office/orders/types";

import { ModalComponent } from "@/components/ui/modal/ModalComponent";

export const OrdersTable = ({
  orders,
  highlightArticle = ""
}: OrdersTableProps & { highlightArticle?: string }) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderTableItem | null>(
    null
  );

  const handleClose = () => setSelectedOrder(null);
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 390,
          overflowY: "auto",
          boxShadow: "none",
          "@media (max-width: 1024px)": { maxHeight: 254 }
        }}
      >
        <Table stickyHeader>
          <OrderTableHead />
          <OrdersTableBody orders={orders} onSelect={setSelectedOrder} />
        </Table>
      </TableContainer>

      <ModalComponent open={Boolean(selectedOrder)} onClose={handleClose}>
        <div className="flex flex-col gap-5">
          {selectedOrder && <OrderDetailsInfo order={selectedOrder} />}
          <OrderDetailsTable
            items={selectedOrder?.details ?? []}
            highlightArticle={highlightArticle}
          />
        </div>
      </ModalComponent>
    </>
  );
};
