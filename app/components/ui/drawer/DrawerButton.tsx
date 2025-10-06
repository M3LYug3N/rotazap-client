import { MouseEventHandler } from "react";

import { DoubleArrowIcon } from "@/components/icons";

import styles from "@/styles/components/ui/drawer/Drawer.module.css";

type VerticalButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const DrawerButton = ({ onClick }: VerticalButtonProps) => (
  <button onClick={onClick} className={styles.drawerButton}>
    <DoubleArrowIcon className="text-secondaryText m-1 scale-y-[2]" />
  </button>
);
