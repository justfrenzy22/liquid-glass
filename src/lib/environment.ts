import type { GlassConfig } from "./types.js";

export type GlassEnvironment = {
  device: "phone" | "tablet" | "desktop";
  browser: "safari" | "chromium" | "firefox" | "other";
  platform: "ios" | "macos" | "android" | "windows" | "other";
  backdropBlur: boolean;
  svgBackdrop: boolean;
};
export type GlassRenderMode = NonNullable<GlassConfig["mode"]>;
export type GlassRenderer = "refraction" | "compatible" | "fallback";

/** UA hints describe the device; CSS checks describe available rendering syntax.
 * A URL syntax check alone cannot establish SVG backdrop rendering support. */
export function detectGlassEnvironment({
  userAgent,
  maxTouchPoints = 0,
  mobileHint = false,
  backdropBlur,
  svgBackdrop,
}: {
  userAgent: string;
  maxTouchPoints?: number;
  mobileHint?: boolean;
  backdropBlur: boolean;
  svgBackdrop: boolean;
}): GlassEnvironment {
  const ipad =
    /iPad/i.test(userAgent) ||
    (/Macintosh|MacIntel/i.test(userAgent) && maxTouchPoints > 1);
  const ios = ipad || /iPhone|iPod/i.test(userAgent);
  const android = /Android/i.test(userAgent);
  const tablet = ipad || (android && !/Mobile/i.test(userAgent));
  const phone =
    !tablet && (ios || /Mobile|Windows Phone/i.test(userAgent) || mobileHint);
  const chromium =
    /Chrome\/|Chromium\/|Edg\//.test(userAgent) &&
    !/OPR\/|CriOS\//.test(userAgent);
  const browser = chromium
    ? "chromium"
    : /Firefox\/|FxiOS\//.test(userAgent)
      ? "firefox"
      : /Safari\//.test(userAgent) && !/CriOS|OPiOS|EdgiOS/.test(userAgent)
        ? "safari"
        : "other";
  return {
    device: tablet ? "tablet" : phone ? "phone" : "desktop",
    browser,
    platform: ios
      ? "ios"
      : android
        ? "android"
        : /Macintosh|MacIntel/i.test(userAgent)
          ? "macos"
          : /Windows/i.test(userAgent)
            ? "windows"
            : "other",
    backdropBlur,
    svgBackdrop,
  };
}

export function selectGlassRenderer(
  mode: GlassRenderMode,
  environment: GlassEnvironment | null,
): GlassRenderer {
  if (!environment || mode === "fallback" || !environment.backdropBlur)
    return "fallback";
  if (mode === "compatible") return "compatible";
  // Mobile devices use the lighter CSS finish, including iOS browsers with desktop UAs.
  return environment.browser === "chromium" &&
    environment.device === "desktop" &&
    environment.platform !== "ios" &&
    environment.svgBackdrop
    ? "refraction"
    : "compatible";
}
