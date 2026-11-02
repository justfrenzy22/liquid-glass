import type { ComponentPropsWithRef } from "react";
import type { GlassConfig } from "../lib/types.js";
import { GlassSurface } from "./glass-surface.js";
import styles from "./optical-controls.module.css";

export type GlassButtonProps = ComponentPropsWithRef<"button"> & {
  glass?: GlassConfig;
  loading?: boolean;
};
export function GlassButton({
  glass,
  loading = false,
  disabled,
  children,
  className = "",
  type = "button",
  ...props
}: GlassButtonProps) {
  return (
    <GlassSurface
      radius={28}
      blur={0.5}
      opacity={0.08}
      thickness={70}
      refraction={0.7}
      specularIntensity={0.35}
      {...glass}
      className={styles.buttonFrame}
    >
      <button
        {...props}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={`${styles.button} ${className}`}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {children}
      </button>
    </GlassSurface>
  );
}

export type GlassIconButtonProps = GlassButtonProps & { "aria-label": string };
export function GlassIconButton({
  className = "",
  ...props
}: GlassIconButtonProps) {
  return <GlassButton {...props} className={`${styles.icon} ${className}`} />;
}
