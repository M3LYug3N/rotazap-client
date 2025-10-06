import { ru } from "date-fns/locale";
import DatePicker from "react-datepicker";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { CalendarTrigger } from "@/components/ui/date-picker/CalendarTrigger";

import styles from "@/styles/components/ui/date-picker/DatePicker.module.css";
import "@/styles/components/ui/date-picker/calendar.css";

import "react-datepicker/dist/react-datepicker.css";

interface DateRangeFilterInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export const DatePickerComponent = <T extends FieldValues>({
  control,
  name,
  label
}: DateRangeFilterInputProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <div className={styles.container}>
        {label && <label>{label}</label>}
        <DatePicker
          selectsRange
          showYearDropdown
          scrollableYearDropdown
          startDate={field.value?.[0] || null}
          endDate={field.value?.[1] || null}
          onChange={(update: [Date | null, Date | null]) => {
            field.onChange(update);
          }}
          dateFormat="dd.MM.yyyy"
          minDate={new Date(2025, 2, 1)} // Считает с 0
          maxDate={new Date()}
          locale={ru}
          monthsShown={2}
          customInput={<CalendarTrigger />}
          wrapperClassName="datepicker-wrapper"
          withPortal
        />
      </div>
    )}
  />
);
