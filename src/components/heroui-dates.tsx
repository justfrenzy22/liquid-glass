"use client";

import type { ReactNode } from "react";
import type { DateValue, Time } from "@internationalized/date";
import {
  Calendar,
  RangeCalendar,
  DateField,
  TimeField,
  DatePicker,
  Label,
  FieldError,
  type CalendarProps,
  type RangeCalendarProps,
  type DateFieldProps,
  type TimeFieldProps,
  type DatePickerProps,
} from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-dates.module.css";

type Extras = { glass?: GlassConfig; label: string };
function Lens({
  glass,
  children,
  panel = false,
}: {
  glass?: GlassConfig;
  children: ReactNode;
  panel?: boolean;
}) {
  return (
    <GlassSurface
      {...glass}
      blur={glass?.blur ?? 0}
      opacity={glass?.opacity ?? 0.1}
      radius={panel ? 24 : 22}
      thickness={65}
      className={panel ? styles.panel : styles.lens}
    >
      {children}
    </GlassSurface>
  );
}
function CalendarBody() {
  return (
    <>
      <Calendar.Header className={styles.header}>
        <Calendar.NavButton slot="previous" className={styles.nav} />
        <Calendar.Heading />
        <Calendar.NavButton slot="next" className={styles.nav} />
      </Calendar.Header>
      <Calendar.Grid>
        <Calendar.GridHeader>
          {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
        </Calendar.GridHeader>
        <Calendar.GridBody>
          {(date) => <Calendar.Cell date={date} className={styles.cell} />}
        </Calendar.GridBody>
      </Calendar.Grid>
    </>
  );
}
export function LiquidNextUICalendar<T extends DateValue>({
  label,
  glass,
  ...props
}: Omit<CalendarProps<T>, "children"> & Extras) {
  return (
    <Lens glass={glass} panel>
      <Calendar {...props} aria-label={label} className={styles.calendar}>
        <CalendarBody />
      </Calendar>
    </Lens>
  );
}
export function LiquidNextUIRangeCalendar<T extends DateValue>({
  label,
  glass,
  ...props
}: Omit<RangeCalendarProps<T>, "children"> & Extras) {
  return (
    <Lens glass={glass} panel>
      <RangeCalendar {...props} aria-label={label} className={styles.calendar}>
        <RangeCalendar.Header className={styles.header}>
          <RangeCalendar.NavButton slot="previous" className={styles.nav} />
          <RangeCalendar.Heading />
          <RangeCalendar.NavButton slot="next" className={styles.nav} />
        </RangeCalendar.Header>
        <RangeCalendar.Grid>
          <RangeCalendar.GridHeader>
            {(day) => (
              <RangeCalendar.HeaderCell>{day}</RangeCalendar.HeaderCell>
            )}
          </RangeCalendar.GridHeader>
          <RangeCalendar.GridBody>
            {(date) => (
              <RangeCalendar.Cell date={date} className={styles.cell} />
            )}
          </RangeCalendar.GridBody>
        </RangeCalendar.Grid>
      </RangeCalendar>
    </Lens>
  );
}
export function LiquidNextUIDateField<T extends DateValue>({
  label,
  glass,
  ...props
}: Omit<DateFieldProps<T>, "children"> & Extras) {
  return (
    <DateField {...props} className={styles.field}>
      <Label>{label}</Label>
      <Lens glass={glass}>
        <DateField.Group className={styles.group}>
          <DateField.Input className={styles.input}>
            {(segment) => (
              <DateField.Segment segment={segment} className={styles.segment} />
            )}
          </DateField.Input>
        </DateField.Group>
      </Lens>
      <FieldError className={styles.error} />
    </DateField>
  );
}
export function LiquidNextUITimeField({
  label,
  glass,
  ...props
}: Omit<TimeFieldProps<Time>, "children"> & Extras) {
  return (
    <TimeField {...props} className={styles.field}>
      <Label>{label}</Label>
      <Lens glass={glass}>
        <TimeField.Group className={styles.group}>
          <TimeField.Input className={styles.input}>
            {(segment) => (
              <TimeField.Segment segment={segment} className={styles.segment} />
            )}
          </TimeField.Input>
        </TimeField.Group>
      </Lens>
      <FieldError className={styles.error} />
    </TimeField>
  );
}
export function LiquidNextUIDatePicker<T extends DateValue>({
  label,
  glass,
  ...props
}: Omit<DatePickerProps<T>, "children"> & Extras) {
  return (
    <DatePicker {...props} className={styles.field}>
      <Label>{label}</Label>
      <Lens glass={glass}>
        <DateField.Group className={styles.group}>
          <DateField.Input className={styles.input}>
            {(segment) => (
              <DateField.Segment segment={segment} className={styles.segment} />
            )}
          </DateField.Input>
          <DatePicker.Trigger
            aria-label={`Choose ${label.toLowerCase()}`}
            className={styles.trigger}
          >
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Group>
      </Lens>
      <FieldError className={styles.error} />
      <DatePicker.Popover className={styles.popover}>
        <div role="dialog" aria-label={`${label} calendar`}>
          <Lens glass={glass} panel>
            <Calendar className={styles.calendar}>
              <CalendarBody />
            </Calendar>
          </Lens>
        </div>
      </DatePicker.Popover>
    </DatePicker>
  );
}
