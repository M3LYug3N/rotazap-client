import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

import { OrderDetailsItem } from "@/features/office/orders/types";

export const exportOrderToExcel = (
  orderId: string,
  orderDate: Date | string,
  address: string,
  items: OrderDetailsItem[],
  fullName: string
) => {
  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const worksheetData = [
    [`Заказ №${orderId}`],
    ["Дата заказа:", new Date(orderDate).toLocaleDateString("ru-RU")],
    ["ФИО клиента:", fullName],
    ["Адрес доставки:", address],
    ["Сумма, руб.:", total],
    [],
    ["Бренд", "Артикул", "Описание", "Цена, шт.", "Кол-во, шт.", "Сумма, руб."],
    ...items.map(item => [
      item.brand,
      item.article,
      item.descr,
      item.price,
      item.qty,
      item.totalPrice
    ])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Заказ");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
  });

  saveAs(blob, `order-${orderId}.xlsx`);
};
