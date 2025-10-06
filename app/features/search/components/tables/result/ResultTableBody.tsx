"use client";

import { TableBody } from "@mui/material";
import { useRouter } from "next/navigation";

import { ResultTableBodyRow } from "@/features/search/components/tables/result/ResultTableBodyRow";
import { SearchResultTableProps } from "@/features/search/types";

export const ResultTableBody = ({
  brands,
  fallbackNumber
}: SearchResultTableProps) => {
  const router = useRouter();
  const number = brands[0]?.number || fallbackNumber;

  const handleRowClick = (brand: string) => {
    if (!number) return;
    router.push(`/search/${number}/crosses/${encodeURIComponent(brand)}`);
  };

  return (
    <TableBody>
      {brands.map(brand => (
        <ResultTableBodyRow
          key={brand.id}
          item={brand}
          onClick={() => handleRowClick(brand.brand)}
        />
      ))}
    </TableBody>
  );
};
