import React from "react";

export const HighlightMatch = (
  text: string,
  query: string
): React.ReactNode => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        style={{
          backgroundColor: "#f76435",
          padding: "4px",
          borderRadius: "4px",
          color: "#fff",
          fontWeight: 700
        }}
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};
