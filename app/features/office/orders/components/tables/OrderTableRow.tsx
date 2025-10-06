import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Step,
  StepLabel,
  Stepper,
  TableCell,
  TableRow
} from "@mui/material";
import { JSX, useState } from "react";

import { orderStatusColors } from "@/features/office/orders/data/order-status-color.data";
import { OrderTableItem } from "@/features/office/orders/types";

import { ORDERS_TABLE_HEAD } from "@/data/table-header.data";

import { OrderTimelineStep, getOrderTimeline } from "@/libs/api/orders";

import { formatNumber } from "@/utils/format-number";

import { format } from "date-fns";

interface OrderTableRowProps {
  order: OrderTableItem;
  onSelect: (order: OrderTableItem) => void;
}

export const OrderTableRow = ({ order, onSelect }: OrderTableRowProps) => {
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [timeline, setTimeline] = useState<OrderTimelineStep[]>([]);

  const totalQty = order.details.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = order.details.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleStatusClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const orderLineId = order.details[0]?.orderLineId;
      if (!orderLineId) {
        console.error("orderLineId отсутствует, невозможно загрузить таймлайн");
        return;
      }

      const data = await getOrderTimeline(orderLineId);
      setTimeline(data);
      setOpenStatusModal(true);
    } catch (err) {
      console.error("Ошибка загрузки таймлайна:", err);
    }
  };

  return (
    <>
      <TableRow
        hover
        sx={{ cursor: "pointer" }}
        onClick={() => onSelect(order)}
      >
        {ORDERS_TABLE_HEAD.map(({ key }) => {
          let value: string | number | JSX.Element;

          if (key === "qty") {
            value = totalQty;
          } else if (key === "totalPrice") {
            value = formatNumber(totalPrice);
          } else if (key === "orderDate") {
            const date = new Date(order.orderDate);
            value = isNaN(date.getTime()) ? "-" : format(date, "dd.MM.yyyy");
          } else if (key === "id") {
            value = order.orderNumber ?? order.id;
          } else if (key === "status") {
            value = (
              <Button
                size="small"
                sx={{
                  minWidth: "auto",
                  color: orderStatusColors[order.status] ?? "inherit",
                  textTransform: "none"
                }}
                onClick={handleStatusClick}
              >
                {order.status}
              </Button>
            );
          } else {
            const raw = order[key];
            value =
              typeof raw === "string" || typeof raw === "number" ? raw : "-";
          }

          return (
            <TableCell
              key={key}
              sx={{
                height: 48,
                padding: "8px",
                wordBreak: "break-word",
                textAlign: "center"
              }}
            >
              {value}
            </TableCell>
          );
        })}
      </TableRow>

      <Dialog
        open={openStatusModal}
        onClose={() => setOpenStatusModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Статус заказа</DialogTitle>
        <DialogContent>
          {timeline.length > 0 ? (
            <Stepper
              orientation="vertical"
              activeStep={timeline.findIndex(step => step.current)}
            >
              {timeline.map((step, idx) => (
                <Step key={idx} completed={step.completed}>
                  <StepLabel
                    optional={
                      step.date
                        ? format(new Date(step.date), "dd.MM.yyyy")
                        : undefined
                    }
                    sx={{
                      "& .MuiStepLabel-label": {
                        color: step.isTerminal
                          ? "error.main"
                          : step.isDelay
                            ? "warning.main"
                            : "inherit"
                      }
                    }}
                  >
                    {step.name}
                    {step.isDelay && " (Задержка)"}
                    {step.isTerminal && " [Конец]"}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            "Нет данных"
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
