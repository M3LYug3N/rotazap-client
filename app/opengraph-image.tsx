// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import path from "node:path";

import fs from "node:fs";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Читаем файл как ЧИСТЫЙ ArrayBuffer (не SharedArrayBuffer) */
function readAsArrayBuffer(filePath: string): ArrayBuffer {
  const buf = fs.readFileSync(filePath); // Buffer
  const ab = new ArrayBuffer(buf.byteLength); // новый ArrayBuffer
  new Uint8Array(ab).set(buf); // копируем байты
  return ab;
}

/** Ассеты */
const fontPath = path.join(process.cwd(), "public", "fonts", "Roboto.ttf"); // или Roboto-Regular.ttf
const bgPath = path.join(process.cwd(), "public", "img", "og", "bg.png");

/** Кэши */
let fontData: ArrayBuffer | undefined;
let bgDataUrl: string | undefined;

function loadAssets() {
  if (!fontData) {
    fontData = readAsArrayBuffer(fontPath); // тип строго ArrayBuffer
  }
  if (!bgDataUrl) {
    const buf = fs.readFileSync(bgPath);
    bgDataUrl = `data:image/png;base64,${buf.toString("base64")}`;
  }
}

export default async function OpengraphImage() {
  loadAssets();

  const title = "rotazap.ru — автозапчасти быстро и честно";
  const desc =
    "Поиск по артикулу и бренду, актуальные цены и сроки. Личный кабинет, заказы, возвраты — всё прозрачно.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0b1220",
          fontFamily: "Roboto"
        }}
      >
        {/* background */}
        <img
          src={bgDataUrl!}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.2
          }}
        />

        {/* content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            padding: 64,
            width: "100%",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              color: "white",
              fontWeight: 700,
              letterSpacing: -0.5,
              textShadow: "0 2px 12px rgba(0,0,0,.35)",
              maxWidth: 960
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: 32,
              color: "#cbd5e1",
              maxWidth: 960,
              textShadow: "0 1px 8px rgba(0,0,0,.3)"
            }}
          >
            {desc}
          </div>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#93c5fd",
              fontSize: 28
            }}
          >
            <span>⚡ Быстрый поиск</span>
            <span>•</span>
            <span>✅ Актуальные остатки</span>
            <span>•</span>
            <span>🧾 Умные заказы</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Roboto",
          data: fontData!, // строго ArrayBuffer
          style: "normal",
          weight: 700 // если файл Regular — поставь 400
        }
      ]
    }
  );
}
