"use client";

import { OrderTableItem } from "@/features/office/orders/types";
import { exportOrderToExcel } from "@/features/office/orders/utils/export-order-to-excel";

import { DownloadForOfflineIcon } from "@/components/icons";
import { TooltipComponent } from "@/components/ui/tooltip/TooltipComponent";

import { useAuthStore } from "@/store/useAuthStore";

import { formatNumber } from "@/utils/format-number";

import styles from "@/styles/pages/office/orders/Orders.module.css";

import { format } from "date-fns";

interface OrderInfoProps {
  order: OrderTableItem;
}

export const OrderDetailsInfo = ({ order }: OrderInfoProps) => {
  const fullName = useAuthStore(state => state.user?.fullName ?? "-");
  const address = useAuthStore(state => state.user?.address ?? "-");

  return (
    <div className={styles.orderInfoContainer}>
      <div className={styles.orderInfoHeader}>
        <h3 className={styles.orderInfoTitle}>Заказ № {order.orderNumber}</h3>
        <TooltipComponent title="Выгрузить заказ в Excel">
          <DownloadForOfflineIcon
            onClick={() =>
              exportOrderToExcel(
                order.id,
                order.orderDate,
                address,
                order.details,
                fullName
              )
            }
            fontSize="large"
            className="closeButton"
          />
        </TooltipComponent>
      </div>

      <ul className={styles.orderInfoList}>
        <li className={styles.orderInfoItem}>
          <span>Дата заказа:</span>
          {order.orderDate
            ? format(new Date(order.orderDate), "dd.MM.yyyy")
            : "-"}
        </li>
        <li className={styles.orderInfoItem}>
          <span>ФИО клиента:</span> {fullName}
        </li>
        <li className={styles.orderInfoItem}>
          <span>Адрес доставки:</span> {address}
        </li>
        <li className={styles.orderInfoItem}>
          <span>Сумма заказа:</span>
          {formatNumber(
            Array.isArray(order.details)
              ? order.details.reduce(
                  (sum, item) => sum + item.price * item.qty,
                  0
                )
              : 0
          )}{" "}
          руб.
        </li>
      </ul>
    </div>
  );
};
