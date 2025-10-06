"use client";

import { useForm } from "react-hook-form";

import { orderStatus } from "@/features/office/orders/data/order-status.data";
import {
  OrderFilters,
  OrdersFilterFormProps
} from "@/features/office/orders/types";

import { Button } from "@/components/ui/buttons/Button";
import { DatePickerComponent } from "@/components/ui/date-picker/DatePickerComponent";
import { FilterInput } from "@/components/ui/forms/inputs/filter/FilterInput";
import { FilterSelect } from "@/components/ui/forms/inputs/filter/FilterSelect";

import styles from "@/styles/pages/office/orders/Orders.module.css";

export const OrdersForm = ({ onFilter, onReset }: OrdersFilterFormProps) => {
  const { control, handleSubmit, reset } = useForm<OrderFilters>({
    defaultValues: {
      article: "",
      order_status: "",
      date_range: [null, null]
    }
  });

  const statusOptions = orderStatus.map(status => status.title);

  const handleFormReset = () => {
    reset();
    onReset();
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onFilter)}
      onReset={handleFormReset}
    >
      <div className={styles.filterContainer}>
        <DatePickerComponent control={control} name="date_range" />
        <FilterInput
          control={control}
          label="Артикул детали"
          name="article"
          type="text"
        />
        <FilterSelect
          control={control}
          name="order_status"
          label="Статус заказа"
          options={statusOptions}
        />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <Button type="submit">Применить фильтр</Button>
        <Button type="reset" variant="SecondaryOutline">
          Сбросить фильтр
        </Button>
      </div>
    </form>
  );
};
