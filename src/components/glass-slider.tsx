"use client";

import {
  useEffect,
  useState,
  type ComponentPropsWithRef,
  type CSSProperties,
} from "react";
import type { GlassConfig } from "../lib/types.js";
import { GlassSurface } from "./glass-surface.js";
import styles from "./optical-controls.module.css";

export type GlassSliderProps = Omit<
  ComponentPropsWithRef<"input">,
  "type" | "children"
> & {
  label: string;
  glass?: GlassConfig;
  /** Keeps the thumb lifted for inspecting the refraction at rest. */
  forceActive?: boolean;
  onValueChange?: (value: number) => void;
};

function numeric(
  value: ComponentPropsWithRef<"input">["value"],
  fallback: number,
) {
  const result = Number(value);
  return value !== undefined && Number.isFinite(result) ? result : fallback;
}

export function GlassSlider({
  label,
  glass,
  forceActive = false,
  onValueChange,
  className = "",
  style,
  value,
  defaultValue,
  min = 0,
  max = 100,
  disabled,
  onChange,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: GlassSliderProps) {
  const lower = numeric(min, 0);
  const upper = numeric(max, 100);
  const [localValue, setLocalValue] = useState(() =>
    numeric(defaultValue, (lower + upper) / 2),
  );
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);
  const current = numeric(value, localValue);
  const position =
    upper > lower
      ? Math.max(0, Math.min(1, (current - lower) / (upper - lower)))
      : 0;
  const active = !disabled && (forceActive || pressed || focused);
  useEffect(() => {
    if (!pressed) return;
    const release = () => setPressed(false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
    };
  }, [pressed]);

  const variables: CSSProperties & { "--slider-position": number } = {
    "--slider-position": position,
  };
  return (
    <label className={`${styles.sliderLabel} ${className}`}>
      <span className={styles.sliderCaption}>{label}</span>
      <span
        className={styles.sliderRoot}
        data-active={active}
        data-disabled={disabled || undefined}
        style={variables}
      >
        <span className={styles.track} aria-hidden="true">
          <span className={styles.fill} />
        </span>
        <span className={styles.thumb} aria-hidden="true">
          <GlassSurface
            radius={30}
            blur={0}
            thickness={80}
            specularIntensity={0.4}
            {...glass}
            opacity={glass?.opacity ?? (active ? 0.1 : 1)}
            refraction={(glass?.refraction ?? 1) * (active ? 0.9 : 0.4)}
            className={styles.thumbLens}
          />
        </span>
        <input
          {...props}
          type="range"
          min={min}
          max={max}
          value={value ?? localValue}
          disabled={disabled}
          aria-label={props["aria-label"] ?? label}
          className={styles.range}
          style={style}
          onChange={(event) => {
            const next = event.currentTarget.valueAsNumber;
            if (value === undefined) setLocalValue(next);
            onValueChange?.(next);
            onChange?.(event);
          }}
          onPointerDown={(event) => {
            if (!disabled) setPressed(true);
            setFocused(false);
            onPointerDown?.(event);
          }}
          onPointerUp={(event) => {
            setPressed(false);
            onPointerUp?.(event);
          }}
          onPointerCancel={(event) => {
            setPressed(false);
            onPointerCancel?.(event);
          }}
          onFocus={(event) => {
            setFocused(event.currentTarget.matches(":focus-visible"));
            onFocus?.(event);
          }}
          onKeyDown={(event) => {
            if (!disabled) setFocused(true);
            onKeyDown?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            setPressed(false);
            onBlur?.(event);
          }}
        />
      </span>
    </label>
  );
}
