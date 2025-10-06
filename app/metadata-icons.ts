import type { Metadata } from "next";

export const sharedIcons: Metadata["icons"] = {
  icon: [
    {
      url: "/icons/favicon-light.png",
      type: "image/png",
      media: "(prefers-color-scheme: light)"
    },
    {
      url: "/icons/favicon-dark.png",
      type: "image/png",
      media: "(prefers-color-scheme: dark)"
    },
    {
      url: "/icons/icon-512.png",
      type: "image/png",
      sizes: "512x512"
    },
    {
      url: "/icons/icon-192.png",
      type: "image/png",
      sizes: "192x192"
    },
    {
      url: "/icons/logo-120.svg",
      type: "image/svg+xml"
    }
  ],
  apple: [
    {
      url: "/icons/icon-192.png",
      sizes: "192x192"
    }
  ],
  shortcut: "/icons/favicon-dark.png" // ← пусть будет fallback по умолчанию
};
