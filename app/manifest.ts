import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "rotazap.ru",
    short_name: "Rotazap",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1f2937",
    description:
      "Онлайн-магазин автозапчастей с быстрым поиском, заказом и доставкой.",
    orientation: "portrait-primary",
    lang: "ru",
    dir: "ltr",
    scope: "/",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    screenshots: [
      {
        src: "/screenshots/home-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide"
      },
      {
        src: "/screenshots/home-narrow.png",
        sizes: "375x667",
        type: "image/png",
        form_factor: "narrow"
      }
    ]
  };
}
