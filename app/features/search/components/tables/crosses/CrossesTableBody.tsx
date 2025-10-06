import { TableBody } from "@mui/material";

import { CrossesTableRow } from "@/features/search/components/tables/crosses/CrossesTableRow";
import { CrossesTableBodyProps } from "@/features/search/types/crosses.types";

import {
  StyledTableCellBody,
  StyledTableRowBody
} from "@/components/styled/tables/StylesTables";

export const CrossesTableBody = ({
  crosses,
  descr,
  properties,
  images,
  onUpdateCount,
  onOpenImageModal,
  onOpenInfoModal,
  onAddToCart
}: CrossesTableBodyProps) => (
  <TableBody>
    {crosses.map((cross, index) => {
      if (cross.type === "group") {
        return (
          <StyledTableRowBody key={`group-${index}`}>
            <StyledTableCellBody
              colSpan={8}
              className="bg-gray-100"
              sx={{
                height: "30px !important",
                textAlign: "left !important",
                fontWeight: "bold !important"
              }}
            >
              {cross.label}
            </StyledTableCellBody>
          </StyledTableRowBody>
        );
      }

      if (cross.type === "empty") {
        return (
          <StyledTableRowBody key={`empty-${index}`}>
            <StyledTableCellBody
              colSpan={8}
              className="text-center text-gray-500"
              sx={{ height: "40px !important" }}
            >
              {cross.message}
            </StyledTableCellBody>
          </StyledTableRowBody>
        );
      }

      return (
        <CrossesTableRow
          key={`${cross.skuId}_${cross.supplierId}_${index}`}
          index={index}
          cross={cross}
          descr={descr}
          properties={properties}
          images={images}
          onUpdateCount={onUpdateCount}
          onOpenImageModal={onOpenImageModal}
          onOpenInfoModal={onOpenInfoModal}
          onAddToCart={onAddToCart}
        />
      );
    })}
  </TableBody>
);
