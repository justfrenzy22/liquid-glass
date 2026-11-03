"use client";

import {
  Button,
  Label,
  Slider,
  Switch,
  Input,
  TextField,
  FieldError,
  type ButtonProps,
  type SliderProps,
  type SwitchProps,
  type TextFieldProps,
  type InputProps,
} from "@heroui/react";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { GlassConfig } from "../lib/types.js";
import { GlassSurface } from "./glass-surface.js";
import styles from "./heroui-controls.module.css";
import { useGlassDrag } from "./use-glass-drag.js";
import { cn } from "../lib/cn.js";

export type LiquidNextUIButtonProps = Omit<ButtonProps, "children" | "type"> & {
  children: ReactNode;
  /** Use icon for a square icon-only button, or a standard HTML button type. */
  type?: ButtonProps["type"] | "icon";
  /** Square icon-only layout. Add an aria-label describing the action. */
  isIconOnly?: boolean;
  glass?: GlassConfig;
  appearance?: "normal" | "glass" | "colored";
  glassColor?: string;
  /** Tailwind classes for the root button, glass surface and label/content. */
  classNames?: { root?: string; surface?: string; content?: string };
};

export function LiquidNextUIButton({
  children,
  type = "button",
  isIconOnly = false,
  glass,
  appearance = "glass",
  glassColor = "#0878ed",
  classNames,
  className = "",
  ...props
}: LiquidNextUIButtonProps) {
  const iconOnly = isIconOnly || type === "icon";
  return (
    <Button
      {...props}
      type={type === "icon" ? "button" : type}
      isIconOnly={iconOnly}
      data-icon-only={iconOnly || undefined}
      data-liquid-glass=""
      data-button-appearance={appearance}
      className={typeof className === "function" ? state => cn(styles.button, classNames?.root, className(state)) : cn(styles.button, classNames?.root, className)}
    >
      {appearance === "normal" ? (
        <span data-slot="button-content" className={cn(styles.buttonContent, classNames?.content)}>{children}</span>
      ) : (
        <GlassSurface
          radius={28}
          opacity={0.08}
          blur={0}
          thickness={80}
          refraction={1}
          {...glass}
          className={cn(styles.buttonSurface, classNames?.surface)}
          data-colored={appearance === "colored"}
          style={{ "--button-tint": glassColor } as CSSProperties}
        >
          <span data-slot="button-content" className={cn(styles.buttonContent, classNames?.content)}>{children}</span>
        </GlassSurface>
      )}
    </Button>
  );
}

export type LiquidNextUISliderProps = Omit<
  SliderProps,
  "children" | "orientation"
> & {
  label: string;
  glass?: GlassConfig;
  forceActive?: boolean;
};

export function LiquidNextUISlider({
  label,
  glass,
  forceActive = false,
  className = "",
  ...props
}: LiquidNextUISliderProps) {
  return (
    <Slider
      {...props}
      orientation="horizontal"
      className={`${styles.slider} ${className}`}
    >
      <Label className={styles.label}>{label}</Label>
      <Slider.Output className={styles.output} />
      <Slider.Track className={styles.track}>
        <Slider.Fill className={styles.fill} />
        <Slider.Thumb className={styles.thumb}>
          {({ isDragging, isFocusVisible, isDisabled }) => {
            const active =
              !isDisabled && (isDragging || isFocusVisible || forceActive);
            return (
              <GlassSurface
                {...glass}
                radius={30}
                blur={glass?.blur ?? 0}
                thickness={glass?.thickness ?? 80}
                opacity={active ? 0.1 : 1}
                refraction={(glass?.refraction ?? 1) * (active ? 0.9 : 0.4)}
                className={styles.lens}
                data-active={active}
                aria-hidden="true"
              />
            );
          }}
        </Slider.Thumb>
      </Slider.Track>
    </Slider>
  );
}

export type LiquidNextUISwitchProps = Omit<SwitchProps, "children"> & {
  label: string;
  glass?: GlassConfig;
  forceActive?: boolean;
};

export function LiquidNextUISwitch({
  label,
  glass,
  forceActive = false,
  onChange,
  isSelected,
  defaultSelected,
  ref: forwardedRef,
  className = "",
  ...props
}: LiquidNextUISwitchProps) {
  const [settling, setSettling] = useState(false);
  const [localSelected, setLocalSelected] = useState(defaultSelected ?? false);
  const selected = isSelected ?? localSelected;
  const root = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardedRef, () => root.current!);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const update = (next: boolean) => {
    setSettling(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSettling(false), 480);
    if (next !== selected) {
      setLocalSelected(next);
      onChange?.(next);
    }
  };
  const focusInput = () =>
    root.current
      ?.querySelector<HTMLInputElement>('input[role="switch"]')
      ?.focus();
  const drag = useGlassDrag({
    value: selected ? 1 : 0,
    max: 1,
    disabled: props.isDisabled,
    pixelsPerUnit: (width) => width - 18,
    onCommit: (next) => {
      update(next >= 0.5);
      focusInput();
    },
    onTap: () => {
      update(!selected);
      focusInput();
    },
  });
  return (
    <Switch
      {...props}
      ref={root}
      isSelected={selected}
      className={`${styles.switch} ${className}`}
      onChange={update}
    >
      <Switch.Content className={styles.switchContent}>
        {({ isPressed, isFocusVisible, isDisabled }) => {
          const active =
            !isDisabled &&
            (drag.draft !== null ||
              isPressed ||
              isFocusVisible ||
              settling ||
              forceActive);
          return (
            <>
              <Switch.Control
                className={styles.switchTrack}
                {...drag.handlers}
                data-dragging={drag.draft !== null}
                style={
                  {
                    "--switch-progress": drag.draft ?? (selected ? 1 : 0),
                  } as CSSProperties
                }
              >
                <Switch.Thumb className={styles.switchThumb}>
                  <GlassSurface
                    {...glass}
                    radius={30}
                    blur={glass?.blur ?? 0}
                    thickness={glass?.thickness ?? 80}
                    opacity={active ? 0.1 : 1}
                    refraction={(glass?.refraction ?? 1) * (active ? 0.9 : 0.4)}
                    className={styles.switchLens}
                    data-active={active}
                    aria-hidden="true"
                  />
                </Switch.Thumb>
              </Switch.Control>
              <Label>{label}</Label>
            </>
          );
        }}
      </Switch.Content>
    </Switch>
  );
}

export type LiquidNextUIInputProps = Omit<TextFieldProps, "children"> & {
  label: string;
  glass?: GlassConfig;
  inputProps?: InputProps;
};

export function LiquidNextUIInput({
  label,
  glass,
  inputProps,
  className = "",
  ...props
}: LiquidNextUIInputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <TextField
      {...props}
      className={`${styles.field} ${className}`}
      data-active={focused}
    >
      <Label className={styles.fieldLabel}>{label}</Label>
      <GlassSurface
        {...glass}
        opacity={focused ? 0.08 : 0.2}
        radius={30}
        blur={focused ? 0 : 1}
        thickness={focused ? 80 : 50}
        className={styles.inputSurface}
      >
        <Input
          {...inputProps}
          className={`${styles.input} ${inputProps?.className ?? ""}`}
          onFocus={(event) => {
            setFocused(true);
            inputProps?.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            inputProps?.onBlur?.(event);
          }}
        />
      </GlassSurface>
      <FieldError className={styles.fieldError} />
    </TextField>
  );
}
