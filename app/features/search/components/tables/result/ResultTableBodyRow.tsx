"use client";

import { ResultTableBodyRowProps } from "@/features/search/types";

import {
  StyledTableCellBody,
  StyledTableRowBody
} from "@/components/styled/tables/StylesTables";

export const ResultTableBodyRow = ({
  item,
  onClick
}: ResultTableBodyRowProps) => (
  <StyledTableRowBody hover onClick={onClick} sx={{ cursor: "pointer" }}>
    {[item.brand, item.number, item.description].map((value, idx) => (
      <StyledTableCellBody key={idx}>{value}</StyledTableCellBody>
    ))}
  </StyledTableRowBody>
);
