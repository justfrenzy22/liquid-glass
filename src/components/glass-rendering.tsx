"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  detectGlassEnvironment,
  type GlassEnvironment,
  type GlassRenderMode,
} from "../lib/environment.js";

const RenderingContext = createContext<GlassRenderMode>("auto");
const subscribe = () => () => {};
const serverSnapshot = () => null;
let browserSnapshot: GlassEnvironment | null = null;
function readEnvironment() {
  if (typeof window === "undefined") return null;
  if (!browserSnapshot) {
    const supports = (property: string, value: string) =>
      typeof CSS !== "undefined" &&
      typeof CSS.supports === "function" &&
      CSS.supports(property, value);
    const hints = navigator as Navigator & {
      userAgentData?: { mobile?: boolean };
    };
    browserSnapshot = detectGlassEnvironment({
      userAgent: navigator.userAgent,
      maxTouchPoints: navigator.maxTouchPoints,
      mobileHint: hints.userAgentData?.mobile,
      backdropBlur:
        supports("backdrop-filter", "blur(1px)") ||
        supports("-webkit-backdrop-filter", "blur(1px)"),
      svgBackdrop: supports("backdrop-filter", 'url("#glass")'),
    });
  }
  return browserSnapshot;
}
export function useGlassEnvironment() {
  return useSyncExternalStore(subscribe, readEnvironment, serverSnapshot);
}
export function useGlassRenderMode() {
  return useContext(RenderingContext);
}
export function GlassRenderingProvider({
  mode = "auto",
  children,
}: {
  mode?: GlassRenderMode;
  children: ReactNode;
}) {
  return <RenderingContext value={mode}>{children}</RenderingContext>;
}
