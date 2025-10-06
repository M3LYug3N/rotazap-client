export const generateOrderId = (existingOrderIds: string[]): string => {
  const date = new Date();
  const yyyymmdd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const prefix = `RZ-${yyyymmdd}`;

  // Найдём максимальный номер среди заказов на текущую дату
  const todayOrders = existingOrderIds
    .filter(id => id.startsWith(prefix))
    .map(id => {
      const parts = id.split("-");
      return parseInt(parts[2], 10); // "01" → 1
    });

  const nextIndex = (Math.max(0, ...todayOrders) + 1)
    .toString()
    .padStart(2, "0");

  return `${prefix}-${nextIndex}`;
};
