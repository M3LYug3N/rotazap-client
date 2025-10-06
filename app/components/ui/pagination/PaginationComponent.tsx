import { Pagination } from "@mui/material";

interface PaginationProps {
  totalItems: number;
  rowsPerPage: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export const PaginationComponent = ({
  totalItems,
  rowsPerPage,
  currentPage,
  onChange
}: PaginationProps) => {
  if (totalItems <= rowsPerPage) return null;

  return (
    <Pagination
      count={Math.ceil(totalItems / rowsPerPage)}
      page={currentPage}
      showFirstButton
      showLastButton
      onChange={(_, value) => onChange(value)}
      sx={{ display: "flex", justifyContent: "center", marginTop: "-10px" }}
    />
  );
};
