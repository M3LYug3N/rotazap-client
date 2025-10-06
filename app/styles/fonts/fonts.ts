import { IBM_Plex_Sans, Roboto } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap"
});

export const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap"
});
