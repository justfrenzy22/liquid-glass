"use client";

import { useContext, type ComponentProps } from "react";
import {
  ColorArea,
  ColorField,
  ColorPicker,
  ColorSlider,
  ColorSwatch,
  ColorSwatchPicker,
  Input,
  Label,
  OverlayTriggerStateContext,
  Popover,
} from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import { LiquidNextUISurface } from "./heroui-utilities.js";
import { LiquidNextUIButton } from "./heroui-controls.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-colors.module.css";

type Extras = { label: string; glass?: GlassConfig };
type SliderExtras<T> = T extends unknown
  ? Omit<T, "children" | "className"> & Extras
  : never;
export function LiquidNextUIColorArea({
  label,
  glass,
  ...props
}: Omit<ComponentProps<typeof ColorArea>, "children" | "className"> & Extras) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <ColorArea
        colorSpace="hsb"
        xChannel="saturation"
        yChannel="brightness"
        {...props}
        aria-label={label}
        className={styles.area}
      >
        <ColorArea.Thumb className={styles.areaThumb}>
          <GlassSurface
            {...glass}
            radius={20}
            opacity={0.05}
            blur={0}
            thickness={45}
            className={styles.thumbLens}
          >
            <span />
          </GlassSurface>
        </ColorArea.Thumb>
      </ColorArea>
    </div>
  );
}
export function LiquidNextUIColorField({
  label,
  glass,
  ...props
}: Omit<ComponentProps<typeof ColorField>, "children" | "className"> & Extras) {
  return (
    <ColorField {...props} className={styles.field}>
      <Label className={styles.label}>{label}</Label>
      <LiquidNextUISurface glass={glass}>
        <Input className={styles.input} />
      </LiquidNextUISurface>
    </ColorField>
  );
}
export function LiquidNextUIColorSlider({
  label,
  glass,
  ...props
}: SliderExtras<ComponentProps<typeof ColorSlider>>) {
  return (
    <ColorSlider {...props} className={styles.slider}>
      <Label className={styles.label}>{label}</Label>
      <ColorSlider.Output className={styles.output} />
      <ColorSlider.Track className={styles.track}>
        <ColorSlider.Thumb className={styles.sliderThumb}>
          <GlassSurface
            {...glass}
            radius={20}
            opacity={0.1}
            blur={0}
            thickness={45}
            className={styles.thumbLens}
          >
            <span />
          </GlassSurface>
        </ColorSlider.Thumb>
      </ColorSlider.Track>
    </ColorSlider>
  );
}
export function LiquidNextUIColorSwatch({
  glass,
  ...props
}: ComponentProps<typeof ColorSwatch> & { glass?: GlassConfig }) {
  return (
    <span className={styles.swatchFrame}>
      <LiquidNextUISurface glass={glass}>
        <ColorSwatch {...props} className={styles.swatch} />
      </LiquidNextUISurface>
    </span>
  );
}
export function LiquidNextUIColorSwatchPicker({
  label,
  colors,
  glass,
  isDisabled,
  ...props
}: Omit<ComponentProps<typeof ColorSwatchPicker>, "children" | "className"> &
  Extras & {
    colors: { color: string; label: string }[];
    isDisabled?: boolean;
  }) {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      <LiquidNextUISurface glass={glass}>
        <ColorSwatchPicker
          {...props}
          aria-label={label}
          className={styles.swatches}
        >
          {colors.map((color) => (
            <ColorSwatchPicker.Item
              key={color.color}
              color={color.color}
              isDisabled={isDisabled}
              aria-label={color.label}
              className={styles.swatchItem}
            >
              <ColorSwatchPicker.Swatch className={styles.pickerSwatch} />
              <ColorSwatchPicker.Indicator className={styles.indicator} />
            </ColorSwatchPicker.Item>
          ))}
        </ColorSwatchPicker>
      </LiquidNextUISurface>
    </div>
  );
}
export function LiquidNextUIColorPicker({
  label,
  glass,
  isDisabled,
  ...props
}: Omit<ComponentProps<typeof ColorPicker>, "children" | "className"> &
  Extras & { isDisabled?: boolean }) {
  return (
    <ColorPicker {...props}>
      <ColorPicker.Trigger
        className={styles.pickerTrigger}
        aria-label={label}
        isDisabled={isDisabled}
      >
        <LiquidNextUISurface glass={glass}>
          <span className={styles.triggerInner}>
            <ColorSwatch className={styles.triggerSwatch} />
            {label}
            <span aria-hidden="true">⌄</span>
          </span>
        </LiquidNextUISurface>
      </ColorPicker.Trigger>
      <ColorPicker.Popover className={styles.popover}>
        <PickerContent label={label} glass={glass} />
      </ColorPicker.Popover>
    </ColorPicker>
  );
}

function PickerContent({ label, glass }: Extras) {
  const overlay = useContext(OverlayTriggerStateContext);
  return (
    <div
      onKeyDownCapture={(event) => {
        // ColorField handles Escape itself; capture it so one press closes the picker.
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          overlay?.close();
        }
      }}
    >
      <Popover.Dialog aria-label={label} className={styles.pickerDialog}>
        <LiquidNextUISurface glass={glass}>
          <div className={styles.pickerBody}>
            <LiquidNextUIColorArea label="Choose a shade" glass={glass} />
            <LiquidNextUIColorSlider
              label="Hue"
              channel="hue"
              colorSpace="hsb"
              glass={glass}
            />
            <LiquidNextUIColorField label="Hex color" glass={glass} />
            <LiquidNextUIButton
              appearance="normal"
              onPress={() => overlay?.close()}
            >
              Done
            </LiquidNextUIButton>
          </div>
        </LiquidNextUISurface>
      </Popover.Dialog>
    </div>
  );
}
