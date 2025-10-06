"use client";

import { useFormStatus } from "react-dom";

export const SearchButton = () => {
  const status = useFormStatus();

  return (
    <button type="submit">{status.pending ? "Searching..." : "Search"}</button>
  );
};
