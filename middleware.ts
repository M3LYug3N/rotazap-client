import { type NextRequest, NextResponse } from "next/server";

// Боты, которым нельзя отдавать редиректы (нужен 200 для превью)
const BOT_UA =
  /TelegramBot|facebookexternalhit|Twitterbot|Slackbot|LinkedInBot|Discordbot|VKShare|WhatsApp/i;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") ?? "";

  // 0) Пропускаем ботов и OG-роут без проверок (иначе 307 и нет превью)
  if (BOT_UA.test(ua) || pathname.startsWith("/opengraph-image")) {
    return NextResponse.next();
  }

  // Получаем токен и роль из cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  // --- Запрещаем маршрут "/" для неавторизованных ---
  if (pathname === "/") {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  // --- Публичные маршруты ---
  const publicRoutes = ["/forgot-password", "/reset-password", "/info"];
  if (
    publicRoutes.some(route => pathname === route || pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // --- Если токен отсутствует, разрешаем только /auth ---
  if (!accessToken) {
    if (pathname !== "/auth") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
    return NextResponse.next();
  }

  // --- Авторизованный пользователь не должен попадать на /auth ---
  if (pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // --- Роль "pending": только /confirmation и /info/*
  if (userRole === "pending") {
    if (pathname !== "/confirmation" && !pathname.startsWith("/info")) {
      return NextResponse.redirect(new URL("/confirmation", request.url));
    }
    return NextResponse.next();
  }

  // --- Роль "user": запрещены /confirmation и /auth ---
  if (userRole === "user") {
    if (pathname === "/confirmation" || pathname === "/auth") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // исключаем системные ассеты и служебные файлы
    "/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|manifest\\.webmanifest|icons/|screenshots/|opengraph-image(?:\\.png)?|google273306f69acdefef\\.html|yandex_76be64e45a69686b\\.html).*)"
  ]
};
