"use client";

import { TableBody } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";

import { BasketTableRow } from "@/features/office/basket/components/tables/BasketTableRow";

import { useBasket } from "@/hooks/useBasket";

interface BasketTableBodyProps {
  selectedSet: Set<string>;
  setSelectedSet: Dispatch<SetStateAction<Set<string>>>;
}

export const BasketTableBody: FC<BasketTableBodyProps> = ({
  selectedSet,
  setSelectedSet
}) => {
  const { items, isLoading } = useBasket({ selectedSet, setSelectedSet });

  if (isLoading) return null;

  console.log("BasketTableBody items:", items);

  return (
    <TableBody>
      {[...items]
        .filter(
          item =>
            item.skuId !== undefined &&
            item.supplierId !== undefined &&
            item.hash
        )
        .sort((a, b) => a.hash.localeCompare(b.hash))
        .map(item => (
          <BasketTableRow
            key={`${item.skuId}_${item.supplierId}_${item.hash}`}
            skuId={item.skuId}
            supplierId={item.supplierId}
            brand={item.brand}
            descr={item.descr}
            number={item.article}
            hash={item.hash}
            selectedSet={selectedSet}
            setSelectedSet={setSelectedSet}
          />
        ))}
    </TableBody>
  );
};
