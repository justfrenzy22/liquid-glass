import type { ComponentPropsWithRef } from "react";
import type { GlassConfig } from "../lib/types.js";
import { GlassSurface } from "./glass-surface.js";
import styles from "./liquid-glass.module.css";

export type GlassInputProps = ComponentPropsWithRef<"input"> & {
  glass?: GlassConfig;
};
export function GlassInput({
  glass,
  className = "",
  disabled,
  ...props
}: GlassInputProps) {
  return (
    <GlassSurface
      radius={14}
      opacity={0.8}
      {...glass}
      className={disabled ? styles.disabled : ""}
    >
      <input
        {...props}
        disabled={disabled}
        className={`${styles.input} ${className}`}
      />
    </GlassSurface>
  );
}

export function GlassSearch({
  glass,
  className = "",
  disabled,
  "aria-label": label = "Search files",
  type = "search",
  ...props
}: GlassInputProps) {
  return (
    <GlassSurface
      radius={999}
      opacity={0.8}
      {...glass}
      className={disabled ? styles.disabled : ""}
    >
      <div className={styles.search}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 6 6" />
        </svg>
        <input
          {...props}
          type={type}
          aria-label={label}
          disabled={disabled}
          className={`${styles.input} ${className}`}
        />
      </div>
    </GlassSurface>
  );
}
