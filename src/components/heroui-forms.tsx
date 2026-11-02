"use client";

import type { ComponentProps, ReactNode } from "react";
import {
  CheckboxGroup,
  Description,
  FieldError,
  Form,
  Label,
  NumberField,
  Radio,
  RadioGroup,
  SearchField,
  TextArea,
  TextField,
} from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import { LiquidNextUICheckbox } from "./heroui-essentials.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-forms.module.css";

type FieldExtras = { label: string; description?: string; glass?: GlassConfig };
type Options = {
  options: { value: string; label: string; isDisabled?: boolean }[];
};
function FieldGlass({
  glass,
  children,
}: {
  glass?: GlassConfig;
  children: ReactNode;
}) {
  return (
    <GlassSurface
      {...glass}
      opacity={glass?.opacity ?? 0.1}
      blur={glass?.blur ?? 0}
      thickness={glass?.thickness ?? 65}
      radius={22}
      className={styles.surface}
    >
      {children}
    </GlassSurface>
  );
}
function Help({ description }: { description?: string }) {
  return (
    <>
      {description && (
        <Description className={styles.help}>{description}</Description>
      )}
      <FieldError className={styles.error} />
    </>
  );
}

export function LiquidNextUISearchField({
  label,
  description,
  glass,
  placeholder,
  ...props
}: Omit<ComponentProps<typeof SearchField>, "children"> &
  FieldExtras & { placeholder?: string }) {
  return (
    <SearchField {...props} className={styles.field}>
      <Label className={styles.label}>{label}</Label>
      <FieldGlass glass={glass}>
        <SearchField.Group className={styles.group}>
          <SearchField.SearchIcon />
          <SearchField.Input
            placeholder={placeholder}
            className={styles.input}
          />
          <SearchField.ClearButton
            aria-label={`Clear ${label.toLowerCase()}`}
            className={styles.clear}
          />
        </SearchField.Group>
      </FieldGlass>
      <Help description={description} />
    </SearchField>
  );
}

export function LiquidNextUITextArea({
  label,
  description,
  glass,
  placeholder,
  rows = 4,
  ...props
}: Omit<ComponentProps<typeof TextField>, "children"> &
  FieldExtras & { placeholder?: string; rows?: number }) {
  return (
    <TextField {...props} className={styles.field}>
      <Label className={styles.label}>{label}</Label>
      <FieldGlass glass={glass}>
        <TextArea
          placeholder={placeholder}
          rows={rows}
          className={styles.textarea}
        />
      </FieldGlass>
      <Help description={description} />
    </TextField>
  );
}

export function LiquidNextUINumberField({
  label,
  description,
  glass,
  ...props
}: Omit<ComponentProps<typeof NumberField>, "children"> & FieldExtras) {
  return (
    <NumberField {...props} className={styles.field}>
      <Label className={styles.label}>{label}</Label>
      <FieldGlass glass={glass}>
        <NumberField.Group className={styles.group}>
          <NumberField.DecrementButton
            className={styles.step}
            aria-label={`Decrease ${label.toLowerCase()}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
            </svg>
          </NumberField.DecrementButton>
          <NumberField.Input className={`${styles.input} ${styles.number}`} />
          <NumberField.IncrementButton
            className={styles.step}
            aria-label={`Increase ${label.toLowerCase()}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5v14" />
            </svg>
          </NumberField.IncrementButton>
        </NumberField.Group>
      </FieldGlass>
      <Help description={description} />
    </NumberField>
  );
}

export function LiquidNextUIRadioGroup({
  label,
  description,
  glass,
  options,
  ...props
}: Omit<ComponentProps<typeof RadioGroup>, "children"> &
  FieldExtras &
  Options) {
  return (
    <RadioGroup {...props} className={styles.field}>
      <Label className={styles.label}>{label}</Label>
      <div className={styles.choices}>
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            isDisabled={option.isDisabled}
            className={styles.radio}
          >
            <Radio.Content className={styles.radioContent}>
              {({ isSelected, isFocusVisible, isPressed }) => (
                <>
                  <Radio.Control className={styles.radioControl}>
                    <GlassSurface
                      {...glass}
                      opacity={0.1}
                      blur={0}
                      radius={12}
                      thickness={40}
                      className={styles.radioLens}
                      data-active={isFocusVisible || isPressed}
                    >
                      <span className={styles.dot} data-selected={isSelected} />
                    </GlassSurface>
                  </Radio.Control>
                  <Label>{option.label}</Label>
                </>
              )}
            </Radio.Content>
          </Radio>
        ))}
      </div>
      <Help description={description} />
    </RadioGroup>
  );
}

export function LiquidNextUICheckboxGroup({
  label,
  description,
  glass,
  options,
  ...props
}: Omit<ComponentProps<typeof CheckboxGroup>, "children"> &
  FieldExtras &
  Options) {
  return (
    <CheckboxGroup {...props} className={styles.field}>
      <Label className={styles.label}>{label}</Label>
      <div className={styles.choices}>
        {options.map((option) => (
          <LiquidNextUICheckbox
            key={option.value}
            value={option.value}
            label={option.label}
            isDisabled={option.isDisabled}
            glass={glass}
          />
        ))}
      </div>
      <Help description={description} />
    </CheckboxGroup>
  );
}

// Forms themselves stay calm; their interactive fields provide the glass finish.
export function NextUIForm(props: ComponentProps<typeof Form>) {
  return <Form {...props} />;
}
