"use client";

import {
  useId,
  type ComponentProps,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";
import {
  Autocomplete,
  Button,
  DateField,
  DateRangePicker,
  Description,
  ErrorMessage,
  FieldError,
  Fieldset,
  Input,
  InputGroup,
  Label,
  ListBox,
  SearchField,
  TextField,
  type AutocompleteProps,
  type DateRangePickerProps,
} from "@heroui/react";
import { InputOTP } from "@heroui/react";
import type { DateValue } from "@internationalized/date";
import type { GlassConfig } from "../lib/types.js";
import { LiquidNextUIRangeCalendar } from "./heroui-dates.js";
import { LiquidNextUISurface } from "./heroui-utilities.js";
import styles from "./heroui-additions.module.css";

type Extras = { label: string; glass?: GlassConfig };
type Option = { id: string; label: string };
export function LiquidNextUIAutocomplete({
  label,
  options,
  glass,
  ...props
}: Omit<AutocompleteProps<Option>, "children" | "className" | "items"> &
  Extras & { options: Option[] }) {
  return (
    <Autocomplete {...props} className={styles.field}>
      <Label>{label}</Label>
      <LiquidNextUISurface glass={glass}>
        <Autocomplete.Trigger className={styles.selectTrigger}>
          <Autocomplete.Value />
          <Button
            aria-label={`Choose ${label.toLowerCase()}`}
            className={styles.action}
          >
            <span aria-hidden="true">⌄</span>
          </Button>
        </Autocomplete.Trigger>
      </LiquidNextUISurface>
      <FieldError className={styles.error} />
      <Autocomplete.Popover className={styles.popover}>
        <LiquidNextUISurface glass={glass}>
          <Autocomplete.Filter
            filter={(text, input) =>
              text.toLocaleLowerCase().includes(input.toLocaleLowerCase())
            }
          >
            <SearchField
              autoFocus
              aria-label={`Filter ${label.toLowerCase()}`}
              className={styles.search}
            >
              <Input placeholder="Type to filter…" />
            </SearchField>
            <ListBox
              items={options}
              className={styles.list}
              renderEmptyState={() => (
                <p className={styles.help}>No matching options.</p>
              )}
            >
              {(option) => (
                <ListBox.Item
                  id={option.id}
                  textValue={option.label}
                  className={styles.listItem}
                >
                  {option.label}
                </ListBox.Item>
              )}
            </ListBox>
          </Autocomplete.Filter>
        </LiquidNextUISurface>
      </Autocomplete.Popover>
    </Autocomplete>
  );
}
export function LiquidNextUIDateRangePicker<T extends DateValue>({
  label,
  glass,
  ...props
}: Omit<DateRangePickerProps<T>, "children" | "className"> & Extras) {
  return (
    <DateRangePicker {...props} className={styles.field}>
      <Label>{label}</Label>
      <LiquidNextUISurface glass={glass}>
        <div className={styles.rangeRow}>
          <DateField.Input slot="start" className={styles.dateInput}>
            {(segment) => (
              <DateField.Segment segment={segment} className={styles.segment} />
            )}
          </DateField.Input>
          <DateRangePicker.RangeSeparator>–</DateRangePicker.RangeSeparator>
          <DateField.Input slot="end" className={styles.dateInput}>
            {(segment) => (
              <DateField.Segment segment={segment} className={styles.segment} />
            )}
          </DateField.Input>
          <DateRangePicker.Trigger
            className={styles.action}
            aria-label={`Choose ${label.toLowerCase()}`}
          >
            ⌄
          </DateRangePicker.Trigger>
        </div>
      </LiquidNextUISurface>
      <FieldError className={styles.error} />
      <DateRangePicker.Popover className={styles.popover}>
        <div role="dialog" aria-label={`${label} calendar`}>
          <LiquidNextUIRangeCalendar
            label={`${label} calendar`}
            glass={glass}
          />
        </div>
      </DateRangePicker.Popover>
    </DateRangePicker>
  );
}
export function LiquidNextUIFieldset({
  legend,
  children,
  ...props
}: ComponentPropsWithRef<"fieldset"> & {
  legend: string;
  children: ReactNode;
}) {
  return (
    <Fieldset {...props} className={styles.fieldset}>
      <Fieldset.Legend className={styles.legend}>{legend}</Fieldset.Legend>
      <Fieldset.Group className={styles.fieldsetFields}>
        {children}
      </Fieldset.Group>
    </Fieldset>
  );
}
export function LiquidNextUIInputGroup({
  label,
  prefix,
  suffix,
  glass,
  placeholder,
  description,
  ...props
}: Omit<ComponentProps<typeof TextField>, "children" | "className"> &
  Extras & {
    prefix?: ReactNode;
    suffix?: ReactNode;
    placeholder?: string;
    description?: string;
  }) {
  return (
    <TextField {...props} className={styles.field}>
      <Label>{label}</Label>
      <LiquidNextUISurface glass={glass}>
        <InputGroup className={styles.inputRow}>
          {prefix && (
            <InputGroup.Prefix className={styles.prefix}>
              {prefix}
            </InputGroup.Prefix>
          )}
          <InputGroup.Input placeholder={placeholder} />
          {suffix && (
            <InputGroup.Suffix className={styles.prefix}>
              {suffix}
            </InputGroup.Suffix>
          )}
        </InputGroup>
      </LiquidNextUISurface>
      {description && (
        <Description className={styles.help}>{description}</Description>
      )}
      <FieldError className={styles.error} />
    </TextField>
  );
}
export function LiquidNextUIInputOTP({
  label,
  glass,
  maxLength = 6,
  ...props
}: Omit<
  ComponentProps<typeof InputOTP>,
  "children" | "className" | "maxLength"
> &
  Extras & { maxLength?: number }) {
  const id = useId();
  const length = Math.min(8, Math.max(1, Math.round(maxLength) || 6));
  return (
    <div className={styles.field} data-disabled={props.isDisabled || undefined}>
      <label htmlFor={id}>{label}</label>
      <LiquidNextUISurface glass={glass}>
        <InputOTP
          {...props}
          id={id}
          maxLength={length}
          pattern="^[0-9]*$"
          inputMode="numeric"
          className={styles.otp}
          aria-label={label}
        >
          <InputOTP.Group className={styles.otpGroup}>
            {Array.from({ length }, (_, index) => (
              <InputOTP.Slot
                index={index}
                key={index}
                className={styles.otpSlot}
              />
            ))}
          </InputOTP.Group>
        </InputOTP>
      </LiquidNextUISurface>
    </div>
  );
}
export function LiquidNextUIErrorMessage({
  className = "",
  ...props
}: ComponentProps<typeof ErrorMessage>) {
  return <ErrorMessage {...props} className={`${styles.error} ${className}`} />;
}
