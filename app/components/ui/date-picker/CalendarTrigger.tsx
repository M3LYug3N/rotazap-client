import { forwardRef } from "react";

import { CalendarMonthIcon } from "@/components/icons";

import styles from "@/styles/components/ui/date-picker/DatePicker.module.css";

interface Props {
  value?: string;
  onClick?: () => void;
}

// eslint-disable-next-line react/display-name
export const CalendarTrigger = forwardRef<HTMLDivElement, Props>(
  ({ value, onClick }, ref) => (
    <div ref={ref} onClick={onClick} className={styles.iconWrapper}>
      <CalendarMonthIcon className={styles.icon} />
      {value && <span>{value}</span>}
    </div>
  )
);
