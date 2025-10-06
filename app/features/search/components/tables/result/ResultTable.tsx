"use client";

import { Paper, Table, TableContainer } from "@mui/material";

import { ResultTableBody } from "@/features/search/components/tables/result/ResultTableBody";
import { ResultTableHead } from "@/features/search/components/tables/result/ResultTableHead";
import { SearchResultTableProps } from "@/features/search/types";

export const ResultTable = ({
  brands,
  fallbackNumber
}: SearchResultTableProps) => {
  if (brands.length === 0) {
    return (
      <p className="text-center text-gray-500">Нет данных для отображения.</p>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <ResultTableHead />
        <ResultTableBody brands={brands} fallbackNumber={fallbackNumber} />
      </Table>
    </TableContainer>
  );
};
