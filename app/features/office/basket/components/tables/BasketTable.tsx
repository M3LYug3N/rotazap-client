"use client";

import { Paper, Table, TableContainer } from "@mui/material";

import { BasketTableBody } from "@/features/office/basket/components/tables/BasketTableBody";
import { BasketTableHead } from "@/features/office/basket/components/tables/BasketTableHead";

interface BasketTableProps {
  selectedSet: Set<string>;
  setSelectedSet: React.Dispatch<React.SetStateAction<Set<string>>>;
}

export const BasketTable = ({
  selectedSet,
  setSelectedSet
}: BasketTableProps) => (
  <TableContainer component={Paper}>
    <Table>
      <BasketTableHead
        selectedSet={selectedSet}
        setSelectedSet={setSelectedSet}
      />
      <BasketTableBody
        selectedSet={selectedSet}
        setSelectedSet={setSelectedSet}
      />
    </Table>
  </TableContainer>
);
