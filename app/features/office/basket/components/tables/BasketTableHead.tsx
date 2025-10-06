"use client";

import { TableHead } from "@mui/material";
import { FC } from "react";

import { DeleteForeverIcon } from "@/components/icons";
import {
  StyledTableCellHead,
  StyledTableRowHead
} from "@/components/styled/tables/StylesTables";
import { CheckboxComponent } from "@/components/ui/forms/inputs/CheckboxComponent";

import { BASKET_TABLE_HEAD } from "@/data/table-header.data";

import { useBasket } from "@/hooks/useBasket";

interface BasketTableHeadProps {
  selectedSet: Set<string>;
  setSelectedSet: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const BasketTableHead: FC<BasketTableHeadProps> = ({
  selectedSet,
  setSelectedSet
}) => {
  const { items, clear, selectAllItems } = useBasket({
    selectedSet,
    setSelectedSet
  });

  const isAllSelected = items.length > 0 && items.every(item => item.selected);

  const handleSelectAll = (checked: boolean) => {
    selectAllItems(checked);
  };

  return (
    <TableHead>
      <StyledTableRowHead>
        {BASKET_TABLE_HEAD.map(itemHead => (
          <StyledTableCellHead key={itemHead.id}>
            {itemHead.id === 7 ? (
              <CheckboxComponent
                checked={isAllSelected}
                onChange={handleSelectAll}
                size="large"
              />
            ) : itemHead.id === 8 ? (
              <DeleteForeverIcon
                className="closeButton"
                fontSize="medium"
                onClick={clear}
              />
            ) : (
              itemHead.label
            )}
          </StyledTableCellHead>
        ))}
      </StyledTableRowHead>
    </TableHead>
  );
};
