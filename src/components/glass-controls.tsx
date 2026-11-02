import type { ComponentPropsWithRef, ReactNode } from "react";
import type { GlassConfig } from "../lib/types.js";
import { GlassSurface } from "./glass-surface.js";
import styles from "./liquid-glass.module.css";
export { GlassSlider, type GlassSliderProps } from "./glass-slider.js";

export type GlassSwitchProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "children"
> & { label: ReactNode; glass?: GlassConfig };
export function GlassSwitch({
  label,
  glass,
  className = "",
  disabled,
  ...props
}: GlassSwitchProps) {
  return (
    <label
      className={`${styles.switch} ${disabled ? styles.disabled : ""} ${className}`}
    >
      <GlassSurface radius={999} {...glass}>
        <span className={styles.track}>
          <input
            {...props}
            disabled={disabled}
            type="checkbox"
            role="switch"
            className={styles.checkbox}
          />
          <span className={styles.thumb} aria-hidden="true" />
        </span>
      </GlassSurface>
      <span>{label}</span>
    </label>
  );
}
